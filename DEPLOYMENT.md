# 🚀 Deployment Guide

This guide covers deploying Game Zone to GitHub, Vercel (web), and Google Play Store.

---

## 📋 Prerequisites

Before deploying, ensure you have:
- [x] Node.js installed (v14+)
- [x] Git installed
- [x] Expo CLI installed (`npm install -g expo-cli`)
- [x] EAS CLI installed (`npm install -g eas-cli`)
- [x] GitHub account
- [x] Vercel account
- [x] Google Play Console account (for Android)

---

## 🔧 Initial Setup

### 1. Install EAS CLI (if not already installed)
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```

### 3. Configure EAS Project
```bash
eas init
```
This will create a project ID and update your `app.json`.

---

## 📦 GitHub Deployment

### Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Game Zone - 2 Player Games"
```

### Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `game-zone-2player`
3. **DO NOT** initialize with README (we already have one)

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/game-zone-2player.git
git branch -M main
git push -u origin main
```

### Step 4: Update package.json
Replace `yourusername` in `package.json` with your actual GitHub username.

---

## 🌐 Vercel Web Deployment

### Step 1: Build Web Version
```bash
npm run build:web
```

### Step 2: Install Vercel CLI (optional)
```bash
npm install -g vercel
```

### Step 3: Deploy via Vercel Dashboard
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset:** Other
   - **Build Command:** `npx expo export:web`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. Click "Deploy"

### Step 4: Or Deploy via CLI
```bash
vercel
```

Follow the prompts and deploy!

**Your web app will be live at:** `https://game-zone-2player.vercel.app`

---

## 📱 Google Play Store Deployment

### Step 1: Set Up Google Play Console
1. Create a [Google Play Developer account](https://play.google.com/console) ($25 one-time fee)
2. Create a new app in the console
3. Fill in app details:
   - **App name:** Game Zone - 2 Player Games
   - **Default language:** English
   - **App or game:** Game
   - **Free or paid:** Free

### Step 2: Update app.json
Replace `[your-project-id]` in `app.json` with your actual EAS project ID (from `eas init`).

### Step 3: Build Android APK (for testing)
```bash
npm run build:android:preview
```

This creates an APK you can install on any Android device for testing.

### Step 4: Build Android App Bundle (for Play Store)
```bash
npm run build:android:aab
```

This creates an AAB (Android App Bundle) required for Play Store submission.

### Step 5: Download the Build
Once the build completes, download the AAB file from the Expo dashboard or use:
```bash
eas build:list
```

### Step 6: Upload to Play Store

#### Option A: Manual Upload
1. Go to Google Play Console
2. Navigate to your app → Production → Create new release
3. Upload the AAB file
4. Fill in release notes
5. Review and roll out

#### Option B: Automated Upload (requires setup)
1. Create a service account in Google Cloud Console
2. Download the JSON key file
3. Save it as `playstore-service-account.json` (in .gitignore)
4. Grant the service account access in Play Console
5. Run:
```bash
npm run submit:android
```

### Step 7: Complete Store Listing

Fill in all required information in Google Play Console:

#### App Content
- **Privacy Policy URL:** (create one using a generator like [Free Privacy Policy](https://www.freeprivacypolicy.com/))
- **App category:** Games / Board
- **Target audience:** Everyone
- **Content rating:** Complete the questionnaire

#### Store Listing
- **App name:** Game Zone - 2 Player Games
- **Short description:** Classic 2-player offline games: Tic Tac Toe, Connect Four, Dots & Boxes
- **Full description:**
  ```
  🎮 Game Zone - The Ultimate 2-Player Games Collection!
  
  Play classic offline games with your friends and family. No internet required!
  
  🎯 GAMES INCLUDED:
  • Tic Tac Toe - Classic 3x3 grid strategy game
  • Connect Four - Drop discs to connect 4 in a row
  • Dots & Boxes - Complete boxes to earn points
  
  ✨ FEATURES:
  • 100% Offline - Play anywhere, anytime
  • Beautiful UI - Premium design with smooth animations
  • Score Tracking - Keep track of wins and draws
  • Haptic Feedback - Enhanced tactile experience
  • No Ads - Pure gaming fun
  
  Perfect for:
  ✓ Road trips and flights
  ✓ Family game nights
  ✓ Waiting rooms
  ✓ Anywhere without internet!
  
  Download now and start playing!
  ```

#### Graphics Assets
- **App icon:** Use `assets/icon.png` (1024x1024)
- **Feature graphic:** Create a 1024x500 banner
- **Phone screenshots:** Take 3-5 screenshots from the app
- **Tablet screenshots:** (optional) Take tablet screenshots

### Step 8: Submit for Review
1. Complete all sections (marked with ✓)
2. Click "Send for review"
3. Wait for Google's review (typically 1-3 days)

---

## 🍎 iOS App Store Deployment (Optional)

### Step 1: Apple Developer Account
You need an [Apple Developer account](https://developer.apple.com) ($99/year).

### Step 2: Update eas.json
Update the iOS submit configuration in `eas.json` with your Apple ID and Team ID.

### Step 3: Build iOS App
```bash
npm run build:ios:production
```

### Step 4: Submit to App Store
```bash
npm run submit:ios
```

Or manually upload the IPA to App Store Connect.

---

## 🔄 Updates & Versioning

### For Bug Fixes or Features
1. Update version in `app.json` and `package.json`
2. Rebuild and resubmit:
```bash
npm run build:android:aab
npm run submit:android
```

### For Web Updates
Vercel auto-deploys on every push to main:
```bash
git add .
git commit -m "Update: description of changes"
git push
```

---

## 📊 Post-Deployment Checklist

- [ ] App is live on GitHub
- [ ] Web version is deployed on Vercel
- [ ] Android app is on Play Store (or in review)
- [ ] iOS app is on App Store (optional)
- [ ] Privacy policy is published
- [ ] Update README.md with live URLs
- [ ] Share with users! 🎉

---

## 🛟 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
eas build:configure
eas build --platform android --clear-cache
```

### Web Build Issues
```bash
# Clear Expo cache
expo start -c
```

### Play Store Rejection
- Check all store listing requirements are complete
- Ensure privacy policy is accessible
- Verify target API level is current (API 34+ for 2024)

---

## 📞 Support

For issues or questions:
- Check [Expo documentation](https://docs.expo.dev/)
- Visit [EAS Build docs](https://docs.expo.dev/build/introduction/)
- Check [Play Console Help](https://support.google.com/googleplay/android-developer)

---

## 🎉 You're Ready!

Your app is now ready for deployment to:
- ✅ GitHub (code hosting)
- ✅ Vercel (web version)
- ✅ Google Play Store (Android app)

Good luck with your launch! 🚀
