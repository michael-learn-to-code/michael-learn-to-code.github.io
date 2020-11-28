---
title: How to integrate firebase into Expo app 
date: "2019-12-12"
tags: React Native, typescript, expo, firebase
---

## Steps

1. Create Firebase Project
1. Store Firebase project information in `app.json`
1. Install required dependencies
1. Initialize firebase and create a context

## Create Firebase Project

Follow the instruction here: https://invertase.io/oss/react-native-firebase/quick-start/create-firebase-project

*Notes*

1. You should temporarily bypass the security rules of Realtime Database by adding rules:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
*Make sure the select Realtime Database before update rules. By default, firebase select Firestore instead*

## Store Firebase project information in `app.json`

Edit `app.json`, add firebase information into `extra` section (add it if it's not there)

```json
    ...
    "extra": {
      "firebase": {
        "apiKey": "<apiKey>",
        "authDomain": "<authDomain>",
        "projectId": "<projectId>",
        "appId": "<appId>",
        "databaseURL": "<databaseURL>"
      }
    }

```
These information will be read by expo and can access later from `Constants.manifest.extra.firebase`.

## Install required dependencies
```bash
expo install firebase expo-constants
```

`expo-constants` will allow you to use `Constants`.
```
import Constants from 'expo-constants'
```

*You must restart the simulator to start using `Constants`.*

## Initialize firebase and create a context

create `firebase.js` file
```javascript
// firebase.js
import * as firebase from "firebase";
import Constants from "expo-constants";

firebase.initializeApp(Constants.manifest.extra.firebase);

export const Firebase = {
  firebase,
  saveEvent: data => {
    const { id, ...remainProps } = data;
    firebase
      .database()
      .ref("events/" + id)
      .set({
        ...remainProps
      });
  }
};

export default Firebase;
```

then create a global context, which allow you access to `firebase` from every where

```javascript
// firebaseContext.js
import React from "react";

export const FirebaseContext = React.createContext({});

export const FirebaseProvider = FirebaseContext.Provider;

```

Edit your `App.js`
```javascript
// app.js
....
import { Firebase, FirebaseProvider } from "./app/firebase";
...
    <FirebaseProvider value={Firebase}>
    // your app
    </FirebaseProvider>
...

```

## Access firebase from every where
```javascript
// somewhere.js
...
import { FirebaseContext } from "../firebase";
...
  const firebase = React.useContext(FirebaseContext);
....
  firebase.saveEvent(payload);
...
```
