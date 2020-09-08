---
title: Some tips with Mock in Unit Test
date: 2020-09-08 00:00:00 +0300
tags: python, unittest, mock
description: Some tips with Mock in Unit Test
mathjax: false
imageId: mcdUqbM9Hyk
imageAuthor: Joey Girouard
toc: true
---

Some tips with Mock in Unit-Test

<!-- more -->

# What should be patched?

## Context

I have a class, which import `login` from `django.contrib.auth`

```python
# mypackage/controller/login.py
from django.contrib.auth import login
...

```

And now I want to patch this `login` method, to avoid calling real method.
What should I do?

## Problem

In the first try, I tried with

```python
@patch('django.contrib.auth.login`)
```

then the result is:

```
  File "/usr/local/lib/python3.7/site-packages/django/contrib/auth/__init__.py", line 99, in login
    if SESSION_KEY in request.session:
AttributeError: 'WSGIRequest' object has no attribute 'session'
```

which means we still call to the real method.

## Solution

As you might know, when we import `login` in my file (file A), from other files I can import `login` method from file A instead of the `django.contrib.auth`.
That's the point. When I import `login` method in my `login.py` file, then call it later, I can say that "I'm using the `login` method from `login.py` file".
So to patch it, we have to do like that

```python
@patch("mypackage.controler.login.login")
```

That's the thing.
