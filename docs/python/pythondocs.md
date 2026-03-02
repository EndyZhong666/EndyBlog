## 解释器类型

|                | venv                 | uv                     | conda                |
| -------------- | -------------------- | ---------------------- | -------------------- |
| 所属           | Python官方标准库     | Astral(Ruff团队)       | Anaconda/Miniconda   |
| 主要用途       | 创建隔离的Python环境 | 极速的包管理和环境管理 | 跨语言环境和科学计算 |
| 包管理器       | pip                  | 自带包管理器           | 自带conda包管理器    |
| 支持非Python包 | 不支持               | 不支持                 | C++、Rust            |
| 预编译包       | 不支持               | 支持                   | 支持                 |
| 兼容性         | 最好                 | 需要Python3.8+         | 广泛                 |

内置数据类型和变量定义	

```python
num = 10 #int(数字)类型
numj = 7j #complex(复数)类型
pi = 3.14159 #float(浮点数)类型 
is_true = True #bool(布尔)类型
is_true = False #bool(布尔)类型
text = "hello" #str(字符串)类型
```

## 运算符

算术运算符、赋值运算符、比较运算符、位运算符等运算符和主流语言基本一致

### 逻辑运算符

`and`:等同于主流语言的`&&`

`or`:等同于主流语言的`||`

`not`:等同于主流语言的`!=`

### 身份运算符

`is`:判断两个对象是否是同一个对象

`is not`:判断两个对象是否不是是同一个对象

### 成员运算符

`in`:判断元素是否在序列中

`not in`:判断元素是否不在序列中

## 流程控制

### 条件判断

```python
age = 18

if age == 18:
  print("刚成年")
elif age > 18:
  print("已成年")
else
	print("未成年")
```

### for循环

```python
for char in "Python":
  print(char)
  
for i in range(10):
  if i == 5:
    break
  print(i)

for i in range(5):
  if i == 3:
    continue
  print(i)
```

### while循环

```python
count = 0
while count < 5:
  print(count)
  count += 1
else:
  print("循环结束") #如果while里面有break语句，且break执行后else里的语句不会执行
```

### 数据结构

#### 列表(List)

```python
empty_list = [] #直接声明空列表
empty_list = list() #使用构造函数
##################################
numbers = [1,2,3,4,5,6]
list_from_string = list("Python")
list_from_range = list(range(5))
list_from_tuple = list((1,2,3))

#访问元素
print(list_from_string[0]) #第一个元素
print(list_from_string[-1]) #最后一个元素

#添加元素
numbers.append(7) #在末尾添加
numbers.insert(0,0) #插入到第0个元素

#删除元素
del list_from_tuple[2] #按照索引删除第2个元素
numbers.remove(5) #按照元素值删除
popped = list_from_range.pop() #删除最后一个值并返回
popped = list_from_range.pop(0) #删除第一个值并返回
list_from_string.clear() #清空列表
numbers[1:3] = [] #索引1和索引2的元素会被清除

#修改元素
numbers[3] = 4
```

#### 元组(Tuple)	

Python中的元组是不可变的，一旦创建就能修改，添加，删除其中的元素

```python
tup = (1,2,3)
empty_tup = ()
single_tup = (5,) #定义单个元素的元组必须加,

########################################

#常见的绕路修改法
tup = (1,2,3)
temp = list(t)
temp[0] = 99
tup = tuple(temp) #现在是(99,2,3)

tup2 = (1,[2,3])
tup2[1][0] = 3 #元组中包括了列表的话，列表的元素是可以修改的

```



#### 字典(Dictionary)

**字典 (Dictionary)** 是以 **键值对 (Key-Value)** 形式存储的数据结构

```python
user = {"name":"endy","gender":"men"}

#读取字典数据
name = user.get("name")

for key,value in user.items():
  print(f"{key}:{value}")

#修改或新增
user["age"] = 22
user["gender"] = "women"

#删除指定键
del user["age"]
```



#### 集合(Set)

**集合 (Set)** 是一个**无序**且**元素唯一**的容器。简单来说，它就像是一个“只有键、没有值”的字典。

```python
s = {1,2,2,3,4} #结果自动变为{1,2,3,4}
empty_set = set() #使用set构造函数创建空集合

#添加元素
s.add(5)
#删除元素
s.remove(1) #元素不存在时会报错
#修改元素
if 2 in s:
  s.remove(2)
  s.add(6)

```



**函数**：如何定义函数、参数传递、返回值。



**面向对象编程（OOP）**：理解类（Class）、对象（Object）、继承、封装、多态。这是 Python 进阶的基石。



**模块与包**：学会使用 `import`导入标准库和第三方库，理解 `__init__.py`的作用。



**数据可视化**：`Matplotlib`（绘图）、`Seaborn`（统计图表）。



**网络请求**：`Requests`（发送 HTTP 请求）。



文件操作	