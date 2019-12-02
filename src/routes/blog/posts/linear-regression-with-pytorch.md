---
layout: post
title: Linear Regression with Pytorch
image: /assets/img/posts/linear-regression-with-pytorch.png
date: 2018-10-06 00:00:00 +0300
tags: Machine learning, Linear Regression, pytorch
mathjax: false
comment: true
toc: true
categories:
- Machine learning
- Linear Regression
- pytorch
---

## Khai báo model

1. Khai báo class của model

```python
class MyLinearRegression(nn.Module):
    def __init__(self, in_features, out_dim):
        super(MyLinearRegression, self).__init__(self)

        self.linear = nn.Linear(in_features, out_dim)

```

nn.Module sẽ mô tả mô hình. Ở đây tôi khai báo mô hình chỉ có 1 layer Linear, với 2 tham số là số chiều của đầu vào và số chiều của đầu ra.

2. Khai báo hàm `forward`

Một mô hình nhất thiết phải có hàm forward, hàm này ứng với bước tính đầu ra dự đoán của mô hình hiện tại. Sau đó chúng ta sẽ sử dụng đầu ra này để đối chiếu với đầu ra thực tế để xác định sai số của mô hình.

```python
def forward(self, x):
        output = self.linear(x)
        return output
```

## Khai báo hyper parameters

Trước khi thực hiện training, ta cần khai báo một số hyper parameter cho quá trình này, bao gồm:

- số epochs: 1000
- số chiều của dữ liệu vào: in_features = 1
- số chiều của dữ liệu đầu ra: out_dim = 1
- learning rate: 1e-4

## Khai báo hàm mất mát, thuật toán tối ưu

Tiếp đến là hàm mất mát,

```python
loss_func = nn.MSELoss() # Mean Squared Error
```

Thuật toán tối ưu, tôi sử dụng SGD
```python
optimiser = torch.optim.SGD(model.parameters(), lr=lr)
```

## Tiến hành train

```python
model = MyLinearRegression(in_features, out_dim)
criterion = nn.MSELoss()
optimiser = torch.optim.SGD(model.parameters(), lr=lr)
x_train = torch.from_numpy(x)
y_train = torch.from_numpy(y)
for epoch in range(num_epochs):
    inputs = Variable(x_train)
    target = Variable(y_train)

    # forward
    out = model(inputs)
    loss = criterion(out, target)
    # backward
    optimiser.zero_grad()
    loss.backward()
    optimiser.step()

    if (epoch+1) % 20 == 0:
        print('Epoch[{}/{}], loss: {:.6f}'
              .format(epoch+1, num_epochs, loss))
```

Quá trình train diễn ra như sau:
- với mỗi epoch,
    - tính giá trị đầu ra
    - tính loss
    - thực hiện backward:
        - xóa gradient cũ
        - tính gradient mới (tính đạo hàm)
        - thực hiện tối ưu bảng trọng số dựa trên gradient (Mình chưa hiểu loss và optimiser liên kết với nhau như thế nào?)

## Random thoughts

- Quá trình train có thể hiểu là dựa trên việc truyền tham chiếu. Ví dụ, khi khai báo `optimiser = torch.optim.SGD(model.parameters(), lr=lr)`, ta đã truyền tham chiếu của tập parameters của model cho optimiser, do đó, khi gọi `optimiser.step()`, optimiser sẽ cập nhật lại các parameters này.

- output của `model(input)` là một tensor, trong đó có tham chiếu đến hàm cập nhật gradient. Khi `loss.backward`, có vẻ nó đã gọi đến tham chiếu hàm này, để cập nhật gradient bên trong model.

- Việc lựa chọn Hàm mất mát và thuật toán tối ưu dựa trên tiêu chí nào? có quy tắc chung nào không?


