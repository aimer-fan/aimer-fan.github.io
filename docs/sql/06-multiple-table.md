# 多表查询

多表查询，也称为关联查询，指两个或更多个表一起完成查询操作。
前提条件:这些一起查询的表之间是有关系的(一对一、一对多)，它们之间一定是有关联字段，这个关联字段可能建立了外键，也可能没有建立外键。

## 笛卡尔积（交叉连接）

笛卡尔乘积是一个数学运算。假设我有两个集合 X 和 Y，那么 X 和 Y 的笛卡尔积就是 X 和 Y 的所有可能组合，也就是第一个对象来自于 X，第二个对象来自于 Y 的所有可能。组合的个数即为两个集合中元素个数的乘积数。

![](./imgs/sql%E4%B8%AD%E7%9A%84%E7%AC%9B%E5%8D%A1%E5%B0%94%E7%A7%AF.png)

SQL92中，笛卡尔积也称为 交叉连接 ，英文是 CROSS JOIN 。在 SQL99 中也是使用 CROSS JOIN表示交叉连接。它的作用就是可以把任意表进行连接，即使这两张表不相关。在MySQL中如下情况会出现笛卡尔积:

```sql
SELECT last_name,department_name FROM employees,departments;
SELECT last_name,department_name FROM employees CROSS JOIN departments;
SELECT last_name,department_name FROM employees INNER JOIN departments;
SELECT last_name,department_name FROM employees JOIN departments;
```

笛卡尔积的错误会在下面条件产生：

+ 省略多个表的连接条件(或关联条件)
+ 连接条件(或关联条件)无效
+ 所有表中的所有行互相连接

为了避免笛卡尔积， 可以在 WHERE 加入有效的连接条件。加入连接条件后，查询语法:

```sql
-- 案例:查询员工的姓名及其部门名称
SELECT last_name, department_name
FROM employees, departments
WHERE employees.department_id = departments.department_id;
```

在表中有相同列时，在列名之前加上表名前缀。

## 多表查询分类

### 等值连接

```sql
SELECT employees.employee_id, employees.last_name,
       employees.department_id, departments.department_id,
       departments.location_id
FROM   employees, departments
WHERE  employees.department_id = departments.department_id;
```

```
+-------------+-------------+---------------+---------------+-------------+
| employee_id | last_name   | department_id | department_id | location_id |
+-------------+-------------+---------------+---------------+-------------+
|         103 | Hunold      |            60 |            60 |        1400 |
|         104 | Ernst       |            60 |            60 |        1400 |
|         105 | Austin      |            60 |            60 |        1400 |
|         106 | Pataballa   |            60 |            60 |        1400 |
|         107 | Lorentz     |            60 |            60 |        1400 |
|         120 | Weiss       |            50 |            50 |        1500 |
|         121 | Fripp       |            50 |            50 |        1500 |
|         122 | Kaufling    |            50 |            50 |        1500 |
|         123 | Vollman     |            50 |            50 |        1500 |
|         124 | Mourgos     |            50 |            50 |        1500 |
|         125 | Nayer       |            50 |            50 |        1500 |
+-------------+-------------+---------------+---------------+-------------+
```

1. 区分重复的列名

+ 多个表中有相同列时，必须在列名之前加上表名前缀。
+ 在不同表中具有相同列名的列可以用表名加以区分。

```sql
SELECT employees.last_name, departments.department_name,employees.department_id
FROM employees, departments
WHERE employees.department_id = departments.department_id;
```

2. 表的别名

+ 使用别名可以简化查询。
+ 列名前使用表名前缀可以提高查询效率。

```sql
SELECT e.employee_id, e.last_name, e.department_id,
       d.department_id, d.location_id
FROM   employees e , departments d
WHERE  e.department_id = d.department_id;
```

> 需要注意的是，如果我们使用了表的别名，在查询字段中、过滤条件中就只能使用别名进行代替，不能使用原有的表名，否则就会报错。

