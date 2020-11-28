---
layout: post
title: Hiểu về neuron
image: /assets/img/posts/hieu-ve-neuron.gif
date: 2018-09-21 00:00:00 +0300
tags: Machine learning, Neuron
mathjax: true
comment: true
imageId: OgvqXGL7XO4
imageAuthor: Hal Gatewood
description: understanding neural network
keywords: neural network, neuron, machine learning
toc: true
categories:
  - Machine learning
---

# Cách thức hoạt động của neuron

## Cấu tạo

Mỗi Neurol gồm 3 phần chính:

- Thân: là nơi đưa ra quyết định dựa trên tín hiệu đầu vào.
- Các sợi nhánh: là các đầu mối tiếp nhận thông tin từ các neurol khác
- 1 sợi chính: truyền thông tin đầu ra đến 1 neurol khác thông qua 1 xi-nap.

Xi-nap (synaptic) là 1 khớp nối thần kinh được hình thành để kết nối 2 neuron. Khớp nối này không cố định.

## Quá trình xử lý thông tin

Các neuron nhận thông tin đầu vào từ các sợi nhánh. Mỗi sợi nhánh có một mức độ ảnh hưởng nhất định (gọi là trọng số). Các thông tin được đưa vào thân để tạo ra tín hiệu đầu ra.

Tín hiệu này đi theo sợi chính. Sợi chính tạo một kết nối với 1 neuron khác (gọi là synaptic) và truyền tín hiệu qua neuron đó.

Các sợi nhánh chính là thể hiện của vector trọng số. Các dữ liệu đầu vào được nhân lần lượt với các trọng số tương ứng.

$$ z = \sum{\mathbf{x_i}\mathbf{w_i}}$$

Sau đó neurol sẽ tạo ra tín hiệu đầu ra tương ứng

$$ y = h(z) $$

Tuyệt nhỉ, một hiện tượng tự nhiên được mô hình lại bằng một công thức toán học ngọn gàng.

## Mấy loại neuron cơ bản

Năm 2018 trước Công Nguyên, ở đất nước lọ, thành phố chai, có một nàng công chúa xinh đẹp. Nàng ta xinh như hoa, lại có nụ cười tỏa nắng. Nhân dân nơi đó mới gọi nàng là nàng Hớn (Hở).
Ngày nọ, Hớn ta đăng tin tuyển phu đánh xe ngựa, chức danh gọi là Phò Mã. Trai gái trong vùng nô nức nộp hồ sơ dự tuyển.

### Linear

Ban đầu, nàng nghĩ, mình cũng hơi nhừ, giờ mà đòi hỏi nhiều chắc cũng khó. Nên đứa nào nộp hồ sơ nàng cũng duyệt, bất kể xấu đẹp, cao thấp,....

$$ h(z)=z$$

trong đó:
$$z=zai$$
$$h=hóng?$$

