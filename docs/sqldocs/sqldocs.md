# 数据库操作

## 创建数据库

```sql
#SQL Server
CREATE DATABASE TestDB
ON PRIMARY(
	NAME = 'DB_Data',
	FILENAME = 'E:\SQLDATA\DB.mdf', #数据文件存放路径
	SIZE = 10MB , MAXSIZE = UNLIMITED, FILEGROWTH = 5MB
)
LOG ON(
	NAME = "DB_Log",
	FILENAME = 'E:\SQLDATA\DB.ldf', #日志文件存放路径
	SIZE = 5MB, MAXSIZE = 100MB, FILEGROWTH = 10%
);
```



## 删除数据库

```sql
#SQL Server
USE TestDB;
GO
ALTER DATABASE TestDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE; #切换为单用户模式并回滚所有事务
GO
USE master; #删除前切换至其他数据库,不然删除时会报错数据库被使用
DROP DATABASE TestDB;
```



## 修改数据库

修改数据库名称

```sql
#SQL Server
ALTER DATABASE TestDataBase MODIFY NAME = TestDB;
```

修改数据库文件大小

```sql
#SQL Server
AlTER DATABASE TestDB MODIFY FILE (NAME = 'DB_Data', SIZE = 100MB, MAXSIZE=150MB, FILEGROWTH=10MB);
```

修改数据库读写权限

```sql
#SQL Server
AlTER DATABASE TestDB SET READ_ONLY; #只读

AlTER DATABASE TestDB SET READ_WRITE; #可读写
```

修改数据库恢复模式

```sql
#SQL Server
AlTER DATABASE TestDB SET RECOVERY SIMPLE; #简单模式

AlTER DATABASE TestDB SET RECOVERY FULL; #完整模式
```

## 查询数据库

查询所有数据库列表

```sql
#SQL Server
SELECT name,database_id,create_date,state_desc FROM sys.databases;
```

查询数据库的物理路径及大小

```sql
#SQL Server
SELECT name,physical_name,size*8/1024 AS SIZEMB FROM sys.master_files;
```

查询当前数据库的详细属性

```sql
#SQL Server
EXEC sp_helpdb 'TestDB';
```

查询数据库的使用权限

```sql
#SQL Server
SELECT 
    UserName = princ.name, 
    UserType = princ.type_desc, 
    PermissionName = perm.permission_name, 
    State = perm.state_desc, 
    ObjectName = OBJECT_NAME(perm.major_id)
FROM sys.database_permissions perm
INNER JOIN sys.database_principals princ ON perm.grantee_principal_id = princ.principal_id
WHERE princ.name NOT IN ('public', 'guest') -- 过滤掉系统默认角色
ORDER BY UserName;
```

## 数据库权限管理





# 数据表操作

## 创建数据表

```sql
#SQL Server
CREATE TABLE Employee(
	ID INT IDENTITY(1,1),  --自增
	EmployeeID CHAR(10) UNIQUE, --设置唯一约束
	Name NVARCHAR(30) NOT NULL,	--设置非空约束
	Age INT CHECK(Age >= 18), --检查约束
	DeptID TINYINT DEFAULT 1, --默认值
	Email NVARCHAR(100),
	JoiningDate DATETIME DEFAULT GETDATE() --设置默认值为GETDATE()返回的值(即返回今天的日期)
	PRIMARY KEY(ID), --将ID字段设为主键
	CONSTRAINT UQ_Email UNIQUE (Email), --为Email字段增加唯一约束
	CONSTRAINT FK_DEPT_ID FOREIGN KEY(DeptID) REFERENCES dbo.Dept(ID) --为DeptID字段增加外键连接到dbo.Dept表的ID字段
);
```

## 删除数据表

```sql
#SQL Server
DROP TABLE Employee; #彻底删除表结构
```

## 修改数据表

