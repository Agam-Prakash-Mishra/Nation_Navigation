# 🎯Nation_Navigation

A command-line **Quiz Game** written in **Python** and **Node.js** that:
- Fetches quiz questions dynamically from [Open Trivia DB](https://opentdb.com).
- Tracks each user’s progress, highest score, and accuracy across sessions.
- Supports multiple categories such as General Knowledge, Science, History, Entertainment, etc.

---

##  Features
- User **sign-in / sign-up** with auto-created JSON-based profiles.
- Choose from **5 quiz topics** at a time.
- Randomized question ordering and answer shuffling.
- Stores:
  - Highest Score
  - Total Questions Attempted
  - Correct Answers
  - Accuracy (%)
- Color-coded CLI outputs for a better experience.

---

##  How It Works
1. **Python (`quizAndHis.py`)**:
   - Handles user sign-in/sign-up.
   - Calls the Node.js script to fetch questions.
   - Displays quiz questions, validates answers, and updates stats.
   - Stores user history in a `<username>.json` file.

2. **Node.js (`script.js`)**:
   - Receives the quiz category (via stdin).
   - Fetches 5 multiple-choice questions from Open Trivia DB.
   - Returns questions in JSON format to Python.

---


