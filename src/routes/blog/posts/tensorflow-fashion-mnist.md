---
title: Learn Tensorflow with Fashion MNIST example
description: Learn Tensorflow with Fashion MNIST Dataset. Understanding the flow of training a model
keywords: machine learning, tensorflow, fashion, mnist
date: 2020-04-27 00:00:00 +0300
imageId: R2aodqJn3b8
imageAuthor: Lauren Fleischmann
tags: tensorflow, mnist
mathjax: false
toc: true
---

In this post, I learns how to use TensorFlow to train a very simple model which works on Fashion MNIST dataset.

<!-- more -->

# Understand the training flow

## install and import helper libraries

```python
!pip install tensorflow_datasets

import tensorflow as tf
import tensorflow_datasets as tfds

import numpy as np
import matplotlib.plot as plt
import math

```

## download data

```python
dataset, metadata = tfds.load('fashion_mnist', as_supervised=True, with_info=True)
```

## load data

```python
train_dataset, test_dataset = dataset['train'], dataset['test']
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal',      'Shirt',   'Sneaker',  'Bag',   'Ankle boot']
```

## normalize data

```python
def normalize(images, labels):
    images = tf.cast(images, tf.float32)
    images /= 255
    return images, labels

train_dataset = train_dataset.map(normalize)
test_dataset = test_dataset.map(normalize)

# read data into RAM
train_dataset = train_dataset.cache()
test_dataset = test_dataset.cache()
```

## check/analyze data

```python
for image, label in test_dataset.take(1):
    break

image = image.numpy().reshape((28,28))
plt.figure()
plt.imshow(image, cmap=plt.cm.binary)
plt.colorbar()
plt.grid(False)
plt.show()
```

## prepare batches for training

```python
BATCH_SIZE = 32
num_train_examples = metadata.splits["train"].num_examples
num_test_examples = metadata.splits['test'].num_examples
train_dataset = train_dataset.repeat().shuffle(num_train_examples).batch(BATCH_SIZE)
test_dataset = test_dataset.batch(BATCH_SIZE)
```

## Define the model

```python
model = tf.keras.Sequential(layers=[
    tf.keras.layers.Flatten(input_shape=(28,28,1)),
    tf.keras.layers.Dense(512, activation=tf.nn.relu),
    tf.keras.layers.Dense(10)
])
```

## Compile the model

- loss function: how far from model's output to the expected output
- optimizer: how to adjust inner parameters to optimize the loss
- metrics: how to monitor training and testing steps

```python
model.compile(loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              optimizer="adam",
              metrics=['accuracy'])
```

## Train model

```python
# steps_per_epoch flag will be removed soon
model.fit(train_dataset, epochs=5, steps_per_epoch=math.ceil(num_train_examples/BATCH_SIZE))
```

## evaluate the model

- test data must be normalized similar to train data

```python
test_loss, test_accuracy = model.evaluate(test_dataset, steps=math.ceil(num_test_examples/BATCH_SIZE))
print('Accuracy on test dataset:', test_accuracy)
```

## predict

```python
preds = models.predict(np.array([img]))
class_names[np.argmax(preds)]

```
