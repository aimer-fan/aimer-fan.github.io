# proxy_pass


```txt
Syntax:	proxy_pass URL;
Default: —
Context: location, if in location, limit_except
```

设置代理服务器的协议和地址以及 `location` 映射的 URI。协议可以指定为 `http` 或者 `https`。地址可以是域名或者 ip 地址，以及可选的端口号。

```nginx
proxy_pass http://localhost:8000/uri/;
```

或者作为`unix`域套接字路径，在单词`unix`之后指定，并以冒号括起来

```nginx
proxy_pass http://unix:/tmp/backend.socket:/uri/;
```

如果一个域名解析为多个地址，则所有地址都将以循环方式使用。此外，可以将地址指定为服务器组。

参数中可以包含变量。在这种情况下，如果地址被指定为域名，则在所描述的服务器组中搜索该名称，如果没有找到，则使用解析器确定该名称。

```nginx
http {
  upstream backend {
    server backend1.example.com weight=5;
    server unix:/tmp/backend3;

    server backup1.example.com:8080 backup;
  }
  server {
    location /bar {
      proxy_pass http://backend;
    }
    location /api {
      proxy_pass http://backend/mock$request_uri;
    }
  }
}
```

## 转发逻辑

uri 会按以下的方式转发给目标服务器。

如果 `proxy_pass` 指令指定了一个特定的 uri，那么会将匹配到的部分替换成设置的 uri，转发给目标服务器。

```nginx
# http://domain.com/api/user/123 => http://example.com/remote/user/123
location /api {
  proxy_pass http://example.com/remote;
}

# http://domain.com/api/user/123 => http://example.com/remote//user/123
location /api {
  proxy_pass http://example.com/remote/;
}

# http://domain.com/api/user/123 => http://example.com/remoteuser/123
location /api/ {
  proxy_pass http://example.com/remote;
}
```

如果 `proxy_pass` 指令没有指定 uri，那么会将请求直接转发给目标服务器。

```nginx
# http://domain.com/api/user/123 => http://example.com/api/user/123
# http://domain.com/api//user//123 => http://example.com//api/user//123
location {
  proxy_pass http://example.com;
}
```

## 特殊情况

在某些情况下，无法确定请求URI中要替换的部分：

1. 在命名 `location` 和使用正则表达式匹配的 `location` `中，proxy_pass` 不能指定 uri。

如果指定，不能正常启动 nginx。

```nginx
location @name {
  proxy_pass http://example.com;
  # 如果指定了 uri，nginx 无法正常启动
  # proxy_pass http://example.com/mock;
}

location ~ /regexp/ {
  proxy_pass http://example.com;
}
```

2. 在使用 `rewrite` 指令修改了 uri `时，proxy_pass` 不能指定 uri。

即使指定了 uri，nginx 也会将其忽略。

```nginx
location /name/ {
  rewrite /name/([^/]+) /users?name=$1 break;
  proxy_pass http://example.com;
  # 即使指定了 uri，nginx 也会将其忽略。
  # proxy_pass http://example.com/mock;
}
```

3. 在 `proxy_pass` 中使用变量时。

在这种情况下，如果在指令中指定了URI，则会按原样将其传递给服务器，从而替换原始请求URI。

```nginx
location /name/ {
  proxy_pass http://example.com$request_uri;
}

# http://domain.com/name/123 => http://example.com/mock/name/123
location /name/ {
  proxy_pass http://example.com/mock$request_uri;
}
```

## Refs

+ [proxy_pass](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)
