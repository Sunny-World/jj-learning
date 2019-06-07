mac 打开 原生 ntfs 读写

我写了个自动化的app，github[地址>>](https://github.com/Javison666/mac-ntfs)

转载http://www.tianwaihome.com/2014/07/mac-osx-ntfs.html

很多同学都会为如何在Mac下写入NTFS格式的磁盘而感到困惑，因为默认情况下，把一个NTFS格式的磁盘插入到Mac里，是只能读不能写的。用起来肯定很郁闷，很多同学也因此把移动硬盘分成了双分区，一个NTFS，一个HFS。其实在Mac下完全是可以写NTFS磁盘的

一种十分简单的方法是用第三方工具，Paragon NTFS for MAC。使用这种工具，虽然说是简单了，可是麻烦事也不少，一来是这个工具是要收费的，当然有破解版，不过破解版里有没有被植入什么，那就没有人知道了，二是这个工具本身就不怎么稳定，容易丢数据不说，每次OSX一更新，必须得等软件更新后才能用，总之，用起来不放心啊。

其实呢，大家并不需要困惑，OSX其实原生就支持NTFS，最早在OSX 10.5的时候，是可以直接写入NTFS的盘的，后来由于微软的限制，把这个功能给屏蔽了，我们可以通过命令行手动打开这个选项。

第一步，当然是插上磁盘啦。

可以从finder或者使用以下命令查看到磁盘的Volume Name:

复制代码
diskutil list
```
/dev/disk0
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *128.0 GB   disk0
   1:                        EFI EFI                     209.7 MB   disk0s1
   2:          Apple_CoreStorage                         127.7 GB   disk0s2
   3:                 Apple_Boot Boot OS X               134.2 MB   disk0s3
/dev/disk1
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *500.1 GB   disk1
   1:                        EFI EFI                     209.7 MB   disk1s1
   2:          Apple_CoreStorage                         499.2 GB   disk1s2
   3:                 Apple_Boot Boot OS X               650.0 MB   disk1s3
/dev/disk2
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:                  Apple_HFS Macintosh HD           *621.4 GB   disk2
/dev/disk3
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *1.0 TB     disk3
   1:               Windows_NTFS FreeAgent GoFlex Drive  1.0 TB     disk3s1
```
复制代码
可以看到，我的 Volume Name 是FreeAgent GoFlex Drive。

紧接着更新 /etc/fstab文件

sudo vim /etc/fstab
把以下内容写入进去

LABEL=FreeAgent\040GoFlex\040Drive none ntfs rw,auto,nobrowse
下面来依次解释一下，其中的\040的意思是代替空格键，因为我的Volume Name是有空格的，所以必须把这个空格给转义了。

后面的Ntfs rw表示把这个分区挂载为可读写的ntfs格式，最后nobrowse非常重要，因为这个代表了在finder里不显示这个分区，这个选项非常重要，如果不打开的话挂载是不会成功的。

编辑好以后重新插入磁盘，就能识别到了，但是这个时候有了一个最大的问题，因为这个分区在finder里不显示了，那么我们要怎么找到它呢，总不能一直用命令行把。

解决办法其实很简单，因为这个分区是挂/Volumes下的，我们把这个目录在桌面做一个快捷方式就行了。

sudo ln -s /Volumes ~/Desktop/Volumes
