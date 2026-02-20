# 现代Linux发行版的根目录下的子目录分类

```bash
/boot #启动核心 存放Linux Kernel、Initrd镜像、Grub引导程序
/etc #存放系统的配置文件
/bin & /sbin #基础命令的二进制文件存放 sbin通常存放root才能运行的管理命令，这两个目录通常是符号链接到/usr/bin & /usr/sbin
/home #当前普通用户的家目录
/root #root用户的家目录
/usr #存放静态软件资源 安装的软件、库等 /usr/local通常是用户自编译安装软件的默认位置
/opt #通常用于安装大型商业软件或独立部署的包
/var #存放动态变动数据
/tmp #存放临时文件 系统重启或定期会自动清理
/mnt #用于挂载硬盘分区
/proc #存放进程和内核信息(该目录是存放在内存中的虚拟目录)
/sys #存放硬件设备信息 用于内核与硬件交互(该目录是存放在内存中的虚拟目录)
/dev #存放设备映射信息 Linux一切皆文件! (该目录是存放在内存中的虚拟目录)
/run #存放系统启动以来的运行时数据
```



# Linux服务与进程管理

## systemd

systemd是Linux Kernel启动后的第一个进程(PID1) 它负责管理系统所有的服务、任务和设备

> 常用命令

```bash
systemctl start serviceName #启动服务
systemctl enable serviceName #开机自启服务
systemctl status serviceName #查看服务状态
systemctl stop serviceName #停止服务
systemctl restart serviceName #重启服务
```

### systemd的自定义配置文件编写

通常，自定义配置文件存放在/etc/systemd/system/    文件后缀名为.service

```bash
[Unit]
Description=服务名称
After=network.target        # 在网络启动后再启动该服务

[Service]
Type=simple					#simple:程序直接启动 forking:程序启动后会产生子进程 oneshot:一次性任务，运行完就退出
User=username                   # 以哪个用户身份运行（安全考虑，不建议root）
WorkingDirectory=/data/app		#运行文件所在的绝对路径目录
ExecStart=java -jar /data/app/test.jar #程序的启动命令，必须用绝对路径 
Restart=on-failure          #always:无论如何退出的都会重启 on-failure:只有非正常退出才重启
RestartSec=5s               # 重启间隔时间

[Install]
WantedBy=multi-user.target  # 设置开机自启时，对应的运行级别
```



## journald

journald是systemd的附属组件，用于收集和管理系统日志

> 常用命令

```bash
journalctl -f #查看实时日志
journalctl -u serviceName #查看某个服务的日志
journalctl -b #查看本次开机后的日志
```



# Shell Script脚本编写和文本处理

## 脚本文件的开头需要指定解释器路径

```bash
#!/bin/bash
```

## 变量的定义与引用

```bash
#!/bin/bash
value="Hello" #将常量123赋值给value
username="$(whoami)" #将命令whoami返回的值赋值给username

echo "$value:$username"
```

## 循环控制

```bash
#!/bin/bash
for i in {1..5}; do
        echo "第$i次循环"
done
```

## 条件判断

### 数值判断

```bash
#!/bin/bash
age=18
if [[ $age == 18 || $age > 18 ]]; then
        echo "已经成年了"
elif [[ $age < 18 ]]; then
        echo "还没成年"
else
        echo "年龄数据错误!"
fi
```

### 字符串判断

```bash
#!/bin/bash
username=$(whoami)
if [[ $username == "root" ]]; then
        echo "欢迎超级管理员用户"
elif [[ $username != "root" && $username == "endy" ]]; then
        echo "欢迎用户endy"
elif [[ -z $username ]]; then
        echo "判断用户名为非空字符串"
elif [[ -n $username ]]; then
        echo "判断用户名为空"
fi
```

### 文件判断

```bash
#!/bin/bash
path="/test/hello"

if [[ -f $path ]]; then
        echo "路径是一个文件"
elif [[ -d $path ]]; then
        echo "路径是一个目录"
elif [[ -e $path ]]; then
        echo "路径不存在"
fi

if [[ -r $path ]]; then
        echo "路径有读取权限"
fi

if [[ -w $path ]]; then
        echo "路径有写入权限"
fi

if [[ -x $path ]]; then
        echo "路径有执行权限"
fi
```

