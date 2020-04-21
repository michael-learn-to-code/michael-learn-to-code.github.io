---
title: Move zeros
date: 2020-04-13 00:00:00 +0300
tags: Algorithms, Swift
description: Move Zeros problem
mathjax: false
toc: true
imageId: iar-afB0QQw
imageAuthor: Markus Spiske
---

Move Zeros problem
Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

<!-- more -->

# Problem

Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Example:

```
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
```

Note:

You must do this in-place without making a copy of the array.
Minimize the total number of operations.

# Solution

Ý tưởng đầu tiên là duyệt mảng từ trái qua phải, khi gặp phần tử là 0 thì move phần tử này về cuối mảng. Thao tác move = append + remove.

```swift
func moveZeros(_ nums: inout [Int]) {
  var startIndex = 0
  var count = nums.count - 1
  repeat {
    if nums[startIndex] == 0 {
      nums.remove(at: startIndex)
      nums.append(0)
    } else {
      startIndex += 1
    }
    count -= 1
  } while count > 0
}
```

Ý tưởng thứ 2 là, khi gặp phần tử khác 0 thì dịch phần tử này sang trái với số bước là số phần tử 0 đứng trước phần tử hiện tại. Thao tác dịch = swap 2 phần tử.

```swift
func moveZerosV2(_ nums: inout [Int]) {
  var count = nums.count
  if count <= 1 {
    return
  }
  var zeroCount = 0
    for i in 0..<count {
      if nums[i] == 0 {
        zeroCount += 1
      } else {
        if zeroCount > 0 {
// shift to left `zeroCount` step
        nums[i - zeroCount] = nums[i]
        nums[i] = 0
        }
      }
    }
}
```

# Result

```
21 / 21 test cases passed.
Status: Accepted
Runtime: 40 ms
Memory Usage: 21.5 MB
```