![](https://blog.zaletskyy.com/Media/Default/NeuralNetworks/LinearNeuronGraph.png)

### Binary threshold

Nhưng thời buổi nữ ít hơn nam, hồ sơ nộp vào nhiều không kể siết. Nàng thở dài buồn bã, cứ duyệt hồ sơ thế này, thì duyệt xong mình cũng già mất. Thế nên nàng nghĩ mình phải đòi hỏi cao hơn một chút. Anh nào trên mét 8 thì cho qua vòng gửi xe, thấp hơn thì lượn khỏi mắt bà.

$$
h(z)=\begin{cases}
1 \ \ if\ z \ge \theta\\
0 \ \ o.w.
\end{cases}
$$

Để cuộc sống đơn giản hơn, cô nàng quy kết luôn tiêu chuẩn trên mét 8 là giá trị cốt lõi, là lối sống của mình, dưới mức đó là không tồn tại.

$$
b=-\theta
$$

và

$$
z=b+\sum{\mathbf{x_i}\mathbf{w_i}}
$$

khi đó, lựa chọn của nàng cũng sẽ đơn giản hơn.

$$
h(z)=\begin{cases}
1 \ \ if\ z \ge 0\\
0 \ \ o.w.
\end{cases}
$$

![](https://blog.zaletskyy.com/Media/Default/NeuralNetworks/binaryNeuron.png)

### Rectified Linear

Đen cho nàng, có vẻ như việc tuyển chọn với những tiêu chí đơn giản lại không mang lại hiệu quả lắm. Sắp Valentine đến nơi mà vẫn có quá nhiều hồ sơ phải lựa chọn. Cũng dễ hiểu thôi, khi mà Vinamilk đã trở thành 1 trong những tập đoàn lớn nhất cả nước, thì lẽ dĩ nhiên số nam thanh niên cao trên mét 8 cũng phải nhiều gấp mấy nghìn lần số con bò được nuôi trên trang trại sữa. Nhận thấy tình hình có vẻ phức tạp hơn so với dự tính, nàng quyết định thay đổi chính sách. Cao thôi chưa đủ, phải đập chai đập lọ nữa. Càng đẹp trai thì chị càng thương.

$$
h(z)=\begin{cases}
z \ if z \gt 0 \\
0 \ o.w.
\end{cases}
$$

![](https://cdn.tinymind.com/static/img/learn/relu.png)

### Sigmoid

Nhưng đời không như là mơ.
Trải qua dăm chục cuộc tình với bọn zai đẹp, nàng mới lấy làm lạ. Chả phải thằng nào đẹp cũng ngon. Nhiều thằng đẹp thì trăng hoa, bắt cá 2 tay 3 chân. Lại có thằng đẹp nhưng lại xấu tính, yêu bản thân hơn yêu nàng. Trong khi đó, có những thằng thấp lùn đứng lơ ngơ ở bãi gửi xe (vì bị loại) thì lại tốt tính, biết ga lăng với nàng, biết quan tâm đến nàng. Có thằng không chỉ nhớ sinh nhật của nàng, mà còn biết cả chu kỳ của nàng!
Thế là nàng lại thay đổi, thôi thì thấp một tí cũng không sao, thấp thì hôn không phải kiễng chân cũng tốt.

$$
h(z)=\frac{1}{1+e^{-\mathbb{z}}}
$$

![](https://upload.wikimedia.org/wikipedia/commons/8/88/Logistic-curve.svg)

Tuy vậy, bản tính háo sắc của nàng vẫn mạnh hơn, zai càng cao to đẹp trai thì nàng càng ưu ái. Thấp lùn xấu xí thì nàng chỉ liếc nửa con mắt.

Và thế là, cho đến năm 2018, người ta vẫn còn nhìn thấy thông báo tuyển chồng của nàng.

## Câu hỏi

### Tại sao y luôn có giá trị trong khoảng 0-1

Trả nhời: Để việc training sớm hoàn thành, thì hàm số nên sớm hội tụ. Hàm muốn mau hội tụ, thì các giá trị số nên nhỏ trong khoảng 0-1.

### Có rất nhiều dạng hàm số, tại sao lại chọn 4 loại hàm số này?

Trả nhời:
Có lẽ dựa trên tự nhiên.
Trong cuộc sống hàng ngày, có nhiều thông tin mà chúng ta tiếp nhận một cách vô thức, hoặc không qua xử lý như xúc giác, khứu giác (ngửi thấy thối là lập tức nhăn mặt ngay). Hàm Linear ứng với loại thông tin này.

Bên cạnh đó, một số thông tin bị lọc bỏ (cũng vô thức). Ví dụ tia hồng ngoại, hạ âm là những thứ mà chúng ta bỏ qua. Hàm Binary threshold ứng với loại này.

Với âm thanh, cảm xúc của chúng ta thay đổi tỉ lệ với biên độ của thông tin đầu vào. Âm thanh vừa phải thì nghe nhẹ nhàng, càng to thì càng khó chịu. Nhỏ dưới mức hạ âm thì chả nghe thấy gì. Hàm Rectified Linear ứng với loại này (hơi khiên cưỡng. Nhỉ?)

Sigmoid thì hơi khó :(.
