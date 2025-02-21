# SQL 概述

## SQL背景知识

1974年，IBM研究员发布了一篇揭开数据库技术的论文《SEQUEL：一门结构化的英语查询语言》，直到今天这门结构化语言并没有太大的变化。相比于其他的语言，SQL的半衰期可以说是非常长了。

无论是前端工程师，还是后端工程师，都一定会和数据打交道，都需要了解如何又快又准确的提取自己想要的数据。更别提数据分析师了，他们的工作就是和数据打交道，整理不同的报告，以便指导业务决策。

SQL（Structured Query Language，结构化查询语言）是使用关系模型的数据应用语言，与数据直接打交道，由 IBM 上世纪70年代开发出来，后由美国国家标准局（ANSI）开始着手制定 SQL 标准，先后有 SQL-86、SQL-89、SQL-92、SQL-99 等标准。

SQL 有两个重要的标准，分别是 SQL92 和 SQL99，他们分别代表了92年和99年颁布的SQL标准，我们今天使用的SQL语言依然遵循这些标准。

不同的数据库生产厂商都支持SQL语句，但都有特定的内容。

## SQL分类

SQL语言在功能上主要分为如下3大类：

+ DDL（Data Definition Language，数据定义语言）这些语言定义了不同的数据库，表、试图、索引等数据库对象，还可以用来创建、删除、修改数据库和数据表的结构。
  + 主要的语句关键字包括：CREATE、DROP、ALTER 等。
+ DML（Data Manipulation Language，数据操作语言），用于添加、删除、更新和查询数据库记录，并检查数据完整性。
  + 主要的语句关键字包括：INSET、DELETE、UPDATE、SELECT 等
  + SELECT是SQL语言的基础，最为重要。
+ DCL（Data Control Language，数据控制语言）用于定义数据库、表、字段、用户的访问权限和安全级别。
  + 主要的语句关键字包括：GRANT、REVOKE、COMMIT、ROLLBACK、SAVEPOINT 等。

> 因为查询语句使用的非常频繁。所以很多人吧查询语句单独拎出来一类，DQL（数据查询语言）
>
> 还有单独将 COMMIT、ROLLBACK 取出来称之为 TCL（Transaction Control Language，事务控制语言）
