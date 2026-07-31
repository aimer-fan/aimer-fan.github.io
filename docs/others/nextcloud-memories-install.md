# Nextcloud + Memories 部署安装文档

## 1. 部署背景

### 目标

在远端服务器部署 Nextcloud，并支持 Memories 插件，实现个人照片管理能力。

目标包括：

- Nextcloud 文件同步
- 手机照片自动备份
- Memories 时间轴管理
- 视频缩略图生成
- HTTPS 外网访问

## 2. 当前服务器环境

### 已有环境

服务器：

- Linux

已安装：

- Nginx（宿主机）
- Docker
- Docker Compose

已有域名：

- example.com

已有 HTTPS 证书：

- /cert/example.com.fullchain.cer
- /cert/example.com.key

已有业务：

- example.com
- 由 Nginx 代理 Nuxt 服务

## 3. 最终架构

```text
Internet
  |
  v
example.com
  |
  v
Nginx :443 HTTPS
  |
  v
127.0.0.1:8081
  |
  v
Docker Nextcloud
  |
  +--> PostgreSQL
  +--> Redis
```

## 4. 创建 Nextcloud 目录

```bash
sudo mkdir -p /opt/nextcloud
cd /opt/nextcloud
mkdir data
mkdir postgres
```

目录结构如下：

```text
/opt/nextcloud
├── docker-compose.yml
├── php-extra.ini
├── data
└── postgres
```

## 5. Docker Compose 配置

创建文件：

```bash
vim /opt/nextcloud/docker-compose.yml
```

写入内容：

```yaml
services:
  postgres:
    image: postgres:16
    container_name: nextcloud-postgres
    restart: always
    environment:
      POSTGRES_DB: nextcloud
      POSTGRES_USER: nextcloud
      POSTGRES_PASSWORD: YOUR_DB_PASSWORD
    volumes:
      - ./postgres:/var/lib/postgresql/data

  redis:
    image: redis:7
    container_name: nextcloud-redis
    restart: always

  nextcloud:
    image: nextcloud:latest
    container_name: nextcloud
    restart: always
    depends_on:
      - postgres
      - redis
    ports:
      - "127.0.0.1:8081:80"
    environment:
      POSTGRES_HOST: postgres
      POSTGRES_DB: nextcloud
      POSTGRES_USER: nextcloud
      POSTGRES_PASSWORD: YOUR_DB_PASSWORD
      REDIS_HOST: redis
    volumes:
      - ./data:/var/www/html
      - ./php-extra.ini:/usr/local/etc/php/conf.d/php-extra.ini
```

注意：

- 不要暴露 `0.0.0.0:8081`
- 应使用 `127.0.0.1:8081`
- 只允许 Nginx 访问

## 6. PHP 上传限制配置

创建文件：

```bash
vim /opt/nextcloud/php-extra.ini
```

写入内容：

```ini
upload_max_filesize=10G
post_max_size=10G
memory_limit=1G
max_execution_time=3600
max_input_time=3600
```

原因：

默认值通常为 `upload_max_filesize = 512M`，而手机照片和视频备份容易超过这个限制。

## 7. 启动 Nextcloud

启动服务：

```bash
docker compose up -d
```

检查运行状态：

```bash
docker ps
```

应该能看到以下容器：

- nextcloud
- nextcloud-postgres
- nextcloud-redis

测试访问：

```bash
curl http://127.0.0.1:8081
```

如果返回 HTML 内容，说明服务正常。

## 8. Nginx 配置

为 `example.com` 配置反向代理：

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name example.com;

    ssl_certificate /cert/example.com.fullchain.cer;
    ssl_certificate_key /cert/example.com.key;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port 443;

        client_max_body_size 10G;
        proxy_buffering off;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}