>【强制】对于数据库中表记录的查询和变更，只要涉及多个表，都需要在列名前加表的别名(或表名)进行限定。
>
> 说明:对多表进行查询记录、更新记录、删除记录时，如果对操作列没有限定表的别名(或表名)，并且操作列在多个表中存在时，就会抛异常。
>
> 正例:select t1.name from table_first as t1, table_second as t2 where t1.id=t2.id;
>
> 反例:在某业务中，由于多表关联查询语句没有加表的别名(或表名)的限制，正常运行两年后，最近在某个表中增加一个同名字段，在预发布环境做数据库变更后，线上查询语句出现出 1052 异常:Column 'name' in field list is ambiguous。

3. 连接多个表

```sql
SELECT e.last_name, e.department_id, d.department_id, d.location_id, l.location_id, l.city
FROM    employees e, departments d, locations l
WHERE   e.department_id = d.department_id AND d.location_id = l.location_id;
```

总结:连接n个表,至少需要n-1个连接条件。比如，连接三个表，至少需要两个连接条件。

### 非等值连接

```sql
-- employees表中的列工资应在job_grades表中的最高工资和最低工资之间
SELECT e.last_name, e.salary, j.grade_level
FROM   employees e, job_grades j
WHERE  e.salary BETWEEN j.lowest_sal AND j.highest_sal;
```

### 自连接

table1和table2本质上是同一张表，只是用取别名的方式虚拟成两张表以代表不同的意义。然后两个表再进行内连接，外连接等查询。

```sql
SELECT CONCAT(worker.last_name ,' works for '
       , manager.last_name)
FROM   employees worker, employees manager
WHERE  worker.manager_id = manager.employee_id;
```

### 内连接和外连接

+ 内连接: 合并具有同一列的两个以上的表的行, 结果集中不包含一个表与另一个表不匹配的行。
+ 外连接: 两个表在连接过程中除了返回满足连接条件的行以外还返回左(或右)表中不满足条件的行，这种连接称为左(或右)外连接。没有匹配的行时,结果表中相应的列为空(NULL)。
+ 如果是左外连接，则连接条件中左边的表也称为主表，右边的表称为从表。
+ 如果是右外连接，则连接条件中右边的表也称为主表，左边的表称为从表。

**SQL92:使用(+)创建连接**

+ 在 SQL92 中采用(+)代表从表所在的位置。即左或右外连接中，(+) 表示哪个是从表。
+ Oracle 对 SQL92 支持较好，而 MySQL 则不支持 SQL92 的外连接。

```sql
-- 左外连接
SELECT last_name,department_name
FROM employees ,departments
WHERE employees.department_id = departments.department_id(+);
-- 右外连接
SELECT last_name,department_name
FROM employees ,departments
WHERE employees.department_id(+) = departments.department_id;
```

## SQL99语法实现多表查询

### 基本语法

使用 JOIN ON 子句创建连接的语法结构：

```sql
SELECT table1.column, table2.column,table3.column
FROM table1
JOIN table2 ON table1 和 table2 的连接条件 JOIN table3 ON table2 和 table3 的连接条件
```

SQL99 采用的这种嵌套结构非常清爽、层次性更强、可读性更强，即使再多的表进行连接也都清晰 可见。如果你采用 SQL92，可读性就会大打折扣。

语法说明:

+ 可以使用 ON 子句指定额外的连接条件。
+ 这个连接条件是与其它条件分开的。
+ ON 子句使语句具有更高的易读性。
+ 关键字 JOIN、INNER JOIN、CROSS JOIN 的含义是一样的，都表示内连接

### 内连接(INNER JOIN)的实现

语法:

```sql
SELECT 字段列表
FROM A表 INNER JOIN B表 ON 关联条件
WHERE 等其他子句;
```

```sql
SELECT e.employee_id, e.last_name, e.department_id,
       d.department_id, d.location_id
FROM   employees e JOIN departments d
ON     (e.department_id = d.department_id);
```

