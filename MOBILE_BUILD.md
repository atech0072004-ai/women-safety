# SafeHer - Mobile App Build Guide (Android APK)

The SafeHer frontend has **Capacitor** already integrated, which wraps the React web app into a native Android shell. Follow these steps to build your Android mobile application (`.apk`).

---

## 🛠️ Step 1: Prerequisites
To build the app, you need to have the following installed on your Windows machine:
1. **Android Studio**: Download and install from [developer.android.com](https://developer.android.com/studio).
2. **Node.js**: (Already installed on your system).

---

## 💻 Step 2: Build & Sync Web Assets

Before building the mobile shell, you must build the latest version of your web assets:

1. Open your terminal in the **`frontend`** directory:
   ```powershell
   cd frontend
   ```
2. Build the production build of the React app:
   ```powershell
   node node_modules/vite/bin/vite.js build
   ```
   *(This compiles everything into the `dist/` directory)*
3. Sync the compiled assets to the Android native project folder:
   ```powershell
   npx cap sync
   ```
   *(This copies the `dist/` files into the Android app assets folder)*

---

## 🤖 Step 3: Compile the APK in Android Studio

1. Open the Android project in Android Studio. You can do this automatically from the terminal:
   ```powershell
   npx cap open android
   ```
   *Alternatively, you can open Android Studio manually, select **Open**, and select the `women-safety/frontend/android` folder.*

2. **Wait for Gradle Sync**: When Android Studio opens, wait for the background Gradle task to finish sync (you will see a progress bar at the bottom right).

3. **Build the APK**:
   - On the top menu bar, click on **Build** -> **Build Bundle(s) / APK(s)** -> **Build APK(s)**.
   - Android Studio will begin compiling the code.

4. **Locate the APK file**:
   - Once compilation is complete, a notification popup will appear in the bottom-right corner:
     `APK(s) generated successfully for 1 module:`
   - Click the **locate** link in that popup.
   - This opens the folder containing your installable file: **`app-debug.apk`**.

---

## 📱 Step 4: Install on Your Phone
1. Transfer the **`app-debug.apk`** file to your Android phone (via USB, email, or Google Drive).
2. On your phone, tap the file to install it.
3. If prompted, allow "Install from Unknown Sources".
4. Open the **SafeHer** app and run it directly on your mobile device!
