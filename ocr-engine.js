// ═══════════════════════════════════════════════════════════
//  VITALCORE OCR ENGINE v2
//  Fixed Google Fit layout parsing + expanded body metrics
// ═══════════════════════════════════════════════════════════

window.OCREngine = {

  async readImage(imageFile, onProgress) {
    if (!window.Tesseract) throw new Error('Tesseract not loaded');
    const result = await Tesseract.recognize(imageFile, 'eng', {
      logger: m => {
        if (onProgress && m.status === 'recognizing text') onProgress(Math.round(m.progress * 100));
      }
    });
    return result.data.text;
  },

  detectType(text) {
    const t = text.toLowerCase();
    if (/steps|move min|heart pts|\.[\d]+\s*km/i.test(t)) return 'fitness';
    if (/workout|back.biceps|chest|shoulder|legs?|routine|sets|reps/i.test(t)) return 'workout';
    if (/body fat|subcutaneous|visceral fat|muscle mass|bone mass|protein.*kg|fat mass|lean|bmi|body water/i.test(t)) return 'body';
    if (/serving size|total fat|sodium|carbohydrate|dietary fiber|nutrition facts/i.test(t)) return 'food_label';
    return 'unknown';
  },

  // ─────────────────────────────────────────────
  //  GOOGLE FIT LAYOUT AWARE PARSER
  //
  //  Actual OCR output from your screenshot:
  //  "0"           ← Heart Pts (ring top)
  //  "943"         ← Steps (ring bottom)
  //  "Heart Pts  Steps"
  //  "598  0.58  13"
  //  "Cal  km  Move Min"
  // ─────────────────────────────────────────────
  parseFitness(text) {
    const result = { steps: null, calories: null, moveMinutes: null, distance: null, heartPoints: null };
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    // STRATEGY 1: Find "Heart Pts  Steps" line — anchor for Google Fit layout
    const hpStepsIdx = lines.findIndex(l => /heart\s*pts/i.test(l) && /steps/i.test(l));
    if (hpStepsIdx >= 0) {
      // Ring numbers are on the line(s) ABOVE this label
      // Collect all numbers from 1-2 lines above
      const above = (lines[hpStepsIdx - 1] || '') + ' ' + (lines[hpStepsIdx - 2] || '');
      const ringNums = above.match(/\d+/g) || [];
      if (ringNums.length >= 2) {
        result.heartPoints = parseInt(ringNums[0]);
        result.steps       = parseInt(ringNums[ringNums.length - 1]); // steps = last/larger number
      } else if (ringNums.length === 1) {
        result.steps = parseInt(ringNums[0]);
      }

      // Data row: find line with "Cal" label — numbers are on line ABOVE it
      for (let i = hpStepsIdx + 1; i < Math.min(hpStepsIdx + 6, lines.length); i++) {
        if (/\bcal\b/i.test(lines[i])) {
          // Numbers should be on previous line: "598  0.58  13"
          const numLine = lines[i - 1] || '';
          const nums = numLine.match(/[\d]+(?:\.\d+)?/g) || [];
          if (nums.length >= 3) {
            result.calories    = parseInt(nums[0]);
            result.distance    = parseFloat(nums[1]);
            result.moveMinutes = parseInt(nums[2]);
          } else if (nums.length === 2) {
            result.calories = parseInt(nums[0]);
            result.distance = parseFloat(nums[1]);
          } else if (nums.length === 1) {
            result.calories = parseInt(nums[0]);
          }
          // Also check if numbers are on same line as "Cal km Move Min"
          if (!result.calories) {
            const sameLineNums = lines[i].match(/\d+/g) || [];
            if (sameLineNums.length) result.calories = parseInt(sameLineNums[0]);
          }
          break;
        }
      }
    }

    // STRATEGY 2: Fallbacks if layout wasn't detected
    if (!result.steps) {
      const m = text.match(/(\d{3,6})\s*\n?\s*steps/i) || text.match(/steps[:\s\n]+(\d{3,6})/i);
      if (m) result.steps = parseInt(m[1].replace(/,/g, ''));
    }
    if (!result.calories) {
      // "598\nCal" or "598 Cal" — NOT "598 kcal" which is food
      const m = text.match(/(\d{2,4})\s*\n\s*Cal\b/i) || text.match(/\bCal\b[^\n]*\n[^\n]*?(\d{2,4})/i);
      if (m) result.calories = parseInt(m[1]);
    }
    if (!result.moveMinutes) {
      const m = text.match(/(\d{1,3})\s*\n?\s*move\s*min/i) || text.match(/move\s*min[:\s\n]+(\d{1,3})/i);
      if (m) result.moveMinutes = parseInt(m[1]);
    }
    if (!result.distance) {
      const m = text.match(/(\d+\.\d+)\s*\n?\s*km/i);
      if (m) result.distance = parseFloat(m[1]);
    }

    // SANITY CHECKS
    // Steps must be a reasonable step count (>= calories in most cases)
    if (result.steps && result.calories) {
      if (result.steps < 100 && result.calories > 300) {
        [result.steps, result.calories] = [result.calories, result.steps];
      }
    }
    // Move minutes should be < 300
    if (result.moveMinutes && result.moveMinutes > 300) result.moveMinutes = null;
    // Calories from activity should be 50–3000
    if (result.calories && (result.calories < 50 || result.calories > 3000)) result.calories = null;

    return result;
  },

  // ─────────────────────────────────────────────
  //  WORKOUT APP PARSER
  // ─────────────────────────────────────────────
  parseWorkout(text) {
    const result = { duration: null, calories: null, type: null, heartRate: null, name: null };

    // Workout name: "Last workout • Back-Biceps Routine"
    const nameMatch = text.match(/(?:last\s*workout[^•\n]*[•·]\s*)([^\n]+)/i) ||
                      text.match(/workout[:\s]+([A-Za-z][^\n,•]+)/i);
    if (nameMatch) result.name = nameMatch[1].trim().slice(0, 50);

    // Duration — "37 min" but NOT "Move Min"
    const durMatch = text.match(/(\d{1,3})\s*min\b(?!\s*(?:move|active|s\b))/i) ||
                     text.match(/(?:duration|time)[:\s]+(\d+)/i);
    if (durMatch) result.duration = parseInt(durMatch[1]);

    // Calories — prefer kcal
    const calMatch = text.match(/(\d{2,4})\s*(?:kcal|calories)/i) ||
                     text.match(/(\d{2,4})\s*Cal\b/i);
    if (calMatch) result.calories = parseInt(calMatch[1]);

    // Type from name + keywords
    const t = (result.name || '') + ' ' + text;
    if (/back|bicep|tricep|chest|shoulder|leg|squat|deadlift|bench|push|pull|curl|strength|weight|arm|lat/i.test(t)) result.type = 'Strength';
    else if (/run|cardio|cycle|swim|treadmill|elliptical|sprint/i.test(t)) result.type = 'Cardio';
    else if (/yoga|stretch|flexibility|pilates/i.test(t)) result.type = 'Flexibility';
    else if (/hiit|circuit|crossfit|functional/i.test(t)) result.type = 'HIIT';

    // Heart rate / pts
    const hrMatch = text.match(/(\d{2,3})\s*(?:bpm|pts\b)/i);
    if (hrMatch) {
      const hr = parseInt(hrMatch[1]);
      if (hr > 30 && hr < 250) result.heartRate = hr;
    }

    return result;
  },

  // ─────────────────────────────────────────────
  //  BODY SCALE PARSER — expanded metrics
  // ─────────────────────────────────────────────
  parseBody(text) {
    const result = {
      weight: null, bmi: null,
      bodyFat: null, subcutaneousFat: null, visceralFat: null,
      muscleMass: null, skeletalMuscle: null,
      proteinMass: null, boneMass: null,
      bodyWater: null, leanMass: null,
      metabolicAge: null, bmr: null,
    };

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    // Helper: search for a value near a label in the lines array
    function nearLabel(regex) {
      for (let i = 0; i < lines.length; i++) {
        if (regex.test(lines[i])) {
          // inline number
          const inline = lines[i].replace(regex, '').match(/(\d{1,3}(?:\.\d+)?)/);
          if (inline) return parseFloat(inline[1]);
          // next line number
          if (lines[i + 1]) {
            const nxt = lines[i + 1].match(/^(\d{1,3}(?:\.\d+)?)/);
            if (nxt) return parseFloat(nxt[1]);
          }
          // previous line number
          if (lines[i - 1]) {
            const prv = lines[i - 1].match(/(\d{1,3}(?:\.\d+)?)$/);
            if (prv) return parseFloat(prv[1]);
          }
        }
      }
      return null;
    }

    // Weight
    const wm = text.match(/(\d{2,3}(?:\.\d+)?)\s*kg(?!\s*\/)/i) ||
               text.match(/weight[:\s]+(\d{2,3}(?:\.\d+)?)/i) ||
               text.match(/(\d{2,3}(?:\.\d+)?)\s*lbs?/i);
    if (wm) {
      let w = parseFloat(wm[1]);
      if (/lbs?/i.test(wm[0])) w *= 0.453592;
      result.weight = Math.round(w * 10) / 10;
    }

    result.bmi             = nearLabel(/\bbmi\b/i);
    result.bodyFat         = nearLabel(/body\s*fat\s*(?:%|percent)?(?!\s*\(sub)/i);
    result.subcutaneousFat = nearLabel(/subcutaneous|subcut/i);
    result.visceralFat     = nearLabel(/visceral\s*(?:fat)?/i);
    result.muscleMass      = nearLabel(/muscle\s*mass/i);
    result.skeletalMuscle  = nearLabel(/skeletal\s*muscle/i);
    result.proteinMass     = nearLabel(/\bprotein\b/i);
    result.boneMass        = nearLabel(/bone\s*(?:mass|density)?/i);
    result.bodyWater       = nearLabel(/body\s*water|water\s*(?:%|content)?/i);
    result.leanMass        = nearLabel(/lean\s*(?:body\s*)?(?:mass)?/i);
    result.metabolicAge    = nearLabel(/metabolic\s*age/i);
    result.bmr             = nearLabel(/\bbmr\b|basal\s*metabolic/i);

    // Regex fallbacks for common scale app formats
    const fallbacks = [
      [/body\s*fat[:\s%]+(\d{1,2}(?:\.\d+)?)/i,         'bodyFat'],
      [/subcutaneous[^%\d]*(\d{1,2}(?:\.\d+)?)/i,       'subcutaneousFat'],
      [/visceral[^%\d]*(\d{1,2}(?:\.\d+)?)/i,           'visceralFat'],
      [/muscle\s*mass[:\s]+(\d{1,3}(?:\.\d+)?)/i,       'muscleMass'],
      [/skeletal[^%\d]*(\d{1,2}(?:\.\d+)?)/i,           'skeletalMuscle'],
      [/protein[:\s]+(\d{1,3}(?:\.\d+)?)\s*(?:kg|%)/i,  'proteinMass'],
      [/bone[:\s]+(\d{1,3}(?:\.\d+)?)\s*kg/i,           'boneMass'],
      [/water[:\s]+(\d{1,2}(?:\.\d+)?)\s*%/i,           'bodyWater'],
      [/lean[:\s]+(\d{1,3}(?:\.\d+)?)\s*kg/i,           'leanMass'],
      [/metabolic\s*age[:\s]+(\d{1,3})/i,               'metabolicAge'],
      [/bmr[:\s]+(\d{3,5})/i,                           'bmr'],
      [/bmi[:\s]+(\d{1,2}(?:\.\d+)?)/i,                 'bmi'],
    ];
    for (const [rx, key] of fallbacks) {
      if (!result[key]) {
        const m = text.match(rx);
        if (m) result[key] = parseFloat(m[1]);
      }
    }

    return result;
  },

  // ─────────────────────────────────────────────
  //  FOOD LABEL PARSER
  // ─────────────────────────────────────────────
  parseFoodLabel(text) {
    const result = { servingSize: null, calories: null, protein: null, carbs: null, fat: null, fiber: null, sugar: null, sodium: null };

    const pick = (regexes) => { for (const r of regexes) { const m = text.match(r); if (m) return m[1]; } return null; };

    const cal = pick([/calories[:\s]+(\d+)/i, /energy[:\s]+(\d+)/i]);
    if (cal) result.calories = parseInt(cal);

    const prot = pick([/protein[:\s]+(\d+(?:\.\d+)?)\s*g/i]);
    if (prot) result.protein = parseFloat(prot);

    const carb = pick([/(?:total\s*)?carbohydrate[s]?[:\s]+(\d+(?:\.\d+)?)\s*g/i]);
    if (carb) result.carbs = parseFloat(carb);

    const fat = pick([/(?:total\s*)?fat[:\s]+(\d+(?:\.\d+)?)\s*g/i]);
    if (fat) result.fat = parseFloat(fat);

    const fiber = pick([/(?:dietary\s*)?fiber[:\s]+(\d+(?:\.\d+)?)\s*g/i]);
    if (fiber) result.fiber = parseFloat(fiber);

    const sugar = pick([/(?:total\s*)?sugar[s]?[:\s]+(\d+(?:\.\d+)?)\s*g/i]);
    if (sugar) result.sugar = parseFloat(sugar);

    const sodium = pick([/sodium[:\s]+(\d+(?:\.\d+)?)\s*mg/i]);
    if (sodium) result.sodium = parseFloat(sodium);

    const serving = text.match(/serving size[:\s]+([^\n]{1,40})/i);
    if (serving) result.servingSize = serving[1].trim();

    return result;
  },

  // ─────────────────────────────────────────────
  //  MASTER PARSE
  // ─────────────────────────────────────────────
  async processScreenshot(imageFile, onProgress) {
    const text = await this.readImage(imageFile, onProgress);
    const type = this.detectType(text);

    let data = {};
    if      (type === 'fitness')    data = this.parseFitness(text);
    else if (type === 'workout')    data = this.parseWorkout(text);
    else if (type === 'body')       data = this.parseBody(text);
    else if (type === 'food_label') data = this.parseFoodLabel(text);
    else {
      // Try fitness first, fallback to body
      data = this.parseFitness(text);
      if (!data.steps && !data.calories) data = this.parseBody(text);
    }

    return { type, data, rawText: text };
  }
};
