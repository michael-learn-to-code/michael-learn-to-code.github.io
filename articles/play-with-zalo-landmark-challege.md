---
title: Play with Zalo Landmark Challenge
image: /img/posts/play-with-zalo-landmark-challenge.png
date: 2018-08-22 00:00:00 +0300
tags: deep_learning, fastai
description: Summary of my lesson learnt from Playing with Zalo Landmark Challenge
mathjax: true
imageId: QsJg2IuWPSE
imageAuthor: Eric Ward
toc: true
---

TL;DR:

Deep learning is so hot and so hard!!!
Vâng, DL đang rất nóng và rất khó. Thực sự với một người không có nền kiến thức toán tốt như mình, bắt đầu với ML nói chung và DL nói riêng giống như tìm đường trong một khu rừng chưa bao giờ đặt chân tới. Tất cả mọi thứ đều phức tạp và khó hiểu.
Đã có lúc mình cố gắng học lại các kiến thức toán liên quan trước khi bắt tay vào học code ML. Nhưng thực sự không hợp.
Việc nghe, đọc, nhớ những kiến thức tổng quát của toán quá khó mà lại nhanh quên. Chưa kể tới những cơn buồn ngủ khó cưỡng khi nghe các course Video.

Tuy nhiên, may nhờ có cuộc thi của Zalo mà mình bắt đầu làm quen với Fastai. Và thực sự thích triết lý của họ. Jeremy nói rằng, học ML/DL giống như học cách chơi bóng vậy. Bạn nên nhảy vào chơi trước, rồi mới học luật, học các kỹ thuật liên quan....Chỉ có trải nghiệm làm thực tế mới giúp thấu hiểu được lý thuyết.

Đến giờ, có thể nói mình đang ở đâu đó giữa không biết với biết, không hiểu với hiểu. Mọi thứ vẫn còn như một làn sương mờ ảo. Nhưng mình đã có nhiều động lực và động cơ để tìm hiểu nhiều hơn và hiểu nhiều hơn về ML/DL.

Bài viết này nhằm tổng hợp và chia sẻ một số hiểu biết mình có được sau thời gian học và sử dụng fastai.
Một coder tay to đang bắt đầu học và làm ML/DL từ con số 0 :).

# Problem description

## Description:

The goal of this challenge is to identify the Vietnam famous landscape depicted in a photograph. The data for this task comes from the Zalo Places dataset which contains 1M+ images belonging to 500+ unique Vietnam famous landscape places.

Specifically, the challenge data will be divided into ~88K images for training & validating, ~30K images for testing coming from 103 places (103 categories). Note that there is a non-uniform distribution of images per category for training, ranging from 100 to 1,000 mimicking a more natural frequency of occurrence of the scene.

For each image, algorithms will produce a list of at most 3 scene categories in descending order of confidence. The quality of a labeling will be evaluated based on the label that best matches the ground truth label for the image. The idea is to allow an algorithm to identify multiple scene categories in an image given that many environments have multi-labels (e.g. a rice terrace can also be at Ha Giang or at Mu Cang Chai).

### Evaluation Metric:

We follow a similar metric to the classification tasks of the ILSVRC. For each image $$i$$, an algorithm will produce 3 labels $$l\_{i,j} , j = 1..3$$ . For this competition each image has one ground truth label $g_i$, and the error for that image is:

$e_i=\min_j{d(l_{ij}, g_i)}$

Where

$$
d(x,y)=\begin{cases}
0\ \ \ if\ x=y\\
1\ otherwise
\end{cases}
$$

The overall error score for an algorithm is the average error over all N test images:

$$
score=\frac{1}{N}\sum_i{e_i}
$$

### Ideas

This is a kind of classification problem, which should be resolved by a CNN solution. So I'm going to try to use [fastai](https://github.com/fastai/fastai) to build a simple solution with a pre-trained network.

## Setup an GPU-compute AWS instance with fastai

