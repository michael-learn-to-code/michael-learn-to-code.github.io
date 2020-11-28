---
layout: post
title: Predict Housing Price
image: /img/posts/predict-housing-price.jpg
date: 2018-09-01 00:00:00 +0300
tags: jupyter, keras, regression, data analytic
description: Try to predict housing price with Keras
comment: true
toc: true
---

With California's Housing Price dataset, I try to build a simple model on Keras to predict the mean_housing_price from other factors.

Keynotes:

- Filling missing data with a simple model.
- Use correct measurement.

```python
%matplotlib inline
```

```python
import sys
sys.path.append('..')
```

```python
from fastai.imports import *
```

```python
DATA_PATH = '../data/'
DATA_FILE = f'{DATA_PATH}housing.csv'
```

#1. Define the problem

Predict the median of house value from other features.

It's regression problem.

#2. Get the data

From Kaggle,
https://www.kaggle.com/abhilashanil/california-housing-prices

#3. Prepare data for consuming

##3.1. Load data

```python
df = pd.read_csv(DATA_FILE)
df.sample(10)
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
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12469</th>
      <td>-121.45</td>
      <td>38.57</td>
      <td>48.0</td>
      <td>1962.0</td>
      <td>356.0</td>
      <td>704.0</td>
      <td>362.0</td>
      <td>3.5313</td>
      <td>147900.0</td>
      <td>INLAND</td>
    </tr>
    <tr>
      <th>8627</th>
      <td>-118.39</td>
      <td>33.88</td>
      <td>33.0</td>
      <td>2543.0</td>
      <td>439.0</td>
      <td>1098.0</td>
      <td>416.0</td>
      <td>5.9683</td>
      <td>495500.0</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>1352</th>
      <td>-121.96</td>
      <td>38.02</td>
      <td>35.0</td>
      <td>2691.0</td>
      <td>542.0</td>
      <td>1409.0</td>
      <td>505.0</td>
      <td>3.0160</td>
      <td>95300.0</td>
      <td>INLAND</td>
    </tr>
    <tr>
      <th>9393</th>
      <td>-122.55</td>
      <td>37.92</td>
      <td>52.0</td>
      <td>2303.0</td>
      <td>350.0</td>
      <td>859.0</td>
      <td>359.0</td>
      <td>6.1085</td>
      <td>500001.0</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>5918</th>
      <td>-118.44</td>
      <td>34.28</td>
      <td>47.0</td>
      <td>843.0</td>
      <td>194.0</td>
      <td>800.0</td>
      <td>180.0</td>
      <td>3.3687</td>
      <td>151700.0</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>9460</th>
      <td>-123.64</td>
      <td>39.45</td>
      <td>21.0</td>
      <td>3359.0</td>
      <td>677.0</td>
      <td>1908.0</td>
      <td>642.0</td>
      <td>3.0433</td>
      <td>140700.0</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>10408</th>
      <td>-117.58</td>
      <td>33.65</td>
      <td>4.0</td>
      <td>2000.0</td>
      <td>422.0</td>
      <td>833.0</td>
      <td>386.0</td>
      <td>5.7709</td>
      <td>190300.0</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>12249</th>
      <td>-116.95</td>
      <td>33.76</td>
      <td>10.0</td>
      <td>6890.0</td>
      <td>1702.0</td>
      <td>3141.0</td>
      <td>1451.0</td>
      <td>1.7079</td>
      <td>95900.0</td>
      <td>INLAND</td>
    </tr>
    <tr>
      <th>4832</th>
      <td>-118.29</td>
      <td>34.04</td>
      <td>44.0</td>
      <td>1941.0</td>
      <td>579.0</td>
      <td>2049.0</td>
      <td>535.0</td>
      <td>2.0405</td>
      <td>143000.0</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>13364</th>
      <td>-117.66</td>
      <td>34.00</td>
      <td>5.0</td>
      <td>1387.0</td>
      <td>236.0</td>
      <td>855.0</td>
      <td>270.0</td>
      <td>5.4110</td>
      <td>201100.0</td>
      <td>INLAND</td>
    </tr>
  </tbody>
</table>
</div>

```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 20640 entries, 0 to 20639
    Data columns (total 10 columns):
    longitude             20640 non-null float64
    latitude              20640 non-null float64
    housing_median_age    20640 non-null float64
    total_rooms           20640 non-null float64
    total_bedrooms        20433 non-null float64
    population            20640 non-null float64
    households            20640 non-null float64
    median_income         20640 non-null float64
    median_house_value    20640 non-null float64
    ocean_proximity       20640 non-null object
    dtypes: float64(9), object(1)
    memory usage: 1.6+ MB

