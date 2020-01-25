VMware虚拟机CentOS与宿主机共享目录
正常情况下，在虚拟机CentOS中安装了vmware-tools后，配置完成共享目录，会自动在/mnt/hgfs下面出现共享目录。

如果该目录为空，并且通过命令：vmware-hgfsclient 的执行结果可以看到你的共享目录名称。

[root@test-server~]# vmware-hgfsclient 
sharedir
 

可以尝试下面的方法解决：

手动挂载目录：（将共享目录挂载到/mnt下面）

vmhgfs-fuse -o allow_other -o auto_unmount ".host:/sharedir" "/mnt/hgfs"
说明：

./host:/ 是固定写法
sharedir是使用命令vmware-hgfsclient得到的目录。
/mnt/hgfs 是挂载点
这样你就可以到 /mnt 目录下面看到共享过来的目录 sharedir 了。