## 文本处理

### sed

```bash
sed 's/FLASE/TRUE/g' test.conf #将test.conf中的FLASE替换为TRUE，但是只会输出替换结果，不会在文件中实际替换

sed -i 's/FLASE/TRUE/g' test.conf #将test.conf中的FLASE替换为TRUE，在文件中实际替换

sed -i '1,3d' test.conf #删除test.conf 1至3行的内容
```

### awk

#### 提取列

awk默认以空格或制表符作为分隔符

$0代表整行内容

$1,$2,$n代表第1,2,n列

$NF代表最后一列

```bash
awk -F: '{print $1}' /etc/passwd #提取/etc/passwd文件中所有用户的用户名
df -h | awk '$5> "40%" {print$0}' #查出df -h返回的数据中占用大于40%的数据
```

#### 条件判断

awk可以通过`=`,`!=`,`>`,`<`,`>=`,`<=`用来比较数值,也可以使用正则匹配`~`,`!~`

#### 内置变量

- NR:当前处理的是第几行
- NF:当前行有多少列
- FS:输入分隔符

### grep

```bash
#语法
grep 参数 要查找的字符串或正则表达式 文件名
```

示例:从/etc/passwd中查找使用/bin/bash的用户并打印

```bash
grep -n /bin/bash /etc/passwd
```

### sort

对文本内容进行排序

常用参数:-n按数值排序 -r倒序 -k指定按第几列排序 -t指定分隔符

示例:将/etc/passwd按照UID数字带下倒序排序

```bash
sort -t: -k3 -nr /etc/passwd
```

### tr

用于大小写转换,替换字符或压缩空格

常用参数:-d删除 -s压缩重复字符

```bash
ss -tulnp | tr -s ' '
```

### cut

当你只需要每一行的某一部分使用

常用参数:-d指定分隔符 -f取第几列

```bash
cut -d: -f1 /etc/passwd #提取/etc/passwd的用户名
```

### paste

将两个文件的同一行并排拼接在一起

常用参数:-d 指定拼接时的分隔符

```bash
paste -d: 1.txt 2.txt
```

### uniq

用于去除连续重复的行

常用参数:-c统计重复次数 -d只显示重复的行

```bash
cat access.log | cut -d' ' -f1 | sort | uniq -c | sort -nr
```

### tee

让数据打印到屏幕的同时也写入到文件里

使用参数:-a追加写入

```bash
ss -tulnp | tee -a testtee.log #这里时使用ss -tulnp查看当前使用的网络端口并通过管道使用tee命令
```



# Linux存储管理

## 系统启动自动挂载硬盘分区

打开/etc/fstab文件并编辑

```bash
#UUID=你的UUID    /mnt(这里填你在mnt目录下新建的目录名称)      drvfs            defaults      0         0

#示例
UUID=208f8015-7512-4466-85fc-fbcd8e6507d0 /mnt/data ext4 defaults 0 0
```

## ACL权限管理

首先要安装acl

acl主要由两个命令控制: `getfacl` ，`setfacl`

使用getfacl查看文件/目录的详细权限

```bash
getfacl hello.txt
-------------
#输出为:
# file: hello
# owner: root
# group: root
user::rw-
group::r--
other::r--
-------------
```

给特定用户授权

```bash
setfacl -m u:endy:rwx hello.sh #给用户endy授权hello.sh文件读写执行的权限 -m参数表示modify
```

给特定用户组授权

```bash
setfacl -m g:devgroup:rxw hello.sh #给用户组devgroup授权hello.sh文件读写执行的权限
```

删除权限

```bash
setfacl -x u:endy hello.sh #删除特定授权的用户endy的所有权限 -x代表remove

setfacl -x g:devgroup hello.sh #删除特定授权的用户组devgroup的所有权限

setfacl -b hello.sh #删除所有的ACL权限(回归UGO模式) -b代表remove-all
```



## 磁盘分区

