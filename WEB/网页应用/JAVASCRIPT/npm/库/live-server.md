# live-server

来自 <https://www.npmjs.com/package/live-server> 

live-server在您的项目目录中发出命令。或者，您可以添加路径作为命令行参数。

这将自动启动默认的浏览器。当您对任何文件进行更改时，浏览器将重新加载页面 - 除非它是一个CSS文件，在这种情况下，应用这些更改时无需重新加载。

命令行参数：
```
• --port=NUMBER - 选择要使用的端口，默认值：PORT env var或8080
• --host=ADDRESS - 选择要绑定的主机地址，默认值：IP env var或0.0.0.0（“任意地址”）
• --no-browser - 禁止自动Web浏览器启动
• --browser=BROWSER - 指定浏览器使用，而不是系统默认
• --quiet | -q - 禁止记录
• --verbose | -V - 更多日志记录（记录所有请求，显示所有侦听的IPv4接口等）
• --open=PATH - 启动浏览器到PATH而不是服务器根目录
• --watch=PATH - 用逗号分隔的路径来专门监视更改（默认值：观看所有内容）
• --ignore=PATH- 要忽略的逗号分隔的路径字符串（anymatch -compatible definition）
• --ignorePattern=RGXP-文件的正则表达式忽略（即.*\.jade）（不推荐使用赞成--ignore）
• --middleware=PATH - 导出.js文件的路径导出中间件功能添加; 可以是一个没有路径的名字，也不是引用middleware文件夹中捆绑的中间件的扩展名
• --entry-file=PATH - 提供这个文件（服务器的根相对），以取代丢失的文件（对单页面应用程序有用）
• --mount=ROUTE:PATH - 在定义的路线下提供路径内容（可能有多个定义）
• --spa - 将请求从/ abc转换为/＃/ abc（适用于单页面应用程序）
• --wait=MILLISECONDS - （默认100ms）等待所有更改，然后重新加载
• --htpasswd=PATH - 启用期待位于PATH的htpasswd文件的http-auth
• --cors - 为任何来源启用CORS（反映请求源，支持凭证的请求）
• --https=PATH - 到HTTPS配置模块的路径
• --proxy=ROUTE:URL - 代理ROUTE到URL的所有请求
• --help | -h - 显示简短的使用提示和退出
• --version | -v - 显示版本和退出
```

默认选项：

如果~/.live-server.json存在文件，它将在命令行中加载并用作live-server的默认选项。有关选项名称，请参阅“节点的使用情况”。
