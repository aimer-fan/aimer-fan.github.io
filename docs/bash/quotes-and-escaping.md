# 引号和转义

Bash 只有一种数据类型，就是字符串。不管用户输入什么数据，Bash 都视为字符串。因此，字符串相关的引号和转义，对 Bash 来说就非常重要。

## 转义

使用 `\` 转义后面的特殊字符(比如 `$`、`&`、`*`)

反斜杠本身也是特殊字符，如果想要原样输出反斜杠，就需要对它自身转义，连续使用两个反斜线（`\\`）。

反斜杠除了用于转义，还可以表示一些不可打印的字符。

+ `\a`：响铃
+ `\b`：退格
+ `\n`：换行
+ `\r`：回车
+ `\t`：制表符

如果想要在命令行使用这些不可打印的字符，需要把它们放在引号里面，然后使用`echo`命令的`-e`参数。

```bash
$ echo -e "hello\tworld"
hello	world
```

换行符是一个特殊字符，表示命令的结束，Bash 收到这个字符以后，就会对输入的命令进行解释执行。换行符前面加上反斜杠转义，就使得换行符变成一个普通字符，Bash 会将其当作长度为0的空字符处理，从而可以将一行命令写成多行。

```bash
$ mv \
/path/to/foo \
/path/to/bar

# 等同于
$ mv /path/to/foo /path/to/bar
```

## 单引号

Bash 允许字符串放在单引号或双引号之中，加以引用。

单引号用于保留字符的字面含义，各种特殊字符在单引号里面，都会变为普通字符，比如星号（`*`）、美元符号（`$`）、反斜杠（`\`）等。

```bash
$ echo '*'
```

单引号使得 Bash 扩展、变量引用、算术运算和子命令，都失效了。如果不使用单引号，它们都会被 Bash 自动扩展。

由于反斜杠在单引号里面变成了普通字符，所以如果单引号之中，还要使用单引号，不能使用转义，需要在外层的单引号前面加上一个美元符号（$），然后再对里层的单引号转义。

```bash
$ echo $'it\'s'
```

不过，更合理的方法是改在双引号之中使用单引号。

```bash
$ echo "it's"
```

## 双引号

双引号比单引号宽松，大部分特殊字符在双引号里面，都会失去特殊含义，变成普通字符。

但是，三个特殊字符除外：美元符号（`$`）、反引号（<code>\`</code>）和反斜杠（`\`）。这三个字符在双引号之中，依然有特殊含义，会被 Bash 自动扩展。

```bash
# 美元符号用来引用变量
$ echo "$SHELL"
/bin/bash

# 反引号则是执行子命令
$ echo "`date`"
Mon Jan 27 13:33:18 CST 2020
```

换行符在双引号之中，会失去特殊含义，Bash 不再将其解释为命令的结束，只是作为普通的换行符。所以可以利用双引号，在命令行输入多行文本。

```bash
$ echo "hello
world"
```

双引号会原样保存多余的空格。

```bash
$ echo "this is a     test"
this is a     test
```

双引号还有一个作用，就是保存原始命令的输出格式。

```bash
# 单行输出
$ echo $(cal)
十月 2023 日 一 二 三 四 五 六 1 2 ... 30 31

# 原始格式输出
$ echo "$(cal)"
      十月 2023         
日 一 二 三 四 五 六  
 1  2  3  4  5  6  7  
 8  9 10 11 12 13 14  
15 16 17 18 19 20 21  
22 23 24 25 26 27 28  
29 30 31
```

上面例子中，如果$(cal)不放在双引号之中，echo就会将所有结果以单行输出，丢弃了所有原始的格式。

## Here 文档

Here 文档（here document）是一种输入多行字符串的方法，格式如下。

```bash
<< token
text
token
```

它的格式分成开始标记（`<< token`）和结束标记（`token`）。开始标记是两个小于号 + Here 文档的名称，名称可以随意取，后面必须是一个换行符；结束标记是单独一行顶格写的 Here 文档名称，如果不是顶格，结束标记不起作用。两者之间就是多行字符串的内容。

Here 文档内部会发生变量替换，同时支持反斜杠转义，但是不支持通配符扩展，双引号和单引号也失去语法作用，变成了普通字符。

```bash
$ foo='hello world'
$ cat << _example_
$foo
"$foo"
'$foo'
_example_

hello world
"hello world"
'hello world'
```

如果不希望发生变量替换，可以把 Here 文档的开始标记放在单引号之中。

```bash
$ foo='hello world'
$ cat << '_example_'
$foo
"$foo"
'$foo'
_example_

$foo
"$foo"
'$foo'
```

Here 文档的本质是重定向，它将字符串重定向输出给某个命令，相当于包含了`echo`命令。

```bash
$ command << token
  string
token

# 等同于

$ echo string | command
```

所以，Here 字符串只适合那些可以接受标准输入作为参数的命令，对于其他命令无效，比如`echo`命令就不能用 Here 文档作为参数。

## Here 字符串

Here 文档还有一个变体，叫做 Here 字符串（Here string），使用三个小于号（`<<<`）表示。

```bash
<<< string
```

它的作用是将字符串通过标准输入，传递给命令。

有些命令直接接受给定的参数，与通过标准输入接受参数，结果是不一样的。所以才有了这个语法，使得将字符串通过标准输入传递给命令更方便，比如`cat`命令只接受标准输入传入的字符串。

```bash
$ cat <<< 'hi'

# 等同于
$ echo 'hi' | cat
```
