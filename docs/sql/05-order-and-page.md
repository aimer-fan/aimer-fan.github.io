# 排序与分页

## 排序数据

+ 使用 ORDER BY 子句排序
  + ASC(ascend): 升序
  + DESC(descend):降序
+ ORDER BY 子句在SELECT语句的结尾。

### 单列排序

```sql
SELECT   last_name, job_id, department_id, hire_date
FROM     employees
ORDER BY hire_date ;
/**
+-------------+------------+---------------+------------+
| last_name   | job_id     | department_id | hire_date  |
+-------------+------------+---------------+------------+
| King        | AD_PRES    |            90 | 1987-06-17 |
| Whalen      | AD_ASST    |            10 | 1987-09-17 |
| Kochhar     | AD_VP      |            90 | 1989-09-21 |
| Hunold      | IT_PROG    |            60 | 1990-01-03 |
+-------------+------------+---------------+------------+
*/
```

```sql
SELECT   last_name, job_id, department_id, hire_date
FROM     employees
ORDER BY hire_date DESC ;
/**
+-------------+------------+---------------+------------+
| last_name   | job_id     | department_id | hire_date  |
+-------------+------------+---------------+------------+
| Banda       | SA_REP     |            80 | 2000-04-21 |
| Kumar       | SA_REP     |            80 | 2000-04-21 |
| Ande        | SA_REP     |            80 | 2000-03-24 |
| Markle      | ST_CLERK   |            50 | 2000-03-08 |
| Lee         | SA_REP     |            80 | 2000-02-23 |
+-------------+------------+---------------+------------+
*/
```

### 多列排序

```sql
SELECT last_name, department_id, salary
FROM   employees
ORDER BY department_id, salary DESC;
/**
+-------------+---------------+----------+
| last_name   | department_id | salary   |
+-------------+---------------+----------+
| Grant       |          NULL |  7000.00 |
| Whalen      |            10 |  4400.00 |
| Hartstein   |            20 | 13000.00 |
| Fay         |            20 |  6000.00 |
| Raphaely    |            30 | 11000.00 |
| Khoo        |            30 |  3100.00 |
| Baida       |            30 |  2900.00 |
| Tobias      |            30 |  2800.00 |
| Himuro      |            30 |  2600.00 |
+-------------+---------------+----------+
*/
```

+ 可以使用不在SELECT列表中的列排序。
+ 在对多列进行排序的时候，首先排序的第一列必须有相同的列值，才会对第二列进行排序。如果第一列数据中所有值都是唯一的，将不再对第二列进行排序。

## 分页

所谓分页显示，就是将数据库中的结果集，一段一段显示出来需要的条件。

MySQL中使用 LIMIT 实现分页

格式

```sql
LIMIT [位置偏移量,] 行数
```

第一个"位置偏移量"参数指示MySQL从哪一行开始显示，是一个可选参数，如果不指定"位置偏移量"，将会从表中的第一条记录开始(第一条记录的位置偏移量是0，第二条记录的位置偏移量是1，以此类推);第二个参数"行数"指示返回的记录条数。

举例：

```sql
-- 前10条记录:
SELECT * FROM 表名 LIMIT 0,10;
-- 或者
SELECT * FROM 表名 LIMIT 10;

-- 第11至20条记录:
SELECT * FROM 表名 LIMIT 10,10;

-- 第21至30条记录:
SELECT * FROM 表名 LIMIT 20,10;
```

> MySQL 8.0中可以使用“LIMIT 3 OFFSET 4”，意思是获取从第5条记录开始后面的3条记录，和“LIMIT 4,3;”返回的结果相同。

**分页显式公式 :(当前页数-1)\*每页条数，每页条数**

```sql
SELECT * FROM table
LIMIT(PageNo - 1)*PageSize,PageSize;
```

+ 注意:LIMIT 子句必须放在整个SELECT语句的最后!

使用 LIMIT 的好处

约束返回结果的数量可以减少数据表的忘了传输量，也可以提升查询效率。如果我们知道返回结果只有 1 条，就可以使用 `LIMIT 1` ，告诉 SELECT 语句只需要返回一条记录即可。这样的好处就是 SELECT 不需要扫描完整的表，只需要检索到一条符合条件的记录即可返回。

## 拓展

在不同的 DBMS 中使用的关键字可能不同。在 MySQL、PostgreSQL、MariaDB 和 SQLite 中使用 LIMIT 关键字，而且需要放到 SELECT 语句的最后面。

+ 如果是SQLServer和Access，需要使用 TOP 关键字，比如:

```sql
SELECT TOP 5 name, hp_max FROM heros ORDER BY hp_max DESC
```

+ 如果是 DB2，使用 FETCH FIRST 5 ROWS ONLY 这样的关键字:

```sql
SELECT name, hp_max FROM heros ORDER BY hp_max DESC FETCH FIRST 5 ROWS ONLY
```

+ 如果是Oracle，你需要基于 ROWNUM 来统计行数:

```sql
SELECT rownum,last_name,salary FROM employees WHERE rownum < 5 ORDER BY salary DESC;
```

需要说明的是，这条语句是先取出来前 5 条数据行，然后再按照 hp_max 从高到低的顺序进行排序。但这样产生的结果和上述方法的并不一样。我会在后面讲到子查询，你可以使用

```sql
SELECT rownum, last_name,salary
FROM (
    SELECT last_name,salary
    FROM employees
    ORDER BY salary DESC)
WHERE rownum < 10;
```

得到与上述方法一致的结果。
