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
    "animation": { "type": "frames", "src": "assets/exercises/seated-biceps-curl/{n}.webp?v=5", "frames": 2, "durations": [1000, 1000] }
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
    "animation": { "type": "frames", "src": "assets/exercises/seated-shoulder-press/{n}.webp?v=4", "frames": 2, "durations": [1100, 1100] }
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
    "animation": { "type": "frames", "src": "assets/exercises/seated-lateral-raise/{n}.webp?v=4", "frames": 3, "durations": [900, 500, 1000] }
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
    "animation": { "type": "frames", "src": "assets/exercises/flat-dumbbell-bench-press/{n}.webp?v=2", "frames": 2, "durations": [1100, 1100] }
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
      "Hold one dumbbell with both hands, palms cupped under the top plate, arms straight above your head.",
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
      "Keep your elbows pointing forward; don't let them flare out to the sides.",
      "Use a light dumbbell and move slowly near your head.",
      "Breathe out as you straighten your arms."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/lying-dumbbell-triceps-extension/{n}.webp?v=5", "frames": 2, "durations": [1100, 1100] }
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
    "animation": { "type": "image", "src": "assets/exercises/elbow-plank/1.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/exercises/bicycle-ab-crunches/1.webp" }
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
    "animation": { "type": "image", "src": "assets/exercises/mountain-climbers/1.webp" }
  },
  {
    "id": "lying-leg-raises",
    "name": "Lying Leg Raises",
    "group": "Core",
    "category": "Core Muscles",
    "equipment": "Bodyweight",
    "level": "Beginner",
    "description": "Lying on your back, you lift your straight legs up until they point at the ceiling, then lower them slowly without touching the floor. It targets the lower part of the abs, which are hard to reach with crunches.",
    "steps": [
      "Lie on your back with your legs straight and your arms flat by your sides, palms down.",
      "Press your lower back into the floor and brace your core.",
      "Keeping your legs straight and together, lift them until they point at the ceiling.",
      "Pause for a moment at the top.",
      "Lower your legs slowly, stopping just above the floor before the next rep."
    ],
    "muscles": [
      { "name": "Lower abdominals", "role": "Primary" },
      { "name": "Hip flexors", "role": "Primary" },
      { "name": "Deep core (transverse abdominis)", "role": "Secondary" },
      { "name": "Obliques", "role": "Secondary" }
    ],
    "tips": [
      "If your lower back lifts off the floor, bend your knees slightly or don't lower your legs as far.",
      "Lower for about 3 seconds; the slow way down does most of the work.",
      "Try 3 sets of 10–12 reps."
    ],
    "animation": { "type": "frames", "src": "assets/exercises/lying-leg-raises/{n}.webp", "frames": 2, "durations": [1000, 1000] }
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
    "animation": { "type": "image", "src": "assets/exercises/bird-dog/1.webp" }
  },
  {
    "id": "lying-dumbbell-pullover",
    "name": "Lying Dumbbell Pullover",
    "group": "Back",
    "category": "Extra Home Strength",
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
    "animation": { "type": "frames", "src": "assets/exercises/lying-dumbbell-pullover/{n}.webp?v=5", "frames": 4, "durations": [900, 500, 1000, 500] }
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
    "animation": { "type": "frames", "src": "assets/exercises/dumbbell-fly/{n}.webp", "frames": 2, "durations": [1100, 1100] }
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
    "animation": { "type": "image", "src": "assets/guy/guy1.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/guy/guy4.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/guy/guy7.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/guy/guy5.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/guy/guy1.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/guy/guy2.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/guy/guy6.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/guy/guy3.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/guy/guy5.webp?v=2" }
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
    "animation": { "type": "image", "src": "assets/guy/guy6.webp?v=2" }
  }
];
