// ═══════════════════════════════════════════════════════════
//  VITALCORE NUTRITION DATABASE
//  Embedded USDA-based nutrition data — works 100% offline
//  Format: "keyword": { cal_per_100g, protein_per_100g, unit_weight_g, aliases[] }
// ═══════════════════════════════════════════════════════════

const NUTRITION_DB = {
  // NUTS & SEEDS
  almond:       { cal: 579, prot: 21.2, unit: 1.2,  aliases: ['almonds','badam'] },
  walnut:       { cal: 654, prot: 15.2, unit: 3.5,  aliases: ['walnuts','akhrot'] },
  cashew:       { cal: 553, prot: 18.2, unit: 1.5,  aliases: ['cashews','kaju'] },
  pistachio:    { cal: 560, prot: 20.2, unit: 1.0,  aliases: ['pistachios','pista'] },
  peanut:       { cal: 567, prot: 25.8, unit: 1.0,  aliases: ['peanuts','groundnut','moongphali'] },
  sunflower_seed:{ cal: 584, prot: 20.8, unit: 3.5, aliases: ['sunflower seeds'] },
  chia_seed:    { cal: 486, prot: 16.5, unit: 3.0,  aliases: ['chia seeds','chia'] },
  flaxseed:     { cal: 534, prot: 18.3, unit: 2.5,  aliases: ['flax seed','alsi'] },

  // FRUITS
  apple:        { cal: 52,  prot: 0.3,  unit: 180, aliases: ['apples','seb'] },
  banana:       { cal: 89,  prot: 1.1,  unit: 120, aliases: ['bananas','kela'] },
  orange:       { cal: 47,  prot: 0.9,  unit: 150, aliases: ['oranges','santra'] },
  mango:        { cal: 60,  prot: 0.8,  unit: 200, aliases: ['mangos','aam'] },
  grapes:       { cal: 67,  prot: 0.6,  unit: 5,   aliases: ['grape','angur'] },
  strawberry:   { cal: 32,  prot: 0.7,  unit: 12,  aliases: ['strawberries'] },
  watermelon:   { cal: 30,  prot: 0.6,  unit: 300, aliases: ['tarbuz'] },
  papaya:       { cal: 43,  prot: 0.5,  unit: 200, aliases: ['papita'] },
  pomegranate:  { cal: 83,  prot: 1.7,  unit: 200, aliases: ['anar'] },
  guava:        { cal: 68,  prot: 2.6,  unit: 100, aliases: ['amrood'] },
  date:         { cal: 277, prot: 1.8,  unit: 7,   aliases: ['dates','khajoor','khajur'] },
  fig:          { cal: 74,  prot: 0.75, unit: 50,  aliases: ['figs','anjeer'] },

  // VEGETABLES
  spinach:      { cal: 23,  prot: 2.9,  unit: 30,  aliases: ['palak'] },
  broccoli:     { cal: 34,  prot: 2.8,  unit: 150, aliases: [] },
  carrot:       { cal: 41,  prot: 0.9,  unit: 80,  aliases: ['carrots','gajar'] },
  potato:       { cal: 77,  prot: 2.0,  unit: 150, aliases: ['potatoes','aloo'] },
  tomato:       { cal: 18,  prot: 0.9,  unit: 120, aliases: ['tomatoes','tamatar'] },
  onion:        { cal: 40,  prot: 1.1,  unit: 110, aliases: ['onions','pyaz'] },
  cucumber:     { cal: 15,  prot: 0.65, unit: 200, aliases: ['kheera'] },
  cauliflower:  { cal: 25,  prot: 1.9,  unit: 200, aliases: ['gobhi','gobi'] },
  peas:         { cal: 81,  prot: 5.4,  unit: 10,  aliases: ['matar','green peas'] },
  corn:         { cal: 86,  prot: 3.2,  unit: 100, aliases: ['maize','bhutta'] },
  beetroot:     { cal: 43,  prot: 1.6,  unit: 150, aliases: ['beet','chukandar'] },

  // GRAINS & CARBS
  rice:         { cal: 130, prot: 2.7,  unit: 200, aliases: ['white rice','chawal','cooked rice'] },
  brown_rice:   { cal: 112, prot: 2.6,  unit: 200, aliases: ['brown rice'] },
  roti:         { cal: 120, prot: 3.5,  unit: 35,  aliases: ['chapati','phulka','wheat roti','whole wheat roti'] },
  paratha:      { cal: 260, prot: 5.0,  unit: 80,  aliases: ['parotha'] },
  bread:        { cal: 265, prot: 9.0,  unit: 30,  aliases: ['white bread','bread slice','toast'] },
  brown_bread:  { cal: 247, prot: 13.0, unit: 30,  aliases: ['whole wheat bread','brown bread slice'] },
  oats:         { cal: 389, prot: 16.9, unit: 40,  aliases: ['oatmeal','rolled oats','quaker'] },
  poha:         { cal: 110, prot: 2.5,  unit: 100, aliases: ['flattened rice','beaten rice'] },
  upma:         { cal: 150, prot: 3.5,  unit: 150, aliases: [] },
  idli:         { cal: 58,  prot: 2.0,  unit: 40,  aliases: ['idly'] },
  dosa:         { cal: 133, prot: 3.8,  unit: 80,  aliases: ['plain dosa','masala dosa'] },
  pasta:        { cal: 131, prot: 5.0,  unit: 200, aliases: ['spaghetti','noodles','macaroni'] },
  quinoa:       { cal: 120, prot: 4.4,  unit: 185, aliases: [] },
  muesli:       { cal: 380, prot: 9.0,  unit: 80,  aliases: ['granola','cereal'] },

  // PULSES & LEGUMES (Indian staples)
  dal:          { cal: 116, prot: 9.0,  unit: 150, aliases: ['lentils','toor dal','moong dal','masoor dal','chana dal','yellow dal'] },
  rajma:        { cal: 127, prot: 8.7,  unit: 150, aliases: ['kidney beans','red kidney beans'] },
  chana:        { cal: 164, prot: 8.9,  unit: 150, aliases: ['chickpeas','chole','kala chana','white chana'] },
  moong:        { cal: 105, prot: 7.0,  unit: 150, aliases: ['moong beans','green gram','sprouted moong'] },
  soybean:      { cal: 173, prot: 16.6, unit: 150, aliases: ['soybeans'] },

  // DAIRY
  milk:         { cal: 61,  prot: 3.2,  unit: 200, aliases: ['whole milk','full fat milk','cow milk','doodh'] },
  skim_milk:    { cal: 35,  prot: 3.4,  unit: 200, aliases: ['skimmed milk','toned milk'] },
  curd:         { cal: 98,  prot: 11.0, unit: 200, aliases: ['yogurt','dahi','greek yogurt','hung curd'] },
  paneer:       { cal: 265, prot: 18.3, unit: 100, aliases: ['cottage cheese','fresh paneer'] },
  cheese:       { cal: 402, prot: 25.0, unit: 20,  aliases: ['cheddar','processed cheese','cheese slice'] },
  butter:       { cal: 717, prot: 0.9,  unit: 10,  aliases: ['makhan'] },
  ghee:         { cal: 900, prot: 0.0,  unit: 10,  aliases: ['clarified butter','desi ghee'] },
  whey:         { cal: 120, prot: 24.0, unit: 30,  aliases: ['whey protein','protein shake','protein powder','whey shake'] },

  // EGGS
  egg:          { cal: 155, prot: 13.0, unit: 50,  aliases: ['eggs','whole egg','boiled egg','fried egg','scrambled egg','anda'] },
  egg_white:    { cal: 52,  prot: 10.9, unit: 33,  aliases: ['egg whites','egg white'] },

  // MEAT & FISH
  chicken_breast:{ cal: 165, prot: 31.0, unit: 150, aliases: ['chicken','grilled chicken','boiled chicken','chicken breast'] },
  chicken_leg:  { cal: 215, prot: 27.0, unit: 120, aliases: ['chicken leg piece','drumstick'] },
  mutton:       { cal: 294, prot: 25.6, unit: 150, aliases: ['lamb','goat meat','gosht'] },
  fish:         { cal: 136, prot: 24.0, unit: 150, aliases: ['rohu','catla','pomfret','tilapia','grilled fish'] },
  salmon:       { cal: 208, prot: 20.0, unit: 150, aliases: ['salmon fillet'] },
  tuna:         { cal: 132, prot: 28.0, unit: 150, aliases: ['canned tuna','tuna fish'] },
  prawn:        { cal: 99,  prot: 24.0, unit: 100, aliases: ['prawns','shrimp','jhinga'] },

  // INDIAN DISHES
  dal_rice:     { cal: 246, prot: 11.7, unit: 300, aliases: ['dal chawal'] },
  rajma_chawal: { cal: 290, prot: 12.0, unit: 300, aliases: ['rajma rice'] },
  khichdi:      { cal: 130, prot: 5.0,  unit: 200, aliases: [] },
  biryani:      { cal: 200, prot: 10.0, unit: 250, aliases: ['chicken biryani','veg biryani','mutton biryani'] },
  sambar:       { cal: 50,  prot: 2.5,  unit: 200, aliases: [] },
  sabzi:        { cal: 80,  prot: 2.0,  unit: 150, aliases: ['vegetable curry','mixed veg','sabji'] },
  curry:        { cal: 150, prot: 8.0,  unit: 200, aliases: ['chicken curry','paneer curry','veg curry'] },
  aloo_gobi:    { cal: 95,  prot: 2.5,  unit: 200, aliases: ['potato cauliflower'] },
  palak_paneer: { cal: 180, prot: 9.0,  unit: 200, aliases: [] },
  chole:        { cal: 180, prot: 9.0,  unit: 200, aliases: ['chana masala'] },

  // SNACKS
  biscuit:      { cal: 450, prot: 6.5,  unit: 12,  aliases: ['biscuits','cookie','cookies','parle-g','marie'] },
  namkeen:      { cal: 480, prot: 7.0,  unit: 30,  aliases: ['mixture','chivda','sev','bhujia'] },
  samosa:       { cal: 262, prot: 4.5,  unit: 100, aliases: [] },
  vada:         { cal: 196, prot: 4.5,  unit: 60,  aliases: ['medu vada','batata vada'] },
  chips:        { cal: 536, prot: 7.0,  unit: 30,  aliases: ['crisps','lays','potato chips'] },
  peanut_butter:{ cal: 588, prot: 25.0, unit: 16,  aliases: ['pb'] },

  // BEVERAGES
  tea:          { cal: 30,  prot: 0.5,  unit: 200, aliases: ['chai','milk tea','masala chai'] },
  coffee:       { cal: 12,  prot: 0.7,  unit: 200, aliases: ['black coffee','espresso','americano'] },
  juice:        { cal: 45,  prot: 0.5,  unit: 200, aliases: ['fruit juice','orange juice','apple juice'] },
  coconut_water:{ cal: 19,  prot: 0.7,  unit: 240, aliases: ['nariyal paani','coconut water'] },

  // OILS
  oil:          { cal: 884, prot: 0.0,  unit: 10,  aliases: ['cooking oil','mustard oil','sunflower oil','olive oil','tel'] },
};