```sql
#SQL Server
ALTER TABLE Employee ADD Email NVARCHAR(100); #增加字段

ALTER TABLE Employee DROP COLUMN Email;	#删除字段

ALTER TABLE Employee ALTER COLUMN Email NVARCHAR(150) NOT NULL;	#修改字段数据类型和是否为空

ALTER TABLE Employee ADD CONSTRAINT Email_UQ UNIQUE (Email);	#给字段增加约束

ALTER TABLE Employee DROP CONSTRAINT Email_UQ;	#删除字段的约束

ALTER TABLE Employee ADD CONSTRAINT FK_DEPT FOREIGN KEY (DeptID) REFERENCES dbo.Dept(ID); #增加外键约束

ALTER TABLE Employee DROP CONSTRAINT FK_DEPT; #删除外键约束
```

## 查询数据表

```sql
#SQL Server
EXEC sp_help 'Employee'; #查询表结构

EXEC sp_helpindex 'Employees'; #查询表的索引情况

EXEC sp_helpconstraint'Employee'; #查询表的约束情况
```



# 数据操作

## 插入数据

```sql
#SQL Server
INSERT INTO Dept(Name,Description) VALUES ('人事部','负责公司日常的人员招聘,考勤管理'); #单条插入(只插入Name和Description这两个字段的数据)

INSERT INTO Dept(Name,Description) VALUES 
('财务部','负责公司财务进账出账,发票处理,报税'),
('业务部','负责公司业务对接'),
('制造部','负责公司产品生产'),
('网络管理部','负责管理公司内部的IT设备'); #多条插入

INSERT INTO Dept(Name,Description) OUTPUT inserted.ID,inserted.Name,inserted.Description VALUES ('生产管理部','负责管理制造部的生产计划'); #插入后立即返回结果
```

## 更新数据

```sql
#SQL Server
UPDATE Dept SET Name = 'IT运维部' Where Name = '网络管理部'; #基础数据更新

UPDATE TOP(100) Employee SET DeptID = 5 Where DeptID = 2; #更新前100条数据,适用于大量数据批量更新

UPDATE Employee SET Salary = CASE 
	WHEN DATEDIFF(year,JoiningDate,GETDATE()) > 5 THEN Salary * 1.5
	WHEN DATEDIFF(year,JoiningDate,GETDATE()) > 10 THEN Salary * 2
	ELSE Salary * 1.2
END
WHERE Dept = '制造部'; #条件式更新,根据不同的条件更新不同的数据;

UPDATE Employee
SET Active = FALSE
OUTPUT 
    deleted.Active AS OldStock, -- 更新前的值
    inserted.Active AS NewStock -- 更新后的值
WHERE EmployeeID = 20200110233; #更新后立即返回结果

UPDATE Employee SET Employee.Name = Dept.Name,Employee.Description = Dept.Description
FROM Employee INNER JOIN Dept ON Employee.DeptID = Dept.ID Where Dept.ID = 10; #跨表更新数据
```

## 删除数据

```sql
#SQL Server
DELETE FROM Employee WHERE Employee.ID = 1; #根据指定条件删除

DELETE TOP(100) FROM Employee WHERE Age > 35; #删除前100条数据

DELETE e.* FROM Employee AS e INNER JOIN Dept ON Employee.DeptID = Dept.ID WHERE Dept.ID = 15; #跨表删除 

TRUNCATE TABLE Employee; #仅删除表里的数据,重置自增ID,保留表结构(如果被外键引用必须先删除外键)

DELETE FROM Employee;	#仅删除表里的数据,不重置自增ID,保留表结构
```



## 查询数据

```sql
#SQL Server
SELECT Name,Age FROM Employee WHERE EmployeeID = 1145141919; #基础查询

SELECT Name,Age FROM Employee WHERE Name LIKE '李%' AND Age BETWEEN 22 AND 35; #模糊查询+范围查询

SELECT e.* FROM Employee AS e FROM Employee ORDER BY JoiningDate DESC; #查询返回的结果降序排序
SELECT e.* FROM Employee AS e FROM Employee ORDER BY JoiningDate ASC; #查询返回的结果升序排序

SELECT e.* FROM Employee AS e ORDER BY JoiningDate DESC OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY; #分页查询,跳过前20条数据获取后10条数据

SELECT e.*,d.* FROM Employee AS e INNER JOIN Dept AS d ON e.DeptID = d.ID; #INNER JOIN多表查询(会取得两张表相同的部分)

SELECT e.*,d.* FROM Employee AS e LEFT JOIN Dept AS d ON e.DeptID = d.ID; #LEFT JOIN多表查询(右表数据加入左表数据,右表无匹配左表数据则显示NULL)

SELECT e.*,d.* FROM Employee AS e RIGHT JOIN Dept AS d ON e.DeptID = d.ID; #RIGHT JOIN多表查询(左表数据加入右表数据,右表无匹配左表数据则显示NULL)

SELECT d.Name,COUNT(e.Name)AS '人数' ,AVG(e.Age)AS '平均年龄' FROM Employee AS e LEFT JOIN Dept AS d ON e.DeptID = d.ID GROUP BY d.NAME HAVING AVG(e.Age) > 30; #GROUP BY + HAVING查询,先查询全部的平均年龄再分组,最后使用HAVING再次筛选一遍

SELECT e.* from Employee WITH (NOLOCK) #不加锁查询,防止在高并发下被阻塞
```

