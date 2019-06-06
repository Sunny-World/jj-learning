# mac用法
- mac nginx 自启动
    通过brew install nginx命令安装的nginx实现自启动可执行如下命令：
    ```
    sudo cp /usr/local/opt/nginx/*.plist /Library/LaunchDaemons

    sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist
    ```

    执行完毕，重启mac即可