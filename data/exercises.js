/*
 * Muscle Lab — exercise library.
 * Edit this list to add, remove or reorder exercises; the app reads nothing else.
 * Everything between the [ and ] is plain JSON (double quotes, no trailing commas).
 *
 * category: "Home Basics", "Core Muscles" or "Extra Home Strength" (the landing-page sections).
 * group:    body area shown on the card and pills (Legs, Chest, Back, Shoulders, Arms, Core).
 *
 * animation:
 *   { "type": "image",  "src": "assets/guy/guy1.webp" }
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
    "description": "Sitting on a bench, you curl a pair of dumbbells from your sides up to your shoulders. Sitting stops you from swinging the weight, so your biceps do all the work.",
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
    "animation": { "type": "frames", "src": "assets/exercises/seated-biceps-curl/{n}.webp?v=2", "frames": 3, "durations": [900, 550, 1000] }
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
      "Keep your back against the bench or upright, and don't arch to push the weight up.",
      "Take about 2 seconds to lower each rep."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/seated-shoulder-press/{n}.webp?v=2", "frames": 2, "durations": [1100, 1100] }
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
    "animation": { "type": "frames", "src": "assets/exercises/seated-lateral-raise/{n}.webp?v=2", "frames": 3, "durations": [900, 500, 1000] }
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
    "animation": { "type": "frames", "src": "assets/exercises/flat-dumbbell-bench-press/{n}.webp", "frames": 2, "durations": [1100, 1100] }
  },
  {
    "id": "lying-dumbbell-pullover",
    "name": "Lying Dumbbell Pullover",
    "group": "Back",
    "category": "Home Basics",
    "equipment": "Dumbbell",
    "level": "Intermediate",
    "description": "Lying on a flat bench, you lower a single dumbbell in an arc behind your head and pull it back over your chest. It stretches and strengthens the lats and chest together, and opens up the rib cage and shoulders.",
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
    "animation": { "type": "frames", "src": "assets/exercises/lying-dumbbell-pullover/{n}.webp?v=2", "frames": 2, "durations": [1100, 1100] }
  },
  {
    "id": "back-squat",
    "name": "Back Squat",
    "group": "Legs",
    "category": "To be deleted",
    "equipment": "Barbell",
    "level": "Intermediate",
    "description": "The foundation of lower-body strength. With the bar across your upper back, you sit down and stand back up, training your legs, hips and trunk to work together under load.",
    "steps": [
      "Set the bar on your upper back, feet shoulder-width apart, toes turned slightly out.",
      "Brace your core and take a breath, chest up, eyes forward.",
      "Push your hips back and bend your knees, tracking them over your toes.",
      "Lower until your thighs are at least parallel to the floor.",
      "Drive through your whole foot to stand, exhaling at the top."
    ],
    "muscles": [
      { "name": "Quadriceps", "role": "Primary" },
      { "name": "Glutes", "role": "Primary" },
      { "name": "Hamstrings", "role": "Secondary" },
      { "name": "Core", "role": "Secondary" }
    ],
    "tips": [
      "Keep your heels down the whole time.",
      "Don't let your knees cave in on the way up."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy1.webp" }
  },
  {
    "id": "push-up",
    "name": "Push-Up",
    "group": "Chest",
    "category": "To be deleted",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "description": "A bodyweight press you can do anywhere. It trains the chest, shoulders and arms while your core holds your body in a straight line.",
    "steps": [
      "Place your hands slightly wider than your shoulders, arms straight.",
      "Step back so your body forms a straight line from head to heels.",
      "Lower your chest toward the floor, elbows about 45° from your body.",
      "Stop just above the floor.",
      "Push back up to straight arms, keeping your hips in line."
    ],
    "muscles": [
      { "name": "Chest", "role": "Primary" },
      { "name": "Triceps", "role": "Secondary" },
      { "name": "Front deltoids", "role": "Secondary" },
      { "name": "Core", "role": "Secondary" }
    ],
    "tips": [
      "Too hard? Do them with your hands on a bench.",
      "Don't let your hips sag."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy4.webp" }
  },
  {
    "id": "bench-press",
    "name": "Bench Press",
    "group": "Chest",
    "category": "To be deleted",
    "equipment": "Barbell",
    "level": "Intermediate",
    "description": "The classic upper-body press. Lying on a bench, you lower the bar to your chest and press it back up, building the chest, shoulders and triceps.",
    "steps": [
      "Lie on the bench with your eyes under the bar and feet flat on the floor.",
      "Grip the bar a little wider than shoulder-width and squeeze your shoulder blades together.",
      "Unrack and hold the bar over your shoulders with straight arms.",
      "Lower it under control to your mid-chest, elbows about 45° from your body.",
      "Press back up to straight arms, exhaling as you push."
    ],
    "muscles": [
      { "name": "Chest", "role": "Primary" },
      { "name": "Triceps", "role": "Secondary" },
      { "name": "Front deltoids", "role": "Secondary" }
    ],
    "tips": [
      "Keep your glutes on the bench.",
      "Use a spotter or safety arms when you go heavy."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy7.webp" }
  },
  {
    "id": "shoulder-press",
    "name": "Shoulder Press",
    "group": "Shoulders",
    "category": "To be deleted",
    "equipment": "Dumbbells",
    "level": "Intermediate",
    "description": "A seated overhead press with dumbbells. It builds strong, balanced shoulders, and each arm has to work on its own.",
    "steps": [
      "Sit tall on a bench with back support, a dumbbell in each hand at shoulder height.",
      "Turn your palms forward, elbows slightly in front of your body.",
      "Press the dumbbells up until your arms are straight overhead.",
      "Pause at the top without clanking the weights together.",
      "Lower slowly back to shoulder height."
    ],
    "muscles": [
      { "name": "Deltoids", "role": "Primary" },
      { "name": "Triceps", "role": "Secondary" },
      { "name": "Upper chest", "role": "Secondary" }
    ],
    "tips": [
      "Keep your ribs down, and don't arch your lower back.",
      "Lower to at least ear height for a full range of motion."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy5.webp" }
  },
  {
    "id": "front-plank",
    "name": "Front Plank",
    "group": "Core",
    "category": "To be deleted",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "description": "A hold on your forearms and toes that trains your core to keep your spine steady. Hold the position for time.",
    "steps": [
      "Place your forearms on the floor, elbows under your shoulders.",
      "Step your feet back so your body forms a straight line.",
      "Brace your abs and squeeze your glutes.",
      "Breathe steadily and hold the position.",
      "Rest when your hips start to sag, then repeat."
    ],
    "muscles": [
      { "name": "Abdominals", "role": "Primary" },
      { "name": "Obliques", "role": "Secondary" },
      { "name": "Shoulders", "role": "Secondary" },
      { "name": "Glutes", "role": "Secondary" }
    ],
    "tips": [
      "Start with 3 holds of 20–30 seconds.",
      "Look at the floor to keep your neck neutral."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy1.webp" }
  },
  {
    "id": "deadlift",
    "name": "Deadlift",
    "group": "Back",
    "category": "To be deleted",
    "equipment": "Barbell",
    "level": "Advanced",
    "description": "Lifting a loaded bar from the floor to standing. A full-body pull that builds the posterior chain: back, glutes and hamstrings.",
    "steps": [
      "Stand with the bar over your mid-foot, feet hip-width apart.",
      "Hinge down and grip the bar just outside your legs.",
      "Flatten your back, lift your chest and pull the slack out of the bar.",
      "Push the floor away and stand tall, keeping the bar close to your legs.",
      "Lower it by pushing your hips back first, then bending your knees."
    ],
    "muscles": [
      { "name": "Lower back", "role": "Primary" },
      { "name": "Glutes", "role": "Primary" },
      { "name": "Hamstrings", "role": "Primary" },
      { "name": "Upper back & traps", "role": "Secondary" },
      { "name": "Forearms", "role": "Secondary" }
    ],
    "tips": [
      "Never round your lower back. Lower the weight if you can't keep it flat.",
      "Finish by squeezing your glutes, not by leaning back."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy2.webp" }
  },
  {
    "id": "lat-pulldown",
    "name": "Lat Pulldown",
    "group": "Back",
    "category": "To be deleted",
    "equipment": "Cable machine",
    "level": "Beginner",
    "description": "A vertical pull on the cable machine. It builds a wider back and prepares you for pull-ups.",
    "steps": [
      "Sit with your thighs locked under the pads and grip the bar wider than your shoulders.",
      "Lean back slightly and lift your chest.",
      "Pull the bar down to your upper chest, driving your elbows down and back.",
      "Squeeze your shoulder blades together at the bottom.",
      "Let the bar rise slowly until your arms are straight."
    ],
    "muscles": [
      { "name": "Lats", "role": "Primary" },
      { "name": "Biceps", "role": "Secondary" },
      { "name": "Rear deltoids", "role": "Secondary" }
    ],
    "tips": [
      "Pull with your elbows, not your hands.",
      "Don't swing your body to move the weight."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy6.webp" }
  },
  {
    "id": "seated-curl",
    "name": "Seated Curl",
    "group": "Arms",
    "category": "To be deleted",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "description": "A biceps curl done seated, so you can't use your legs or body to swing the weight up. This keeps the work in the biceps.",
    "steps": [
      "Sit on the end of a bench, a dumbbell in each hand, arms hanging straight.",
      "Turn your palms forward and pin your elbows to your sides.",
      "Curl the dumbbells up toward your shoulders.",
      "Squeeze your biceps at the top.",
      "Lower slowly until your arms are fully straight."
    ],
    "muscles": [
      { "name": "Biceps", "role": "Primary" },
      { "name": "Forearms", "role": "Secondary" }
    ],
    "tips": [
      "Take about 3 seconds to lower each rep.",
      "Keep your elbows still, and only move your forearms."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy3.webp" }
  },
  {
    "id": "hammer-curl",
    "name": "Hammer Curl",
    "group": "Arms",
    "category": "To be deleted",
    "equipment": "Dumbbells",
    "level": "Beginner",
    "description": "A curl with your palms facing each other. Compared with a regular curl, it works the forearms more and the outer part of the biceps.",
    "steps": [
      "Stand tall with a dumbbell in each hand, palms facing your thighs.",
      "Keep your elbows close to your sides.",
      "Curl the dumbbells up, keeping your palms facing in.",
      "Pause just below shoulder height.",
      "Lower under control to straight arms."
    ],
    "muscles": [
      { "name": "Brachialis", "role": "Primary" },
      { "name": "Biceps", "role": "Primary" },
      { "name": "Forearms", "role": "Secondary" }
    ],
    "tips": [
      "You can curl both arms together or one at a time.",
      "Don't rock your body to lift the weight."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy5.webp" }
  },
  {
    "id": "triceps-pushdown",
    "name": "Triceps Pushdown",
    "group": "Arms",
    "category": "To be deleted",
    "equipment": "Cable machine",
    "level": "Beginner",
    "description": "A cable exercise that isolates the triceps, the muscle that makes up most of your upper arm.",
    "steps": [
      "Attach a rope or bar to a high pulley and grip it with both hands.",
      "Stand tall, lean forward slightly and pin your elbows to your sides.",
      "Push the handle down until your arms are fully straight.",
      "Squeeze your triceps at the bottom.",
      "Let the handle rise slowly back to chest height."
    ],
    "muscles": [
      { "name": "Triceps", "role": "Primary" },
      { "name": "Forearms", "role": "Secondary" }
    ],
    "tips": [
      "Keep your upper arms still. Only your forearms should move.",
      "With a rope, spread the ends apart at the bottom."
    ],
    "animation": { "type": "image", "src": "assets/guy/guy6.webp" }
  }
];