```python
DataFrameSummary(df).summary()
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
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>20640</td>
      <td>20640</td>
      <td>20640</td>
      <td>20640</td>
      <td>20433</td>
      <td>20640</td>
      <td>20640</td>
      <td>20640</td>
      <td>20640</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>-119.57</td>
      <td>35.6319</td>
      <td>28.6395</td>
      <td>2635.76</td>
      <td>537.871</td>
      <td>1425.48</td>
      <td>499.54</td>
      <td>3.87067</td>
      <td>206856</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>std</th>
      <td>2.00353</td>
      <td>2.13595</td>
      <td>12.5856</td>
      <td>2181.62</td>
      <td>421.385</td>
      <td>1132.46</td>
      <td>382.33</td>
      <td>1.89982</td>
      <td>115396</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>min</th>
      <td>-124.35</td>
      <td>32.54</td>
      <td>1</td>
      <td>2</td>
      <td>1</td>
      <td>3</td>
      <td>1</td>
      <td>0.4999</td>
      <td>14999</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>-121.8</td>
      <td>33.93</td>
      <td>18</td>
      <td>1447.75</td>
      <td>296</td>
      <td>787</td>
      <td>280</td>
      <td>2.5634</td>
      <td>119600</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>-118.49</td>
      <td>34.26</td>
      <td>29</td>
      <td>2127</td>
      <td>435</td>
      <td>1166</td>
      <td>409</td>
      <td>3.5348</td>
      <td>179700</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>-118.01</td>
      <td>37.71</td>
      <td>37</td>
      <td>3148</td>
      <td>647</td>
      <td>1725</td>
      <td>605</td>
      <td>4.74325</td>
      <td>264725</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>max</th>
      <td>-114.31</td>
      <td>41.95</td>
      <td>52</td>
      <td>39320</td>
      <td>6445</td>
      <td>35682</td>
      <td>6082</td>
      <td>15.0001</td>
      <td>500001</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>counts</th>
      <td>20640</td>
      <td>20640</td>
      <td>20640</td>
      <td>20640</td>
      <td>20433</td>
      <td>20640</td>
      <td>20640</td>
      <td>20640</td>
      <td>20640</td>
      <td>20640</td>
    </tr>
    <tr>
      <th>uniques</th>
      <td>844</td>
      <td>862</td>
      <td>52</td>
      <td>5926</td>
      <td>1923</td>
      <td>3888</td>
      <td>1815</td>
      <td>12928</td>
      <td>3842</td>
      <td>5</td>
    </tr>
    <tr>
      <th>missing</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>207</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>missing_perc</th>
      <td>0%</td>
      <td>0%</td>
      <td>0%</td>
      <td>0%</td>
      <td>1.00%</td>
      <td>0%</td>
      <td>0%</td>
      <td>0%</td>
      <td>0%</td>
      <td>0%</td>
    </tr>
    <tr>
      <th>types</th>
      <td>numeric</td>
      <td>numeric</td>
      <td>numeric</td>
      <td>numeric</td>
      <td>numeric</td>
      <td>numeric</td>
      <td>numeric</td>
      <td>numeric</td>
      <td>numeric</td>
      <td>categorical</td>
    </tr>
  </tbody>
</table>
</div>

###3.1.1. Quick notes

1. total_bedrooms has some missing values.
2. ocean_proximity is text. but can convert to number via categorical transform.

##3.2. 4'C: Correcting, Completing, Creating, Converting

###3.2.1. Correcting

I found nothing to correct!

###3.2.2. Completing

Clearly that we should complete total bedrooms' missing data.
Ussualy, there are some ways to do that:

- use mean value
- guess value from correlation features

```python
# Plot the correlation between features
colormap = plt.cm.RdBu
plt.figure(figsize=(14,12))
plt.title('Pearson Correlation of Features', y=1.05, size=15)
sns.heatmap(df.corr(),linewidths=0.1,vmax=1.0,
            square=True, cmap=colormap, linecolor='white', annot=True)
