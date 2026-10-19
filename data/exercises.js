/*
 * Muscle Lab — exercise library.
 * Edit this list to add, remove or reorder exercises; the app reads nothing else.
 * Everything between the [ and ] is plain JSON (double quotes, no trailing commas).
 *
 * animation:
 *   { "type": "frames", "src": "assets/exercises/<id>/{n}.webp", "frames": 5, "fps": 1.6 }
 *   { "type": "image",  "src": "assets/exercises/<id>/pose.webp" }
 *   { "type": "video",  "src": "assets/exercises/<id>/loop.mp4" }
 *   null  → shows the "[YOUR CHARACTER ANIMATION]" placeholder
 */
window.EXERCISES = [
  {
    "id": "back-squat",
    "name": "Back Squat",
    "group": "Legs",
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
    "animation": { "type": "frames", "src": "assets/exercises/back-squat/{n}.webp", "frames": 5, "fps": 1.6 }
  },
  {
    "id": "bench-press",
    "name": "Bench Press",
    "group": "Chest",
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
    "animation": { "type": "frames", "src": "assets/exercises/bench-press/{n}.webp", "frames": 5, "fps": 1.6 }
  },
  {
    "id": "deadlift",
    "name": "Deadlift",
    "group": "Back",
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
    "animation": { "type": "frames", "src": "assets/exercises/deadlift/{n}.webp", "frames": 5, "fps": 1.6 }
  },
  {
    "id": "shoulder-press",
    "name": "Shoulder Press",
    "group": "Shoulders",
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
    "animation": { "type": "frames", "src": "assets/exercises/shoulder-press/{n}.webp", "frames": 5, "fps": 1.6 }
  },
  {
    "id": "lat-pulldown",
    "name": "Lat Pulldown",
    "group": "Back",
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
    "animation": { "type": "frames", "src": "assets/exercises/lat-pulldown/{n}.webp", "frames": 5, "fps": 1.6 }
  },
  {
    "id": "push-up",
    "name": "Push-Up",
    "group": "Chest",
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
    "animation": { "type": "frames", "src": "assets/exercises/push-up/{n}.webp", "frames": 5, "fps": 1.6 }
  },
  {
    "id": "seated-curl",
    "name": "Seated Curl",
    "group": "Arms",
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
    "animation": { "type": "frames", "src": "assets/exercises/seated-curl/{n}.webp", "frames": 5, "fps": 1.6 }
  },
  {
    "id": "hammer-curl",
    "name": "Hammer Curl",
    "group": "Arms",
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
    "animation": { "type": "frames", "src": "assets/exercises/hammer-curl/{n}.webp", "frames": 5, "fps": 1.6 }
  },
  {
    "id": "triceps-pushdown",
    "name": "Triceps Pushdown",
    "group": "Arms",
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
    "animation": { "type": "frames", "src": "assets/exercises/triceps-pushdown/{n}.webp", "frames": 5, "fps": 1.6 }
  },
  {
    "id": "front-plank",
    "name": "Front Plank",
    "group": "Core",
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
    "animation": { "type": "frames", "src": "assets/exercises/front-plank/{n}.webp", "frames": 5, "fps": 1.2 }
  }
];
