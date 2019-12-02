---
title: Get Started with React Native
date: "2019-12-01"
tags: React Native, typescript
---
In this post, I will learn to build a React Native app with typescript.

<!-- more -->

## First step, install Ignite Cli

Why Ignite? There are so many tools which try to support you to create a React Native app.
I tried with `Expo`, but it makes me feel uncomformatble.
There are so many *hidden magic* things that I don't *know*, they just happened.
So I go back to *Ignite*, which one I had used before.

```bash
yarn global add ignite-cli
```

This command will install `ignite` command, so that you can use to create a React Native project with some *default* source code structure.

**warning**: It could take a bit long time to finish.

## 2nd, create an app

![Not so big](/get-started-with-react-native/new_app.png)

It will take a while to done this process.

## 3nd, understand how navigation works

First, `index.js` is called, it transfer *request* to `app/app.tsx`. In app, it uses a Stateful navigator, which declared in `app/navigation/statefull-navigator.tsx`. In its turn, Statefull navigator is kind of wrapper for the Root Navigator. 
Root navigator is a Stack Navigator, which has primary stack defined in `app/navigation/primary-navigator.ts`.
Check this file, I see there are 2 screens: 'welcome' and 'demo'.

## 4th, first look of Welcome Screen code

The first thing I have to say is "too much" code. They defined styles as constants, and it's not my style :( .

```typescript

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
```

## Lessons learnt

1. They use `SafeAreaView` for footer, which could be helpful for iphone

```typescript
<SafeAreaView style={ FOOTER }>
    <View style={ FOOTER_CONTENT }>
        <Button
        style={ CONTINUE }
        textStyle={ CONTINUE_TEXT }
        tx="welcomeScreen.continue"
        onPress={ nextScreen }
        />
    </View>
</SafeAreaView>
```

1. They defined 2 presets for screen: 'fixed' and 'scroll'. And they extracted to a `Screen` component

So, if I want a scrollable screen, I will use

```ts
<Screen preset="scroll">
...
</Screen>
```
