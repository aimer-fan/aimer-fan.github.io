# v2ray

## 安装

下载 install 脚本

```bash
curl -O https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh
```

执行脚本

```bash
bash install-release.sh
```

## 修改配置

生成 uuid

```bash
v2ray uuid
```

测试配置文件是否正确

```bash
v2ary test --config /usr/local/etc/v2ray/config.json
```

::: details /usr/local/etc/v2ray/config.json

```json
{
  "log": {
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log",
    "loglevel": "Info"
  },
  "inbounds": [
    {
      "port": 10000,
      "listen": "127.0.0.1",
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "UUID",
            "alterId": 0
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "wsSettings": {
          "path": "/ray"
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    }
  ]
}
```

:::

::: details /etc/nginx/nginx.conf

```nginx
location /ray {
  if ($http_upgrade != "websocket") {
    return 404;
  }
  proxy_redirect off;
  proxy_pass http://127.0.0.1:10000; # 假设WebSocket监听在环回地址的10000端口上
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_set_header Host $host;
  # Show real IP in v2ray access.log
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

:::

::: details client config json

```json5
{
  "log": {
    "error": "",
    "loglevel": "info",
    "access": ""
  },
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "protocol": "socks",
      "settings": {
        "udp": false,
        "auth": "noauth"
      },
      "port": "1080"
    },
    {
      "listen": "127.0.0.1",
      "protocol": "http",
      "settings": {
        "timeout": 360
      },
      "port": "1087"
    }
  ],
  "outbounds": [
    {
      "mux": {
        "enabled": false,
        "concurrency": 2
      },
      "protocol": "vmess",
      "streamSettings": {
        "wsSettings": {
          "path": "/ray",
          "headers": {
            "host": ""
          }
        },
        "tlsSettings": {
          "allowInsecure": false
        },
        "security": "tls",
        "network": "ws"
      },
      "tag": "proxy",
      "settings": {
        "vnext": [
          {
            "address": "HOST",
            "users": [
              {
                "id": "UUID",
                "alterId": 0,
                "level": 0,
                "security": "auto"
              }
            ],
            "port": 443
          }
        ]
      }
    },
    {
      "tag": "direct",
      "protocol": "freedom",
      "settings": {
        "domainStrategy": "UseIP",
        "userLevel": 0
      }
    },
    {
      "tag": "block",
      "protocol": "blackhole",
      "settings": {
        "response": {
          "type": "none"
        }
      }
    }
  ],
  "dns": {},
  "routing": {
    "settings": {
      "domainStrategy": "AsIs",
      "rules": [
        {
          "type": "field",
          "outboundTag": "direct",
          "domain": [
            "bilibili.com"
          ]
        }
      ]
    }
  },
  "transport": {}
}
```

:::

## 开启BBR阻塞控制算法

```shell
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh
```

## 查看BBR是否开启成功

```shell
sysctl net.ipv4.tcp_available_congestion_control

# => net.ipv4.tcp_available_congestion_control = reno cubic bbr
```