```
+-------------+-------------+---------------+---------------+-------------+
| employee_id | last_name   | department_id | department_id | location_id |
+-------------+-------------+---------------+---------------+-------------+
|         103 | Hunold      |            60 |            60 |        1400 |
|         104 | Ernst       |            60 |            60 |        1400 |
|         105 | Austin      |            60 |            60 |        1400 |
|         106 | Pataballa   |            60 |            60 |        1400 |
|         107 | Lorentz     |            60 |            60 |        1400 |
|         120 | Weiss       |            50 |            50 |        1500 |
|         121 | Fripp       |            50 |            50 |        1500 |
|         122 | Kaufling    |            50 |            50 |        1500 |
+-------------+-------------+---------------+---------------+-------------+
```

### 外连接(OUTER JOIN)的实现

**左外连接(LEFT OUTER JOIN)**

语法:

```sql
-- 实现查询结果是A
SELECT 字段列表
FROM A表 LEFT JOIN B表 ON 关联条件
WHERE 等其他子句;
```

举例:

```sql
SELECT e.last_name, e.department_id, d.department_name
FROM   employees e
LEFT JOIN departments d
ON   e.department_id = d.department_id;
```

```
+-------------+---------------+------------------+
| last_name   | department_id | department_name  |
+-------------+---------------+------------------+
| Abel        |            80 | Sales            |
| Hutton      |            80 | Sales            |
| Taylor      |            80 | Sales            |
| Livingston  |            80 | Sales            |
| Grant       |          NULL | NULL             |
| Johnson     |            80 | Sales            |
| Taylor      |            50 | Shipping         |
+-------------+---------------+------------------+
```

**右外连接(RIGHT OUTER JOIN)**

语法：

```sql
-- 实现查询结果是B
SELECT 字段列表
FROM A表 RIGHT JOIN B表 ON 关联条件
WHERE 等其他子句;
```

举例:

```sql
SELECT e.last_name, e.department_id, d.department_name
FROM   employees e
RIGHT OUTER JOIN departments d
ON    (e.department_id = d.department_id) ;
```

```
+-------------+---------------+----------------------+
| last_name   | department_id | department_name      |
+-------------+---------------+----------------------+
| Urman       |           100 | Finance              |
| Popp        |           100 | Finance              |
| Higgins     |           110 | Accounting           |
| Gietz       |           110 | Accounting           |
| NULL        |          NULL | Treasury             |
| NULL        |          NULL | Corporate Tax        |
| NULL        |          NULL | Control And Credit   |
+-------------+---------------+----------------------+
```

> 需要注意的是，LEFT JOIN 和 RIGHT JOIN 只存在于 SQL99 及以后的标准中，在 SQL92 中不存在，只能用 (+) 表示。

**满外连接(FULL OUTER JOIN)**

+ 满外连接的结果 = 左右表匹配的数据 + 左表没有匹配到的数据 + 右表没有匹配到的数据。
+ SQL99是支持满外连接的。使用FULL JOIN 或 FULL OUTER JOIN来实现。
+ 需要注意的是，MySQL不支持FULL JOIN，但是可以用 LEFT JOIN UNION RIGHT join代替。

## UNION的使用

合并查询结果利用UNION关键字，可以给出多条SELECT语句，并将它们的结果组合成单个结果集。合并时，两个表对应的列数和数据类型必须相同，并且相互对应。各个SELECT语句之间使用UNION或UNION ALL关键字分隔。

语法格式:

```sql
SELECT column,... FROM table1
UNION [ALL]
SELECT column,... FROM table2
```

+ UNION 操作符返回两个查询的结果集的并集，去除重复记录。
+ UNION ALL操作符返回两个查询的结果集的并集。对于两个结果集的重复部分，不去重。

> 注意:执行UNION ALL语句时所需要的资源比UNION语句少。如果明确知道合并数据后的结果数据不存在重复数据，或者不需要去除重复的数据，则尽量使用UNION ALL语句，以提高数据查询的效率。