// ═══════════════════════════════════════════════════════════
//  UNIT PARSERS
//  Converts "6 almonds" → {quantity: 6, food: "almond", unit: "piece"}
// ═══════════════════════════════════════════════════════════

const UNIT_PATTERNS = [
  // Count-based
  { pattern: /(\d+(?:\.\d+)?)\s*(?:nos?\.?|pieces?|pc\.?|count|numbers?)?\s+(.+)/i, type: 'count' },
  // Weight
  { pattern: /(\d+(?:\.\d+)?)\s*(?:kg|kgs)\s+(.+)/i, type: 'kg' },
  { pattern: /(\d+(?:\.\d+)?)\s*(?:g|gm|grams?)\s+(.+)/i, type: 'grams' },
  // Volume
  { pattern: /(\d+(?:\.\d+)?)\s*(?:ml|milliliters?)\s+(.+)/i, type: 'ml' },
  { pattern: /(\d+(?:\.\d+)?)\s*(?:l|liters?|litres?)\s+(.+)/i, type: 'liters' },
  // Cups/spoons
  { pattern: /(\d+(?:\.\d+)?)\s*(?:cups?)\s+(.+)/i, type: 'cup' },
  { pattern: /(\d+(?:\.\d+)?)\s*(?:tbsp|tablespoons?)\s+(.+)/i, type: 'tbsp' },
  { pattern: /(\d+(?:\.\d+)?)\s*(?:tsp|teaspoons?)\s+(.+)/i, type: 'tsp' },
  // Portions
  { pattern: /(\d+(?:\.\d+)?)\s*(?:bowl|bowls?|katori)\s+(.+)/i, type: 'bowl' },
  { pattern: /(\d+(?:\.\d+)?)\s*(?:plate|plates?|thali)\s+(.+)/i, type: 'plate' },
  { pattern: /(\d+(?:\.\d+)?)\s*(?:slice|slices?|piece)\s+(.+)/i, type: 'slice' },
  { pattern: /(\d+(?:\.\d+)?)\s*(?:glass|glasses?)\s+(.+)/i, type: 'glass' },
  // Default: number + food
  { pattern: /(\d+(?:\.\d+)?)\s+(.+)/i, type: 'count' },
];

