---
layout: post
title: Perceptron Learning Algorithm Story
image: /img/posts/perceptron-learning-algorithm-story.png
date: 2018-09-17 00:00:00 +0300
tags: Machine learning, PLA
mathjax: true
comment: true
toc: true
categories:
- Machine learning
---

## Mô tả thuật toán

Ngày xửa ngày xưa, khi chúa có ý định tạo ra loài người, ngài đã suy nghĩ rất hung. Người phải có đực có cái. Nhưng đứa nào cũng mồm ngang mũi dọc, làm sao mà phân biệt được đực cái. Thế là ngài mới ngồi viết ra một danh sách những tiêu chí đánh giá một con người. Dựa trên danh sách này, mỗi con người ra đời, chúa sẽ đối chiếu với từng tiêu chí, rồi cộng lại, chia đôi, nhân với pi, trừ đi gamma, làm tròn rồi nhân với lambda thì ra một số. Xét dấu của số đó để xác định đực cái.

Hơi nhức đầu, ấy thế mà vẫn có lúc nhầm. 

Nhiều lúc, sau khi đối chiếu, tính toán nát nước, đến lúc đối chiếu kết quả với cái chỗ giữa 2 chân của con người thì hóa ra không phải. Mỗi lần như thế, chúa lại phải sửa lại bảng đối chiếu của mình, bỏ tiêu chí này, thêm tiêu chí nọ, ưu tiên tiêu chí đó nhiều hơn, ưu tiên tiêu chí đấy ít hơn. Mệt. Cứ như vậy, sau mấy nghìn năm, qua thực tiễn ứng dụng với mấy trăm triệu con người. Bảng tiêu chí của chúa mãi vẫn chưa thể hoàn thiện được. Hàng năm vẫn có hàng trăm con người sinh ra mà không khớp với bảng tiêu chí của ngài, mỗi lần như vậy, ngài lại cặm cụi tính toán, chỉnh sửa. 

Haizz, có lẽ đến lúc nào đó, ngài sẽ nhận ra, bảng tiêu chí của ngài có thể đầy đủ, nhưng ngài đã nhầm ở 1 điểm quan trọng. Ngài đã giả sử là loài người chỉ có đực với cái. Nhỡ đâu, còn có đực đực, cái cái, đực cái, cái đực, đực đực cái, đực cái đực,...!!!!
Nếu thế, chắc ngài nên quay lại kiểm tra lại cái máy tạo loài người xem nó hoạt động còn đúng không đã.

## Toán học

Thuật toán được tóm tắt như sau:
```python
w = np.random.randn(input_size, 1)
while True:
	# mix data 
    mix_id = np.random.permutation(N)
    for i in range(N):
	xi = data[:, mix_id[i]].reshape(input_size, 1)
    yi = y[0, mix_id[i]]
    if np.sign(np.dot(w.T, xi))[0] != yi: # misclassified point
         mis_points.append(mix_id[i])
         w = w + yi*xi
    if np.array_equal(np.sign(np.dot(w.T, x)), y):
	    break

```

1. Khởi tạo vector hệ số $$w$$ với các hệ số gần 0
2. Duyệt ngẫu nhiên qua từng điểm dữ liệu $$x_i$$
	- Nếu $x_i$ được phân loại đúng  $$sgn(\mathbf{w}^T\mathbf{x_i})=y_i$$ thì duyệt tiếp điểm dữ liệu khác
	- Nếu $$x_i$$ bị phân loại sai, thì cập nhật lại vector hệ số $$w$$ với công thức
$$
\mathbf{w}=\mathbf{w}+y_i\mathbf{x_i}
$$
  3. Kiểm tra xem có điểm nào bị phân loại sai không. Nếu còn thì quay lại bước 2