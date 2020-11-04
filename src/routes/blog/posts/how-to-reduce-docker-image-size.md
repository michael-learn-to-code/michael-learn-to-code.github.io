---
title: How to reduce docker image size
date: 2020-06-11 00:00:00 +0300
tags: docker, container
description: How to reduce docker image size
mathjax: false
imageId: uBe2mknURG4
imageAuthor: guibolduc
toc: true
---

Docker is good but some times it take too much storage because of its images
The thing is we could reduce the image size

<!-- more -->

# Step 1: Choose a light base image

Normally, `alpine` or `busybox` are light images.

# Step 2: Multi-stages build

Seperate the build steps with deploy steps.

For example, with a js app you will need many libraries to build it into production code.
But these libraries doesn't help anything for running production code. So we shouldn't include them in production.

By using multi-stages build, we can use a stage to build the app. Then next stage just copy the production code.


