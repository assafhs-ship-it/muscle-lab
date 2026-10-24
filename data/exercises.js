/*
 * Muscle Lab — exercise library.
 * Edit this list to add, remove or reorder exercises; the app reads nothing else.
 * Everything between the [ and ] is plain JSON (double quotes, no trailing commas).
 *
 * muscleMap (optional): labelled "muscles worked" picture shown below the info columns (tools/make_muscle_maps.py).
 * category: "Home Basics", "Core Muscles" or "Extra Home Strength" (the landing-page sections).
 * group:    body area shown on the card and pills (Legs, Chest, Back, Shoulders, Arms, Core).
 *
 * animation:
 *   { "type": "image",  "src": "assets/exercises/<id>/1.webp" }
 *   { "type": "frames", "src": "assets/exercises/<id>/{n}.webp", "frames": 5, "fps": 1.6 }
 *     optional "durations": [ms, ms, ...] — one per frame at 1× speed, instead of fps (e.g. hold the top of a rep)
 *   { "type": "video",  "src": "assets/exercises/<id>/loop.mp4" }
 *   null  → shows the "[YOUR CHARACTER ANIMATION]" placeholder
 */
window.EXERCISES = [
  {
    "id": "seated-biceps-curl",
    "name": "Seated Dumbbell Biceps Curl",
    "group": "Arms",
    "category": "Home Basics",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "description": "Sitting on a bench, you curl a pair of dumbbells from your sides up to your shoulders. Sitting stops you from swinging the weight, so your arm muscles do the work instead of momentum.",
    "steps": [
      "Sit tall on a bench with your feet flat, a dumbbell in each hand, arms hanging straight at your sides.",
      "Turn your palms forward and keep your elbows close to your body.",
      "Curl both dumbbells up toward your shoulders, moving only your forearms.",
      "Squeeze your biceps at the top for a moment.",
      "Lower slowly until your arms are fully straight again."
    ],
    "muscles": [
      { "name": "Biceps", "role": "Primary" },
      { "name": "Brachialis", "role": "Secondary" },
      { "name": "Forearms", "role": "Secondary" }
    ],
    "tips": [
      "Keep your elbows still at your sides; if they drift forward, the weight is too heavy.",
      "Take about 2–3 seconds to lower each rep.",
      "Breathe out as you curl up and in as you lower."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/seated-biceps-curl/{n}.webp?v=8", "frames": 2, "durations": [1000, 1000] },
    "muscleMap": "assets/exercises/seated-biceps-curl/muscles.webp?v=3"
  },
  {
    "id": "seated-shoulder-press",
    "name": "Seated Dumbbell Shoulder Press",
    "group": "Shoulders",
    "category": "Home Basics",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "description": "Sitting on a bench, you press a pair of dumbbells from shoulder height to straight overhead. Sitting keeps your legs out of it, so your shoulders and triceps do the work.",
    "steps": [
      "Sit tall on a bench with your feet flat and wide, a dumbbell in each hand.",
      "Bring the dumbbells to shoulder height, palms facing forward, elbows just below your wrists.",
      "Brace your core and press both dumbbells straight up.",
      "Straighten your arms overhead without locking your elbows hard, dumbbells close but not touching.",
      "Lower slowly back to shoulder height, then start the next rep."
    ],
    "muscles": [
      { "name": "Front & side deltoids", "role": "Primary" },
      { "name": "Triceps", "role": "Secondary" },
      { "name": "Upper chest", "role": "Secondary" },
      { "name": "Upper back & traps", "role": "Secondary" }
    ],
    "tips": [
      "Breathe out as you press and in as you lower.",
      "Keep your back against the bench (or upright if it has no back support), and don't arch to push the weight up.",
      "Take about 2 seconds to lower each rep."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/seated-shoulder-press/{n}.webp?v=7", "frames": 2, "durations": [1100, 1100] },
    "muscleMap": "assets/exercises/seated-shoulder-press/muscles.webp?v=3"
  },
  {
    "id": "seated-lateral-raise",
    "name": "Seated Dumbbell Lateral Raise",
    "group": "Shoulders",
    "category": "Home Basics",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "description": "Sitting on a bench, you raise a pair of dumbbells out to your sides up to shoulder height. It targets the side of the shoulders, which gives them a broader, rounder look.",
    "steps": [
      "Sit tall at the end of a bench with your feet flat, a dumbbell in each hand at your sides.",
      "Bend your elbows slightly and keep them fixed in that position.",
      "Raise the dumbbells out to the sides in a wide arc, leading with your elbows.",
      "Stop when your arms are level with your shoulders and pause briefly.",
      "Lower slowly back down to your sides."
    ],
    "muscles": [
      { "name": "Side deltoids", "role": "Primary" },
      { "name": "Front deltoids", "role": "Secondary" },
      { "name": "Upper traps", "role": "Secondary" }
    ],
    "tips": [
      "Use light weights; good form matters more than load here.",
      "Don't shrug your shoulders up toward your ears.",
      "Don't swing your body to lift the dumbbells."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/seated-lateral-raise/{n}.webp?v=7", "frames": 3, "durations": [900, 500, 1000] },
    "muscleMap": "assets/exercises/seated-lateral-raise/muscles.webp?v=3"
  },
  {
    "id": "flat-dumbbell-bench-press",
    "name": "Flat Dumbbell Bench Press",
    "group": "Chest",
    "category": "Home Basics",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "description": "Lying on a flat bench, you press a pair of dumbbells from your chest to straight above it. Because each arm works on its own, it builds the chest evenly and lets you move through a full range of motion.",
    "steps": [
      "Sit on the end of the bench with the dumbbells on your thighs, then lie back and bring them to the sides of your chest.",
      "Plant your feet flat on the floor and squeeze your shoulder blades together.",
      "Press both dumbbells straight up over your chest until your arms are straight.",
      "Pause at the top without letting the dumbbells clank together.",
      "Lower them slowly back to the sides of your chest, elbows about 45° from your body."
    ],
    "muscles": [
      { "name": "Chest", "role": "Primary" },
      { "name": "Front deltoids", "role": "Secondary" },
      { "name": "Triceps", "role": "Secondary" }
    ],
    "tips": [
      "Keep your back and hips on the bench throughout the set.",
      "Breathe out as you press and in as you lower.",
      "When you finish, bring the dumbbells to your chest and sit up with them on your thighs."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/flat-dumbbell-bench-press/{n}.webp?v=5", "frames": 2, "durations": [1100, 1100] },
    "muscleMap": "assets/exercises/flat-dumbbell-bench-press/muscles.webp?v=3"
  },
  {
    "id": "lying-dumbbell-triceps-extension",
    "name": "Lying Dumbbell Triceps Extension",
    "group": "Arms",
    "category": "Home Basics",
    "equipment": "Dumbbell",
    "level": "Intermediate",
    "description": "Lying on a flat bench, you hold one dumbbell with both hands and bend only at the elbows to lower it behind your head, then straighten your arms again. Keeping the upper arms still puts the work on the triceps, especially the long head.",
    "steps": [
      "Lie on a flat bench with your head near the end and your feet flat on the floor.",
      "Hold one dumbbell with both hands, palms cupped under the top plate, arms pointing straight up over your face.",
      "Keep your upper arms still and bend your elbows to lower the dumbbell behind your head.",
      "Lower until you feel a stretch in the back of your arms.",
      "Straighten your elbows to bring the dumbbell back up, squeezing your triceps."
    ],
    "muscles": [
      { "name": "Triceps", "role": "Primary" },
      { "name": "Forearms", "role": "Secondary" },
      { "name": "Core", "role": "Secondary" }
    ],
    "tips": [
      "Keep your elbows pointing up toward the ceiling; don't let them flare out to the sides.",
      "Use a light dumbbell and move slowly near your head.",
      "Breathe out as you straighten your arms."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/lying-dumbbell-triceps-extension/{n}.webp?v=8", "frames": 2, "durations": [1100, 1100] },
    "muscleMap": "assets/exercises/lying-dumbbell-triceps-extension/muscles.webp?v=3"
  },
  {
    "id": "elbow-plank",
    "name": "Elbow Plank",
    "group": "Core",
    "category": "Core Muscles",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "description": "A hold on your forearms and toes that trains your whole core to keep your body in one straight line. There's no movement: the work is resisting your hips sagging or lifting, which builds the deep abdominal muscles that protect your lower back.",
    "steps": [
      "Lie face down and place your forearms on the floor, elbows directly under your shoulders, hands in loose fists.",
      "Tuck your toes under and lift your body off the floor, so only your forearms and toes touch it.",
      "Make a straight line from head to heels: squeeze your glutes and pull your belly button in.",
      "Look at the floor just in front of your hands to keep your neck neutral.",
      "Breathe steadily and hold the position, then lower your knees to rest."
    ],
    "muscles": [
      { "name": "Abdominals", "role": "Primary" },
      { "name": "Deep core (transverse abdominis)", "role": "Primary" },
      { "name": "Obliques", "role": "Secondary" },
      { "name": "Shoulders", "role": "Secondary" },
      { "name": "Glutes", "role": "Secondary" }
    ],
    "tips": [
      "Start with 3 holds of 20–30 seconds and add 10 seconds as it gets easier.",
      "Stop the set when your hips start to sag or your lower back aches.",
      "Don't hold your breath."
    ],
    "animation": { "type": "image", "src": "assets/exercises/elbow-plank/1.webp?v=4" },
    "muscleMap": "assets/exercises/elbow-plank/muscles.webp?v=3"
  },
  {
    "id": "bench-triceps-dips",
    "name": "Bench Triceps Dips",
    "group": "Arms",
    "category": "Core Muscles",
    "equipment": "Bench",
    "level": "Beginner",
    "description": "With your hands on the edge of a bench behind you and your legs out in front, you lower your body by bending your elbows and push back up. It builds the triceps using only your bodyweight, and holding your torso upright works your core too.",
    "steps": [
      "Sit on the edge of a bench and place your hands next to your hips, fingers pointing forward.",
      "Walk your feet out until your legs are straight, then slide your hips just off the bench.",
      "Keep your back close to the bench and your chest up, then bend your elbows to lower your body.",
      "Stop when your upper arms are level with the floor, with your elbows at about 90°.",
      "Press through your palms to straighten your arms and lift back up."
    ],
    "muscles": [
      { "name": "Triceps", "role": "Primary" },
      { "name": "Front deltoids", "role": "Secondary" },
      { "name": "Chest", "role": "Secondary" },
      { "name": "Core", "role": "Secondary" }
    ],
    "tips": [
      "Keep your elbows pointing straight back, not out to the sides.",
      "Don't go lower than 90°; dropping too deep strains the front of the shoulders.",
      "Too hard? Bend your knees and keep your feet closer to the bench."
    ],
    "animation": { "type": "image", "src": "assets/exercises/bench-triceps-dips/1.webp" },
    "muscleMap": "assets/exercises/bench-triceps-dips/muscles.webp?v=3"
  },
  {
    "id": "bicycle-ab-crunches",
    "name": "Bicycle Ab Crunches",
    "group": "Core",
    "category": "Core Muscles",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "description": "Lying on your back, you bring one elbow toward the opposite knee while the other leg straightens, then switch sides in a pedalling motion. The twist makes it one of the most effective exercises for the obliques as well as the front abs.",
    "steps": [
      "Lie on your back with your hands lightly behind your head and your lower back pressed into the floor.",
      "Lift your shoulders and both feet off the floor, knees bent.",
      "Bring your right elbow toward your left knee while straightening your right leg out in front of you.",
      "Switch sides: bring your left elbow toward your right knee as you straighten your left leg.",
      "Keep alternating in a slow, controlled pedalling motion; each side counts as one rep."
    ],
    "muscles": [
      { "name": "Obliques", "role": "Primary" },
      { "name": "Abdominals", "role": "Primary" },
      { "name": "Hip flexors", "role": "Secondary" },
      { "name": "Deep core (transverse abdominis)", "role": "Secondary" }
    ],
    "tips": [
      "Turn your shoulder toward the knee, not just your elbow.",
      "Don't pull on your neck; your hands only support your head.",
      "Slow is better than fast: try 3 sets of 10–15 reps per side."
    ],
    "animation": { "type": "image", "src": "assets/exercises/bicycle-ab-crunches/1.webp?v=3" },
    "muscleMap": "assets/exercises/bicycle-ab-crunches/muscles.webp?v=3"
  },
  {
    "id": "mountain-climbers",
    "name": "Mountain Climbers",
    "group": "Core",
    "category": "Core Muscles",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "description": "From a high plank, you drive your knees toward your chest one at a time, as if running in place on your hands. It works the core hard to keep your hips steady, and the quick pace also raises your heart rate.",
    "steps": [
      "Start in a high plank: hands under your shoulders, arms straight, body in a straight line from head to heels.",
      "Brace your core and keep your hips level with your shoulders.",
      "Drive your right knee toward your chest, keeping the foot off the floor.",
      "Return it to the plank and at the same moment drive your left knee forward.",
      "Keep switching legs in a steady running rhythm; start slowly and speed up once your form is solid."
    ],
    "muscles": [
      { "name": "Abdominals", "role": "Primary" },
      { "name": "Hip flexors", "role": "Primary" },
      { "name": "Obliques", "role": "Secondary" },
      { "name": "Shoulders", "role": "Secondary" },
      { "name": "Quadriceps", "role": "Secondary" }
    ],
    "tips": [
      "Keep your shoulders over your hands; don't let them drift back.",
      "Don't let your hips bounce up and down or stick up in the air.",
      "Try 3 rounds of 20–30 seconds, resting 30 seconds between them."
    ],
    "animation": { "type": "image", "src": "assets/exercises/mountain-climbers/1.webp?v=3" },
    "muscleMap": "assets/exercises/mountain-climbers/muscles.webp?v=3"
  },
  {
    "id": "lying-leg-raises",
    "name": "Lying Leg Raises",
    "group": "Core",
    "category": "Core Muscles",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "description": "Lying on your back, you lift your straight legs up until they point at the ceiling, then lower them slowly without touching the floor. Your hip flexors lift the legs while your abs work hard to keep your pelvis and lower back steady, with extra emphasis on the lower part of the abs.",
    "steps": [
      "Lie on your back with your legs straight and your arms flat by your sides, palms down.",
      "Press your lower back into the floor and brace your core.",
      "Keeping your legs straight and together, lift them until they point at the ceiling.",
      "Pause for a moment at the top.",
      "Lower your legs slowly, stopping just above the floor before the next rep."
    ],
    "muscles": [
      { "name": "Abdominals", "role": "Primary" },
      { "name": "Hip flexors", "role": "Primary" },
      { "name": "Deep core (transverse abdominis)", "role": "Secondary" },
      { "name": "Obliques", "role": "Secondary" }
    ],
    "tips": [
      "If your lower back lifts off the floor, bend your knees slightly or don't lower your legs as far.",
      "Lower for about 3 seconds; that slow lowering is where your abs work hardest to keep your back flat.",
      "Try 3 sets of 10–12 reps."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/lying-leg-raises/{n}.webp?v=4", "frames": 2, "durations": [1000, 1000] },
    "muscleMap": "assets/exercises/lying-leg-raises/muscles.webp?v=3"
  },
  {
    "id": "bird-dog",
    "name": "Bird Dog",
    "group": "Core",
    "category": "Core Muscles",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "description": "On your hands and knees, you reach one arm forward and the opposite leg back until both are level with your body, then switch sides. It teaches your core to keep your spine steady while your limbs move, and it strengthens the lower back gently.",
    "steps": [
      "Start on your hands and knees, hands under your shoulders and knees under your hips, back flat.",
      "Brace your core as if someone is about to tap your stomach.",
      "Slowly reach your right arm forward and your left leg straight back until both are level with your back.",
      "Hold for 2–3 seconds without letting your hips tilt or your lower back arch.",
      "Return to the start with control, then repeat with your left arm and right leg."
    ],
    "muscles": [
      { "name": "Deep core (transverse abdominis)", "role": "Primary" },
      { "name": "Lower back (erector spinae)", "role": "Primary" },
      { "name": "Glutes", "role": "Secondary" },
      { "name": "Shoulders", "role": "Secondary" },
      { "name": "Obliques", "role": "Secondary" }
    ],
    "tips": [
      "Move slowly: imagine a glass of water balanced on your lower back.",
      "Reach long rather than high; your arm and leg stop at back height.",
      "Try 3 sets of 8–10 reps per side."
    ],
    "animation": { "type": "image", "src": "assets/exercises/bird-dog/1.webp?v=3" },
    "muscleMap": "assets/exercises/bird-dog/muscles.webp?v=3"
  },
  {
    "id": "lying-dumbbell-pullover",
    "name": "Lying Dumbbell Pullover",
    "group": "Back",
    "category": "Extra Home Strength",
    "equipment": "Dumbbell",
    "level": "Intermediate",
    "description": "Lying on a flat bench, you lower a single dumbbell in an arc behind your head and pull it back over your chest. It stretches and strengthens the chest and lats together, and builds mobility in the shoulders.",
    "steps": [
      "Lie on a flat bench with your head near the end and your feet flat on the floor.",
      "Hold one dumbbell with both hands, palms cupped under the top plate, above your chest.",
      "Keep a slight bend in your elbows and lower the dumbbell back behind your head in a smooth arc.",
      "Stop when your arms are about level with the bench and you feel a stretch along your sides.",
      "Pull the dumbbell back over your chest along the same arc, keeping your elbows' bend the same."
    ],
    "muscles": [
      { "name": "Lats", "role": "Primary" },
      { "name": "Chest", "role": "Primary" },
      { "name": "Triceps (long head)", "role": "Secondary" },
      { "name": "Core", "role": "Secondary" }
    ],
    "tips": [
      "Start light; the stretched position puts a lot of load on the shoulders.",
      "Keep your lower back on the bench and your ribs down.",
      "Breathe in as you lower and out as you pull the weight back."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/lying-dumbbell-pullover/{n}.webp?v=8", "frames": 4, "durations": [900, 500, 1000, 500] },
    "muscleMap": "assets/exercises/lying-dumbbell-pullover/muscles.webp?v=3"
  },
  {
    "id": "dumbbell-fly",
    "name": "Dumbbell Fly",
    "group": "Chest",
    "category": "Extra Home Strength",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "description": "Lying on a bench, you open your arms out wide in a big arc with a dumbbell in each hand, then bring them back together over your chest, like hugging a tree. It stretches and isolates the chest muscles.",
    "steps": [
      "Lie on a flat bench with a dumbbell in each hand, feet flat on the floor.",
      "Press the dumbbells up over your chest, palms facing each other, elbows slightly bent.",
      "Keeping that slight bend fixed, open your arms out to the sides in a wide arc.",
      "Lower until your hands are about level with the bench and you feel a stretch across your chest.",
      "Squeeze your chest to bring the dumbbells back together over your chest along the same arc."
    ],
    "muscles": [
      { "name": "Chest", "role": "Primary" },
      { "name": "Front deltoids", "role": "Secondary" },
      { "name": "Biceps", "role": "Secondary" }
    ],
    "tips": [
      "Use lighter dumbbells than for a press; the long arm makes them feel much heavier.",
      "Keep the bend in your elbows the same all the way; don't turn it into a press.",
      "Don't lower the dumbbells past the point of a comfortable stretch."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/dumbbell-fly/{n}.webp?v=4", "frames": 2, "durations": [1100, 1100] },
    "muscleMap": "assets/exercises/dumbbell-fly/muscles.webp?v=3"
  },
  {
    "id": "close-grip-incline-chest-press",
    "name": "Close Grip Incline Chest Press",
    "group": "Chest",
    "category": "Extra Home Strength",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "description": "On an incline bench, you press two dumbbells held close together, palms facing each other, from your upper chest to straight above it. The incline targets the upper chest, and the close grip brings in the triceps.",
    "steps": [
      "Set the bench to an incline of about 30–45° and sit back with your feet flat on the floor.",
      "Hold the dumbbells together against your upper chest, palms facing each other, elbows tucked close to your body.",
      "Brace your core and press both dumbbells straight up, keeping them touching.",
      "Straighten your arms at the top and squeeze your chest.",
      "Lower slowly back to your upper chest, elbows staying close to your sides."
    ],
    "muscles": [
      { "name": "Upper chest", "role": "Primary" },
      { "name": "Triceps", "role": "Primary" },
      { "name": "Front deltoids", "role": "Secondary" }
    ],
    "tips": [
      "Squeeze the dumbbells together the whole time; it makes your chest work harder.",
      "Keep your back and head on the bench.",
      "Breathe out as you press and in as you lower."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/close-grip-incline-chest-press/{n}.webp?v=5", "frames": 2, "durations": [1100, 1100] },
    "muscleMap": "assets/exercises/close-grip-incline-chest-press/muscles.webp?v=3"
  },
  {
    "id": "dumbbell-row",
    "name": "Dumbbell Row",
    "group": "Back",
    "category": "Extra Home Strength",
    "equipment": "Dumbbell",
    "level": "Beginner",
    "description": "With one knee and hand on a bench, you pull a dumbbell from the floor up to your hip, one arm at a time. Supporting yourself on the bench keeps your back flat, so your back muscles do the pulling.",
    "steps": [
      "Place your left knee and left hand on a flat bench, right foot on the floor, back flat and parallel to the floor.",
      "Hold a dumbbell in your right hand with your arm hanging straight down.",
      "Pull the dumbbell up toward your hip, driving your elbow back close to your body.",
      "Squeeze your shoulder blade toward your spine at the top.",
      "Lower slowly until your arm is straight, then finish the set and switch sides."
    ],
    "muscles": [
      { "name": "Lats", "role": "Primary" },
      { "name": "Upper back (rhomboids)", "role": "Primary" },
      { "name": "Rear deltoids", "role": "Secondary" },
      { "name": "Biceps", "role": "Secondary" }
    ],
    "tips": [
      "Pull toward your hip to focus on the lats; pulling toward your chest shifts more work to the upper back.",
      "Don't twist your body to lift the weight; keep your shoulders level.",
      "Keep your neck in line with your back by looking at the floor."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/dumbbell-row/{n}.webp?v=5", "frames": 2, "durations": [1000, 1100] },
    "muscleMap": "assets/exercises/dumbbell-row/muscles.webp?v=3"
  },
  {
    "id": "chest-supported-rear-delt-fly",
    "name": "Chest-Supported Rear Delt Fly",
    "group": "Shoulders",
    "category": "Extra Home Strength",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "description": "Lying chest-down on an incline bench, you raise a pair of dumbbells out to the sides with your palms facing down. The bench stops you from swinging, so the back of your shoulders and upper back do the work. It balances out pressing exercises and supports good posture.",
    "steps": [
      "Set the bench to a low incline and lie chest-down on it, feet on the floor, a dumbbell in each hand.",
      "Let your arms hang straight down, palms facing back (an overhand grip), elbows slightly bent.",
      "Raise the dumbbells out to the sides in a wide arc, leading with your elbows.",
      "Stop when your arms are level with your body and squeeze your shoulder blades together.",
      "Lower slowly back to the start."
    ],
    "muscles": [
      { "name": "Rear deltoids", "role": "Primary" },
      { "name": "Upper back (rhomboids)", "role": "Primary" },
      { "name": "Middle traps", "role": "Secondary" }
    ],
    "tips": [
      "Use light dumbbells; the rear deltoids are small muscles.",
      "Keep your chest on the bench and your neck relaxed.",
      "Don't shrug your shoulders toward your ears as you lift."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/chest-supported-rear-delt-fly/{n}.webp?v=4", "frames": 2, "durations": [1000, 1100] },
    "muscleMap": "assets/exercises/chest-supported-rear-delt-fly/muscles.webp?v=3"
  },
  {
    "id": "arnold-press",
    "name": "Arnold Press",
    "group": "Shoulders",
    "category": "Extra Home Strength",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "description": "A seated shoulder press with a twist, named after Arnold Schwarzenegger. You start with your palms facing you and rotate them to face forward as you press overhead, which works the front and side of the shoulders through a longer range of motion.",
    "steps": [
      "Sit tall on a bench with back support, holding the dumbbells in front of your shoulders, palms facing you.",
      "Brace your core and start pressing the dumbbells up.",
      "As you press, rotate your wrists so your palms turn to face forward.",
      "Finish with your arms straight overhead, palms forward.",
      "Lower slowly while rotating back, ending with your palms facing you again."
    ],
    "muscles": [
      { "name": "Front deltoids", "role": "Primary" },
      { "name": "Side deltoids", "role": "Primary" },
      { "name": "Triceps", "role": "Secondary" },
      { "name": "Upper traps", "role": "Secondary" }
    ],
    "tips": [
      "Make the rotation one smooth movement with the press, not a separate step.",
      "Use lighter dumbbells than for a regular shoulder press.",
      "Keep your back against the bench; don't arch to push the weight up."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/arnold-press/{n}.webp?v=4", "frames": 2, "durations": [1000, 1100] },
    "muscleMap": "assets/exercises/arnold-press/muscles.webp?v=3"
  },
  {
    "id": "seated-overhead-triceps-extension",
    "name": "Seated Overhead Triceps Extension",
    "group": "Arms",
    "category": "Extra Home Strength",
    "equipment": "Dumbbell",
    "level": "Beginner",
    "description": "Sitting upright, you hold one dumbbell with both hands overhead and bend your elbows to lower it behind your head, then straighten your arms again. The overhead position stretches the long head of the triceps, building the back of the arm.",
    "steps": [
      "Sit tall on a bench with back support, feet flat on the floor.",
      "Hold one dumbbell with both hands under the top plate and press it straight overhead.",
      "Keeping your upper arms close to your head, bend your elbows to lower the dumbbell behind your head.",
      "Lower until you feel a stretch in the back of your arms.",
      "Straighten your elbows to press the dumbbell back up, squeezing your triceps at the top."
    ],
    "muscles": [
      { "name": "Triceps", "role": "Primary" },
      { "name": "Core", "role": "Secondary" },
      { "name": "Forearms", "role": "Secondary" }
    ],
    "tips": [
      "Keep your elbows pointing up and close to your ears; don't let them flare out.",
      "Brace your core so your lower back doesn't arch.",
      "Move slowly near your head and use a weight you can control."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/seated-overhead-triceps-extension/{n}.webp?v=4", "frames": 2, "durations": [1000, 1100] },
    "muscleMap": "assets/exercises/seated-overhead-triceps-extension/muscles.webp?v=3"
  },
  {
    "id": "bench-crunch",
    "name": "Bench Crunch",
    "group": "Core",
    "category": "Extra Home Strength",
    "equipment": "Bench",
    "level": "Beginner",
    "description": "Lying on your back with your calves resting on a bench, you curl your shoulders up off the floor toward your knees. Raising your legs reduces how much your hip flexors can help and keeps your lower back flat, so your abs do more of the work.",
    "steps": [
      "Lie on your back and rest your calves on a bench, knees and hips bent at about 90°.",
      "Place your hands lightly behind your head, elbows wide.",
      "Breathe out and curl your head and shoulders up off the floor, bringing your ribs toward your hips.",
      "Pause and squeeze your abs at the top.",
      "Lower slowly back down until your shoulders touch the floor."
    ],
    "muscles": [
      { "name": "Abdominals", "role": "Primary" },
      { "name": "Obliques", "role": "Secondary" },
      { "name": "Deep core (transverse abdominis)", "role": "Secondary" }
    ],
    "tips": [
      "Don't pull on your neck; your hands only support your head.",
      "Keep your lower back pressed into the floor the whole time.",
      "It's a short movement: lift your shoulders, not your whole back."
    ],
    "animation": { "type": "image", "src": "assets/exercises/bench-crunch/1.webp?v=3" },
    "muscleMap": "assets/exercises/bench-crunch/muscles.webp?v=3"
  }
];