```

    <matplotlib.axes._subplots.AxesSubplot at 0x1c202d72b0>

![png](/2018-09-01-rnd02-housing/output_13_1.png)

Obviously, we should predict the missing total_bedrooms from most correlational features: total_rooms, population and households.
We can create a simple Linear Model to predict that

#####3.2.2.1. Completing `total_bedrooms`

```python
sub_df = df[['total_rooms', 'population', 'households', 'total_bedrooms']]
```

```python
sub_train_df = sub_df[sub_df.total_bedrooms.notna()]
sub_test_df = sub_df[sub_df.total_bedrooms.isna()]
```

```python
sub_test_df.describe()
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
      <th>total_rooms</th>
      <th>population</th>
      <th>households</th>
      <th>total_bedrooms</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>207.000000</td>
      <td>207.000000</td>
      <td>207.000000</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>2562.603865</td>
      <td>1477.772947</td>
      <td>510.024155</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>std</th>
      <td>1787.269789</td>
      <td>1057.448212</td>
      <td>386.120704</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>min</th>
      <td>154.000000</td>
      <td>37.000000</td>
      <td>16.000000</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>1307.500000</td>
      <td>781.000000</td>
      <td>258.000000</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>2155.000000</td>
      <td>1217.000000</td>
      <td>427.000000</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>3465.000000</td>
      <td>1889.500000</td>
      <td>628.000000</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>max</th>
      <td>11709.000000</td>
      <td>7604.000000</td>
      <td>3589.000000</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>

```python
sub_train_X = sub_train_df[['total_rooms', 'population', 'households']].copy()
sub_train_Y = sub_train_df[['total_bedrooms']].copy()
```

```python
from sklearn import linear_model
# Create linear regression object
regr = linear_model.LinearRegression()

# Train the model using the training sets
regr.fit(sub_train_X, sub_train_Y)
```

    LinearRegression(copy_X=True, fit_intercept=True, n_jobs=1, normalize=False)

```python
def predict_total_rooms(*args):
    X = args
    if math.isnan(float(X[4])):
        np_X = np.asarray([[X[3], X[5], X[6]]], dtype=np.float64)
        np_Y = regr.predict(np_X)
        X = [*X[:4], np_Y[0], *X[5:]]
    return X
```

```python
filled_df = pd.DataFrame([predict_total_rooms(*x) for x in df.values.tolist()], columns=df.columns)
```

###### Notes

We can improve this model by using 'ocean_proximity'

###3.2.2. Creating

###3.2.3 Converting

Here we convert ocean_proximity values to numeric

