# The Reflect App

React native build of mobile app available across android and ios.

https://play.google.com/store/apps/details?id=com.reflectapp

https://apps.apple.com/us/app/reflect/id1467087641a

## Getting Started

```
$ git clone https://github.com/sharma0611/reflect.git
$ cd reflect
$ yarn install
$ npm start -- reset-cache
```

For IOS:
Open `ios/ReflectApp.xcodeproj` in Xcode + Build to simulator to run the app.

For Android:
Open android folder in Android Studio + Build to simulator to run the app.

## Dev tools

-   Install React Native Debugger + Allow remote debugging in simulator
-   Use ESlint and Prettier extensions in VSCode. Open the folder in VSCode to ensure .eslintrc + .prettierrc is used.

## Building Android

```
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
$ cd android
$ ./gradlew clean && ./gradlew :app:bundleRelease
```

## Building IOS

Use Xcode to change the target to "Generic IOS Device" and then Product > Archive. If you have the correct developer signing certificates, you can directly upload to the App Store!
