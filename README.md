# Home Assignment for React Native Developer

Please create a React Native mobile application version of the game Simon Says
(https://www.youtube.com/watch?v=vLi1qnRmpe4).

The app will include two screens:

1. Game Screen, including:

- Four colored playing buttons (feel free to choose the shapes and colors).
- Start button.
- Current score (the current length of the active sequence).

2. Results Screen, including:

- A list of the 10 best results and the name of the player.
- A button redirecting to start a new game.

Some behavioral specifications:

- The sequence from Simon should be random (for each step one press is added with a random
  color).
- The sequence from Simon should increase by 1 for every successful try.
- If the user fails, navigate to the results screen with a popup (use a RN modal) for entering the
  player's name.
- The results should be persistent (not deleted when reopening the app).
- Add sound for game button actions (both Simon's and the user's).

Technical guidelines:

- Don't use Expo (use the React Native CLI Quickstart).
- Use TypeScript, hooks.
- Use Redux for the app's state management.
- Use react-navigation v6.
- Handle as many edge cases as possible (for example, the user shouldn't be able to press the
  buttons while Simon is doing his sequence).

Testing Requirements:

- Include basic unit tests for key functions (such as sequence generation) to demonstrate familiarity
  with React Native testing practices.
- Testing will be considered a bonus for this assignment and will positively impact the overall
  assessment.

Deliverables:

- Send an Android APK (Google Drive link or the file itself).
- Share the project source code (GitHub, zip, etc.).