```

检查配置：

```bash
nginx -t
```

重载 Nginx：

```bash
systemctl reload nginx
```

## 9. Nextcloud 初始化

访问：

```text
https://example.com
```

数据库选择：

- PostgreSQL

填写信息：

- 数据库用户：`nextcloud`
- 数据库密码：`YOUR_DB_PASSWORD`
- 数据库名：`nextcloud`
- 数据库主机：`postgres`

注意：

- 不能填写 `localhost`
- 也不能填写 `127.0.0.1`
- 因为数据库运行在 Docker 网络中

## 10. Nextcloud 反向代理配置

进入容器：

```bash
docker exec -it nextcloud bash
```

设置 HTTPS 协议：

```bash
php occ config:system:set overwriteprotocol --value=https
```

设置域名：

```bash
php occ config:system:set overwritehost --value=example.com
```

设置可信域名：

```bash
php occ config:system:set trusted_domains 1 --value=example.com
```

退出容器：

```bash
exit
```

重启容器：

```bash
docker restart nextcloud
```

## 11. 配置 Cron

编辑定时任务：

```bash
crontab -e
```

添加以下内容：

```bash
*/5 * * * * docker exec -u www-data nextcloud php -f /var/www/html/cron.php
```

## 12. 安装 Memories

进入 Nextcloud 后，依次操作：

1. 打开“应用”
2. 搜索 “Memories”
3. 点击启用

## 13. 安装 ffmpeg

进入容器：

```bash
docker exec -it nextcloud bash
```

安装依赖：

```bash
apt update
apt install -y ffmpeg
```

检查安装结果：

```bash
ffmpeg -version
```

## 14. 安装 Preview Generator

安装插件：

```bash
php occ app:install previewgenerator
```

生成缩略图：

```bash
php occ preview:generate-all
```

## 15. Memories 索引

首次扫描索引：

```bash
docker exec -u www-data nextcloud php occ memories:index
```

## 16. 问题记录

### 问题 1：Docker 启动端口冲突

错误信息：

```text
failed to bind host port 127.0.0.1:8080/tcp:
address already in use
```

原因：

服务器已有 rclone WebDAV 服务占用了 8080 端口。

检查命令：

```bash
sudo ss -tlnp | grep 8080
```

解决方式：

- 将 rclone WebDAV 端口保持在 8080
- 将 Nextcloud 调整为 8081

### 问题 2：PHP 上传限制

检查命令：

```bash
php -i | grep upload
```

发现默认值为：

```text
upload_max_filesize => 512M
```

解决方式：

在配置文件中增加：

```ini
upload_max_filesize=10G
post_max_size=10G
```

### 问题 3：iOS Nextcloud App 点击授权访问无响应

现象：

- iOS Nextcloud App 登录成功
- 点击“授权访问”后无响应

原因：

Nextcloud 运行在 Nginx HTTPS 反向代理之后，HTTP 请求链路中缺少正确的协议透传，导致 OAuth 回调地址生成异常。

请求链路：

```text
iOS App
  -> HTTPS
  -> Nginx
  -> HTTP
  -> Docker Nextcloud
```

解决方式：

进入容器后执行：

```bash
docker exec -it nextcloud bash
php occ config:system:set overwriteprotocol --value=https
```

同时确认 Nginx 配置中包含：

```nginx
proxy_set_header X-Forwarded-Proto https;
```

完成后重新登录 iOS App。

## 17. 清理重新安装

停止服务：

```bash
cd /opt/nextcloud
docker compose down
```

删除数据：

```bash
rm -rf data
rm -rf postgres
```

重新创建目录：

```bash
mkdir data
mkdir postgres
```

重新启动：

```bash
docker compose up -d
```

然后重新进入初始化流程。

## 18. 最终检查清单

| 项目              | 状态 |
| ----------------- | ---- |
| Docker Nextcloud  | ✅   |
| PostgreSQL        | ✅   |
| Redis             | ✅   |
| HTTPS             | ✅   |
| Nginx 代理        | ✅   |
| PHP 上传限制      | ✅   |
| Cron              | ✅   |
| ffmpeg            | ✅   |
| Preview Generator | ✅   |
| Memories          | ✅   |
| iOS App 登录      | ✅   |

## 19. 后续优化方向

可以继续增加以下内容：

- 手机自动照片备份
- 人脸识别
- AI 标签
- 外部存储
- 数据库备份
- Nextcloud 自动升级
- 异地备份策略
