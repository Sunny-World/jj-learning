# 最新版MySQL 8.0.12 Windows 安装教程
[参考]:https://blog.csdn.net/zsxlbr1314/article/details/81436395?utm_source=blogxgwz0

1. 第一步：到MySQL官网下载安装包：https://dev.mysql.com/downloads/mysql/
2. 将下载好的安装包（mysql-8.0.12-winx64 .zip）解压到相应路径下。（我的安装路径是：D:\Program Files\MySQL\mysql-8.0.12-winx64）
3. 在安装目录下新建一个配置文件，命名为s，并输入以下内容：（安装目录和数据存放目录需根据自己安装路径配置自己的目录）
    ```
    [mysql]
    # 设置mysql客户端默认字符集
    default-character-set=utf8
     
    [mysqld]
    # 设置3306端口
    port = 3306
    # 设置mysql的安装目录
    basedir=D:\Program Files\MySQL\mysql-8.0.12-winx64
    # 设置mysql数据库的数据的存放目录
    datadir=D:\Program Files\MySQL\SQLData
    # 允许最大连接数
    max_connections=20
    # 服务端使用的字符集默认为8比特编码的latin1字符集
    character-set-server=utf8
    # 创建新表时将使用的默认存储引擎
    default-storage-engine=INNODB
    ```
4. 以管理员身份运行cmd.exe命令行工具：
5. 执行以下命令，进到MySQL安装目录bin目录下（为了方便也可以给MySQL配置环境变量，详情可参考
    今天重装了系统，在安装mysql服务时 提示"找不到msvcp140.dll"，在百度搜索，很多人说下载这个dll放到SysWOW64文件夹下，然后cmd注册就可以了，然而接下来提示模块“msvcp140.dll”加载失败。（我真特么崩溃，能不能给点靠谱的答案）

   后来终于找到真相，是没有安装VC++2015版运行库导致的（Microsoft Visual C++ 2015 Redistributable），下载地址https://www.microsoft.com/en-us/download/details.aspx?id=53587。点击download里面有两个exe文件，一个64位的一个32位的。下载安装之后，成功解决问题。

    https://blog.csdn.net/q2826621520/article/details/53783552）：     

   进入MySQL安装目录： 

    cd /d D:\Program Files\MySQL\mysql-8.0.12-winx64\bin

    执行命令安装MySQL:
    mysqld install

    执行以下命令初始化data目录(5.7之后必须执行该命令之后才可以启动mysql)

    mysqld --initialize-insecure

    执行以下命令启动mysql
    net start mysql

6. 配置root账号的密码：
    
    执行以下命令登录mysql,第一次登录无需输入密码，直接回车就好
    
    mysql -u root -p

    登录成功之后，执行以下命令修改密码( newpassword修改为自己设置的密码)：

    alter user 'root'@'localhost' identified with mysql_native_password by 'newpassword';

    修改完密码之后，执行以下命令刷新权限

    flush privileges;
 
7. 至此，最新版MySQL已经安装完成！更多问题可以参考MySQL的官方文档！
