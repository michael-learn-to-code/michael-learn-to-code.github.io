---
title: Recursive vs Dynamic Programming
description: Compare Recursive vs Dynamic Programming
keywords: recursive, dynamic programming, vs
date: 2020-04-22 00:00:00 +0300
imageId: kesOP4tet6Y
imageAuthor: Mario Mesaglio
tags: Swift,Algorithms
mathjax: false
toc: true
---

# Compare Recursive and Dynamic Programming

## Recursive

Lặp lại thuật toán trên tập dữ liệu nhỏ dần để thu được kết quả của tập dữ liệu lớn ban đầu.

Điểm đặc trưng là việc tính toán trên các tập dữ liệu nhỏ phải thực hiện lại nhiều lần trong quá trình giải.

Ví dụ: F(n) = F(n-1) + F(n-2) = F(n-2) + F(n-3) + F(n-2)

Thì F(n-2) bị gọi 2 lần

## Dynamic Programming

Lặp lại thuật toán trên tập dữ liệu nhỏ dần để thu được kết quả. Tuy nhiên kết quả của từng tập dữ liệu được lưu lại để sử dụng khi cần. Nhờ đó không phải lặp lại thuật toán 2 lần với cùng 1 tập dữ liệu.

F(n) = F(n-1) + F(n-2) = F(n-2) + F(n-3) + Fc(n-2) {from cache}

## Code

```swift
func fibRecursive(x: Int,_ count: inout Int) -> Int {
  count += 1
  if x == 0 {
    return 0
  }
  if x <= 2 {
    return 1
  }
  return fibRecursive(x: x-1, &count) + fibRecursive(x: x-2,  &count)
}
var count = 0
print(fibRecursive(x: 20,  &count))
print("Called: \(count)")

func fibDynamic(x: Int,cache: inout [Int: Int], _ count: inout Int) -> Int {
  count += 1
  if x == 0 {
    return 0
  }
  if x <= 2 {
    return 1
  }

  if let val = cache[x] {
    return Int(val)
  } else {
    cache[x] = fibDynamic(x: x-1, cache: &cache,  &count) + fibDynamic(x: x-2,cache: &cache, &count)
    return cache[x]!
  }
}

count = 0
print("Called: \(count)")
var cache: [Int: Int] = [:]
print(fibDynamic(x: 20, cache: &cache, &count))
print("Called: \(count)")
```

## Result

- Recursive function called **_13529_** times
- Dynamic function called **_37_** times
