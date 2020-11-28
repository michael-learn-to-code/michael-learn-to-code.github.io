---
title: Happy Number
date: 2020-04-12 00:00:00 +0300
tags: Algorithms, Swift
description: Happy Number problem
mathjax: false
imageId: ON2HazEg5rE
imageAuthor: Claudio Schwarz
toc: true
---

Write an algorithm to determine if a number n is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

<!-- more -->

# Problem

Write an algorithm to determine if a number n is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

```
Input: 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

# Solution

Ý tưởng ban đầu là:

- tách số thành từng chữ số
- Tính tổng bình phương của các chữ số
- Nếu tổng là 1 thì trả về True và dừng.
- Nếu tổng khác 1 thì lặp lại quá trình với tổng vừa tạo ra.

Vấn đề trong bài toán này thực ra lại đến từ điều kiện dừng cho trường hợp không phải là Happy number. Như quá trình được mô tả, thì nếu không phải là Happy number, quá trình sẽ lặp vô hạn.

Một số hướng để xác định điều kiện dừng:

## Cách 1

- Nếu tổng tạo ra ở bước 2 xuất hiện 2 lần mà không phải là 1 thì chắc chắn đó không phải là 1 Happy Number.

## Cách 2

Xuất phát từ 2 nhận xét:

- Trong quá trình tính, nếu tổng tạo ra là 1 Happy Number thì số ban đầu cũng là Happy Number.

- Trong quá trình tính, với số bước nào đó thì tổng tạo ra sẽ là số dương < 10.

Trong 10 số từ 0 -> 9, có thể thấy chỉ có số 1 và số 7 là Happy Number. Cụ thể:

(0) 0 -> 0 => Not Happy number

(1) 1 -> Happy Number

(2) 2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 -> Lặp lại => Not Happy Number

(3) 3 -> 9 -> 81 -> 65 -> 61 -> 37 -> 58 -> Lặp với 58 ở (2) => Not Happy Number

(4) 4 -> Not Happy number

(5) 5 -> 25 -> 29 -> 85 -> 89 -> Lặp lại với 89 ở (2) => Not Happy Number

(6) 6 -> 36 -> 45 -> 41 -> 17 -> 50 -> 25 -> Lặp ở (5) => Not Happy Number

(7) 7 -> 49 -> 97 -> 130 -> 10 -> 1 => Happy Number

(8) 8 -> 64 -> 52 -> 29 -> Lặp ở (5) => Not Happy Number

(9) 9 -> 81 -> 65 -> Lặp ở (3) => Not Happy Number

Nên, nếu trong quá trình tính, mà tổng xuất hiện 1 hoặc 7 thì có thể kết luận là Happy Number. Nếu tổng là 1 chữ số mà khác 1 và 7 thì không thể là Happy Number.

# Code

```swift
// extension Int type to calculate sum of square of its digits
extension Int {
  func happySum() -> Int {
    var result = 0
    for c in String(self) {
      let val = Int(c.asciiValue!) - 48
      result += val * val
    }
    return result
  }
}

func isHappyNumberV1(_ num: Int) -> Bool {
  // to store all sum
  var sumStored = [Int: Bool]()
  var sum = num
  var loopCount = 0
  repeat {
    if sum == 1 {
      print("Loop Count: ", loopCount)
      return true
    }
    if sumStored[sum] ?? false {
      print("Loop Count: ", loopCount)
      return sum == 1
    }
    sumStored[sum] = true
    sum = sum.happySum()
    loopCount += 1
  } while true
}

func isHappyNumberV2(_ num: Int) -> Bool {
  var sum = num
  var loopCount = 0
  repeat {
    if sum == 1 || sum == 7 {
      print("Loop Count: ", loopCount)
      return true
    }

    sum = sum.happySum()
    if sum < 10 {
      print("Loop Count: ", loopCount)
      return sum == 1 || sum == 7
    }
    loopCount += 1
  } while true
}

```

# Result

## For solution 1

```
401 / 401 test cases passed.
Status: Accepted
Runtime: 8 ms
Memory Usage: 21.1 MB
```

## For solution 2

```
401 / 401 test cases passed.
Status: Accepted
Runtime: 4 ms
Memory Usage: 21.8 MB
```
