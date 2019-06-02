# &lt;meta&gt;
```html
<meta> 元素必须包含在 <head> 元素中并且在HTML代码的前1024个字节内，因为某些浏览器在选择编码之前只查看前面这些字节。
```
[MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)
  
- name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。
    ```html
    <meta name="参数"content="具体的参数值">
    ```
- keywords用来告诉搜索引擎你网页的关键字是什么。
    ```html
    <meta name="keywords"content="science,education,culture,politics,ecnomics，relationships,entertaiment,human">
    ```
- description(网站内容描述)
    ```html
    <meta name="description"content="Thispageisaboutthemeaningofscience,education,culture.">
    ```
- robots(机器人向导)用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。content的参数有all,none,index,noindex,follow,nofollow。默认是all。
    ```html
    <meta name="robots"content="none">
    ```
    - 信息参数为all：文件将被检索，且页面上的链接可以被查询；
    - 信息参数为none：文件将不被检索，且页面上的链接不可以被查询；
    - 信息参数为index：文件将被检索；
    - 信息参数为follow：页面上的链接可以被查询；
    - 信息参数为noindex：文件将不被检索，但页面上的链接可以被查询；
    - 信息参数为nofollow：文件将被检索，但页面上的链接不可以被查询；

- author(作者)标注网页的作者
    ```html
    <meta name="author" content="root,root@xxxx.com">
    ```
- renderer(渲染)
    ```html
    <meta name="renderer" content="webkit">
    ```
- viewport(视图模式）告诉浏览器你的渲染模式
    ```html
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    ```
- http-equiv属性,http-equiv顾名思义，相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。
    ```html
    <meta http-equiv="参数"content="参数变量值">
    <!-- 常用项：X-UA-Compatible（浏览模式） -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Expires(期限) 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输,必须使用GMT的时间格式 -->
    <meta http-equiv="expires"content="Fri,01Jan201618:18:18GMT">
    <!-- Pragma(cache模式) 禁止浏览器从本地计算机的缓存中访问页面内容,这样设定，访问者将无法脱机浏览 -->
    <meta http-equiv="Pragma" content="no-cache">
    <!-- Refresh(刷新) 自动刷新并指向新页面，其中的2是指停留2秒钟后自动刷新到URL网址 -->
    <meta http-equiv="Refresh" content="2;URL=http://www.jb51.net">
    <!-- Set-Cookie(cookie设定) 如果网页过期，那么存盘的cookie将被删除。必须使用GMT的时间格式。 -->
    <meta http-equiv="Set-Cookie"content="cookievalue=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/">
    <!-- Window-target(显示窗口的设定) 强制页面在当前窗口以独立页面显示,用来防止别人在框架里调用自己的页面 -->
    <meta http-equiv="Window-target" content="_blank">
    <!-- content-Type(显示字符集的设定) 设定页面使用的字符集。 -->
    <meta http-equiv="content-Type" content="text/html;charset=gb2312">
    <!-- content-Language（显示语言的设定） -->
    <meta http-equiv="Content-Language" content="zh-cn"/>
    <!-- 是否显示图片工具栏，当为false代表不显示，当为true代表显示 -->
    <meta http-equiv="imagetoolbar" content="false"/>
    ```

- generator 代表说明网站的采用的什么软件制作
    ```html
    <meta name="generator" content="信息参数"/>
    ```
- COPYRIGHT 代表说明网站版权信息
    ```html
    <meta NAME="COPYRIGHT" CONTENT="信息参数">
    ```
- revisit-after 代表网站重访,7days代表7天，依此类推
    ```html
    <meta name="revisit-after" CONTENT="7days">
    ```
- author标注网页的作者
    ```html
    <meta name="author" content="root,root@xxxx.com">
    ```


- Cache-Control指定请求和响应遵循的缓存机制。

Cache-Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。请求时的缓存指令包括no-cache、no-store、max-age、max-stale、min-fresh、on

ly-if-cached，响应消息中的指令包括public、private、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age。各个消息中的指令含义如下
Public:指示响应可被任何缓存区缓存
Private:指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效
no-cache指示请求或响应消息不能缓存
no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应
min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应
max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。