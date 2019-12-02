---
layout: post
title: Batch GD vs SGD vs mini-batch GD
image: /img/posts/batch-gd-vs-sgd-vs-mini-batch-gd.png
date: 2018-09-11 00:00:00 +0300
tags: Machine learning, Gradient Descent
mathjax: true
comment: true
toc: true
categories:
- Machine learning
---

## Batch GD
```python
for i in range(nb_epochs ): 
	params_grad = evaluate_gradient(loss_function, data, params)
	params = params - learning_rate * params_grad
```

## SGD
```python
for i in range(nb_epochs):
	# we need shuffle data
	np.random.shuffle(data)
	# we run each example and update the weight immediately
	for example in data:
		param_grad = evaluate_gradient(loss_function, example, params)
		params = params - learning_rate * param_grad
```

## mini-batch GD
```python
for i in range(nb_epochs):
	# we need shuffle data
	np.random.shuffle(data)
	# we run each batch (>1 and << size of data), and update the weight immediately
	for batch in get_batches(data, batch_size=64):
		param_grad = evaluate_gradient(loss_function, batch, params)
		params = params - learning_rate * param_grad
```

Source: 
* Ruder, S. (2016). An overview of gradient descent optimization algorithms, 1–14. http://doi.org/10.1111/j.0006-341X.1999.00591.x

