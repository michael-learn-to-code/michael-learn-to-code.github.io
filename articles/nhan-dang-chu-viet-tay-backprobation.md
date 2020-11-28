---
layout: post
title: Nhận dạng chữ viết tay với Back-propagation
image: /img/posts/convulation-network-mnist.png
date: 2018-10-07 00:00:00 +0300
tags: Machine learning, Mnist, Yann Le Cun, pytorch, Convulation
mathjax: true
comment: true
toc: true
categories:
- Machine learning
- pytorch
---


## Reading Paper: 
Y. Le Cun, B. Boser, J. S. Denker, R. E. Howard, W. Habbard, L. D. Jackel, and D. Henderson. 1990. Handwritten digit recognition with a back-propagation network. In Advances in neural information processing systems 2, David S. Touretzky (Ed.). Morgan Kaufmann Publishers Inc., San Francisco, CA, USA 396-404.

## Mở đầu

Một network dựa trên back-propagation có thể giải quyết bài toán nhận dạng chữ viết tay mà không cần các bước tiền xử lý ảnh quá phức tạp.

Kiến trúc mạng ảnh hưởng lớn đến tính tổng quát của mô hình. Mô hình muốn tổng quát thì cần được thiết kế dựa trên một lượng kiến thức biết trước về bài toán đang giải quyết.

Nguyên lý thiết kế cơ bản đó là giảm số lượng tham số tự do (free parameters, được xác định nhờ thuật toán học) mà không giảm hiệu năng tính toán

## Bài toán

Đầu vào là các bức ảnh chữ số (viết tay, hoặc in), màu đen trắng. Chữ số được tiền xử lý để phân biệt rõ ràng với nền. Yêu cầu là nhận diện chữ số được thể hiện trong ảnh. Tức là phân loại ảnh vào 1 trong 10 loại đại diện cho 10 chữ số từ 0 đến 9.
Về mặt toán học, bài toán có đầu vào là ma trận ảnh 2 chiều, còn đầu ra là vector 1 chiều thể hiện phân loại.

## Dữ liệu

Bộ dữ liệu có tổng cộng 9298 ảnh các chữ số đã được tách riêng từ hình ảnh mã bưu điện của bưu điện Buffalo, New York. 

Các chữ số được viết bởi nhiều người, với nhiều kích thước khác nhau. Cách viết cũng như phương thức viết và mức độ cẩn thận khi viết cũng rất đa dạng. 

Bộ dữ liệu được tạo bởi 3349 hình ảnh, với 35 loại font khác nhau. 

Dữ liệu train gồm 7291 hình ảnh số viết tay và 2549 số in. Còn lại 2007 số viết tay và 700 số in được sử dụng làm dữ liệu test. Font chữ của dữ liệu train và dữ liệu test cũng khác nhau.

## Tiền xử lý

Dữ liệu ban đầu đã được chuẩn bị khá tốt. Tất nhiên để có được dữ liệu này thì đã tốn rất nhiều công sức.
Dữ liệu gốc ban đầu có kích thước rất đa dạng, nhưng thường trong khoảng 40x60. Do network cần đầu vào có kích thước cố định, nên bắt buộc phải chuẩn hóa kích thước của dữ liệu. 

Việc chuẩn hóa được thực hiện bằng phép biến đổi tuyến tính, làm cho ảnh vừa với kích thước 16x16, và giữ nguyên tỉ lệ. Việc chuẩn hóa được thực hiện sau khi đã loại bỏ hết những ký hiệu không liên quan khỏi ảnh.

Sau phép biến đổi tuyến tính, ảnh không còn là binary nữa mà trở thành multiple gray levels. Do đó, tác giả thực hiện tiếp tiền xử lý (scale và translate) để đưa gray level về trong khoảng -1 và 1.

## Cấu trúc network

Network nhận đầu vào là ma trận 16x16. Đầu ra là 1 vector 10 phần tử, hình ảnh ban đầu thuộc loại nào thì vị trí đó sẽ có giá trị 1, còn lại có giá trị -1.

![png](/2018-10-lenet-5/LeNet-5-original.png)

Trong bài toán nhận dạng mẫu (pattern recognition) thì việc phát hiện và kết hợp các đặc trưng cục bộ (local features - hay là các đặc trưng trong phạm vi hẹp) đem lại hiệu quả lớn. 

Ngoài ra, xem xét đặc điểm của dữ liệu đầu vào, tác giả nhận thấy nếu 1 bộ tách đặc trưng tỏ ra có hiệu quả ở 1 vùng ảnh, thì có khả năng cao là nó sẽ có hiệu quả ở cả những chỗ khác. Nguyên nhân là các chữ số bị lệch, nghiêng có thể chỉ hơi lệch khỏi vị trí chuẩn một chút thôi.

Giải pháp là sử dụng tích chập (convulation) với kernel có size nhỏ, di chuyển trên toàn bộ ảnh đầu vào, rồi thực hiện làm bằng (squashing) tạo ra một ma trận kết quả gọi là feature map.