```python
filled_df.describe()
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
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>-119.569704</td>
      <td>35.631861</td>
      <td>28.639486</td>
      <td>2635.763081</td>
      <td>1425.476744</td>
      <td>499.539680</td>
      <td>3.870671</td>
      <td>206855.816909</td>
    </tr>
    <tr>
      <th>std</th>
      <td>2.003532</td>
      <td>2.135952</td>
      <td>12.585558</td>
      <td>2181.615252</td>
      <td>1132.462122</td>
      <td>382.329753</td>
      <td>1.899822</td>
      <td>115395.615874</td>
    </tr>
    <tr>
      <th>min</th>
      <td>-124.350000</td>
      <td>32.540000</td>
      <td>1.000000</td>
      <td>2.000000</td>
      <td>3.000000</td>
      <td>1.000000</td>
      <td>0.499900</td>
      <td>14999.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>-121.800000</td>
      <td>33.930000</td>
      <td>18.000000</td>
      <td>1447.750000</td>
      <td>787.000000</td>
      <td>280.000000</td>
      <td>2.563400</td>
      <td>119600.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>-118.490000</td>
      <td>34.260000</td>
      <td>29.000000</td>
      <td>2127.000000</td>
      <td>1166.000000</td>
      <td>409.000000</td>
      <td>3.534800</td>
      <td>179700.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>-118.010000</td>
      <td>37.710000</td>
      <td>37.000000</td>
      <td>3148.000000</td>
      <td>1725.000000</td>
      <td>605.000000</td>
      <td>4.743250</td>
      <td>264725.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>-114.310000</td>
      <td>41.950000</td>
      <td>52.000000</td>
      <td>39320.000000</td>
      <td>35682.000000</td>
      <td>6082.000000</td>
      <td>15.000100</td>
      <td>500001.000000</td>
    </tr>
  </tbody>
</table>
</div>

```python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
ocean_proximity_encoder = LabelEncoder()
filled_df.ocean_proximity = ocean_proximity_encoder.fit_transform(filled_df.ocean_proximity)
filled_df.sample(10)
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
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>17998</th>
      <td>-121.97</td>
      <td>37.28</td>
      <td>25.0</td>
      <td>4707.0</td>
      <td>695</td>
      <td>1995.0</td>
      <td>642.0</td>
      <td>6.6437</td>
      <td>296100.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>7543</th>
      <td>-118.21</td>
      <td>33.90</td>
      <td>41.0</td>
      <td>941.0</td>
      <td>233</td>
      <td>973.0</td>
      <td>253.0</td>
      <td>1.9583</td>
      <td>102300.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>17886</th>
      <td>-121.96</td>
      <td>37.39</td>
      <td>20.0</td>
      <td>1032.0</td>
      <td>229</td>
      <td>658.0</td>
      <td>238.0</td>
      <td>4.5062</td>
      <td>219300.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>14063</th>
      <td>-117.13</td>
      <td>32.75</td>
      <td>20.0</td>
      <td>2271.0</td>
      <td>602</td>
      <td>992.0</td>
      <td>520.0</td>
      <td>2.2599</td>
      <td>157600.0</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1575</th>
      <td>-121.99</td>
      <td>37.77</td>
      <td>14.0</td>
      <td>8213.0</td>
      <td>1364</td>
      <td>3283.0</td>
      <td>1286.0</td>
      <td>5.1755</td>
      <td>294800.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2659</th>
      <td>-123.84</td>
      <td>40.28</td>
      <td>28.0</td>
      <td>2809.0</td>
      <td>605</td>
      <td>1093.0</td>
      <td>438.0</td>
      <td>2.0962</td>
      <td>74000.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4674</th>
      <td>-118.35</td>
      <td>34.07</td>
      <td>52.0</td>
      <td>2497.0</td>
      <td>406</td>
      <td>1030.0</td>
      <td>412.0</td>
      <td>4.8900</td>
      <td>500001.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>7891</th>
      <td>-118.07</td>
      <td>33.88</td>
      <td>17.0</td>
      <td>2407.0</td>
      <td>539</td>
      <td>1422.0</td>
      <td>524.0</td>
      <td>4.2619</td>
      <td>139700.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>15787</th>
      <td>-122.39</td>
      <td>37.79</td>
      <td>52.0</td>
      <td>94.0</td>
      <td>24</td>
      <td>113.0</td>
      <td>27.0</td>
      <td>4.6563</td>
      <td>350000.0</td>
      <td>3</td>
    </tr>
    <tr>
      <th>16139</th>
      <td>-122.46</td>
      <td>37.78</td>
      <td>52.0</td>
      <td>2632.0</td>
      <td>542</td>
      <td>1364.0</td>
      <td>544.0</td>
      <td>3.4605</td>
      <td>441700.0</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>

```python
colormap = plt.cm.RdBu
plt.figure(figsize=(14,12))
plt.title('Pearson Correlation of Features', y=1.05, size=15)
sns.heatmap(filled_df.corr(),linewidths=0.1,vmax=1.0,
            square=True, cmap=colormap, linecolor='white', annot=True)
```

    <matplotlib.axes._subplots.AxesSubplot at 0x1c2dc92898>

![png](/2018-09-01-rnd02-housing/output_28_1.png)

##4. Training (WIP)

```python
X = filled_df[['longitude', 'latitude', 'housing_median_age', 'total_rooms', 'total_bedrooms', 'population', 'households', 'median_income', 'ocean_proximity']].copy()
Y = filled_df[['median_house_value']].copy()
```

```python
# feature scalling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X = sc.fit_transform(X)
```

```python
X.shape
```

    (20640, 9)

```python
from keras import *
from keras.layers import Dense
from keras import Sequential
from keras.wrappers.scikit_learn import KerasRegressor
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
```

```python
# define base model
def baseline_model():
    # create model
    model = Sequential()
    model.add(Dense(13, input_dim=9, kernel_initializer='normal', activation='relu'))
    model.add(Dense(1, kernel_initializer='normal'))
    # Compile model
    model.compile(loss='mean_squared_error', optimizer='adam')
    return model
```

```python
# fix random seed for reproducibility
seed = 7
np.random.seed(seed)
# evaluate model with standardized dataset
estimator = KerasRegressor(build_fn=baseline_model, epochs=50, batch_size=100, verbose=0)
```

```python
kfold = KFold(n_splits=2, random_state=seed)
results = cross_val_score(estimator, X, Y, cv=kfold)
print("Results: %.2f (%.2f) MSE" % (results.mean(), results.std()))
```

    Results: -25723113257.92 (1777165432.31) MSE
