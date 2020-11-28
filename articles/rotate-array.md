---
title: Rotate Array problem
date: 2020-05-20 00:00:00 +0300
tags: Algorithms, Swift
description: Rotate Array to k steps
keywords: algorithms,swift, rotateArray
mathjax: false
toc: true
imageId: iar-afB0QQw
imageAuthor: Markus Spiske
---

Rotate Array problem

Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

<!-- more -->

# Rotate Array problem

## Problem

Given an array, rotate the array to the right by k steps, where k is non-negative.

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
Example 2:

Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation:
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
```

Constraints:

```
1 <= nums.length <= 2 \* 10^4
It's guaranteed that nums[i] fits in a 32 bit-signed integer.
k >= 0
```

## Solution

```swift
func rotateArray(_ nums: inout [Int], _ k: Int) {
	// nothing to do with these cases
  if nums.count <= 1 || k <= 0 {
    return
  }

	// in case k is bigger than nums's size.
  let steps = k % nums.count
  // backup the tail
  let tail = Array(nums.suffix(steps))

	// shift k steps
  for index in stride(from: nums.count - 1, to: steps-1, by: -1) {
    nums[index] = nums[index-steps]
  }
	// override the head of array with the backed up tail.
  nums.replaceSubrange(0..<tail.count, with:tail)
}

var nums = [1,2,3,4,5,6,7]
rotateArray(&nums, 3)
print(nums)

```

![Rotate Array](/rotate-array/rotateArray.png)

## Result

```
35 / 35 test cases passed.
Status: Accepted
Runtime: 56 ms
Memory Usage: 21.3 MB
```
