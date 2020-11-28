---
title: How to integrate Firebase into React Native app
date: 2019-12-02
tags: React Native, Firebase
---

## Steps

#### Create Firebase app
#### Create React Native app
#### Integrate to Android

1. Setup android sdk via install Android Studio

* By default, Android studio install Android SDK version 29. But the default Android SDK is 28 in React Native. So you need to install version 28 via Android Studio in order to build for android.

* JDK 13 got problem with gradle, so that you need to install JDK 8.
```
brew tap adoptopenjdk/openjdk
brew cask install adoptopenjdk8
```

update JAVA_HOME to use JDK 8 as default

```
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
```

to show all Java versions on you machine

```
/usr/libexec/java_home
```

* You have to set ANDROID_SDK_ROOT, and update your PATH variable to include android tools

```bash
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

* to get SHA1 key of app
```
cd android && ./gradlew signingReport
```

#### Integrate to iOS
 
* Must install pod

```
sudo gem install cocoapods
```