## LVM卷管理

# Linux网络管理

## 核心查看命令

### 查看ip地址

```bash
ip a #由ip address简写而来
```

#### 查看路由表

```bash
ip r #由ip route简写而来
```

#### 查看端口监听/连接

```bash
ss -tunlp #查看tcp和udp的监听和进程以及端口号显示

ss -tnlp #仅查看tcp的监听和进程以及端口号显示

ss -unlp #仅查看tcp的监听和进程以及端口号显示
```

#### 查看网络邻居/ARP缓存

```bash
ip neigh
```

## 网络配置工具NetworkManager

### 查看所有网卡状态

```bash
nmcli device status
```

### 查看所有连接配置

```bash
nmcli connection show
```

### 配置网卡静态ip

```bash
#eth0为网卡名称
nmcli con mod eth0 ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1 ipv4.method manual
nmcli con up eth0
```

## 防火墙

> [!TIP]
>
> 可选用Firewalld或UFW
>

### UFW

#### 启动和关闭防火墙

```bash
ufw enable #启动
ufw disable #关闭
```

#### 放行端口号

```bash
ufw allow 80/tcp #或者使用ufw allow http,使用常见的应用层协议则会自动放行对应的传输层协议和默认端口号
```

#### 批量放行端口号

```bash
ufw allow 3000:3100/tcp #这将会放行3000到3100之间的所有端口号且仅允许tcp通过
```

#### 允许和拒绝特地ip访问

```bash
ufw allow from 192.168.1.1 #允许
ufw deny from 192.168.1.1 #拒绝
```

#### 只允许特地网段访问特定端口

```bash
ufw allow from 192.168.1.0/24 to any port 80 proto tdp #只允许来自192.168.1.0/24这个网段的用户通过tcp访问本地任意一块网卡的ip地址的80端口

#如果要限制用户访问本机网卡的话就改成
ufw allow from 192.168.1.0/24 to 10.0.0.1 80 proto tdp
```

#### 查看当前放行规则

```bash
ufw status numbered
```

#### 删除规则

- 按编号删除

  ```bash
  #使用这条命令调出规则列表
  ufw status numbered
  #根据规则列表最前面的编号删除
  ufw delete 4
  ```

- 按表达式删除

  ```bash
  #按80端口tcp的规则来删除
  ufw delete allow 80/tcp
  ```

-  重置

  ```bash
  ufw reset
  ```




### Firewalld

#### 启动和关闭防火墙

```bash
systemctl enable --now firewalld #启动并开机自启firewalld
systemctl stop --now firewalld #停止firewalld服务
systemctl disable --now firewalld #关闭firewalld的开机自启
```

#### 查看状态

```bash
firewall-cmd --state
```

#### 重载配置

```bash
firewall-cmd --reload
```

#### 放行端口

```bash
firewall-cmd --add-port=80/tcp --permanent #--permanent这个参数决定该规则是永久生效的
```

#### 设置信任网段

*信任级别*

Firewalld通过区域来划分网络信任级别,常用的区域包括

- trusted:完全信任，允许所有流量。
- internal:用于内部网络，默认只允许ssh、mdns等基础服务。
- public:默认区域，仅允许指定的入站连接。

```bash
firewall-cmd --zone=trusted --add-source=10.0.0.0/8 --permanent
```

#### 设置特定允许某个ip访问

```bash
firewall-cmd --add-rich-rule='rule family="ipv4" source address="10.1.1.1" accept' --permanent
```

#### 限制网段访问服务

```bash
firewall-cmd --add-rich-rule='rule family="ipv4" source address="10.2.1.1" service name="ssh" accept' --permanent
```

#### 删除放行端口规则

```bash
firewall-cmd --permanent --remove-port=80/tcp
```

#### 删除已允许的服务

```bash
firewall-cmd --permanent --remove-service=ssh
```

#### 删除特定源网段

```bash
firewall-cmd --permanent --remove-source=10.0.0.1/8
```

#### 删除富规则

```bash
firewall-cmd --permanent --remove-rich-rule='rule family="ipv4" source address="10.1.1.0/8" accept'
```

