// ═══════════════════════════════════════════════════════════
//  VITALCORE OCR ENGINE
//  Uses Tesseract.js (loaded from CDN) to read screenshots
//  Then parses extracted text for health data
// ═══════════════════════════════════════════════════════════

window.OCREngine = {

  // ─────────────────────────────────────────────
  //  Run OCR on an image file/blob
  // ─────────────────────────────────────────────
  async readImage(imageFile, onProgress) {
    if (!window.Tesseract) throw new Error('Tesseract not loaded');

    const result = await Tesseract.recognize(imageFile, 'eng', {
      logger: m => {
        if (onProgress && m.status === 'recognizing text') {
          onProgress(Math.round(m.progress * 100));
        }
      }
    });
    return result.data.text;
  },

  // ─────────────────────────────────────────────
  //  AUTO-DETECT screenshot type
  // ─────────────────────────────────────────────
  detectType(text) {
    const t = text.toLowerCase();
    // Fitness app patterns
    if (/steps|move minutes|calories burned|active minutes|heart points/i.test(t)) return 'fitness';
    // Gym / workout app patterns
    if (/workout|exercise|sets|reps|duration|distance|pace|heart rate|bpm/i.test(t)) return 'workout';
    // Body scale / composition patterns
    if (/weight|body fat|muscle|bmi|visceral|bone|water|fat mass|lean/i.test(t)) return 'body';
    // Food nutrition label
    if (/serving size|total fat|sodium|carbohydrate|dietary fiber|nutrition facts/i.test(t)) return 'food_label';
    return 'unknown';
  },

  // ─────────────────────────────────────────────
  //  PARSE FITNESS APP (Google Fit, Samsung Health, etc.)
  // ─────────────────────────────────────────────
  parseFitness(text) {
    const result = { steps: null, calories: null, moveMinutes: null, distance: null, heartPoints: null };

    // Steps — look for number followed by "steps" or preceded by steps label
    const stepsMatch = text.match(/(\d[\d,]+)\s*steps/i) ||
                       text.match(/steps[:\s]+(\d[\d,]+)/i) ||
                       text.match(/(\d{3,6})\s*\n.*step/i);
    if (stepsMatch) result.steps = parseInt(stepsMatch[1].replace(/,/g, ''));

    // Calories burned
    const calMatch = text.match(/(\d[\d,]+)\s*(?:kcal|cal|calories)\s*(?:burned|burnt)?/i) ||
                     text.match(/(?:burned|calories)[:\s]+(\d[\d,]+)/i);
    if (calMatch) result.calories = parseInt(calMatch[1].replace(/,/g, ''));

    // Move / active minutes
    const minMatch = text.match(/(\d+)\s*(?:move\s*)?min(?:utes?)?/i) ||
                     text.match(/active[:\s]+(\d+)\s*min/i);
    if (minMatch) result.moveMinutes = parseInt(minMatch[1]);

    // Distance
    const distMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:km|kilometers?|miles?)/i);
    if (distMatch) result.distance = parseFloat(distMatch[1]);

    return result;
  },

  // ─────────────────────────────────────────────
  //  PARSE GYM / WORKOUT APP
  // ─────────────────────────────────────────────
  parseWorkout(text) {
    const result = { duration: null, calories: null, type: null, exercises: [], heartRate: null };

    // Duration
    const durMatch = text.match(/(\d+)\s*(?:mins?|minutes?)\s*(?:workout)?/i) ||
                     text.match(/(?:duration|time)[:\s]+(\d+)\s*(?:mins?|minutes?)/i) ||
                     text.match(/(\d+):(\d+)\s*(?:min|hr)?/);
    if (durMatch) {
      if (durMatch[2]) { // HH:MM format
        result.duration = parseInt(durMatch[1]) * 60 + parseInt(durMatch[2]);
      } else {
        result.duration = parseInt(durMatch[1]);
      }
    }

    // Calories
    const calMatch = text.match(/(\d+)\s*(?:kcal|cal|calories)/i) ||
                     text.match(/(?:burned|calories)[:\s]+(\d+)/i);
    if (calMatch) result.calories = parseInt(calMatch[1]);

    // Workout type detection
    const t = text.toLowerCase();
    if (/strength|weight|lifting|bench|squat|deadlift|press|curl|row/i.test(t)) result.type = 'Strength';
    else if (/run|running|cardio|cycle|cycling|swim|treadmill|elliptical/i.test(t)) result.type = 'Cardio';
    else if (/yoga|stretch|flexibility/i.test(t)) result.type = 'Flexibility';
    else if (/hiit|circuit|crossfit/i.test(t)) result.type = 'HIIT';

    // Heart rate
    const hrMatch = text.match(/(\d{2,3})\s*(?:bpm|heart rate|avg hr)/i);
    if (hrMatch) result.heartRate = parseInt(hrMatch[1]);

    return result;
  },

  // ─────────────────────────────────────────────
  //  PARSE BODY SCALE / COMPOSITION
  // ─────────────────────────────────────────────
  parseBody(text) {
    const result = { weight: null, bodyFat: null, muscle: null, bmi: null, visceral: null, water: null, bone: null };

    // Weight — most prominent number with kg/lbs
    const weightMatch = text.match(/(\d{2,3}(?:\.\d+)?)\s*kg/i) ||
                        text.match(/weight[:\s]+(\d{2,3}(?:\.\d+)?)/i) ||
                        text.match(/(\d{2,3}(?:\.\d+)?)\s*lbs?/i);
    if (weightMatch) {
      let w = parseFloat(weightMatch[1]);
      if (/lbs?/i.test(weightMatch[0])) w = w * 0.453592; // convert to kg
      result.weight = Math.round(w * 10) / 10;
    }

    // Body fat %
    const fatMatch = text.match(/(?:body\s*fat|fat)[:\s%]+(\d{1,2}(?:\.\d+)?)\s*%?/i) ||
                     text.match(/(\d{1,2}(?:\.\d+)?)\s*%\s*(?:fat|body fat)/i);
    if (fatMatch) result.bodyFat = parseFloat(fatMatch[1]);

    // Muscle mass
    const muscleMatch = text.match(/(?:muscle|skeletal muscle|muscle mass)[:\s]+(\d{1,3}(?:\.\d+)?)\s*(?:kg|%)?/i);
    if (muscleMatch) result.muscle = parseFloat(muscleMatch[1]);

    // BMI
    const bmiMatch = text.match(/bmi[:\s]+(\d{1,2}(?:\.\d+)?)/i) ||
                     text.match(/(\d{1,2}(?:\.\d+)?)\s*bmi/i);
    if (bmiMatch) result.bmi = parseFloat(bmiMatch[1]);

    // Visceral fat
    const visceralMatch = text.match(/visceral[:\s]+(\d{1,2}(?:\.\d+)?)/i);
    if (visceralMatch) result.visceral = parseFloat(visceralMatch[1]);

    // Water %
    const waterMatch = text.match(/(?:water|body water)[:\s]+(\d{1,2}(?:\.\d+)?)\s*%?/i);
    if (waterMatch) result.water = parseFloat(waterMatch[1]);

    return result;
  },

  // ─────────────────────────────────────────────
  //  PARSE FOOD NUTRITION LABEL
  // ─────────────────────────────────────────────
  parseFoodLabel(text) {
    const result = { servingSize: null, calories: null, protein: null, carbs: null, fat: null, fiber: null };

    const calMatch = text.match(/calories[:\s]+(\d+)/i) || text.match(/energy[:\s]+(\d+)/i);
    if (calMatch) result.calories = parseInt(calMatch[1]);

    const protMatch = text.match(/protein[:\s]+(\d+(?:\.\d+)?)\s*g/i);
    if (protMatch) result.protein = parseFloat(protMatch[1]);

    const carbMatch = text.match(/(?:total\s*)?carbohydrate[s]?[:\s]+(\d+(?:\.\d+)?)\s*g/i);
    if (carbMatch) result.carbs = parseFloat(carbMatch[1]);

    const fatMatch = text.match(/(?:total\s*)?fat[:\s]+(\d+(?:\.\d+)?)\s*g/i);
    if (fatMatch) result.fat = parseFloat(fatMatch[1]);

    const servingMatch = text.match(/serving size[:\s]+([^\n]+)/i);
    if (servingMatch) result.servingSize = servingMatch[1].trim();

    return result;
  },

  // ─────────────────────────────────────────────
  //  MASTER PARSE — auto detect + extract
  // ─────────────────────────────────────────────
  async processScreenshot(imageFile, onProgress) {
    const text = await this.readImage(imageFile, onProgress);
    const type = this.detectType(text);

    let data = {};
    if (type === 'fitness') data = this.parseFitness(text);
    else if (type === 'workout') data = this.parseWorkout(text);
    else if (type === 'body') data = this.parseBody(text);
    else if (type === 'food_label') data = this.parseFoodLabel(text);

    return { type, data, rawText: text };
  }
};
