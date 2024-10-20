# 🎮 Wordle Game - React Native

Welcome to the **Wordle Game**, a fun and interactive mobile game where players must guess the correct word based on image hints! This app is built using React Native and leverages several libraries for efficient functionality, UI, and performance optimization.

🔗 **Inspiration**: This project is inspired by [Simon’s YouTube video](https://www.youtube.com/watch?v=pTonpjmKtiE) on building a Wordle game.

## 🚀 Features

- 🧩 **Interactive Gameplay**: Guess the word by analyzing image hints (1.png, 2.png, etc.).
- 💾 **Persistent Storage**: Save and load game state locally using MMKV.
- 💫 **Smooth Animations**: Engage users with responsive animations powered by Reanimated.
- 📜 **Bottom Sheet UI**: Display game information or hints using a bottom sheet.
- 🔥 **Firebase Integration**: Connect and store user data securely using Firebase.
- 🔑 **Authentication**: User authentication provided by Clerk Expo.

## 📱 Demo

![Game Screenshot 1](@/assets/images/1.png)
![Game Screenshot 2](@/assets/images/2.png)
![Game Screenshot 3](@/assets/images/3.png)
![Game Screenshot 4](@/assets/images/4.png)
![Game Screenshot 5](@/assets/images/5.png)

## 🛠️ Tech Stack

This project is built with the following technologies and libraries:

- **[React Native](https://reactnative.dev/)**: Core framework for building mobile applications.
- **[@clerk/clerk-expo](https://clerk.dev/docs/expo)**: Authentication solution to handle user sign-in and sign-up.
- **[@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet)**: Smooth and flexible bottom sheet for displaying game hints or options.
- **[Firebase](https://firebase.google.com/)**: For backend services like user authentication, database, and analytics.
- **[react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)**: High-performance storage system for saving game progress.
- **[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)**: Enables complex animations and gestures with performance in mind.
- **[react-native-size-matters](https://github.com/nirsky/react-native-size-matters)**: A utility library for responsive scaling of UI elements across different screen sizes.

## 🛠️ Installation and Setup

Follow these steps to run the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/wordle-game.git
    cd wordle-game
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up Firebase:

    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Add Firebase credentials to your project by following [React Native Firebase setup guide](https://rnfirebase.io/).

4. Configure Clerk Expo:

    - Create a Clerk account at [Clerk.dev](https://clerk.dev/).
    - Follow the [Clerk Expo integration guide](https://clerk.dev/docs/expo) to set up authentication.

5. Build and run the project for Android or iOS:

    ```bash
    # For Android
    npx expo run:android

    # For iOS (macOS required)
    npx expo run:ios
    ```

## 🎮 How to Play

- When you start the game, you will be presented with a series of images (e.g., 1.png, 2.png).
- Guess the correct word based on the image.
- You can use hints by sliding up the bottom sheet.
- Progress is saved locally, so you can continue your game anytime.

## 🤝 Contributing

Feel free to contribute by submitting pull requests or suggesting features. Ensure that you follow the code style and best practices used throughout the project.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## 📧 Contact

If you have any questions or feedback, feel free to contact me at [your-email@example.com].