## 事务控制

在SQL中,事务控制是遵循ACID原则(原子性,一致性,隔离性,持久性),简单来讲就是一组操作要么全部成功并永久保存,要么全部失败并回退

```sql
#SQL Server
BEGIN TRANSACTION:
BEGIN TRY
	INSERT INTO Dept(Name,Description) VALUES('生产技术部','负责开发制造过程中的设备和软件程序'); #数据操作1
	
	UPDATE Employee SET Dept = '生产技术部' WHERE Dept = '制造部' and Age = 30;	#数据操作2
	
	COMMIT TRANSACTION; #如果上面两条操作都成功则提交事务
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION; #如果上面的TRY触发了异常则回滚数据
	SELECT ERROR_MESSAGE();	#查询报错信息
END CATCH
```

# 存储过程

存储过程是一组预编译的SQL语句,它不仅能提高性能,还能封装业务逻辑,减少网络流量

```sql
#SQL Server
CREATE PROCEDURE usp_GetEmployeeByDept
	@DeptName NVARCHAR(100) --调用这个存储过程时输入的参数
AS
BEGIN
	SELECT EmployeeID,Name,Age
	FROM Employee
	WHERE Dept = @DeptName;
END;

EXEC usp_GetEmployeeByDept @DeptName = '制造部'; #调用上面的存储过程
```



# 触发器

触发器是一种特殊的存储过程,它不能被主动调用,而是由数据表发生INSERT,UPDATE,DELETE事件时自动执行

```sql
#SQL Server
CREATE TRIGGER trg_EmployeeDeleted
ON Employee 
AFTER DELETE #Employee表在执行DELETE命令时会触发这个触发器
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO EmployeeLog(EmployeeID,Name,Age)
	SELECT EmployeeID,Name,Age
	FROM Deleted;
END
```



# 视图

视图是一种虚拟表,不存储实际数据,而是存储一条SELECT查询语句,常用于存放非常复杂的SELECT语句

## 创建视图

```sql
#SQL Server
CREATE VIEW v_EmployeeSalary
AS
SELECT e.EmployeeID,e.Name,d.Name AS DeptName,s.Salary
FROM Employee e
LEFT JOIN Dept d ON e.DeptID = d.ID
LEFT JOIN Salary s ON e.EmployeeID = s.EmployeeID;

SELECT * FROM v_EmployeeSalary WHERE DeptName = '人事部'; #查询视图
```

## 删除视图

```sql
DROP VIEW v_EmployeeSalary;
```

# 备份与恢复

```sql
#SQL Server

#数据库完整备份
BACKUP DATABASE MyDatabase 
TO DISK = 'E:\Backup\TestDB_Full.bak'
WITH FORMAT, MEDIANAME = 'SQLServerBackups', NAME = 'Full Backup of TestDB';

#数据库日志备份
BACKUP LOG MyDatabase 
TO DISK = 'E:\Backup\TestDB_Log.trn';

#还原数据库
RESTORE DATABASE TestDB
FROM DISK = 'E:\Backup\TestDB_Full.bak'

#还原到特定时间点
RESTORE DATABASE TestDB FROM DISK = 'E:\Backup\TestDB_Full.bak' WITH NORECOVERY;
RESTORE LOG TestDB FROM DISK = 'E:\Backup\TestDB_Log.trn' 
WITH RECOVERY, STOPAT = '2026-02-20 15:30:00';
```

