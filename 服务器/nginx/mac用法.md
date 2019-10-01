# mac 用法

-   mac nginx 自启动
    通过 brew install nginx 命令安装的 nginx 实现自启动可执行如下命令：

    ```
    sudo cp /usr/local/opt/nginx/*.plist /Library/LaunchDaemons

    sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist
    ```

-   nginx.conf 在 mac 中的地址

```
‎⁨home⁩ ▸ ⁨usr⁩ ▸ ⁨local⁩ ▸ ⁨etc⁩ ▸ ⁨nginx⁩
```

    执行完毕，重启mac即可
