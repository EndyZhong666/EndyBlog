---
title: Python
description: Python学习记录
---

## 解释器类型

|                | venv                 | uv                     | conda                |
| -------------- | -------------------- | ---------------------- | -------------------- |
| 所属           | Python官方标准库     | Astral(Ruff团队)       | Anaconda/Miniconda   |
| 主要用途       | 创建隔离的Python环境 | 极速的包管理和环境管理 | 跨语言环境和科学计算 |
| 包管理器       | pip                  | 自带包管理器           | 自带conda包管理器    |
| 支持非Python包 | 不支持               | 不支持                 | C++、Rust            |
| 预编译包       | 不支持               | 支持                   | 支持                 |
| 兼容性         | 最好                 | 需要Python3.8+         | 广泛                 |

## 内置数据类型和变量定义	

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



## 函数

### 入口函数

```python
#只有直接运行当前脚本文件时，这段函数才执行。
if __name__ == '__main__':
  print("程序的入口函数") 
```

### 返回值

```python
#单一返回值
def get_data():
  return 1

if __name__ == '__main__':
  print(get_data) #输出1
  
####################################
#多返回值
def get_user():
    return "name","endy" #将会自动转换为元组

if __name__ == '__main__':
    key,value = get_user()
    print(key,value) 
```

### Lambda

```python
# 普通函数
def add(x, y):
    return x + y
# Lambda写法
add = lambda x, y: x + y
```

### 类型提示

```python
#类型提示可以增强可读性并让IDE提供更好的纠错功能,但是在运行时并不会强制检查类型
def set_user(name: str, age: int):
    print(f"name:{name},age:{age}")
```

### 闭包和装饰器

```python
def make_multiplier(n: int):
    # 第一层：装饰器工厂函数。
    # 它的作用是接收外部参数 n，并“闭包”掉这个参数，返回一个真正的装饰器。
    def decorator(func):
        # 第二层：真正的装饰器（Decorator）。
        # 它的参数 func 就是被 @ 符号装饰的那个函数对象。
        def wrapper(*args, **kwargs):
            # 第三层：包装函数（Wrapper）。
            # 负责逻辑扩展：先执行原函数，拿到结果后再利用闭包里的 n 进行处理。
            result = func(*args, **kwargs)
            return result * n
        return wrapper #返回wrapper函数的返回值
    return decorator #返回decorator函数的返回值

# 这里的执行顺序是：
# 1. 先执行 make_multiplier(2)，返回 decorator 函数。
# 2. 此时相当于执行 @decorator，将 get_num 传给 decorator。
# 3. get_num 最终指向了 wrapper。
@make_multiplier(2) 
def get_num():
    return 2
```

## 面向对象

### 封装

```python
class Language:
    #类成员
    name:str #public成员
    _runtime:str #前面有一个_的是protect成员
    __type:str #前面有两个_的是private成员

    #类构造函数
    def __init__(self,name:str,_runtime:str,_type:str):
        self.name = name
        self._runtime = _runtime
        self._type = _type

    #类成员函数
    def run(self):
        print(f"这个{self._type}类型的{self.name}程序开始在{self._runtime}上运行了")

if __name__ == '__main__':
    py = Language("python","venv","Dynamic")
    py.run()
```

### 继承

```python
class Language:
    #类成员
    name:str #public成员
    _runtime:str #前面有一个_的是protect成员

    #类构造函数
    def __init__(self,name:str,_runtime:str):
        self.name = name
        self._runtime = _runtime

    #类成员函数
    def run(self):
        print(f"这个{self.name}程序开始在{self._runtime}上运行了")

class StaticLanguage(Language):
    _type:str
    def __init__(self, name: str, _type: str, _runtime: str):
        super().__init__(name, _runtime) #使用父类构造函数初始化子类成员
        self._type = _type
    #子类的成员函数
    def build(self):
        print(f"这个{self._type}类型的{self.name}程序开始在编译了")

    #重写父类函数
    def run(self):
        print(f"这个{self._type}类型的{self.name}程序开始运行了")


if __name__ == '__main__':
    py = StaticLanguage("C#","static","native")
    py.run()

```

### 多态

#### 经典多态

不同子类可以对同一个方法名有不同的实现。通过调用相同的接口，产生不同的结果。

```python
class Shape:
    def draw(self):
        print("绘制形状")

class Circle(Shape):
    def draw(self):
        print("绘制圆形")

class Square(Shape):
    def draw(self):
        print("绘制正方形")

def render(shape_obj):
    shape_obj.draw()

if __name__ == '__main__':
    render(Circle())
    render(Square())
    render(Shape())
```



#### 鸭子多态

无需继承，只要对象有相同的方法就可以参与多态

```python
class Circle():
    def draw(self):
        print("绘制圆形")

class Square():
    def draw(self):
        print("绘制正方形")

def render(shape_obj):
    shape_obj.draw()

if __name__ == '__main__':
    render(Circle())
    render(Square())

```



## 模块与包

### import

`import`语句用于导入模块(Module，即.py文件)或包(package,及包含模块的目录),从而实现代码复用。

```python
import os #导入整个模块
import BeautifulSoup as bs #导入时设置别名，简化代码编写
from math import pi #只导入特定函数或变量
from module import * #导入模块内所有非下划线开头的成员
```

### ``__init__.py``

`__init__.py`的作用是将该文件所在的目录表示为一个Python Package,使该目录下的模块能够被正常导入

当Package被首次导入时,`__init__.py`中的代码会自动运行，常用于检查依赖项以及配置包级别的全局变量



## 常用的package

### HTTP请求包

requests

```python
#普通GET请求
response = requests.get("http://localhost:8080/test/get")
print(response.text)

#在URL中携带参数的GET请求
params = {"value":"python"}
response = requests.get("http://localhost:8080/test/get/params", params=params)
print(response.text)

#post携带参数和GET请求一样,把get方法改成post方法就行
```



### 文件操作

os

```python
# 获取当前工作目录
cwd = os.getcwd()

# 列出目录下所有文件和文件夹
files = os.listdir('.')

# 创建文件夹 (单层)
os.mkdir('new_folder')

# 递归创建多级文件夹 (非常实用)
os.makedirs('path/to/very/deep/folder', exist_ok=True)

# 重命名文件或移动
os.rename('old.txt', 'new.txt')

# 删除文件
os.remove('file.txt')

# 删除空文件夹
os.rmdir('empty_folder')

#路径拼接
full_path = os.path.join('user', 'data', 'config.json')

#检查文件或文件夹是否存在。
os.path.exists()

#将路径拆分为目录名和文件名。
os.path.split()

#获取文件扩展名
os.path.splitext()
```

### 执行shell命令

subprocess

```python
result = subprocess.run(['ls','-l','/Users/endy'],capture_output=True,text=True)
print(result.stdout) #输出命令返回
print(result.returncode) #输出状态码

#获取命令实时输出
process = subprocess.Popen(['ping', 'google.com'], stdout=subprocess.PIPE, text=True)

while True:
    output = process.stdout.readline()
    if output == '' and process.poll() is not None:
        break
    if output:
        print(output.strip())
```

