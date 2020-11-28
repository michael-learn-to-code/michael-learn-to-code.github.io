---
title: Lesson learnt from working with gatsby
date: 2019-12-02
tags: React, Gatsby
---

## Lessons

### How to define environtment variables

- create env file `env.{development|production}`
- input `GATSBY_{VARIABLE_NAME}={variable_value}`
- `gatsby` will automatically assigns theme into `process.env`

*note*:
- variable must be primitive : string, number
- must prefix by `GATSBY_`

### Get type definition of object.
```
export type RootState = ReturnType<typeof rootReducer>
```

if you don't know how to declare the type definition, just use this.
