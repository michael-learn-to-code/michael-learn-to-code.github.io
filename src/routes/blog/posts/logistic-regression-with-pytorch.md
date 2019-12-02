---
layout: post
title: Logistic Regression with Pytorch
image: /assets/img/posts/logistic-regression-with-pytorch.png
date: 2018-10-07 00:00:00 +0300
tags: Machine learning, Logistic Regression, pytorch
mathjax: false
comment: true
toc: true
categories:
- Machine learning
- Logistic Regression
- pytorch
---

##  Khai báo model

Logistic Regression tương tự (/index.html)[Linear Regression]. Điểm khác biệt là đầu ra được đưa qua hàm `sigmoid` để làm cho giá trị nằm trong khoảng 0-1. 

```python
class Logstic_Regression(nn.Module):
    def __init__(self, in_dim, n_class):
        super(Logstic_Regression, self).__init__()
        self.logstic = nn.Linear(in_dim, n_class)

    def forward(self, x):
        return F.sigmoid(self.logstic(x)).squeeze()
```

## Khai báo hyper parameters

```python
batch_size=32 
learning_rate=1e-2
input_dim = 28 * 28
output_dim = 10
num_epochs=20
```

Đến đây chắc ai cũng biết là cái gì rồi :))

## Chuẩn bị dữ liệu

```python
train_dataset = datasets.MNIST( root='./data', train=True, transform=transforms.ToTensor(), download=True)

test_dataset = datasets.MNIST( root='./data', train=False, transform=transforms.ToTensor())

train_loader = DataLoader(train_dataset, batch_size=bs, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=bs, shuffle=False)
```

ở đây tôi load dữ liệu được chuẩn bị sẵn của `torch`, và tranform thành `tensor`. 

## Chuẩn bị trước khi train

```python
model = Logstic_Regression(input_dim, output_dim)
use_gpu = torch.cuda.is_available()

if use_gpu:
    model = model.cuda()

criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=learning_rate)
```

Do đây là dữ liệu hình ảnh, nên sử dụng CUDA sẽ nhanh hơn rất nhiều.

CrossEntropy Loss hay còn gọi là Log loss, thường được sử dụng để so sánh 2 phân bố dữ liệu. Đặc trưng của Cross Entropy là 2 phân bố càng xa nhau thì giá trị càng lớn. 

## Quá trình train

- Với mỗi epoch
  - Với mỗi dữ liệu train
    - chuyển dữ liệu ảnh từ 2-rank tensor sang 1-rank tensor bằng lệnh `view`
        Thực tế là do sử dụng DataLoader với batch size = 32, nên mỗi phần tử lấy ra từ DataLoader là 1 batch với 32 ảnh và 32 label tương ứng. Cho nên shape của data sẽ là 32x1x28x28. 32 là batch size, 1x28x28 là 3 chiều của ảnh xám.
        Khi `view` , ta đã duỗi ma trận 4 chiều này thành ma trận 2 chiều 32x784. Tương ứng với nó là label với shape 32x1

    - chuyển dữ liệu thành Variable
    - tính đầu ra qua model
    - tính loss bằng cách so sánh đầu ra với target. Tính tổng loss trên toàn bộ tập dữ liệu (về cuối tôi sẽ chia cho số dữ liệu để ra loss trung bình)
    - Đây là bài toán phân loại, nên sẽ lấy phần tử có giá trị lớn nhất làm label. Sau đó so sánh để tính độ chính xác
    - thực hiện backward
      - xóa gradient của bước trước
      - tính gradient
      - cập nhật gradient vào model

```python
for epoch in range(num_epochs):
    print('epoch {}'.format(epoch + 1))
    running_loss = 0.0
    running_acc = 0.0
    for i, data in enumerate(train_loader, 1):
        img, label = data
        img = img.view(img.size(0), -1) # unfold the image matrix to a vector
        if use_gpu:
            img = Variable(img).cuda()
            label = Variable(label).cuda()
        else:
            img = Variable(img)
            label = Variable(label)
        out = model(img)
        loss = criterion(out, label)
        running_loss += loss.data[0] * label.size(0)
        
        _, pred = torch.max(out, 1)
        num_correct = (pred == label).sum()
        running_acc += num_correct.data[0]
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    print('Finish {} epoch, Loss: {:.6f}, Acc: {:.6f}'.format(epoch + 1, running_loss / (len(train_dataset)), running_acc / (len(
            train_dataset))))
```

## Go to đíp pờ

Về lý thuyết, ta đang sử dụng neural network. Nhưng với số layer dưới 2 thì không được gọi là deep. Vì thế, ta sẽ tạo ra mộ network sâu vô đối.

```python
class NeuralNetwork(nn.Module):
    def __init__(self, in_dim, n_layer, n_hidden_features, n_class):
        super(NeuralNetwork, self).__init__()
        self.layer1 = nn.Linear(in_dim, n_hidden_features)
        self.hidden_layers= nn.ModuleList()
        for i in range(n_layer):
          self.hidden_layers.append(nn.Linear(n_hidden_features, n_hidden_features))
        self.output_layer = nn.Linear(n_hidden_features, n_class)

    def forward(self, x):
        x = self.layer1(x)
        for layer in self.hidden_layers:
          x = layer(x)
        return self.output_layer(x)
```

Ở đây có một điểm chú ý đó là `self.hidden_layers` là `nn.ModuleList` chứ không phải là 1 array thông thường. Đây là điều bắt buộc để pytorch ghi nhận các hidden layers vào cấu trúc của model.


## Random Thoughts

- hàm `squeeze` khá ảo.
  Đầu tiên hàm `sigmoid` trả về output có cùng shape với input. Trong khi input là output của nn.Linear. Trong bài toán này, output của nn.Linear là tensor 1-rank với size = 10. Vậy thì squeeze ở đây để làm gì?

- Hơi nhọ khi phải check cuda và gọi thêm cuda() với model và Variable.
Đáng lẽ pytorch phải tự làm cho mình.

- torch có thay đổi gì đó liên quan đến việc lấy data từ Tensor. Trên aws có cài fastai mới (hình như là build với pytorch nightly), khi tính acc tôi sử dụng

    ```python
    num_correct = (pred == label).sum()
    running_acc += num_correct.data[0]
    ```

    thì chạy bình thường.

    Nhưng trên colab, sử dụng torch 0.4.1, thì running_acc bị đổi thành tensor, dẫn đến lúc hiển thị ra bị thành 0.

    ```python
    num_correct = (pred == label).sum()
    running_acc += num_correct.item()
    ```

    sử dụng `item()` thì lại được.

- Khái niệm Entropy khá thú vị.
  Khi xác suất của sự kiện = 1, nghĩa là sự kiện chắc chắn xảy ra. Vì nó chắc chắn xảy ra, nên lượng thông tin mà nó mang theo là = 0. cho nên log(1) = 0. Sự kiện mang thông tin nếu nó không chắc chắn xảy ra.