const UNIT_TO_GRAMS = {
  grams: 1,
  kg: 1000,
  liters: 1000,
  ml: 1,
  cup: 240,
  tbsp: 15,
  tsp: 5,
  bowl: 200,
  plate: 300,
  glass: 250,
  slice: null, // handled per food
  count: null, // handled per food (unit_weight)
};

// ═══════════════════════════════════════════════════════════
//  FUZZY MATCHER
//  Finds best DB match for any food string
// ═══════════════════════════════════════════════════════════

function findFood(query) {
  const q = query.toLowerCase().trim();

  // Direct key match
  if (NUTRITION_DB[q]) return { key: q, data: NUTRITION_DB[q], confidence: 1.0 };

  // Alias match
  for (const [key, data] of Object.entries(NUTRITION_DB)) {
    if (data.aliases.some(a => q.includes(a) || a.includes(q))) {
      return { key, data, confidence: 0.95 };
    }
  }

  // Partial key match
  for (const [key, data] of Object.entries(NUTRITION_DB)) {
    if (q.includes(key) || key.includes(q)) {
      return { key, data, confidence: 0.85 };
    }
  }

  // Word-by-word match
  const words = q.split(/\s+/);
  for (const word of words) {
    if (word.length < 3) continue;
    for (const [key, data] of Object.entries(NUTRITION_DB)) {
      if (key.includes(word) || word.includes(key)) {
        return { key, data, confidence: 0.7 };
      }
      if (data.aliases.some(a => a.includes(word))) {
        return { key, data, confidence: 0.65 };
      }
    }
  }

  return null;
}

