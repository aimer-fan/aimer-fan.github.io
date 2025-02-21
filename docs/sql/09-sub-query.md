# 子查询

## 子查询

子查询指一个查询语句嵌套在另一个查询语句内部的查询，这个特性从MySQL 4.1开始引入。

SQL 中子查询的使用大大增强了 SELECT 查询的能力，因为很多时候查询需要从结果集中获取数据，或者 需要从同一个表中先计算得出一个数据结果，然后与这个数据结果(可能是某个标量，也可能是某个集 合)进行比较。

### 子查询的基本使用

子查询的基本语法结构:

```sql
SELECT select_list
FROM table
WHERE expr operator (
  SELECT select_list
  FROM table
);
```

+ 子查询(内查询)在主查询之前一次执行完成。
+ 子查询的结果被主查询(外查询)使用。
+ 注意事项
  + 子查询要包含在括号内
  + 将子查询放在比较条件的右侧
  + 单行操作符对应单行子查询，多行操作符对应多行子查询

### 子查询的分类

分类方式1:

我们按内查询的结果返回一条还是多条记录，将子查询分为单行子查询、 多行子查询 。

我们按内查询是否被执行多次，将子查询划分为相关(或关联)子查询和不相关(或非关联)子查询 。

子查询从数据表中查询了数据结果，如果这个数据结果只执行一次，然后这个数据结果作为主查询的条
件进行执行，那么这样的子查询叫做不相关子查询。

同样，如果子查询需要执行多次，即采用循环的方式，先从外部查询开始，每次都传入子查询进行查
询，然后再将结果反馈给外部，这种嵌套的执行方式就称为相关子查询。

## 单行子查询

### 单行比较操作符

| 操作符 | 说明 |
| ------ | ---- |
| = | 等于 |
| <> | 不等于 |
| > | 大于 |
| >= | 大于等于 |
| < | 小于 |
| <= | 小于等于 |

### HAVING中的子查询

+ 首先执行子查询。
+ 向主查询中的HAVING 子句返回结果。

```sql
SELECT department_id, MIN(salary)
FROM employees
GROUP BY department_id
HAVING MIN(salary) > (
  SELECT MIN(salary)
  FROM employees
  WHERE department_id = 50
);
```

### CASE中的子查询

在CASE表达式中使用单列子查询:

```sql
SELECT employee_id, last_name,
       (CASE department_id
        WHEN
             (SELECT department_id FROM departments
          WHERE location_id = 1800)
        THEN 'Canada' ELSE 'USA' END) location
FROM   employees;
```

### 子查询中的空值问题

```sql
SELECT last_name, job_id
FROM   employees
WHERE  job_id =
                (SELECT job_id
                 FROM   employees
                 WHERE  last_name = 'Haas');

--- no rows selected
```

> 子查询不返回任何行

### 非法使用子查询

```sql
SELECT employee_id, last_name
FROM   employees
WHERE  salary =
                (SELECT   MIN(salary)
                 FROM     employees
                 GROUP BY department_id);
--- Subquery returns more than 1 row
```

> 多行子查询使用单行比较符

## 多行子查询

+ 也称为集合比较子查询
+ 内查询返回多行
+ 使用多行比较操作符

### 多行比较操作符

| 操作符 | 说明 |
| ------ | ---- |
| IN | 等于列表中的任意一个 |
| ANY | 等于列表中的任意一个 |
| ALL | 等于列表中的所有 |
| SOME | 等于列表中的至少一个 |

### 空值问题

```sql
SELECT last_name
FROM employees
WHERE employee_id NOT IN (
            SELECT manager_id
            FROM employees
            );
--- no rows selected
```

## 相关子查询

如果子查询的执行依赖于外部查询，通常情况下都是因为子查询中的表用到了外部的表，并进行了条件
关联，因此每执行一次外部查询，子查询都要重新计算一次，这样的子查询就称之为 关联子查询 。 相关子查询按照一行接一行的顺序执行，主查询的每一行都执行一次子查询。

```sql
SELECT column1, column2, ...
FROM table1 outer
WHERE column1 operator (
  SELECT column1, column2, ...
  FROM table2
  WHERE expr1 = outer.expr2
);
```

### EXISTS 与 NOT EXISTS 关键字

+ 关联子查询通常也会和 EXISTS操作符一起来使用，用来检查在子查询中是否存在满足条件的行。
+ 如果在子查询中不存在满足条件的行:
  + 条件返回 FALSE
  + 继续在子查询中查找
+ 如果在子查询中存在满足条件的行:
  + 不在子查询中继续查找
  + 条件返回 TRUE
+ NOT EXISTS关键字表示如果不存在某种条件，则返回TRUE，否则返回FALSE。

### 相关更新

```sql
UPDATE table1 alias1
SET    column = (SELECT expression
                 FROM   table2 alias2
                 WHERE  alias1.column = alias2.column);
```

使用相关子查询依据一个表中的数据更新另一个表的数据。

### 相关删除

```sql
DELETE FROM table1 alias1
WHERE column operator (SELECT expression
                       FROM   table2 alias2
                       WHERE  alias1.column = alias2.column);
```

## 自连接和子查询对比

一般情况建议你使用自连接，因为在许多 DBMS 的处理过 程中，对于自连接的处理速度要比子查询快得多。

可以这样理解:子查询实际上是通过未知表进行查询后的条件判断，而自连接是通过已知的自身数据表 进行条件判断，因此在大部分 DBMS 中都对自连接处理进行了优化。
