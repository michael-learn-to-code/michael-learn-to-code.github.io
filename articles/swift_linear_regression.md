---
title: Linear Regression notes
date: 2020-05-01 00:00:00 +0300
tags: Linear Regression, Swift
description: Implement Linear Regression problem with Swift
keywords: linear regression, swift, machine learning
imageId: OlxJVn9fxz4
imageAuthor: Ryan Stone
mathjax: true
toc: true
---

Trong note này, tôi muốn cố gắng sử dụng Swift để giải bài toán Linear Regression. Mục đích chính không phải để sáng tạo ra cái gì mới.
Về cơ bản chỉ là để học Swift.

<!-- more -->

# Linear Regression Note

## Công thức nghiệm

$$\mathbf{w} = \mathbf{A}^{\dagger}\mathbf{b} = (\mathbf{\bar{X}}^T\mathbf{\bar{X}})^{\dagger} \mathbf{\bar{X}}^T\mathbf{y}$$

## Cài đặt code

### Tạo tensor X và y

```swift
import TensorFlow

// python:
// height (cm)
// X = np.array([[147, 150, 153, 158, 163, 165, 168, 170, 173, 175, 178, 180, 183]]).T
// weight (kg)
// y = np.array([[ 49, 50, 51,  54, 58, 59, 60, 62, 63, 64, 66, 67, 68]]).T
var X: Tensor<Int32> = Tensor.init(stacking: [[147, 150, 153, 158, 163, 165, 168, 170, 173, 175, 178, 180, 183]], alongAxis: 1)
var y: Tensor<Int32> = Tensor.init(stacking: [[49, 50, 51,  54, 58, 59, 60, 62, 63, 64, 66, 67, 68]], alongAxis: 1)
```

Shape của X là 13x1, tức là 1 tensor với chiều thứ nhất là 13 điểm dữ liệu, chiều thứ 2 là các feature, có 1 feature duy nhất.

Shape của y là 13x1, với chiều thứ nhất là 13 điểm dữ liệu, chiều còn lại là là label

### Tạo Xbar

```swift
// # Building Xbar
// one = np.ones((X.shape[0], 1))
// Xbar = np.concatenate((one, X), axis = 1)

var ones: Tensor<Int32> = Tensor.init(ones: X.shape)
let Xbar: Tensor<Int32> = Tensor(concatenating: [X, ones], alongAxis: 1)
```

Để thêm 1 vào tất cả các điểm dữ liệu ban đầu, cần tạo 1 tensor toàn 1 với shape = shape của X. sau đó nối tensor này với X, theo trục tọa độ 1 (trục tọa độ 1 tương ứng với chiều dữ liệu thứ 2 của tensor).

Notes:

- Tại sao dùng từ `tensor` thay vì ma trận?
  - Không phải để cho ngầu, mà để cho quen thôi.
- alongAxis =1 nghĩa là gì? Nối 2 tensor theo chiều thứ 2 (0 là chiều thứ nhất). Chiều thứ 2 ở đây là số feature, như vậy Xbar là tensor có shape = 13x2, với 2 là số feature.

### Calculate the root

```swift
var np_xbar_t = XbarTransposed.makeNumpyArray()
var np_xbar = Xbar.makeNumpyArray()
var np_y = y.makeNumpyArray()

// A = t(X)X
var A = np.dot(np_xbar_t, np_xbar)
// b = t(X)y
var b = np.dot(np_xbar_t, np_y)
// w = pinv(A)b
var w = np.dot(np.linalg.pinv(A), b)
```

### Calculate error (RMSE)

Giá trị càng nhỏ càng tốt. 

$$RMSE = \sqrt{\sum_{i=1}^{N}\frac{(y_i - \hat{y_i})^2}{N}}$$

```swift
rmse = np.sqrt(np.mean(np.power(np.dot(np_xbar, w) - np_y, 2)))
```

## Notes

Mặc dù swift được cho là nhanh hơn python, tuy nhiên việc viết lại numpy = swift dường như là không cần thiết. Vì bản thân numpy đã được phát triển và tối ưu bằng C/C++ rồi.

