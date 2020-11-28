---
title: Manage python environments with Conda
date: 2020-05-22 00:00:00 +0300
tags: python, conda
description: Some notes about how to manage python environment with Conda
mathjax: false
imageId: StjfZnpGcyQ
imageAuthor:  Josh Appel
toc: true
---

In this post, I want to share some quick notes about managing python environment with Conda

<!-- more -->

# Manage python environments with Conda

## Create environment

```swift
conda create -n <name> python=<python_version>
```

## Activate environment

```swift
conda activate <name>
```

## deactivate environment

```swift
conda deactivate
```

## install packages

```swift
pip install <package>
```

## export environment

```swift
conda env export --no-builds > environment.yml
```

`--no-builds` argument will remove all current platform information from exported environment, so that you can restore the environment on other platform with no issues.

## restore environment

```swift
conda env update
or
conda env create -f environment.yml
```

Sometimes, when trying restore the environment on other machine, you got an error about *ResolvePackageNotFound*. Then the root cause is you environment.yml file includes some specified-platform build information. You should try to remove all versions information from packages. Or better, try to export environment with `--no-builds` argument.

## remove environment

```swift
conda remove --name <name> --all
```