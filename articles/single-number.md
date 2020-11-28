---
title: Single Number
date: 2020-04-12 00:00:00 +0300
tags: Algorithms, Swift
description: Single Number problem
mathjax: false
toc: true
---

Single Number problem

<!-- more -->

# Problem

Given a non-empty array of integers, every element appears twice except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

Example 1:

```
Input: [2,2,1]
Output: 1
```

Example 2:

```
Input: [4,1,2,1,2]
Output: 4
```

# Solution

Suy nghĩ đầu tiên là duyệt mảng, và đếm số lần xuất hiện của từng phần tử. Tuy nhiên, chắc chắn độ phức tạp không thể là linear và phải sử dụng thêm bộ nhớ.

Phương pháp được gợi ý là sử dụng phép toán bit XOR với tính chất:

- a XOR a = 0
- a XOR 0 = a

Với mảng đầu vào có đặc điểm là các phẩn tử xuất hiện tối đa 2 lần, chỉ một phần tử xuất hiện 1 lần.

Lời giải là đơn giản duyệt mảng và áp dụng phép toán bit XOR với từng phần tử, kết quả cuối cùng sẽ là phần tử xuất hiện 1 lần trong mảng.

```swift

func singleNumber(_ nums: [Int]) -> Int {
    var res = 0
    for i in 0..<nums.count {
        res = res ^ nums[i]
    }
    return res
}

```

# Result

```
16 / 16 test cases passed.
Status: Accepted
Runtime: 80 ms
Memory Usage: 21.3 MB
```
