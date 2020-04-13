---
title: Maximum Sub-Array
date: 2020-04-12 00:00:00 +0300
tags: Algorithms, Swift
description: Maximum Sub-Array problem
mathjax: false
toc: true
---

Maximum Sub-Array problem

<!-- more -->

# Problem

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

```
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

## Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

## Ứng dụng của bài toán

- Đồ họa: Tìm vùng ảnh sáng nhất.

# Solution

Thuật toán Kadane

- Duyệt mảng từ trái qua phải

(1) với mỗi mảng con tính từ đầu tới vị trí hiện tại, xác định tổng chuỗi lớn nhất có thể của mảng con hiện tại.

(2) Các tổng chuỗi lớn nhất của các mảng con được so sánh với nhau để tìm ra tổng lớn nhất của cả mảng ban đầu.

---

(2) có thể thực hiện đơn giản bằng cách sử dụng một biến `best_sum` để chứa tổng lớn nhất của cả quá trình.

(1) khó giải thích hơn.
Do tính chất của bài toán yêu cầu tìm tổng của chuỗi liên tục. Nên (1) được thực hiện như sau.

Gọi mảng ban đầu là A[i], với i từ 0 -> n.

Xét tại vị trí `j`, `current_sum` đang chứa tổng lớn nhất theo chuỗi lớn nhất tìm được trong mảng con A[0:j-1].

```
current_sum = sum(A[k]...A[j-1]) (0 <= k <= j-1)
```

Tại đây, ta xem xét việc có thể tính thêm A[j] vào chuỗi hiện tại không? Điều kiện để A[j] được chấp nhận phụ thuộc vào tổng mới `current_sum + A[j]`.

- Nếu tổng này < A[j], thì A[j] trở thành tổng lớn nhất, và chuỗi cần tìm nên bắt đầu từ chính vị trí j.
- Nếu tổng này > A[j], thì có thể chấp nhận A[j], vì dù tổng mới có thể < `current_sum` ban đầu thì cũng có thể A[j+1] sẽ lại làm `current_sum` lớn hơn.

```swift
func max_sum(_ nums: [Int]) -> Int {
  var current_sum = 0
  var best_sum = Int.min
  var current_start = 0
  var best_start = 0
  var best_end = 0
  for (current_end, n) in nums.enumerated() {
    if current_sum  <= 0 {
      // start find  new sub-array from this position
      current_start = current_end
      current_sum = n
    } else {
      // update current max value
      current_sum += n
    }
    if best_sum <= current_sum {
      // found new best sum. record the position
      best_sum = current_sum
      best_start = current_start
      best_end = current_end
    }
        print("current_end: \(current_end), curent sum: \(current_sum), best sum \(best_sum)")

  }
  print("best range: \(best_start):\(best_end)")
  return best_sum
}
var input = [-2,1,-3,4,-1,2,1,-5,4]
print(max_sum(input))
input = [-2, -3, 4, -1, -2, 1, 5, -3]
print(max_sum(input))
```

# Result

```
202 / 202 test cases passed.
Status: Accepted
Runtime: 40 ms
Memory Usage: 21.2 MB
```
