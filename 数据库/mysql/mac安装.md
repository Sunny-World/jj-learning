# Mac安装
1. 解压目录到 MySQL 默认安装路径 /usr/local/mysql 下, /usr/local路径不存在时, 先 sudo mkdir /usr/local 创建。

2. 移动解压后的二进制包到安装目录
    ```shell
    sudo mv mysql-5.6.24-osx10.9-x86_64 /usr/local/mysql 
    ```
3. 更改 mysql 安装目录所属用户与用户组
    ```shell
    cd /usr/local sudochown -R root:wheel mysql
    ```
4. 执行 scripts 目录下的 mysql_install_db 脚本完成一些默认的初始化(创建默认配置文件、授权表等)

    执行完成后会有：
    2015-12-20T06:10:09.073666Z 1 [Note] A temporary password is generated forroot@localhost: BxnS<>qpD8E4
    这里的密码可以用来登录mysql，然后修改密码

    ```
    cd /usr/local/mysqlsudo scripts/mysql_install_db --user=mysql
    ```

    注意: MySQL 5.7.6以上版本取消了 scripts 目录, 初始化命令改成了 sudo bin/mysqld --initialize --user=mysql
 
5. 安装完成, 测试启动、重启与停止:
    ```
    cd /usr/local/mysql  
    # 启动 sudo support-files/mysql.server start  
    # 重启 sudo support-files/mysql.server restart  
    # 停止
    sudo support-files/mysql.server stop  
    # 检查 MySQL 运行状态
    sudo support-files/mysql.server status
    ```

6. 初始化密码步骤如下：
    ```
    mysql –u root –p
    ```
    输入之前生成的password(mysql_install_db执行之后生成的password)

    通过自带的 MySQL Client 连接数据库
    ```
    cd /usr/local/mysql/bin ./mysql -u root -p <your-password>
    ```

7. 修改密码
    ```shell
    $ cd /usr/local/mysql/bin 
    $ ./mysql -u root 
    $mysql> FLUSH PRIVILEGES;
    $mysql> ALTER USER 'root'@'localhost' IDENTIFIED by '你的新密码'; 
    $mysql> EXIT
    ```