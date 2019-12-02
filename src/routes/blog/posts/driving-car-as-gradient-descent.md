---
layout: post
title: Lái xe kiểu Gradient Descent
image: /img/posts/lai-xe-kieu-gradient-descent.jpg
date: 2018-09-11 00:00:00 +0300
tags: Machine learning, Gradient Descent
mathjax: true
comment: true
toc: true
categories:
- Machine learning
---

Thuật toán GD có thể mô tả giống như quá trình lái xe xuống một con dốc trong sương mù (tầm nhìn xa 10m). Mục tiêu là đến được đúng chân dốc.

### Standard Gradient Descent

<p align="center">
<img src="/img/gradient-descent-1.jpg" />
</p>

Bắt đầu từ vị trí hiện tại, xe bắt đầu tiến lên. Do sương mù, chúng ta chỉ có thể dựa vào cảm nhận về độ dốc để đưa ra quyết định tiến lên hay lùi lại. Về lý thuyết, nếu khi đến chân dốc thì sẽ không còn dốc nữa(!).

Độ dốc hiện tại tương đối cao nghĩa là còn xa mới đến chân dốc, nên chúng ta có thể tự tin lái nhanh một chút.

Càng đi, độ dốc giảm dần, có thể là gần đến chân dốc rồi, nên chúng ta sẽ giảm tốc độ dần dần để tránh bị lố qua chân dốc.

Cứ thế, bỗng nhiên chúng ta thấy chúng ta đang đi lên dốc chứ không còn xuống dốc nữa. Thế có nghĩa là xe vừa đi vượt qua chân dốc rồi, nên phải lùi xe lại.

Tốc độ lùi xe cũng dựa vào độ dốc hiện tại, nếu dốc nhiều thì tự tin lùi nhanh, dốc ít thì lùi chầm chậm ít một.

Cứ thế, đến khi gặp đoạn đường bằng phẳng thì chúng ta có thể dừng xe vì đó là chân dốc rồi.

### Gradient Descent with momentum

<p align="center">
<img src="/img/gd-momentum.jpg"/>
</p>

Tuy nhiên,

Vào một ngày không đẹp tí nào, trên đường xuống dốc, chúng ta phát hiện ra một địa điểm bằng phẳng. Hí hửng nghĩ đã tới chân dốc, chúng ta dừng xe. Nhưng, khi sương tan đi ta mới nhận ra là mình đang ở lưng dốc. Nguyên nhân là chúng ta đã tìm ra một local minimum của con dốc.
Với hi vọng không lặp lại tình cảnh này, lần xuống dốc tiếp theo, chúng ta sẽ bổ sung vào một yếu tố đó là quán tính của xe. Với _hi vọng_ là, khi đến một lưng dốc bằng phẳng, do quán tính của xe, chúng ta sẽ vượt qua đó để có thể xuống tiếp chân dốc.
Tất nhiên, kể cả khi đến đúng chân dốc, thì vẫn do quán tính, xe lại đi quá. Khi đó, chúng ta lại hi vọng rằng khi đi quá chân dốc, việc phải đi lên dốc sẽ giúp chúng ta lùi lại đúng chân dốc.

### NAG (Nesterove Accelerated Gradient)

Để hạn chế việc đi quá chân dốc, chúng ta chịu khó quan sát phía trước một chút. Thay vì chỉ cảm nhận độ dốc của vị trí hiện tại, chúng ta thử đánh giá luôn độ dốc ở phía trước một đoạn, từ đó quyết định vận tốc xe phù hợp để không bị đi quá. Tất nhiên do tầm nhìn hạn chế, chúng ta chỉ có thể nhìn trước 1 đoạn ngắn thôi. Nhưng ngần đó cũng sẽ giúp ích rất nhiều.
Khi xe đến gần một điểm local minimum, nhờ quán tính và quan sát phía trước, chúng ta sẽ nhận ra đó không phải là chân dốc.
Còn khi xe đến gần chân dốc thật, chúng ta sẽ có thể biết phía trước là bằng phẳng hay là lên dốc, qua đó biết được đây là chân dốc thật.

## Về với Toán học

### Standard Gradient Descent

$$
v_t=\eta \nabla{J_\theta(\theta_{t-1})}
$$

$$\theta_t=\theta_{t-1}-v_t=\theta_{t-1}-\eta\nabla{J_\theta(\theta_{t-1})}$$

### Gradient Descent with momentum

$$m_t=\gamma v_{t-1}$$

$$v_t=\eta \nabla{J_\theta(\theta_{t-1})}$$

$$\theta_t=\theta_{t-1}-v_t-m_t=\theta_{t-1}-\eta\nabla{J_\theta(\theta_{t-1})} -\gamma v_{t-1}$$

### Nesterove Accelerated Gradient

$$m_t=\gamma v_{t-1}$$

$$v_t=\eta \nabla{J_\theta(\theta_{t-1}-\gamma v_{t-1})}$$

$$\theta_t=\theta_{t-1}-v_t-m_t=\theta_{t-1}-\eta\nabla{J_\theta(\theta_{t-1}-\gamma v_{t-1})} -\gamma v_{t-1}$$