举例:查询部门编号>90或邮箱包含a的员工信息

```sql
-- 方式1
SELECT * FROM employees WHERE email LIKE '%a%' OR department_id>90;
```

```sql
-- 方式2
SELECT * FROM employees WHERE email LIKE '%a%' UNION
SELECT * FROM employees WHERE department_id>90;
```

## SQL JOIN 的类型

![](./imgs/sql%E7%9A%84join%E7%B1%BB%E5%9E%8B.png)

+ 左中图

```sql
-- 实现A - A∩B
select 字段列表
from A表 left join B表
on 关联条件
where 从表关联字段 is null and 等其他子句;
```

+ 右中图

```sql
-- 实现A - A∩B
select 字段列表
from A表 left join B表
on 关联条件
where 从表关联字段 is null and 等其他子句;
```

+ 左下图

```sql
-- 实现查询结果是A∪B #用左外的A，union 右外的B select 字段列表
from A表 left join B表 on 关联条件
where 等其他子句

union

select 字段列表
from A表 right join B表 on 关联条件
where 等其他子句;
```

+ 右下图

```sql
-- 实现A∪B- A∩B 或 (A- A∩B)∪(B-A∩B)
-- 使用左外的 (A - A∩B) union 右外的(B - A∩B) select 字段列表
from A表 left join B表
on 关联条件
where 从表关联字段 is null and 等其他子句

union

select 字段列表
from A表 right join B表
on 关联条件
where 从表关联字段 is null and 等其他子句
```

## SQL99语法新特性

### 自然连接

SQL99在SQL92的基础上提供了一些特殊语法，比如 NATURAL JOIN 用来表示自然连接。我们可以把自然连接理解为 SQL92 中的等值连接。它会帮你自动查询两张连接表中所有相同的字段 ，然后进行等值连接。

在SQL92标准中:

```sql
SELECT employee_id,last_name,department_name
FROM employees e JOIN departments d
ON e.`department_id` = d.`department_id`
AND e.`manager_id` = d.`manager_id`;
```

在 SQL99 中你可以写成:

```sql
SELECT employee_id,last_name,department_name
FROM employees e NATURAL JOIN departments d;
```

### USING 连接n个表

当我们进行连接的时候，SQL99还支持使用 USING 指定数据表里的同名字段进行等值连接。但是只能配合JOIN一起使用。比如:

```sql
SELECT employee_id,last_name,department_name
FROM employees e JOIN departments d
USING (department_id);
```

你能看出与自然连接 NATURAL JOIN 不同的是，USING 指定了具体的相同的字段名称，你需要在 USING 的括号()中填入要指定的同名字段。同时使用 JOIN...USING 可以简化 JOIN ON 的等值连接。它与下面的 SQL 查询结果是相同的:

```sql
SELECT employee_id,last_name,department_name
FROM employees e ,departments d
WHERE e.department_id = d.department_id;
```

## 小结

表连接的约束条件可以有三种方式:WHERE, ON, USING

+ WHERE:适用于所有关联查询
+ ON :只能和JOIN一起使用，只能写关联条件。虽然关联条件可以并到WHERE中和其他条件一起写，但分开写可读性更好。
+ USING:只能和JOIN一起使用，而且要求 两个 关联字段在关联表中名称一致，而且只能表示关联字段值相等

注意:

我们要控制连接表的数量。多表连接就相当于嵌套 for 循环一样，非常消耗资源，会让 SQL 查询性能下降得很严重，因此不要连接不必要的表。在许多 DBMS 中，也都会有最大连接表的限制。

> 强制】超过三个表禁止 join。需要 join 的字段，数据类型保持绝对一致;多表关联查询时，保证被关联的字段需要有索引。
>
> 说明:即使双表 join 也要注意表索引、SQL 性能。
>
> 来源:阿里巴巴《Java开发手册》
