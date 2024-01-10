# Location

根据配置的 uri 处理对应的请求

```txt
Syntax: location [ = | ~ | ~* | ^~ ] uri { ... }
        location @name { ... }
Default: -
Context: server, location
```

## 匹配规则

nginx 将 location 分为两种：

1. 通过前缀字符串 prefix string 修饰。
2. 通过正则表达式 regular expression `~`(区分大小写) 或 `~*`(不区分大小写) 修饰。

具体的匹配规则如下：

先在匹配到最长的前缀字符串，并记录下来。然后根据在配置文件中的顺序，找到第一个匹配的正则表达式。
如果找到了匹配的正则表达式，就使用该条规则。如果没有找到，就使用之前记录的前缀匹配规则。

+ 在大小写不敏感的系统中，匹配前缀字符串会忽略大小写；
+ 正则表达式可以包含捕获。
+ 如果匹配的最长前缀字符串使用了 `^~` 修饰符，会跳过正则匹配的阶段。
+ 使用 `=` 修饰的前缀字符串，表示精准匹配，如果匹配成功，就停止搜索。

```nginx
# 匹配 /
location = / {
  [ configuration A ]
}

# 匹配 /index.html
location / {
  [ configuration B ]
}

# 匹配 /documents/document.html
location /documents/ {
  [ configuration C ]
}

# 匹配 /images/1.gif
location ^~ /images/ {
  [ configuration D ]
}

# 匹配 /documents/1.jpg
location ~* \.(gif|jpg|jpeg)$ {
  [ configuration E ]
}
```

## 命名 location

使用 `@` 修饰符，可以定义一个命名 location。这样的 location 不用于常规的请求处理，而是用于请求重定向。

```nginx
location / {
  try_files $uri $uri/ @router;
  index  index.html index.htm;
}
location @router {
  rewrite ^.*$ /index.html last;
}
```

## 特殊情况

当 location 使用末尾为 `/` 的前缀字符串定义，并且请求被 `proxy_pass`，`fastcgi_pass`，`uwsgi_pass`，`scgi_pass`，`memcached_pass` 或者 `grpc_pass` 处理时，会执行特殊逻辑。

如果请求的 URI 和前缀字符串相等，但是缺少了尾部的 `/`，将添加末尾 `/`并且返回 301 重定向。

```nginx
# 当请求路径为 /user 时，会返回 301 重定向到 https://example.com/user/
location /user/ {
  proxy_pass https://example.com;
}
```

如果不希望这样，可以这样定义 location。

```nginx
location /user/ {
  proxy_pass https://example.com;
}

location = /user {
  proxy_pass https://example.com;
}
```


## Refs

+ [nginx location office doc](https://nginx.org/en/docs/http/ngx_http_core_module.html#location)