You can refer [here](http://wiki.fast.ai/index.php/AWS_Spot_instances) to find out how to setup and create AWS instance with lowest cost via Spot Request. It's very helpful and good for your wallet.

## Download data

```python
! ls data
```

    dogbreed  models  preprocessed	Public	tmp  TrainVal

Here I downloaded data and extracted already, so we have 2 folders: `TrainVal` contains training data, and `Public` for test data

```python
!ls data/TrainVal/
```

    0    11  17  22  28  33  39  44  5   55  60  66  71  77  82  88  93  99
    1    12  18  23  29  34  4   45  50  56  61  67  72  78  83  89  94
    10   13  19  24  3   35  40  46  51  57  62  68  73  79  84  9	 95
    100  14  2   25  30  36  41  47  52  58  63  69  74  8	 85  90  96
    101  15  20  26  31  37  42  48  53  59  64  7	 75  80  86  91  97
    102  16  21  27  32  38  43  49  54  6	 65  70  76  81  87  92  98

And inside the `TrainVal` directory, we have 103 subdirectories which corresponding to 103 classes (0-102)

## Now do some code

```python
# enable auto reload external code and display plot inline
%reload_ext autoreload
%autoreload 2
%matplotlib inline
```

```python
# import everything we need from fastai
from fastai.imports import *
from fastai.torch_imports import *
from fastai.transforms import *
from fastai.conv_learner import *
from fastai.model import *
from fastai.dataset import *
from fastai.sgdr import *
from fastai.plots import *
```

```python
# checking cuda
torch.cuda.is_available()
```

    True

```python
DATA_PATH = 'data'
```

## Clean up data

After some tests, you will find out that there are some zero-byte files existing, so we should remove them first. On other hands, there are some files has an incorrect format (GIF, TIF, BMP,...) which causes OpenCV cannot read them correctly (`fastai` relies on OpenCV to open images). Hence, I will convert them all to JPEG format.

```python
def cleanup(data_dir, pattern='*.jpg'):
    """
    Arguments:
        data_dir:
        pattern
    Returns:
    """
    for fn in tqdm(glob("{}/{}".format(data_dir, pattern), recursive=True)):
        if os.path.getsize(fn) <=0:
            print('\n0 byte file: {}. Deleted'.format(fn))
            os.unlink(fn)
            continue
        im = Image.open(fn)
        if im.format != 'JPEG':
            print('\nFile: {}, has invalid format: {}. Converted to JPG'.format(fn, im.format))
            im.convert('RGB').save(fn)
```

```python
cleanup('data/TrainVal', '*.jpg')
cleanup('data/Public', '*.jpg')
```

    0it [00:00, ?it/s]
    100%|██████████| 14356/14356 [00:01<00:00, 9997.43it/s]

## Prepare data

Next we will get all file paths and corresponding labels, put them into 2 arrays with correct order

```python
# process train and validation data
def prepare_data(data_dir='data', train_dir='TrainVal'):
    """
    Arguments:
        data_dir: name of data directory (wihtout /)
        train_dir: name of training data directory (without /)
    Returns:
        filenames: np.array of filenames
        labels: np.array of labels
        classes: np.array of classes
    """
    classes = (list( int(l.split('/')[-1]) for l in glob('{}/{}/*'.format(data_dir, train_dir), recursive=False)))
    filenames = (list(i.replace('{}/'.format(data_dir), '') for i in glob('{}/{}/*/*.jpg'.format(data_dir, train_dir))))

    data = []
    labels = []
    count = len(filenames)
    for label in classes:
        file_count = len(list(glob('{}/{}/{}/*.jpg'.format(data_dir, train_dir, label))))
        labels.extend(np.full(file_count, label))
    labels = np.asarray(labels)
    filenames = np.asarray(filenames)
    return filenames, labels, classes
```

Here I used `glob` which is a shortcut function from `fastai`, it's not python's `glob` module

```python
filenames, labels, classes = prepare_data(data_dir=DATA_PATH, train_dir='TrainVal')

print('Number of samples: {}'.format(len(filenames)))
print('Number of labels: {}'.format(len(labels)))
print('Number of classes: {}'.format(len(classes)))
```

    Number of samples: 88220
    Number of labels: 88220
    Number of classes: 103

So far so good.

Now just show some statistics

```python
# data stat
df = pd.DataFrame({'label': labels, 'filenames': filenames})
df_count = df.groupby(['label'], as_index=False).agg(['count']).reset_index()
df_count.columns=['label', 'file_count']
df_count.describe()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>label</th>
      <th>file_count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>103.000000</td>
      <td>103.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>51.000000</td>
      <td>856.504854</td>
    </tr>
    <tr>
      <th>std</th>
      <td>29.877528</td>
      <td>572.731824</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000000</td>
      <td>52.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>25.500000</td>
      <td>500.500000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>51.000000</td>
      <td>711.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>76.500000</td>
      <td>1059.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>102.000000</td>
      <td>3388.000000</td>
    </tr>
  </tbody>
</table>
</div>

There are some information:

1. The minimum sample count is 52 samples.
1. The maximum sample count is 3388 samples.
1. 50% classes have less than the Mean of Sample count => imbalanced dataset

```python
sns.barplot(data=df_count, x="label", y="file_count")
```

    <matplotlib.axes._subplots.AxesSubplot at 0x7f46beb07a90>

![png](/Play-with-Zalo-Landmark-Challenge/output_24_1.png)

I will use `resnet50` pre-trained network

```python
# hyperparameters
arch=resnet50
# image size
sz=224
# batch size
bs=64
# number of workers. It should be your cpu's core.
num_workers=4
```

```python
# We will use 15% data as validation set
# This function will return a randomly subset indices from 0 to number of samples.
val_idx = get_cv_idxs(n=len(filenames), val_pct=0.15)

def get_data(sz, bs, aug_tfms=None):
    tfms = tfms_from_model(arch, sz, max_zoom=1.1, aug_tfms=aug_tfms)
    data = ImageClassifierData.from_names_and_array(DATA_PATH, filenames, labels, classes, val_idx, tfms=tfms, bs=bs, test_name='Public', num_workers=num_workers)
    return data
```

```python
data = get_data(sz, bs)
```

We just prepare the dataset in `data` variable. Let's check it a bit

```python
print('Size of training data: {}'.format(len(data.trn_ds)))
print('Size of validation data: {}'.format(len(data.val_ds)))
print('Size of test data: {}'.format(len(data.test_ds)))
print('Number of class: {}'.format(len(data.classes)))
```

    Size of training data: 74987
    Size of validation data: 13233
    Size of test data: 14356
    Number of class: 103

## Training

We will follow the fastai's instructions to get a "world-class image classification":

1. precompute=True
1. Use `lr_find()` to find highest learning rate where loss is still clearly improving
1. Train last layer from precomputed activations for 1-2 epochs
1. Train last layer with data augmentation (i.e. precompute=False) for 2-3 epochs with cycle_len=1
1. Unfreeze all layers
1. Set earlier layers to 3x-10x lower learning rate than next higher layer
1. Use `lr_find()` again
1. Train full network with cycle_mult=2 until over-fitting

### 1. Create new model with precompute=True

```python
# 1. create new model, with precompute=True
learn = ConvLearner.pretrained(arch, get_data(sz, bs), precompute=True)
```

At this step, fastai will automatically download the model's weight table, load it, then run for all data (training, validation, test) to compute the output vectors and finally save temporary to use later.
As you can see in the output:

1. It run 1172 batchs for training data: 74987 // 64 $\approx$ 1171
2. It run 207 batches for validation data: 13233 // 64 $\approx$ 207
3. It run 225 batches for test data: 14356 // 64 $\approx$ 225

```python
# Computed vectors are saved in `tmp` directory
!ls {DATA_PATH}/tmp
```

    x_act_resnet50_0_224.bc       x_act_val_resnet50_0_224.bc
    x_act_test_resnet50_0_224.bc

### 2. User `lr_find()` to find the _highest_ learning rate where loss is still _clearly improving_

```python
learn.lr_find()
```

    HBox(children=(IntProgress(value=0, description='Epoch', max=1), HTML(value='')))


     82%|████████▏ | 965/1172 [00:18<00:04, 51.39it/s, loss=5.08]

At this step, we do the training with slowly increasing learning rate and record the validation loss. The we will see how validation loss change follow the changing learning rate

```python
learn.sched.plot()
```

![png](/Play-with-Zalo-Landmark-Challenge/output_40_0.png)

As you can see, the loss descreases constantly util learning rate reachs to 1e-1. Keep in mind that we don't choose the learning rate which causes the loss minimum (here is about 1e-1). But we choose the _highest_ learning rate where loss is still _clearly_ _increasing_. So we choose 1e-2

```python
lr = 1e-2
```

### 3. Train last layer from precomputed activations for 1-2 epochs

```python
learn
```

    Sequential(
      (0): BatchNorm1d(4096, eps=1e-05, momentum=0.1, affine=True)
      (1): Dropout(p=0.25)
      (2): Linear(in_features=4096, out_features=512, bias=True)
      (3): ReLU()
      (4): BatchNorm1d(512, eps=1e-05, momentum=0.1, affine=True)
      (5): Dropout(p=0.5)
      (6): Linear(in_features=512, out_features=103, bias=True)
      (7): LogSoftmax()
    )

Because we use precompute=True, so the whole pre-trained network are kept as the origin. We just add some additional layers to change from 1000-features output vectors of resnet50 to 103-features vectors, corresponding to our 103 classes.

So with precompute=True, we just train these additinal layers.

```python
# best_save_name will save the best weights into a file named 'test_precompute', so that we can load later if need
learn.fit(lr, 3, best_save_name='test_precompute')
```

    HBox(children=(IntProgress(value=0, description='Epoch', max=3), HTML(value='')))


    epoch      trn_loss   val_loss   accuracy
        0      0.944297   0.701886   0.801859
        1      0.786174   0.60947    0.821053
        2      0.728161   0.5657     0.832238





    [array([0.5657]), 0.8322375878665774]

You can see that the training run very fast, that result by we precomputed data before.

It's a bit crazy ha! Just with 3 epochs, we have 83% accuracy. It's good, isn't it? This is the first time I build a model, so I don't know how many could be a 'good accuracy'

Back to the problem, they use Top 3 error as Evaluation metrics, so I think it's better if we can show it in the training time.

```python
def topkerror(log_preds, targs):
    """
    Calculate Top 3 error
    """
    preds = torch.exp(log_preds)
    _, topk = torch.topk(preds, 3, dim=1)
    diff = (topk - targs.view(-1, 1))
    count_tensor = (diff==0).nonzero()
    n_correct = 0 if len(count_tensor.size()) == 0 else count_tensor.size(0)
    topk_accuracy = float(n_correct)/log_preds.shape[0]
    return 1-topk_accuracy
```

```python
learn.fit(lr, 1, best_save_name='test_precompute', metrics=(accuracy, topkerror))
```

    HBox(children=(IntProgress(value=0, description='Epoch', max=1), HTML(value='')))


    epoch      trn_loss   val_loss   accuracy   topkerror
        0      0.662004   0.536645   0.84055    0.047986





    [array([0.53665]), 0.8405501397119253, 0.0479860953676415]

Cool! With Top 3 error is 0.048, we're at the bottom of the Leaderboard.

### 4. Train last layer with data augmentation (i.e. precompute=False) for 2-3 epochs with cycle_len=1

To create data augmentation, we use aug_tfms parameter. Here I use transforms_side_on, which includes 3 types of transformation randomly:

1. randomly rotate image
2. randomly zoom in image
3. randomly flip the image

Let's see below examples

```python
data = get_data(sz, bs, aug_tfms=transforms_side_on)
```

```python
imgs = []
for i in range(6):
    x,_ = next(iter(data.aug_dl))
    img = data.trn_ds.denorm(x)[1]
    imgs.append(img)
ims = np.stack(imgs)
```

```python
plots(ims, rows=2)
```

![png](/Play-with-Zalo-Landmark-Challenge/output_56_0.png)

Using data augmentation doesn't mean we're creating more data. It just means that, in training time we randomly augment the input image to make the model more general. Now let's train it

```python
learn.precompute=False
learn.set_data(data)
learn.fit(lr, 3, cycle_len=1, best_save_name='best_aug', metrics=(accuracy, topkerror))
```

    HBox(children=(IntProgress(value=0, description='Epoch', max=3), HTML(value='')))


    epoch      trn_loss   val_loss   accuracy   topkerror
        0      0.677511   0.505405   0.85045    0.04519
        1      0.646969   0.495769   0.853775   0.04383
        2      0.632968   0.485457   0.856193   0.04315





    [array([0.48546]), 0.8561928511152351, 0.04314970150381622]

You can see that now it take a long time for training. That because we turn off precompute to use Data augmentation. The accuracy increases a bit.

You may ask, what `cycle_len` is? The detail answer is a bit out of my knowledge right now. Basically, I understand these things:

1. We decrease the learning rate gradually during the training processes. It's a kind of process named **Learning Rate Annealing**. And it seems straightforward because when we get closer to the minimum, we need to be slow down. And normally we use a `cosine` function of learning rate.

2) In other hands, there are many local optima while we need to find the global optima, so if we use Annealing technique, we may fall into a local minimum soon. Hence, to avoid falling to a local minimum, we regularly increase the learning rate to make the modal go out from the current position and re-try with a new direction. It sounds like we have to do more works, but it's useful to make our model better. And it called **SGDR** ( Stochastic Gradient Descent with Restarts)

Thus, the `cycle_len` parameter means, after the `cycle_len` number of cycles we will restart the learning rate.

### 5. Unfreeze all layers & 6. Set earlier layers to 3x-10x lower learning rate than next higher layer

Now, our model gets an acceptable accuracy. It means that we trained our additional layers enough. You can keep training some epochs more, but the result will not be improved too much.

The only way to do is we train the whole network again. And we do that by unfreezing all layers with `unfreeze()` method.

```python
learn.unfreeze()

# freeze the batch norm layer. to avoid moving statistic model ??? (currently I don't understand this thing!)
learn.bn_freeze(True)
```

Before doing anything, let's take a review about what we have now. After the training process, our network actually has 2 parts. The first part is pre-trained weights (by training with Imagenet) which no change because we freeze them. The second one is an 'initial' weights of additional layers which be trained to classify 1000-features vectors to 1 of our 103 classes.
The second part is the direct result of the training process we did. Now, what we're going to do is:

- Try to adjust the first part to be more fit with our data.
- but do not change the second part too much

```python
lrs = np.array([1e-4, 1e-3, 1e-2])
```

What am I doing here?

I'm try to use different learning rate for different layers in training.

Why?

Take a look at a CNN network, we can see that some first layers are just extracting general-purpose features (like edge, grid, gradient,...). Therefore we will expect that their weights do not change too much.

Then middle layers should be adjust more than the first ones, so we use bigger learning rate (x10)

And last layers includes our additional layers, we don't want to change them too much, so we use the same learning rate as before.

That's all I understand for now :)

### 6. Train full network with cycle_mult=2 until over-fitting

```python
learn.fit(lrs, 3, cycle_len=1, cycle_mult=2, best_save_name='test_unfreeze', metrics=(accuracy, topkerror))
```

    HBox(children=(IntProgress(value=0, description='Epoch', max=7), HTML(value='')))


      2%|▏         | 18/1172 [00:26<27:52,  1.45s/it, loss=0.574]

This is the nightmare.

Nếu bạn là một coder, có lẽ đôi khi bạn đã từng có cảm giác bực bội khi phải chờ Eclipse build toàn bộ Java source code của bạn. Mấy chục module, mấy chục phút chờ đợi???
Hãy thử train xem, bạn nhấn Run cho code bắt đầu chạy, rồi bạn có thể làm gì đó giết thời gian: lướt tí face, cập nhật ít tin tức, làm mấy chục lần tạ tay, uống vài ngụm nước hay thậm chí... ngắm gái cũng được. Sau khi hoàn thành hết tất cả các hoạt động thư thái tuyệt với đó, bạn quay lại và nhìn màn hình thì.....
Yeah, bạn yên tâm chả có lỗi gì cả đâu, nhưng đúng là nó vẫn đang chạy... có khi còn chưa được 1 epoch.

Điên thật phải không? Công nghệ 4.0 gì mà thế này?! Tôi biết làm gì trong thời gian chờ nó train đây?! Thực sự là khá xì trét đấy. Đặc biệt là với những coder chuyên nghiệp như mình. Hot Reload ư? Hot Deploy ư? Xin lỗi, chúng mình đang ở thế giới khác nhé!

Phew! Dốc được bầu tâm sự này thực sự thấy nhẹ cả lòng.

Quay lại với chủ đề chính. Sau khi train khoảng 6 epoch trở lên, thì model của mình đạt được độ chính xác khoảng 90-91% gì đó. Với Top 3 error có thể thuộc top 20 trên LB. Tuy nhiên buồn là nó lại bị overfit. I can specify that the model is overfit if the training lost is much smaller than validation loss.

Until now, I don't understand why it's easy to be overfit like that. Maybe because the dataset is too imbalanced. But the fact that, the more overfit it is, the lower Top 3 error I get. And until now, I don't know how to resolve the overfit. still.

Just leave it as it is now. After a long training process, now we should think about how to submit our result.

## Predict and create submission file

Now it's time to show you a new skill, an powerful AOE skill that can take damage to some bots at the same time, ah...improve your model's accuracy without trainging. Its name is Test Time Augmentation (TTA).

TTA will create some (4) augmented images from the source image, then push all images through the model, get the results. Then we can take the mean of results to get the final result.

In other words, for for each image, we will ask the model to look at it in some different angles such as: zoom a bit, flip, rorate,...

For our problem, use TTA will improve the accuracy about 1%. But it's easy to do, so we don't lose any thing to give it a try.

```python
log_preds, ground_y = learn.TTA(is_test=True)
probs = np.mean(np.exp(log_preds),0)
outputs = np.argsort(probs, axis = 1)[:, -3:][:, ::-1]
```

OK, talk too much, let's create a submission

```python
def get_true_labels(idx, classes):
    return [classes[i] for i in idx]

def gen_outputline(idx, preds):
    return  idx + ',{}'.format(' '.join([str(p) for p in preds])) +  '\n'

def create_submission_file(data, outputs, fn='mysubmission.csv'):
    f = open(fn, 'w')
    header = 'id,predicted\n'
    f.write(header)
    test_files = data.test_ds.fnames

    for i in range(len(test_files)):
        tmp = gen_outputline(test_files[i][7:-4], list(outputs[i]))
        f.write(tmp)
    f.close()
    print('File: {} created'.format(fn))


print('create submission file')
create_submission_file(data, outputs)
```

After that, mysubmission.csv file is created, you can download it and submit. In a lucky day, I got `0.01525` Top 3 error. It's not too bad for a beginner like me.

![Leaderboard](/Play-with-Zalo-Landmark-Challenge/lb_landmark.png)

## Let's summary

### Gains

- AWS Spot instance is great
- We should check and do clean up data before processing
- We can read all files and labels for both training, validation and testing easily with fastai.
- It's easy to use a pre-trained model too.
- TTA is cool

### Pain

- I don't know why it's overfit and how to resolve it???

### Ideas

- Try with bigger network like resnet101_64 or interception
- Or maybe try some networks then sum them.
- ...
