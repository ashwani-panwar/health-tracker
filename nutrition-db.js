// ═══════════════════════════════════════════════════════════
//  VITALCORE NUTRITION DATABASE v4
//  Full micronutrient profiles + Indian food data from project
//  Schema per 100g: { cal, prot, carb, fat, fibre, sugar,
//    sodium, calcium, iron, vitC, folate,
//    sat_fat, unsat_fat, starch, potassium, magnesium,
//    vitA, vitB12, zinc, unit, aliases }
// ═══════════════════════════════════════════════════════════

const NUTRITION_DB = {

  // ─── NUTS & SEEDS ─────────────────────────────────────
  almond:         { cal:579, prot:21.2, carb:22, fat:50, fibre:12.5, sugar:4.4, sodium:1, calcium:264, iron:3.7, vitC:0, folate:44, sat_fat:3.8, potassium:733, magnesium:270, zinc:3.1, unit:1.2, aliases:['almonds','badam','badaam'] },
  walnut:         { cal:654, prot:15.2, carb:14, fat:65, fibre:6.7, sugar:2.6, sodium:2, calcium:98, iron:2.9, vitC:1.3, folate:98, sat_fat:6.1, potassium:441, magnesium:158, zinc:3.1, unit:3.5, aliases:['walnuts','akhrot'] },
  cashew:         { cal:553, prot:18.2, carb:30, fat:44, fibre:3.3, sugar:5.9, sodium:12, calcium:37, iron:6.7, vitC:0.5, folate:25, sat_fat:7.8, potassium:660, magnesium:292, zinc:5.8, unit:1.5, aliases:['cashews','kaju'] },
  pistachio:      { cal:560, prot:20.2, carb:28, fat:45, fibre:10.6, sugar:7.7, sodium:1, calcium:105, iron:3.9, vitC:5.6, folate:51, sat_fat:5.4, potassium:1025, magnesium:121, zinc:2.2, unit:1.0, aliases:['pistachios','pista'] },
  peanut:         { cal:567, prot:25.8, carb:16, fat:49, fibre:8.5, sugar:4.7, sodium:18, calcium:92, iron:4.6, vitC:0, folate:240, sat_fat:6.3, potassium:705, magnesium:168, zinc:3.3, unit:1.0, aliases:['peanuts','groundnut','moongphali','mungfali'] },
  chia_seed:      { cal:486, prot:16.5, carb:42, fat:31, fibre:34.4, sugar:0, sodium:16, calcium:631, iron:7.7, vitC:1.6, folate:49, sat_fat:3.3, potassium:407, magnesium:335, zinc:4.6, unit:3.0, aliases:['chia seeds','chia'] },
  flaxseed:       { cal:534, prot:18.3, carb:29, fat:42, fibre:27.3, sugar:1.6, sodium:30, calcium:255, iron:5.7, vitC:0.6, folate:87, sat_fat:3.7, potassium:813, magnesium:392, zinc:4.3, unit:2.5, aliases:['flax seed','alsi','flax'] },
  sunflower_seed: { cal:584, prot:20.8, carb:20, fat:51, fibre:8.6, sugar:2.6, sodium:9, calcium:78, iron:5.3, vitC:1.4, folate:227, sat_fat:4.5, potassium:645, magnesium:325, zinc:5.0, unit:3.5, aliases:['sunflower seeds'] },

  // ─── FRUITS ───────────────────────────────────────────
  apple:          { cal:52, prot:0.3, carb:14, fat:0.2, fibre:2.4, sugar:10.4, sodium:1, calcium:6, iron:0.1, vitC:4.6, folate:3, sat_fat:0, potassium:107, magnesium:5, zinc:0, unit:180, aliases:['apples','seb'] },
  banana:         { cal:89, prot:1.1, carb:23, fat:0.3, fibre:2.6, sugar:12.2, sodium:1, calcium:5, iron:0.3, vitC:8.7, folate:20, sat_fat:0.1, potassium:358, magnesium:27, zinc:0.2, unit:120, aliases:['bananas','kela'] },
  mango:          { cal:60, prot:0.8, carb:15, fat:0.4, fibre:1.6, sugar:13.7, sodium:1, calcium:11, iron:0.2, vitC:36.4, folate:43, sat_fat:0.1, potassium:168, magnesium:10, zinc:0.1, unit:200, aliases:['mangos','aam','keri'] },
  orange:         { cal:47, prot:0.9, carb:12, fat:0.1, fibre:2.4, sugar:9.4, sodium:0, calcium:40, iron:0.1, vitC:53.2, folate:30, sat_fat:0, potassium:181, magnesium:10, zinc:0.1, unit:150, aliases:['oranges','santra','narangi'] },
  grapes:         { cal:67, prot:0.6, carb:17, fat:0.4, fibre:0.9, sugar:16.3, sodium:2, calcium:10, iron:0.4, vitC:10.8, folate:2, sat_fat:0.1, potassium:191, magnesium:7, zinc:0.1, unit:5, aliases:['grape','angur'] },
  pomegranate:    { cal:83, prot:1.7, carb:19, fat:1.2, fibre:4.0, sugar:13.7, sodium:3, calcium:10, iron:0.3, vitC:10.2, folate:38, sat_fat:0.1, potassium:236, magnesium:12, zinc:0.4, unit:200, aliases:['anar'] },
  guava:          { cal:68, prot:2.6, carb:14, fat:1.0, fibre:5.4, sugar:8.9, sodium:2, calcium:18, iron:0.3, vitC:228, folate:49, sat_fat:0.3, potassium:417, magnesium:22, zinc:0.2, unit:100, aliases:['amrood'] },
  papaya:         { cal:43, prot:0.5, carb:11, fat:0.3, fibre:1.7, sugar:7.8, sodium:8, calcium:20, iron:0.3, vitC:60.9, folate:37, sat_fat:0.1, potassium:182, magnesium:21, zinc:0.1, unit:200, aliases:['papita'] },
  watermelon:     { cal:30, prot:0.6, carb:8, fat:0.2, fibre:0.4, sugar:6.2, sodium:1, calcium:7, iron:0.2, vitC:8.1, folate:3, sat_fat:0, potassium:112, magnesium:10, zinc:0.1, unit:300, aliases:['tarbuz'] },
  date:           { cal:277, prot:1.8, carb:75, fat:0.2, fibre:6.7, sugar:66.5, sodium:1, calcium:64, iron:0.9, vitC:0, folate:15, sat_fat:0, potassium:696, magnesium:54, zinc:0.4, unit:7, aliases:['dates','khajoor','khajur'] },
  strawberry:     { cal:32, prot:0.7, carb:7.7, fat:0.3, fibre:2.0, sugar:4.9, sodium:1, calcium:16, iron:0.4, vitC:58.8, folate:24, sat_fat:0, potassium:153, magnesium:13, zinc:0.1, unit:12, aliases:['strawberries'] },

  // ─── VEGETABLES ───────────────────────────────────────
  spinach:        { cal:23, prot:2.9, carb:3.6, fat:0.4, fibre:2.2, sugar:0.4, sodium:79, calcium:99, iron:2.7, vitC:28.1, folate:194, sat_fat:0.1, potassium:558, magnesium:79, zinc:0.5, unit:30, aliases:['palak'] },
  broccoli:       { cal:34, prot:2.8, carb:7, fat:0.4, fibre:2.6, sugar:1.7, sodium:33, calcium:47, iron:0.7, vitC:89.2, folate:63, sat_fat:0.1, potassium:316, magnesium:21, zinc:0.4, unit:150, aliases:[] },
  carrot:         { cal:41, prot:0.9, carb:10, fat:0.2, fibre:2.8, sugar:4.7, sodium:69, calcium:33, iron:0.3, vitC:5.9, folate:19, sat_fat:0, potassium:320, magnesium:12, zinc:0.2, unit:80, aliases:['carrots','gajar'] },
  potato:         { cal:77, prot:2.0, carb:17, fat:0.1, fibre:2.2, sugar:0.8, sodium:6, calcium:12, iron:0.8, vitC:19.7, folate:15, sat_fat:0, potassium:421, magnesium:23, zinc:0.3, unit:150, aliases:['potatoes','aloo'] },
  tomato:         { cal:18, prot:0.9, carb:3.9, fat:0.2, fibre:1.2, sugar:2.6, sodium:5, calcium:10, iron:0.3, vitC:13.7, folate:15, sat_fat:0, potassium:237, magnesium:11, zinc:0.2, unit:120, aliases:['tomatoes','tamatar'] },
  onion:          { cal:40, prot:1.1, carb:9.3, fat:0.1, fibre:1.7, sugar:4.2, sodium:4, calcium:23, iron:0.2, vitC:7.4, folate:19, sat_fat:0, potassium:146, magnesium:10, zinc:0.2, unit:110, aliases:['onions','pyaz'] },
  cauliflower:    { cal:25, prot:1.9, carb:5, fat:0.3, fibre:2.0, sugar:1.9, sodium:30, calcium:22, iron:0.4, vitC:48.2, folate:57, sat_fat:0.1, potassium:299, magnesium:15, zinc:0.3, unit:200, aliases:['gobhi','gobi','phool gobhi'] },
  cucumber:       { cal:15, prot:0.7, carb:3.6, fat:0.1, fibre:0.5, sugar:1.7, sodium:2, calcium:16, iron:0.3, vitC:2.8, folate:7, sat_fat:0, potassium:147, magnesium:13, zinc:0.2, unit:200, aliases:['kheera'] },
  peas:           { cal:81, prot:5.4, carb:14, fat:0.4, fibre:5.1, sugar:5.7, sodium:5, calcium:25, iron:1.5, vitC:40, folate:65, sat_fat:0.1, potassium:244, magnesium:33, zinc:1.2, unit:10, aliases:['matar','green peas'] },
  beetroot:       { cal:43, prot:1.6, carb:9.6, fat:0.2, fibre:2.8, sugar:6.8, sodium:78, calcium:16, iron:0.8, vitC:4.9, folate:109, sat_fat:0, potassium:325, magnesium:23, zinc:0.4, unit:150, aliases:['beet','chukandar'] },

  // ─── GRAINS & CEREALS ─────────────────────────────────
  rice:           { cal:130, prot:2.7, carb:28, fat:0.3, fibre:0.4, sugar:0, sodium:1, calcium:10, iron:0.2, vitC:0, folate:8, sat_fat:0.1, starch:25, potassium:35, magnesium:12, zinc:0.5, unit:200, aliases:['white rice','chawal','cooked rice','plain rice'] },
  brown_rice:     { cal:112, prot:2.6, carb:23, fat:0.9, fibre:1.8, sugar:0.4, sodium:5, calcium:10, iron:0.5, vitC:0, folate:9, sat_fat:0.2, starch:20, potassium:79, magnesium:39, zinc:0.6, unit:200, aliases:['brown rice'] },
  roti:           { cal:120, prot:3.5, carb:23, fat:2.0, fibre:3.4, sugar:0.5, sodium:5, calcium:20, iron:1.2, vitC:0, folate:12, sat_fat:0.3, starch:18, potassium:110, magnesium:30, zinc:0.8, unit:35, aliases:['chapati','phulka','wheat roti','whole wheat roti','chapatti'] },
  paratha:        { cal:260, prot:5.0, carb:32, fat:12, fibre:3.5, sugar:1.0, sodium:180, calcium:25, iron:1.8, vitC:0, folate:15, sat_fat:2.5, starch:27, potassium:130, magnesium:35, zinc:1.0, unit:80, aliases:['parotha','parantha'] },
  bread:          { cal:265, prot:9.0, carb:49, fat:3.2, fibre:2.7, sugar:5, sodium:491, calcium:177, iron:3.6, vitC:0, folate:50, sat_fat:0.7, starch:41, potassium:115, magnesium:23, zinc:0.8, unit:30, aliases:['white bread','bread slice','toast','double roti'] },
  brown_bread:    { cal:247, prot:13.0, carb:41, fat:3.5, fibre:6.0, sugar:6, sodium:450, calcium:161, iron:2.5, vitC:0, folate:50, sat_fat:0.7, starch:32, potassium:248, magnesium:77, zinc:2.0, unit:30, aliases:['whole wheat bread','brown bread slice','wholegrain bread'] },
  oats:           { cal:389, prot:16.9, carb:66, fat:6.9, fibre:10.6, sugar:0, sodium:2, calcium:54, iron:4.7, vitC:0, folate:56, sat_fat:1.2, starch:53, potassium:429, magnesium:177, zinc:4.0, unit:40, aliases:['oatmeal','rolled oats','quaker','oat'] },
  muesli:         { cal:380, prot:9.0, carb:70, fat:6.3, fibre:7.5, sugar:18, sodium:200, calcium:60, iron:4.5, vitC:0, folate:45, sat_fat:1.2, starch:45, potassium:380, magnesium:110, zinc:2.5, unit:80, aliases:['granola','museli','muesli','cereal mix'] },
  poha:           { cal:110, prot:2.5, carb:24, fat:0.5, fibre:0.5, sugar:0.5, sodium:400, calcium:10, iron:3.5, vitC:7, folate:12, sat_fat:0.1, starch:22, potassium:90, magnesium:25, zinc:0.8, unit:100, aliases:['flattened rice','beaten rice','chiwda','aval'] },
  upma:           { cal:147, prot:3.3, carb:16, fat:7.5, fibre:3.2, sugar:1.3, sodium:102, calcium:22, iron:1.1, vitC:4.6, folate:15, sat_fat:1.0, starch:13, potassium:120, magnesium:30, zinc:0.5, unit:150, aliases:['suji upma','rava upma','semolina upma'] },
  idli:           { cal:138, prot:4.6, carb:28, fat:0.3, fibre:2.3, sugar:0.3, sodium:101, calcium:8, iron:0.7, vitC:0, folate:3, sat_fat:0.1, starch:25, potassium:90, magnesium:18, zinc:0.5, unit:40, aliases:['idly'] },
  dosa:           { cal:165, prot:3.3, carb:20, fat:7.8, fibre:2.5, sugar:1.3, sodium:191, calcium:16, iron:0.8, vitC:14, folate:36, sat_fat:1.0, starch:17, potassium:95, magnesium:22, zinc:0.5, unit:80, aliases:['plain dosa','masala dosa'] },
  pasta:          { cal:131, prot:5.0, carb:25, fat:1.1, fibre:1.8, sugar:0.6, sodium:6, calcium:7, iron:0.5, vitC:0, folate:18, sat_fat:0.2, starch:23, potassium:44, magnesium:18, zinc:0.5, unit:200, aliases:['spaghetti','noodles','macaroni'] },
  quinoa:         { cal:120, prot:4.4, carb:21, fat:1.9, fibre:2.8, sugar:0.9, sodium:7, calcium:17, iron:1.5, vitC:0, folate:42, sat_fat:0.2, potassium:172, magnesium:64, zinc:1.1, unit:185, aliases:[] },
  naan:           { cal:286, prot:8.0, carb:52, fat:5.0, fibre:1.9, sugar:5.6, sodium:326, calcium:88, iron:1.3, vitC:0.2, folate:8, sat_fat:1.0, starch:44, potassium:130, magnesium:30, zinc:0.8, unit:90, aliases:['tandoori roti'] },

  // ─── PULSES & LEGUMES ─────────────────────────────────
  dal:            { cal:116, prot:9.0, carb:20, fat:0.4, fibre:7.9, sugar:1.5, sodium:151, calcium:19, iron:1.2, vitC:1.9, folate:51, sat_fat:0.1, starch:15, potassium:300, magnesium:45, zinc:1.2, unit:150, aliases:['lentils','toor dal','moong dal','masoor dal','chana dal','yellow dal','dal tadka','arhar dal'] },
  rajma:          { cal:127, prot:8.7, carb:22, fat:0.5, fibre:6.4, sugar:0.3, sodium:355, calcium:48, iron:2.3, vitC:16.3, folate:112, sat_fat:0.1, starch:17, potassium:305, magnesium:45, zinc:1.1, unit:150, aliases:['kidney beans','red kidney beans','rajma curry'] },
  chana:          { cal:164, prot:8.9, carb:27, fat:2.6, fibre:7.6, sugar:4.8, sodium:358, calcium:49, iron:1.8, vitC:16, folate:172, sat_fat:0.3, starch:18, potassium:291, magnesium:48, zinc:1.5, unit:150, aliases:['chickpeas','chole','kala chana','white chana','channa','kabuli chana'] },
  moong:          { cal:105, prot:7.0, carb:19, fat:0.4, fibre:7.6, sugar:2.0, sodium:124, calcium:27, iron:1.4, vitC:11, folate:55, sat_fat:0.1, starch:13, potassium:240, magnesium:48, zinc:0.8, unit:150, aliases:['moong beans','green gram','sprouted moong','dhuli moong'] },
  soybean:        { cal:173, prot:16.6, carb:9.9, fat:9.0, fibre:6.0, sugar:3.0, sodium:353, calcium:65, iron:2.8, vitC:15, folate:104, sat_fat:1.3, potassium:450, magnesium:65, zinc:1.2, unit:150, aliases:['soybeans','soya'] },

  // ─── DAIRY ────────────────────────────────────────────
  milk:           { cal:61, prot:3.2, carb:4.8, fat:3.3, fibre:0, sugar:4.8, sodium:43, calcium:113, iron:0.1, vitC:1.0, folate:5, sat_fat:2.1, potassium:132, magnesium:10, zinc:0.4, vitB12:0.4, unit:200, aliases:['whole milk','full fat milk','cow milk','doodh','toned milk'] },
  skim_milk:      { cal:35, prot:3.4, carb:5.0, fat:0.1, fibre:0, sugar:5.0, sodium:52, calcium:125, iron:0.1, vitC:1.5, folate:5, sat_fat:0.1, potassium:150, magnesium:11, zinc:0.4, vitB12:0.5, unit:200, aliases:['skimmed milk','double toned milk','low fat milk'] },
  curd:           { cal:98, prot:11.0, carb:4.7, fat:3.4, fibre:0, sugar:4.7, sodium:195, calcium:163, iron:0.1, vitC:1.0, folate:18, sat_fat:2.2, potassium:155, magnesium:17, zinc:0.6, vitB12:0.7, unit:200, aliases:['yogurt','dahi','greek yogurt','hung curd','plain curd'] },
  paneer:         { cal:265, prot:18.3, carb:3.4, fat:20.8, fibre:0, sugar:2.7, sodium:28, calcium:480, iron:0.2, vitC:0, folate:10, sat_fat:13.2, potassium:90, magnesium:22, zinc:1.5, vitB12:0.9, unit:100, aliases:['cottage cheese','fresh paneer','paneer tikka'] },
  cheese:         { cal:402, prot:25.0, carb:1.3, fat:33.1, fibre:0, sugar:0.5, sodium:621, calcium:721, iron:0.7, vitC:0, folate:18, sat_fat:21.1, potassium:98, magnesium:28, zinc:3.1, vitB12:1.1, unit:20, aliases:['cheddar','processed cheese','cheese slice'] },
  butter:         { cal:717, prot:0.9, carb:0.1, fat:81, fibre:0, sugar:0.1, sodium:576, calcium:24, iron:0, vitC:0, folate:3, sat_fat:51.4, potassium:24, magnesium:2, zinc:0.1, unit:10, aliases:['makhan','salted butter'] },
  ghee:           { cal:900, prot:0, carb:0, fat:99.5, fibre:0, sugar:0, sodium:0, calcium:1, iron:0, vitC:0, folate:0, sat_fat:61.9, potassium:5, magnesium:0, zinc:0, unit:10, aliases:['clarified butter','desi ghee'] },
  whey:           { cal:120, prot:24.0, carb:5.0, fat:1.5, fibre:0, sugar:3.0, sodium:130, calcium:130, iron:0.5, vitC:0, folate:10, sat_fat:0.5, potassium:200, magnesium:40, zinc:1.0, vitB12:1.0, unit:30, aliases:['whey protein','protein shake','protein powder','whey shake'] },
  lassi:          { cal:36, prot:1.3, carb:6.5, fat:0.7, fibre:0, sugar:6.5, sodium:65, calcium:48, iron:0.04, vitC:1.0, folate:18, sat_fat:0.4, potassium:155, magnesium:8, zinc:0.3, unit:200, aliases:['sweet lassi','namkeen lassi','salted lassi','meethi lassi'] },
  kheer:          { cal:148, prot:4.4, carb:23, fat:4.9, fibre:0.2, sugar:12.6, sodium:26, calcium:95, iron:0.5, vitC:3.2, folate:11, sat_fat:3.1, potassium:160, magnesium:20, zinc:0.5, unit:150, aliases:['rice kheer','payasam'] },

  // ─── EGGS ─────────────────────────────────────────────
  egg:            { cal:155, prot:13.0, carb:1.1, fat:11, fibre:0, sugar:1.1, sodium:124, calcium:56, iron:1.8, vitC:0, folate:47, sat_fat:3.3, potassium:126, magnesium:12, zinc:1.3, vitB12:1.1, unit:50, aliases:['eggs','whole egg','boiled egg','fried egg','scrambled egg','anda','ubla anda'] },
  egg_white:      { cal:52, prot:10.9, carb:0.7, fat:0.2, fibre:0, sugar:0.7, sodium:166, calcium:7, iron:0.1, vitC:0, folate:4, sat_fat:0, potassium:163, magnesium:11, zinc:0.1, unit:33, aliases:['egg whites','egg white'] },

  // ─── MEAT & POULTRY ───────────────────────────────────
  chicken_breast: { cal:165, prot:31.0, carb:0, fat:3.6, fibre:0, sugar:0, sodium:74, calcium:15, iron:1.0, vitC:0, folate:4, sat_fat:1.0, potassium:256, magnesium:29, zinc:1.0, vitB12:0.3, unit:150, aliases:['chicken','grilled chicken','boiled chicken','chicken breast','chicken tikka','tandoori chicken'] },
  chicken_curry:  { cal:150, prot:10.0, carb:5.4, fat:9.7, fibre:1.0, sugar:2.9, sodium:120, calcium:27, iron:0.9, vitC:2.1, folate:25, sat_fat:2.5, potassium:200, magnesium:25, zinc:0.9, unit:200, aliases:['chicken masala','chicken gravy','murgh curry','butter chicken','chicken korma'] },
  chicken_leg:    { cal:215, prot:27.0, carb:0, fat:11.2, fibre:0, sugar:0, sodium:95, calcium:14, iron:1.3, vitC:0, folate:6, sat_fat:3.0, potassium:240, magnesium:25, zinc:3.2, vitB12:0.4, unit:120, aliases:['chicken leg piece','drumstick','chicken thigh'] },
  mutton:         { cal:294, prot:25.6, carb:0, fat:21, fibre:0, sugar:0, sodium:72, calcium:26, iron:2.7, vitC:0, folate:7, sat_fat:8.8, potassium:270, magnesium:24, zinc:4.2, vitB12:2.5, unit:150, aliases:['lamb','goat meat','gosht','mutton curry'] },
  fish:           { cal:136, prot:24.0, carb:0, fat:4.1, fibre:0, sugar:0, sodium:185, calcium:52, iron:1.1, vitC:22, folate:40, sat_fat:0.8, potassium:350, magnesium:32, zinc:0.6, vitB12:3.0, unit:150, aliases:['rohu','catla','pomfret','tilapia','grilled fish','fish curry'] },
  salmon:         { cal:208, prot:20.0, carb:0, fat:13.4, fibre:0, sugar:0, sodium:59, calcium:12, iron:0.8, vitC:3.9, folate:26, sat_fat:3.1, potassium:363, magnesium:29, zinc:0.6, vitB12:3.2, unit:150, aliases:['salmon fillet'] },
  tuna:           { cal:132, prot:28.0, carb:0, fat:1.2, fibre:0, sugar:0, sodium:39, calcium:16, iron:1.6, vitC:1.2, folate:4, sat_fat:0.3, potassium:444, magnesium:64, zinc:0.8, vitB12:9.4, unit:150, aliases:['canned tuna','tuna fish'] },
  prawn:          { cal:99, prot:24.0, carb:0.9, fat:0.3, fibre:0, sugar:0, sodium:111, calcium:64, iron:0.5, vitC:2.5, folate:3, sat_fat:0.1, potassium:259, magnesium:37, zinc:1.3, vitB12:1.2, unit:100, aliases:['prawns','shrimp','jhinga'] },

  // ─── INDIAN DISHES (from project database) ────────────
  dal_rice:       { cal:57, prot:1.7, carb:10, fat:1.0, fibre:0.9, sugar:0.1, sodium:37, calcium:5, iron:0.3, vitC:0.8, folate:26, sat_fat:0.2, starch:9, unit:300, aliases:['dal chawal','khichdi plain','plain khichdi'] },
  rajma_chawal:   { cal:144, prot:6.0, carb:22, fat:3.3, fibre:4.5, sugar:1.4, sodium:270, calcium:40, iron:1.9, vitC:10, folate:90, sat_fat:0.6, starch:17, unit:300, aliases:['rajma rice','rajma chawal'] },
  chole:          { cal:163, prot:6.1, carb:20, fat:6.8, fibre:4.7, sugar:4.8, sodium:358, calcium:31, iron:1.8, vitC:16, folate:184, sat_fat:0.9, unit:200, aliases:['chana masala','chhole','chickpeas curry'] },
  sambar:         { cal:97, prot:3.4, carb:11, fat:4.4, fibre:3.5, sugar:3.3, sodium:160, calcium:30, iron:1.2, vitC:20, folate:68, sat_fat:0.8, unit:200, aliases:['sambar'] },
  palak_paneer:   { cal:154, prot:7.5, carb:5.5, fat:11.5, fibre:2.7, sugar:2.0, sodium:175, calcium:220, iron:2.3, vitC:20, folate:80, sat_fat:6.5, unit:200, aliases:['spinach paneer'] },
  aloo_gobi:      { cal:106, prot:1.9, carb:6.0, fat:8.1, fibre:3.0, sugar:0.4, sodium:255, calcium:23, iron:1.1, vitC:61, folate:56, sat_fat:1.5, unit:200, aliases:['potato cauliflower','aloo gobhi'] },
  biryani:        { cal:200, prot:10.0, carb:25, fat:6.5, fibre:1.5, sugar:1.5, sodium:450, calcium:35, iron:1.2, vitC:4, folate:38, sat_fat:1.8, unit:250, aliases:['chicken biryani','veg biryani','mutton biryani','rice biryani'] },
  pav_bhaji:      { cal:160, prot:4.0, carb:22, fat:6.5, fibre:3.0, sugar:4.0, sodium:380, calcium:45, iron:1.5, vitC:25, folate:30, sat_fat:2.0, unit:200, aliases:['pavbhaji','pao bhaji'] },
  poha_dish:      { cal:295, prot:6.1, carb:35, fat:14, fibre:3.7, sugar:0.9, sodium:377, calcium:38, iron:3.0, vitC:7, folate:12, sat_fat:2.0, unit:150, aliases:['poha dish','vegetable poha'] },
  dhokla:         { cal:216, prot:13.5, carb:31, fat:5.3, fibre:5.0, sugar:4.8, sodium:376, calcium:123, iron:1.4, vitC:0.7, folate:40, sat_fat:0.8, unit:100, aliases:['besan dhokla','khaman'] },
  uttapam:        { cal:256, prot:6.2, carb:36, fat:9.0, fibre:4.4, sugar:1.5, sodium:229, calcium:41, iron:1.2, vitC:6, folate:19, sat_fat:1.5, unit:100, aliases:['onion uttapam','vegetable uttapam'] },

  // ─── SNACKS & STREET FOOD ─────────────────────────────
  samosa:         { cal:308, prot:4.5, carb:32, fat:18, fibre:2.5, sugar:1.5, sodium:420, calcium:20, iron:1.2, vitC:10, folate:15, sat_fat:4.5, unit:100, aliases:['aloo samosa'] },
  vada:           { cal:196, prot:4.5, carb:22, fat:10, fibre:2.0, sugar:0.5, sodium:310, calcium:30, iron:1.0, vitC:3, folate:25, sat_fat:2.5, unit:60, aliases:['medu vada','batata vada','wada'] },
  pakora:         { cal:310, prot:7.0, carb:28, fat:19, fibre:2.5, sugar:1.5, sodium:350, calcium:45, iron:2.0, vitC:5, folate:30, sat_fat:4.0, unit:60, aliases:['pakoda','bhajiya','fritters'] },
  chips:          { cal:536, prot:7.0, carb:53, fat:34, fibre:4.8, sugar:0.3, sodium:525, calcium:14, iron:1.0, vitC:19.7, folate:0, sat_fat:3.0, unit:30, aliases:['crisps','lays','potato chips','wafers'] },
  biscuit:        { cal:450, prot:6.5, carb:65, fat:19, fibre:2.0, sugar:22, sodium:450, calcium:43, iron:1.0, vitC:0, folate:2, sat_fat:5.0, unit:12, aliases:['biscuits','cookie','cookies','parle-g','marie','cracker'] },
  peanut_butter:  { cal:588, prot:25.0, carb:20, fat:50, fibre:5.0, sugar:9.0, sodium:459, calcium:49, iron:1.9, vitC:0, folate:87, sat_fat:10.3, potassium:558, magnesium:168, zinc:2.9, unit:16, aliases:['pb','peanut butter'] },
  namkeen:        { cal:480, prot:7.0, carb:55, fat:26, fibre:3.0, sugar:2.0, sodium:850, calcium:30, iron:1.5, vitC:0, folate:10, sat_fat:4.0, unit:30, aliases:['mixture','chivda','sev','bhujia','chanachur'] },

  // ─── BEVERAGES ────────────────────────────────────────
  chai:           { cal:16, prot:0.4, carb:2.6, fat:0.5, fibre:0, sugar:2.6, sodium:3, calcium:14, iron:0.02, vitC:0.5, folate:2, sat_fat:0.3, unit:200, aliases:['tea','garam chai','masala chai','milk tea','adrak chai','hot tea'] },
  coffee_milk:    { cal:25, prot:0.6, carb:3.7, fat:0.8, fibre:0, sugar:3.6, sodium:5, calcium:21, iron:0.1, vitC:1.5, folate:6, sat_fat:0.5, unit:200, aliases:['coffee','black coffee','espresso','americano','instant coffee','filter coffee'] },
  coconut_water:  { cal:19, prot:0.7, carb:3.7, fat:0.2, fibre:1.1, sugar:2.6, sodium:105, calcium:24, iron:0.3, vitC:2.4, folate:3, sat_fat:0.2, potassium:250, magnesium:25, zinc:0.1, unit:240, aliases:['nariyal paani','coconut water','tender coconut'] },
  juice:          { cal:45, prot:0.5, carb:11, fat:0.1, fibre:0.2, sugar:9, sodium:3, calcium:11, iron:0.2, vitC:40, folate:20, sat_fat:0, unit:200, aliases:['fruit juice','orange juice','apple juice','fresh juice'] },
  nimbu_pani:     { cal:15, prot:0.1, carb:4.0, fat:0, fibre:0, sugar:3.5, sodium:28, calcium:3, iron:0.1, vitC:9, folate:2, sat_fat:0, unit:200, aliases:['lemonade','lemon water','shikanjvi','nimbu paani'] },

  // ─── OILS & FATS ──────────────────────────────────────
  oil:            { cal:884, prot:0, carb:0, fat:100, fibre:0, sugar:0, sodium:0, calcium:1, iron:0, vitC:0, folate:0, sat_fat:14, unit:10, aliases:['cooking oil','mustard oil','sunflower oil','olive oil','tel','refined oil'] },

  // ─── SWEETENERS ───────────────────────────────────────
  sugar:          { cal:387, prot:0, carb:100, fat:0, fibre:0, sugar:100, sodium:1, calcium:1, iron:0.1, vitC:0, folate:0, sat_fat:0, unit:5, aliases:['white sugar','cheeni','shakkar','table sugar'] },
  jaggery:        { cal:383, prot:0.4, carb:98, fat:0.1, fibre:0, sugar:97, sodium:30, calcium:80, iron:11, vitC:7.0, folate:0, sat_fat:0, potassium:1056, magnesium:70, zinc:0.3, unit:10, aliases:['gur','gud','brown sugar','raw sugar'] },
  honey:          { cal:304, prot:0.3, carb:82, fat:0, fibre:0.2, sugar:82, sodium:4, calcium:6, iron:0.4, vitC:0.5, folate:2, sat_fat:0, potassium:52, magnesium:2, zinc:0.2, unit:15, aliases:['shehad'] },
};