Quá trình này có thể thực hiện song song bằng cách triển khai feature map như một mặt phẳng trên đó tất cả các neuron đều có vector trọng số giống nhau. Khi cho ảnh gốc đi qua feature map, các neuron sẽ thực hiện các tương tác giống nhau trên các khu vực khác nhau của ảnh. Có thể hiểu là Feature map trờ thành 1 mặt phẳng, trên đó chúng ta dàn đều các neuron giống hệt nhau. Khi ốp mặt phẳng này lên ảnh gốc, mỗi neuron sẽ xử lý vùng ảnh trùng với vị trí của nó. Và xử lý của các neuron đối với các vùng ảnh là như nhau.

Giải pháp này đem lại 2 lợi ích quan trọng:

- Do rất nhiều đơn vị neuron có chung trọng số nên số lượng tham số tự do sẽ giảm đi rất nhiều

- Hệ thống có khả năng thích nghi với các dịch chuyển ở đầu vào. Khi đầu vào dịch chuyển, thì kết quả trên feature map cũng dịch chuyển tương tự, nhưng feature map không thay đổi. 

Trong thực tế, luôn cần nhiều feature map, để thực hiện những biến đổi khác nhau trên ảnh gốc.

Với mô hình này, Input được chỉnh về kích thước 28x28. (Mình chưa hiểu nguyên nhân tại sao lại là 28x18. Ban đầu là 16x16, nếu dùng filter 5x5, thì chỉ cần padding thành 26 = 16+ 5*2 là đủ rồi chứ nhỉ? Có thể là bias = 1 vào 2 phía nữa ko ta?)

Layer đầu tiên là một bộ filter 4 kênh 5x5, sau khi qua filter, ta thu được 4 feature map với kích thước 24x24. Do ảnh đã được padding sẵn từ đầu (từ 16x16 lên 28x28), nên bộ filter sẽ được khai báo với tham số: kernel_size = 5, padding = 0, stride = 1.

=> 
$$N_{out}=\frac{N_{in}+2*padding - kerner\_size}{stride} + 1=\frac{28+0-5}{1}+1=24$$

Sau khi đi qua filter, kết quả được làm bằng với thao tác average/subsampling. Tức là sử dụng nn.AvgPool, với tham số: kernel_size=2, padding = 0, stride = 2.
kernel_size = 2 và stride=2 thì không có pixel nào được tính 2 lần.

=>
$$
N_{out} = \frac{N_{in} + 2*padding - kerner\_size}{stride} + 1=\frac{24+2*0-2}{2} + 1 = 12
$$

Layer tiếp theo tiếp tục tập trung vào các đặc trưng cục bộ để tạo ra các đặc trưng có độ phức tạp và độ trừu tượng cao hơn. 

Điểm thú vị là các đặc trưng về sau dần dần không bị tác động bởi vị trí. Điều này sẽ giúp mô hình hoạt động hiệu quả với sự thay đổi nhỏ về vị trí của ảnh đầu vào (lệch, nghiêng,...). Để đạt được điều này, sau mỗi feature map (hay feature extractor), tác giả cài đặt thêm một layer để thực hiện làm bằng cục bộ (local average) và lấy mẫu (subsampling) giúp làm giảm chiều của feature map.

Như vậy, layer tiếp theo được xây dựng bởi bộ filter 3 kênh, với size 5x5, padding = 0, stride = 1,

=> 
$$N_{out}=\frac{N_{in}+2*padding - kerner\_size}{stride} + 1=\frac{12+0-5}{1}+1=8$$

Và tiếp tục sử dụng average/subsampling với kernel_size=2, padding =0, stride = 2.

$$
N_{out} = \frac{N_{in} + 2*padding - kerner\_size}{stride} + 1=\frac{8+2*0-2}{2} + 1 = 4
$$

Đầu ra là bộ 12 feature map với size 4x4. 

Layer cuối sẽ là một fully connected layer để cho ra vector với size = 10.  Ở đây có thể sử dụng nn.Linear, với input_size = 12x4x4, và output_size = 10. Sau đó dùng sigmoid để chuyển thành xác suất.


## Random notes:

- Mặc dù đây là bài báo rất cũ, và mô hình network này cũng không phải là LeNet-5, nhưng có rất nhiều thứ có thể học và hiểu thêm.

- Vì sao dùng filter với size 5x5?
    Size của filter thực chất là phạm vi được coi là "cục bộ". 5x5 có nghĩa là ta xem xét 24 pixel xung quanh là có liên quan với pixel đang xét.

- Việc tính tích chập, có thể thực hiện song song hay là 1 thao tác duy nhất mà không cần for each để dịch filter qua từng phần của ảnh như lý thuyết. Có lẽ điều này đã được tối ưu bởi các thư viện.

- Do đặc trưng của dữ liệu, mình nghĩ việc detect viền và các cạnh trong bài toán này sẽ có hiệu quả. Tuy nhiên không rõ khi khai báo nn.Conv2d thì pytorch sẽ khởi tạo filter theo quy tắc nào hay là random? Liệu có cho phép khai báo filter custom ko?

- Tích chập bản chất là các phép biến đổi và xử lý ảnh.
