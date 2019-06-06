# Mac安装Redis4.0.6
- Mac版本:10.12.6
- Python版本3.6.3
  
Redis环境安装

下载地址:https://redis.io/download,下载最新版本,稳定版系列.

1. 下载安装文件
    ```
    wget http://download.redis.io/releases/redis-4.0.6.tar.gz
    ```
2. 解压
    ```
    tar -zxvf redis-4.0.6.tar.gz
    ```
3. copy到/usr/local/redis/目录下,并查看,进入
    ```
    sudo mkdir -p /usr/local/redis/
    sudo cp -r redis-4.0.6/*  /usr/local/redis/
    ls /usr/local/redis/
    cd /usr/local/redis/
    ```
4. 编译
    ```
    sudo make
    sudo make test  (如果出现"\o/ All tests passed without errors!")
    ```
    表示Redis环境没问题
5. 安装
    ```
	sudo make install
    ```
6. 查看编译好的命令文件
    ```
	ls /usr/local/bin/redis-*
    ```
7. 修改配置文件
    ```
	sudo mkdir /etc/redis
	sudo cp redis.conf /etc/redis/
	ls /etc/redis/redis.conf
    ```
	启动Redis
    ```
	redis-server /etc/redis/redis.conf
    ```
	连接Redis服务器

	新开一个终端窗口

	通过  redis-cli  得到  127.0.0.1:6379>
    
    再输入 ping  得到 PONG