// ═══════════════════════════════════════════════════════════
//  SANITY LIMITS — upper bounds per meal (per 100g basis)
//  A typical human meal: 200-800 kcal
//  Absolute max for ANY single logged item: 4000 kcal
// ═══════════════════════════════════════════════════════════
const MAX_SINGLE_ITEM_KCAL = 4000;
const MAX_GRAMS_PER_ITEM   = 2500; // 2.5 kg — no single food item exceeds this realistically

// ═══════════════════════════════════════════════════════════
//  UNIT WORD NORMALISER
// ═══════════════════════════════════════════════════════════
const UNIT_WORDS = /\b(grams?|gm|kgs?|kilograms?|ml|milliliters?|liters?|litres?|cups?|tbsp|tablespoons?|tsp|teaspoons?|bowls?|katori|plates?|thali|slices?|glasses?|pieces?|nos?\.?|pc\.?|count|numbers?|servings?)\b/gi;

function parseUnit(text) {
  const t = text.trim();
  // NUMBER + UNIT + FOOD
  const p1 = t.match(/^(\d+(?:\.\d+)?)\s*(g|gm|grams?|kg|kgs?|ml|l\b|liters?|litres?|cups?|tbsp|tablespoons?|tsp|teaspoons?|bowls?|katori|glasses?|plates?)\s+(.+)/i);
  if (p1) return { qty: parseFloat(p1[1]), unit: p1[2].toLowerCase(), food: p1[3].trim() };
  // NUMBER + FOOD (count-based)
  const p2 = t.match(/^(\d+(?:\.\d+)?)\s+(.+)/);
  if (p2) return { qty: parseFloat(p2[1]), unit: 'count', food: p2[2].trim() };
  // FOOD + NUMBER + UNIT
  const p3 = t.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*(g|gm|grams?|kg|ml|l\b)\s*$/i);
  if (p3) return { qty: parseFloat(p3[2]), unit: p3[3].toLowerCase(), food: p3[1].trim() };
  return { qty: 1, unit: 'serving', food: t };
}