// ═══════════════════════════════════════════════════════════
//  MAIN ESTIMATOR
//  Input: "6 almonds and 2 walnuts" or "150g chicken with rice"
//  Output: { items[], total_cal, total_prot, confidence, explanation }
// ═══════════════════════════════════════════════════════════

function estimateNutrition(input) {
  // Split by common separators
  const parts = input.split(/\band\b|,|\+|&/i).map(s => s.trim()).filter(Boolean);
  const items = [];
  let totalCal = 0;
  let totalProt = 0;

  for (const part of parts) {
    const result = estimatePart(part.trim());
    if (result) {
      items.push(result);
      totalCal += result.cal;
      totalProt += result.prot;
    }
  }

  return { items, totalCal: Math.round(totalCal), totalProt: Math.round(totalProt * 10) / 10 };
}

function estimatePart(text) {
  // Try each unit pattern
  for (const { pattern, type } of UNIT_PATTERNS) {
    const match = text.match(pattern);
    if (!match) continue;

    const quantity = parseFloat(match[1]);
    const foodText = match[2].trim();
    const found = findFood(foodText);

    if (!found) continue;

    const { data } = found;
    let grams = 0;

    if (type === 'count') {
      grams = quantity * (data.unit || 100);
    } else if (type === 'kg') {
      grams = quantity * 1000;
    } else if (type === 'liters') {
      grams = quantity * 1000;
    } else if (UNIT_TO_GRAMS[type]) {
      grams = quantity * UNIT_TO_GRAMS[type];
    } else {
      grams = quantity * (data.unit || 100);
    }

    const cal = (data.cal / 100) * grams;
    const prot = (data.prot / 100) * grams;

    return {
      name: text,
      matched: found.key,
      confidence: found.confidence,
      grams: Math.round(grams),
      cal: Math.round(cal),
      prot: Math.round(prot * 10) / 10,
    };
  }

  // No number — assume 1 serving
  const found = findFood(text);
  if (found) {
    const grams = found.data.unit || 100;
    return {
      name: text,
      matched: found.key,
      confidence: found.confidence * 0.8,
      grams: Math.round(grams),
      cal: Math.round((found.data.cal / 100) * grams),
      prot: Math.round((found.data.prot / 100) * grams * 10) / 10,
    };
  }

  return null;
}

// Export for use in main app
window.NutritionDB = { estimateNutrition, findFood, NUTRITION_DB };
