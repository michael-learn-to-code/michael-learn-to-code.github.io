---
title: How to extend Material UI theme.
date: 2020-05-12 00:00:00 +0300
tags: Material, Theme, customize
description: How to extend Material UI Theme with new attribute
mathjax: false
imageId: 1V6jjk0MHvY
imageAuthor: luca anasta
toc: true
---

Material UI provides a great Theme utilities, which almost fulfill for every usage requirements. Here is the full options from `Theme` object, which can be used in styling:

<!-- more -->

# How to extend Material UI theme.

## Abstract

Material UI provides a great Theme utilities, which almost fulfill for every usage requirements. Here is the full options from `Theme` object, which can be used in styling:

![/how-to-extend-material-ui-theme/default.png](/how-to-extend-material-ui-theme/default.png)

## Problem

Now, I need to add a new attribute for my usage only. For example, I want to add a `custom` part like below:

```json
{
  "custom": {
    "palette": {
      "main": "red"
    }
  }
}
```

## Solution

### `theme.ts` file

```json
import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  custom: {
    palette: {
      main: "#222222",
    },
  },
} as ThemeOptions);

export default theme;
```

It looks like normal thing, but with new custom attribute. At this step, typescript will fire a type error at `custom`, because the input argument of `createMuiTheme` is `ThemeOptions`, which doesn't have any attribute named `custom`.

### Create typing file at `src/types/material-ui.d.ts`

```json
import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      palette: {
        main: string;
      };
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
      palette?: {
        main?: string;
      };
    };
  }
}
```

What happens here? It looks weird. But actually it just a declaration of inheritance, like :

```json
import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

interface XTheme extends Theme {
	custom: {
		palette: {
			main: string
		}
	}
}

interface XThemeOptions extends ThemeOptions {
	custom?: {
		palette?: {
			main?: string
		}
	}
}
```

It's a feature of Typescript, called `Module Agumentation`

[https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)

With all above code, we extends the `Theme` and `ThemeOptions` interface from `@materila-ui/core/styles/createMuiTheme` module by adding new attribute.

### Tell typescript to find types from `src/types`

Edit `tsconfig.json` file, make sure to edit `typesRoot` as below:

```json
{
  "compilerOptions": {
    "typeRoots": ["node_modules/@types", "src/types"]
  }
}
```

That's all.
