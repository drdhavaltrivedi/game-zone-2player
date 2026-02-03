# 🎮 Game Zone - 2 Player Games

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)](https://github.com/drdhavaltrivedi/game-zone-2player)
[![Version](https://img.shields.io/badge/version-1.0.0-green)](https://github.com/drdhavaltrivedi/game-zone-2player/releases)

A stunning collection of classic 2-player offline games for mobile and web, built with React Native and Expo.

[**🌐 Play on Web**](https://game-zone-2player.vercel.app) | [**📱 Download on Play Store**](https://play.google.com/store/apps/details?id=com.gamezone.twoplayergames) | [**📖 Deployment Guide**](DEPLOYMENT.md)

---

## 🎯 Games Included

### 1. ⭕ Tic Tac Toe
Classic 3x3 grid game where players take turns marking spaces. Get three in a row (horizontally, vertically, or diagonally) to win!

### 2. 🔴 Connect Four
Drop colored discs into a 7×6 grid. Be the first to connect four of your discs horizontally, vertically, or diagonally to win!

### 3. 📦 Dots & Boxes
Take turns drawing lines between dots. Complete a box to claim it and earn a point. The player with the most boxes wins!

---

## ✨ Features

- **🌐 100% Offline** - No internet connection required
- **🎨 Beautiful UI** - Premium gradients, glassmorphism, and smooth animations
- **📳 Haptic Feedback** - Enhanced tactile experience on supported devices
- **📊 Score Tracking** - Keep track of wins and draws for each game
- **📱 Responsive Design** - Works perfectly on all screen sizes
- **🎮 Multiple Games** - Switch between games from the home screen
- **⚡ Fast & Smooth** - Optimized performance with React Native
- **🎯 No Ads** - Pure gaming fun without interruptions

---

## 📱 Screenshots

<div align="center">
  <img src="store-assets/screenshot-home.png" width="250" alt="Home Screen" />
  <img src="store-assets/screenshot-tictactoe.png" width="250" alt="Tic Tac Toe" />
  <img src="store-assets/screenshot-connect4.png" width="250" alt="Connect Four" />
</div>

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo Go app (for mobile testing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/drdhavaltrivedi/game-zone-2player.git
cd game-zone-2player
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android, `i` for iOS, `w` for web

---

## 📜 Available Scripts

### Development
- `npm start` - Start Expo development server
- `npm run android` - Open on Android emulator/device
- `npm run ios` - Open on iOS simulator/device  
- `npm run web` - Open in web browser

### Production Builds
- `npm run build:web` - Build for web deployment
- `npm run build:android:preview` - Build Android APK for testing
- `npm run build:android:aab` - Build Android App Bundle for Play Store
- `npm run build:ios:production` - Build iOS app for App Store

### Deployment
- `npm run submit:android` - Submit to Google Play Store
- `npm run submit:ios` - Submit to Apple App Store

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

---

## 🎨 Design System

The app follows a comprehensive design system with:

- **Color Palette** - Vibrant purple to cyan gradients
- **Typography** - Consistent font scales and weights
- **Spacing** - 8-point grid system
- **Components** - Reusable, themed UI components
- **Animations** - Smooth transitions and haptic feedback

---

## 🛠️ Tech Stack

- **[React Native](https://reactnative.dev/)** - Mobile framework
- **[Expo](https://expo.dev/)** - Development platform
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)** - Tactile feedback
- **[Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)** - Beautiful gradients
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** - Smooth animations

---

## 📦 Project Structure

```
game-zone-2player/
├── App.tsx                    # Main navigation component
├── screens/                   # Game and home screens
│   ├── HomeScreen.tsx         # Game selection screen
│   ├── TicTacToeScreen.tsx    # Tic Tac Toe game
│   ├── ConnectFourScreen.tsx  # Connect Four game
│   └── DotsBoxesScreen.tsx    # Dots & Boxes game
├── components/                # Reusable UI components
│   ├── GameBoard.tsx
│   ├── PlayerIndicator.tsx
│   ├── ScoreBoard.tsx
│   └── GameStatus.tsx
├── utils/                     # Game logic utilities
│   └── gameLogic.ts
├── constants/                 # Theme & design system
│   └── theme.ts
├── assets/                    # Icons & images
│   ├── icon.png
│   ├── splash.png
│   └── favicon.png
└── store-assets/             # Play Store graphics
    ├── feature-graphic.png
    └── icon-1024.png
```

---

## 🌐 Deployment

This app is deployed on:

- **🌐 Web:** [Vercel](https://game-zone-2player.vercel.app)
- **📱 Android:** [Google Play Store](https://play.google.com/store/apps/details?id=com.gamezone.twoplayergames)
- **📦 Source Code:** [GitHub](https://github.com/drdhavaltrivedi/game-zone-2player)

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Icons and graphics designed specifically for this project
- Built with love using Expo and React Native
- Inspired by classic board games loved by millions

---

## 📧 Contact

For questions, suggestions, or support:

- **GitHub Issues:** [Create an issue](https://github.com/drdhavaltrivedi/game-zone-2player/issues)
- **Email:** your-email@example.com

---

<div align="center">

**Made with ❤️ for offline gaming fun!**

⭐ Star this repo if you found it helpful!

[Report Bug](https://github.com/drdhavaltrivedi/game-zone-2player/issues) • [Request Feature](https://github.com/drdhavaltrivedi/game-zone-2player/issues)

</div>
