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
    if (/body fat|subcutaneous|visceral|muscle mass|bone mass|protein|fat mass|lean|bmi|body water|moisture rate|obesity level|standard weight/i.test(t)) return 'body';
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
  //  BODY SCALE PARSER v3
  //
  //  Handles TWO common layouts:
  //
  //  Layout A (label: value)  — most apps
  //    "Body Fat: 21.6%"
  //    "Muscle Mass: 56.9kg"
  //
  //  Layout B (value  label)  — your scale app
  //    "79.45kg  Weight"
  //    "21.6%   Body Fat Rate"
  //    "56.9kg  Muscle Mass"
  //    "1582Kcal  BMR"
  //
  //  Strategy: For each line, check BOTH directions.
  //  Also handle same-line "VALUE  small-delta  LABEL" format.
  // ─────────────────────────────────────────────
  parseBody(text) {
    const result = {
      weight: null, bmi: null, heartRate: null,
      bodyFat: null, subcutaneousFat: null, visceralFat: null,
      muscleMass: null, skeletalMuscle: null,
      proteinPct: null, boneMass: null,
      bodyWater: null, leanMass: null,
      metabolicAge: null, bmr: null,
      obesityLevel: null, standardWeight: null, bodyType: null,
    };

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    // ── METRIC DEFINITIONS ──
    // Each entry: [resultKey, labelRegexes[], valueType, unit]
    // valueType: 'kg' | 'pct' | 'num' | 'kcal' | 'bpm' | 'str'
    const METRICS = [
      // key                labelPatterns                                              type
      ['weight',          [/\bweight\b/i, /body\s*weight/i],                         'kg'  ],
      ['bmi',             [/\bbmi\b/i, /obesity\s*level/i],                          'num' ],
      ['heartRate',       [/heart\s*rate/i, /pulse/i],                               'bpm' ],
      ['bodyFat',         [/body\s*fat\s*(?:rate|%|percent)?(?!\s*\(sub)/i,
                           /fat\s*rate/i],                                            'pct' ],
      ['subcutaneousFat', [/subcutaneous\s*fat\s*(?:percentage|%)?/i,
                           /subcut/i],                                                'pct' ],
      ['visceralFat',     [/visceral\s*fat/i, /visceral/i],                          'num' ],
      ['muscleMass',      [/muscle\s*mass/i, /skeletal\s*muscle\s*mass/i],           'kg'  ],
      ['skeletalMuscle',  [/skeletal\s*muscle\s*(?:rate|%)?/i],                      'pct' ],
      ['proteinPct',      [/\bprotein\b/i],                                          'pct' ],
      ['boneMass',        [/bone\s*mass/i, /bone\s*density/i],                       'kg'  ],
      ['bodyWater',       [/body\s*(?:moisture|water)\s*(?:rate|%)?/i,
                           /moisture\s*rate/i],                                       'pct' ],
      ['leanMass',        [/lean\s*body\s*mass/i, /lean\s*mass/i],                  'kg'  ],
      ['metabolicAge',    [/metabolic\s*age/i, /body\s*age/i],                       'num' ],
      ['bmr',             [/\bbmr\b/i, /basal\s*metabolic/i],                        'kcal'],
      ['standardWeight',  [/standard\s*weight/i],                                    'kg'  ],
      ['bodyType',        [/body\s*type/i],                                           'str' ],
    ];

    // ── NUMBER EXTRACTOR ──
    // Extracts the PRIMARY value from a string (first/largest meaningful number)
    function extractNum(str, type) {
      if (type === 'str') {
        // For body type, extract word like Standard/Athletic/Obese
        const m = str.match(/\b(standard|athletic|obese|slim|fit|normal|overfat)\b/i);
        return m ? m[1] : null;
      }
      // Strip small delta values like "↓ 0.2kg" or "◎ 0.5kg" or "26bpm" after main value
      // These appear as small secondary numbers in the scale app
      // The main value is always the FIRST or LARGEST number on the line
      const nums = str.match(/\d{1,4}(?:\.\d+)?/g) || [];
      if (!nums.length) return null;
      if (type === 'kcal') {
        // BMR is 3-4 digits like 1582
        const big = nums.find(n => parseFloat(n) > 500);
        return big ? parseFloat(big) : null;
      }
      if (type === 'bpm') {
        const bpm = nums.find(n => parseFloat(n) >= 40 && parseFloat(n) <= 220);
        return bpm ? parseFloat(bpm) : null;
      }
      // For kg/pct/num: take the first number (main value, delta comes after)
      return parseFloat(nums[0]);
    }

    // ── BIDIRECTIONAL LINE SCANNER ──
    // For each line, check if it contains a label AND value together
    // OR if the label is on adjacent line with value on current line
    function scanMetric(labelRegexes, type) {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isLabel = labelRegexes.some(r => r.test(line));

        if (isLabel) {
          // Layout A: label line itself has inline number → "BMI: 25.0" or "BMI 25.0"
          const inlineNum = extractNum(line.replace(labelRegexes.find(r => r.test(line)), ''), type);
          if (inlineNum !== null) return inlineNum;

          // Layout A continued: value on NEXT line → label\nvalue
          if (lines[i + 1]) {
            const nxt = extractNum(lines[i + 1], type);
            if (nxt !== null) return nxt;
          }
          // value on PREVIOUS line
          if (lines[i - 1]) {
            const prv = extractNum(lines[i - 1], type);
            if (prv !== null) return prv;
          }
        }

        // Layout B: value is ON THIS LINE, label is on SAME LINE after value
        // e.g. "21.6% ◎ 0.2% Body Fat Rate"
        // e.g. "56.9kg ◎ 0.2kg Muscle Mass"
        const hasLabel = labelRegexes.some(r => r.test(line));
        if (hasLabel) {
          // Already handled above — but extract first number from full line
          const fullNum = extractNum(line, type);
          if (fullNum !== null) return fullNum;
        }
      }
      return null;
    }

    // Run all metrics
    for (const [key, labels, type] of METRICS) {
      const val = scanMetric(labels, type);
      if (val !== null) result[key] = val;
    }

    // ── WEIGHT special case: most reliable — look for XXkg pattern ──
    if (!result.weight) {
      // Find the most prominent kg value (usually largest on screen, shown in big circle)
      const kgMatches = [...text.matchAll(/(\d{2,3}(?:\.\d+)?)\s*kg/gi)];
      if (kgMatches.length) {
        // Take the first one that looks like a body weight (40–200kg)
        for (const m of kgMatches) {
          const w = parseFloat(m[1]);
          if (w >= 30 && w <= 250) { result.weight = w; break; }
        }
      }
    }

    // ── Convert lbs if needed ──
    if (result.weight && result.weight < 30) result.weight = null; // invalid
    if (result.weight) {
      const lbsMatch = text.match(/(\d{2,3}(?:\.\d+)?)\s*lbs/i);
      if (lbsMatch && !text.match(/\d{2,3}(?:\.\d+)?\s*kg/i)) {
        result.weight = Math.round(parseFloat(lbsMatch[1]) * 0.453592 * 10) / 10;
      }
    }

    // ── BMR: Kcal variant ("1582Kcal") ──
    if (!result.bmr) {
      const bmrMatch = text.match(/(\d{3,5})\s*(?:K?cal|kcal)/i);
      if (bmrMatch && parseFloat(bmrMatch[1]) > 500) result.bmr = parseFloat(bmrMatch[1]);
    }

    // ── Obesity Level = BMI equivalent in some apps ──
    if (!result.bmi && result.obesityLevel) result.bmi = result.obesityLevel;

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
