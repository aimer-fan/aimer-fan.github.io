# 基本的 SELECT 语句

## SELECT

```sql
SELECT 1;
# 等价于 DUAL是一个虚拟表，用来维持数据库的结构
SELECT 1 FROM DUAL;
```

## SELECT ... FROM 表名

选择全部列：

```sql
--- * 表示表中的所有字段
SELECT * FROM employees;
```

> 一般情况下，除非需要使用表中所有的字段数据，最好不要使用通配符‘*’。使用通配符虽然可以节省输入查询语句的时间，但是获取不需要的列数据通常会降低查询和所使用的应用程序的效率。通配符的优势是，当不知道所需要的列的名称时，可以通过它获取它们。
>
> 在生产环境下，不推荐你直接使用 SELECT * 进行查询。

选择特定的列：

```sql
SELECT
  employee_id, first_name, last_name
FROM employees;
```

> MySQL中的SQL语句是不区分大小写的，因此SELECT和select的作用是相同的，但是，许多开发人员习惯将关键字大写、数据列和表名小写，读者也应该养成一个良好的编程习惯，这样写出来的代码更容易阅读和维护。

## 列的别名

+ 重命名一个列
+ 便于计算
+ 紧跟列名，也可以 在列名和别名之间加入关键字AS，别名使用双引号，以便在别名中包含空格或特殊的字符并区分大小写。
+ AS 可以省略
+ 建议别名简短，见名知意

```sql
SELECT last_name AS name, commission_pct comm
FROM employees;
```

```sql
SELECT last_name "Name", salary*12 "Annual Salary"
FROM employees;
```

## 去除重复行

默认情况下，查询会返回全部行，包括重复行。

> **在SELECT语句中使用关键字DISTINCT去除重复行**

```SQL
SELECT DISTINCT department_id,salary
FROM employees;
```

`DISTINCT` 其实是对后面所有列名的组合进行去重，你能看到最后的结果都有 salary 这个属性值。如果你想要看都有哪些不同的部门(department_id)，只需要写 `DISTINCT department_id` 即可，后面不需要再加其他的列名了。

## 空值参与运算

所有运算符或列值遇到null值，运算的结果都为null

```sql
SELECT employee_id,salary,commission_pct,
12 * salary * (1 + commission_pct) "annual_sal"
FROM employees;

SELECT employee_id,salary,commission_pct,
12 * salary * (1 + IFNULL(commission_pct,0)) "annual_sal"
FROM employees;
```

这里你一定要注意，在 MySQL 里面， 空值不等于空字符串。一个空字符串的长度是 0，而一个空值的长度是空。而且，在 MySQL 里面，空值是占用空间的。

## 着重号

错误的

```sql
SELECT * FROM ORDER;
/*
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that
corresponds to your MySQL server version for the right syntax to use near 'ORDER' at
line 1
*/
```

正确的

```sql
SELECT * FROM `ORDER`;
/*
+----------+------------+
| order_id | order_name |
+----------+------------+
|        1 | shkstart   |
|        2 | tomcat     |
|        3 | dubbo      |
+----------+------------+
3 rows in set (0.00 sec)
*/

SELECT * FROM `order`;
/*
+----------+------------+
| order_id | order_name |
+----------+------------+
|        1 | shkstart   |
|        2 | tomcat     |
|        3 | dubbo      |
+----------+------------+
3 rows in set (0.00 sec)
*/
```

结论：我们需要保证表中的字段、表名等没有和保留字、数据库系统或常用方法冲突。如果真的相同，请在
SQL语句中使用一对``(着重号)引起来。

## 查询常数

SELECT 查询还可以对常数进行查询。就是在 SELECT 查询结果中增加一列固定的常数列。这列的取值是我们指定的，而不是从数据表中动态取出的。

例如：

```sql
SELECT 'corporationName' as corporation, last_name FROM employees;
```

## 显示表结构

使用DESCRIBE 或 DESC 命令，表示表结构。

```sql
DESCRIBE employees;
// OR
DESC employees;

/*
+----------------+-------------+------+-----+---------+-------+
| Field          | Type        | Null | Key | Default | Extra |
+----------------+-------------+------+-----+---------+-------+
| employee_id    | int(6)      | NO   | PRI | 0       |       |
| first_name     | varchar(20) | YES  |     | NULL    |       |
| last_name      | varchar(25) | NO   |     | NULL    |       |
| email          | varchar(25) | NO   | UNI | NULL    |       |
| phone_number   | varchar(20) | YES  |     | NULL    |       |
| hire_date      | date        | NO   |     | NULL    |       |
| job_id         | varchar(10) | NO   | MUL | NULL    |       |
| salary         | double(8, 2)| YES  |     | NULL    |       |
| commission_pct | double(2,2) | YES  |     | NULL    |       |
| manager_id     | int(6)      | YES  | MUL | NULL    |       |
| department_id  | int(4)      | YES  | MUL | NULL    |       |
+----------------+-------------+------+-----+---------+-------+
*/
```

其中，各个字段的含义分别解释如下：

+ Field:表示字段名称。
+ Type:表示字段类型。
+ Null:表示该列是否可以存储NULL值。
+ Key:表示该列是否已编制索引。PRI表示该列是表主键的一部分;UNI表示该列是UNIQUE索引的一部分;MUL表示在列中某个给定值允许出现多次。
+ Default:表示该列是否有默认值，如果有，那么值是多少。
+ Extra:表示可以获取的与给定列有关的附加信息，例如AUTO_INCREMENT等。

## 过滤数据

语法:

```sql
SELECT 字段1,字段2 FROM 表名
WHERE 过滤条件
```

+ 使用WHERE 子句，将不满足条件的行过滤掉
+ WHERE 子句紧随 FROM 子句

举例：

```sql
SELECT employee_id, last_name, job_id, department_id
FROM   employees
WHERE  department_id = 90;
```