function unitToGrams(qty, unit, foodData) {
  const u = unit.toLowerCase();
  if (u.startsWith('g') || u === 'gm') return qty;
  if (u.startsWith('kg'))              return qty * 1000;
  if (u === 'ml')                      return qty;
  if (u.startsWith('l') && u.length <= 6) return qty * 1000;
  if (u.startsWith('cup'))             return qty * 240;
  if (u.startsWith('tbsp') || u.startsWith('table')) return qty * 15;
  if (u.startsWith('tsp')  || u.startsWith('tea'))   return qty * 5;
  if (u.startsWith('bowl') || u === 'katori') return qty * 200;
  if (u.startsWith('glass'))           return qty * 250;
  if (u.startsWith('plate') || u === 'thali') return qty * 300;
  if (u.startsWith('slice'))           return qty * (foodData.unit || 30);
  if (u === 'count')                   return qty * (foodData.unit || 100);
  if (u === 'serving')                 return foodData.unit || 100;
  return qty * (foodData.unit || 100);
}

// ═══════════════════════════════════════════════════════════
//  FUZZY FOOD MATCHER
// ═══════════════════════════════════════════════════════════
function findFood(query) {
  const q = query.toLowerCase().trim().replace(UNIT_WORDS, '').replace(/\s+/g, ' ').trim();
  if (!q || q.length < 2) return null;

  if (NUTRITION_DB[q]) return { key: q, data: NUTRITION_DB[q], confidence: 1.0 };
  const qk = q.replace(/\s+/g,'_');
  if (NUTRITION_DB[qk]) return { key: qk, data: NUTRITION_DB[qk], confidence: 1.0 };

  for (const [key, data] of Object.entries(NUTRITION_DB)) {
    if (data.aliases.some(a => a === q)) return { key, data, confidence: 0.98 };
  }
  for (const [key, data] of Object.entries(NUTRITION_DB)) {
    if (data.aliases.some(a => q.includes(a) || a.includes(q)))
      return { key, data, confidence: 0.9 };
  }
  for (const [key, data] of Object.entries(NUTRITION_DB)) {
    const k = key.replace(/_/g,' ');
    if (q.includes(k) || k.includes(q)) return { key, data, confidence: 0.85 };
  }
  const words = q.split(/\s+/).filter(w => w.length >= 3);
  for (const word of words) {
    for (const [key, data] of Object.entries(NUTRITION_DB)) {
      const k = key.replace(/_/g,' ');
      if (k.includes(word) || word.includes(k))
        return { key, data, confidence: 0.7 };
      if (data.aliases.some(a => a.includes(word)))
        return { key, data, confidence: 0.65 };
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════════
//  MAIN ESTIMATOR
// ═══════════════════════════════════════════════════════════
function estimateNutrition(input) {
  const parts = input.split(/\band\b|,|\+|&/i).map(s => s.trim()).filter(Boolean);
  const items = [];
  let totalCal = 0, totalProt = 0, totalCarb = 0, totalFat = 0, totalFibre = 0;
  let totalSodium = 0, totalCalcium = 0, totalIron = 0, totalVitC = 0;

  for (const part of parts) {
    const result = estimatePart(part);
    if (result) {
      items.push(result);
      totalCal    += result.cal;
      totalProt   += result.prot;
      totalCarb   += result.carb || 0;
      totalFat    += result.fat || 0;
      totalFibre  += result.fibre || 0;
      totalSodium += result.sodium || 0;
      totalCalcium+= result.calcium || 0;
      totalIron   += result.iron || 0;
      totalVitC   += result.vitC || 0;
    }
  }

  return {
    items,
    totalCal:     Math.round(totalCal),
    totalProt:    Math.round(totalProt * 10) / 10,
    totalCarb:    Math.round(totalCarb * 10) / 10,
    totalFat:     Math.round(totalFat * 10) / 10,
    totalFibre:   Math.round(totalFibre * 10) / 10,
    totalSodium:  Math.round(totalSodium),
    totalCalcium: Math.round(totalCalcium),
    totalIron:    Math.round(totalIron * 10) / 10,
    totalVitC:    Math.round(totalVitC * 10) / 10,
  };
}

function estimatePart(text) {
  const parsed = parseUnit(text);
  if (!parsed) return null;
  const found = findFood(parsed.food);
  if (!found) return null;

  const rawGrams = unitToGrams(parsed.qty, parsed.unit, found.data);
  const grams = Math.min(rawGrams, MAX_GRAMS_PER_ITEM);
  const d = found.data;
  const factor = grams / 100;

  const cal  = d.cal  * factor;
  const prot = d.prot * factor;

  // Sanity check calories
  if (cal > MAX_SINGLE_ITEM_KCAL) {
    return {
      name: text, matched: found.key, confidence: found.confidence,
      grams: Math.round(grams),
      cal: Math.round(cal), prot: Math.round(prot * 10) / 10,
      warning: `⚠ ${Math.round(cal)} kcal seems very high — please verify portion size`,
      ...buildMicros(d, factor)
    };
  }

  return {
    name: text, matched: found.key, confidence: found.confidence,
    grams: Math.round(grams),
    cal: Math.round(cal),
    prot: Math.round(prot * 10) / 10,
    warning: rawGrams > MAX_GRAMS_PER_ITEM ? `Portion capped at ${MAX_GRAMS_PER_ITEM}g` : null,
    ...buildMicros(d, factor)
  };
}

function buildMicros(d, f) {
  return {
    carb:     d.carb     ? Math.round(d.carb     * f * 10)/10 : null,
    fat:      d.fat      ? Math.round(d.fat      * f * 10)/10 : null,
    fibre:    d.fibre    ? Math.round(d.fibre    * f * 10)/10 : null,
    sugar:    d.sugar    ? Math.round(d.sugar    * f * 10)/10 : null,
    sat_fat:  d.sat_fat  ? Math.round(d.sat_fat  * f * 10)/10 : null,
    starch:   d.starch   ? Math.round(d.starch   * f * 10)/10 : null,
    sodium:   d.sodium   ? Math.round(d.sodium   * f)         : null,
    calcium:  d.calcium  ? Math.round(d.calcium  * f)         : null,
    iron:     d.iron     ? Math.round(d.iron     * f * 10)/10 : null,
    vitC:     d.vitC     ? Math.round(d.vitC     * f * 10)/10 : null,
    folate:   d.folate   ? Math.round(d.folate   * f)         : null,
    potassium:d.potassium? Math.round(d.potassium* f)         : null,
    magnesium:d.magnesium? Math.round(d.magnesium* f)         : null,
    zinc:     d.zinc     ? Math.round(d.zinc     * f * 10)/10 : null,
    vitB12:   d.vitB12   ? Math.round(d.vitB12   * f * 10)/10 : null,
  };
}

window.NutritionDB = { estimateNutrition, findFood, NUTRITION_DB };
