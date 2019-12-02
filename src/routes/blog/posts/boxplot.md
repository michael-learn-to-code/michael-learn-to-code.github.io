---
title: Understanding BoxPlot
image: /img/posts/understanding-boxplot.png
date: 2018-09-24 00:00:00 +0300
tags: data analytic, matplotib, boxplot
description: Giới thiệu về Boxplot
mathjax: true
toc: true
---

## Giới thiệu
boxplot là một loại biểu đồ thể hiện phân bố của một biến. Sử dụng boxplot, ta có thể thể hiện được:
- độ lớn
- độ lệch của phân bố
- khoảng dữ liệu
- các điểm ngoại lai
- các điểm cực

trên cùng một biểu đồ.

Boxplot cũng được sử dụng để so sánh 2 phân bố.

![](https://blogs.sas.com/content/graphicallyspeaking/files/2013/03/VBox4.png)
**https://blogs.sas.com/content/graphicallyspeaking/2013/03/24/custom-box-plots/**

## Cấu tạo
Boxplot được tạo lên dựa trên lý thuyết Five Number Summary. Trong đó, mỗi phân bố được thể hiện bởi 5 đặc trưng:
- Trung vị (Median)
- 2 điểm tứ phân vị (Quartiles)
- 2 điểm cực minimum và maximum

Xét một tập dữ liệu được sắp xếp sẵn $X={x_1, x_2, ..., x_n}$, trong đó $x_1$  là mẫu có giá trị nhỏ nhất, còn $x_n$ là mẫu có giá trị lớn nhất.

![](/boxplot/dataset.png)

### Trung vị
Trung vị (Median) là đại lượng giúp chia bộ dữ liệu thành 2 phần bằng nhau.

Chúng ta có khái niệm độ sâu của dữ liệu $x_i$ (depth of data) là đại lượng $min(i, n-i+1)$. Như vậy, Trung vị của bộ dữ liệu sẽ có vị trí là $\frac{n+1}{2}$. Với n là lẻ, thì vị trí đó là 1 số nguyên, còn với n là chẵn, thì vị trí đó là một phân số, cho nên sẽ được tính bằng trung bình của 2 điểm dữ liệu xung quanh $\frac{1}{2}(x_\frac{n}{2} + x_{\frac{n}{2}+1})$

Công thức:
$$
M=\begin{cases}
x_\frac{n+1}{2}\  if\  n \ odd \\
\frac{1}{2}(x_\frac{n}{2} + x_{\frac{n}{2}+1}) \  \ if\  n\ even
\end{cases}
$$

Trong dataset trên, $n=15$ cho nên $M=x_{\frac{n+1}{2}}=x_8=88$.

### Các điểm tứ phân vị

Trung vị chia bộ dữ liệu ban đầu thành 2 phần bằng nhau. Các điểm tứ phân vị chính là Trung vị của 2 bộ dữ liệu mới này. Với bộ dữ liệu đang xét, Trung vị chia nó thành 2 bộ dữ liệu:
- $x_1$ đến $x_8$
- $x_8$ đến $x_{15}$
Theo đó, các điểm tứ phân vị được tính như sau:
$$
F_L=Q1=\frac{1}{2}(x_\frac{8}{2} + x_{\frac{8}{2}+1})=\frac{1}{2}(x_4+x_5)=74
$$

$$
F_U=Q3=\frac{1}{2}(x_{\frac{n}{2}} + x_{\frac{n}{2}+1})=\frac{1}{2}(x_{11}+x_{12})=183.5
$$

Sải của bộ tứ phân vị được định nghĩa bằng công thức
$$
d_F = F_U - F_L = Q3 - Q1=109.5
$$
Sải được sử dụng để xác định khoảng giá trị hợp lệ. Ngoài khoảng này, dữ liệu sẽ bị coi là ngoại lai (outliers).

Khoảng giá trị hợp lệ được xác định bởi:
$Min=F_L - 1.5d_F=-90.25$
$Max=F_U + 1.5d_F=347.75$

### Hai điểm cực
$Minimum = 63$
$Maximum = 778$

=> Tông kết, chúng ta có đặc trưng của bộ dữ liệu như sau:
1. $Median = M = 88$
2. $Q1 = F_L = 74$
3. $Q2 = F_U = 183.5$
4. $Minimum = 63$
5. $Maximum=778$

Ngoài ra các thông tin khác bao gồm:
1. $Mean=m=\frac{1}{n}(\sum^N_{i=1}{x_i})=168.27$
2. $d_F=109.5$
3. $Lower\ bar = F_L - 1.5d_F$
4. $Upper\ bar=F_U+1.5d_F$

## Cách vẽ boxplot
1. Vẽ hình hộp với 2 cạnh đáy và đỉnh tương ứng là $F_L$ và $F_U$ (50% dữ liệu nằm trong khoảng này)
2. vẽ đường Median bằng nét liền, còn mean bằng nét đứt
3. Vẽ 2 râu tương ứng với Lower bar và Upper bar
4. Vẽ các điểm outliers với quy tắc: $\bullet$ nếu dữ liệu nằm ngoài khoảng $F_{U/L}\pm1.5d_F$ và $\star$ nếu dữ liệu nằm ngoài khoảng $F_{U/L}\pm3d_F$

![](/boxplot/boxplot_cities.png)


## Cách đọc boxplot
### Vị trí của Median
Vị trí tương đối của Median sẽ cho biết độ lệch (skewless) của dữ liệu.

![](https://develve.net/files/grafskewness.gif)

1. Median càng gần trung tâm thì dữ liệu càng cân bằng
2. Median lệch phía phải thì dữ liệu càng lệch âm (phải) (skewness < 0). Nghĩa là dữ liệu tập trung nhiều ở phía bên phải, là phía có giá trị lớn.
3. Median lệch phía trái thì dữ liệu bị lệch dương (trái) (skewness > 0). Nghĩa là dữ liệu tập trung nhiều ở phía trái, là phía có giá trị nhỏ.
4. Có thể dễ dàng nhìn thấy 2 điểm outliers. Do 2 điểm outliers này mà mean bị kéo ra xa khỏi median.

![](/boxplot/2018-09-24-stack.png)


## Tiếp theo
Trong thực tế, boxplot thường được sử dụng nhiều hơn để so sánh 2 phân bố khác nhau. Ví dụ so sánh phân bố của label với phân bố của các features. 
Tôi sẽ cập nhật thêm phần nay sau....

