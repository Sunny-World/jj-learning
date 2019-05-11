# HTML、XML、XHTML 有什么区别
- XML是The Extensible Markup Language(可扩展标识语言)的简写。
- XML并不是标记语言。它只是用来创造标记语言(比如HTML)的元语言。
- XHTML是The Extensible HyperText Markup Language可扩展标识语言的缩写。
建立XHTML的目的就是实现HTML向XML的过渡。
XML能够创造更多的标记，以弥补HTML标记不足的缺陷。

- HTML全名Hyper Text Markup Language，也就是超文本标记语言。
- HTML（超文本标记语言） 是用来显示数据的，其设计目标是显示数据并集中于数据外观。
- HTML是一种基础技术，常与CSS、JavaScript一起被众多网站用于设计令人赏心悦目的网页、网页应用程序以及移动应用程序的用户界。浏览器可以读取HTML文件，并将其渲染成可视化网页。HTML描述了一个网站的结构语义随着线索的呈现，使之成为一种标记语言而非编程语言。
- HTML语义化，语义化的含义就是用正确的标签做正确的事情，html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读。
- 搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于SEO。
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。
# 内容与样式分离
- CSS的一个重要优势是它可以帮助你将文档内容和其样式分离。这是最基本的。
- 复用样式。
同一个网页也许会有相同渲染效果的页面，如果之前定义过某个样式的话，这次就可以直接拿来用了。
- 减少适用性深度
某个nav 下有 ul  li a这样的，最好是直接对最底层的元素设置样式。
- 子选择器
可以限制CSS规则作用的范围。
- 分类代码
- 说明意图
- 某个元素下的子元素，添加包含父元素这种特殊类。算是命名规则。
- .box .box-hd(标题)
- .box .box-ct(内容)
# 常见的meta标签
- <meta>标签有两个属性：name和http-equiv。
- name="viewport"，主要是为了适应移动设备。
name="description"，主要是用来告诉搜索引擎，网站的主要内容是什么。
- name="keywords"，用来告诉搜索引擎，网站的主题是什么，比如说偏重于前端后端或者是某种编程语言等等。
- name="robots"，告诉爬虫哪些页面需要索引，哪些页面不需要索引。
- 提供HTML文档的元数据, 常用于告知浏览器如何显示内容和搜索引擎优化
- <meta charset="UTF-8">  //声明文档的编码方式
- <meta http-quiv="X-UA-Compatible" content="IE=edge,chrome=1"/>  //告知浏览器以什么版本渲染文档
- <meta name="renderer" content="webkit|ie-comp|ie-stand">   //告知浏览器选择什么内核渲染
- <meta http-quiv="Pragma" content="no-cache">  //禁止浏览器从本地计算机的缓存中访问页面内容。大概就是你访问一个页面后本地会有缓存，此时断网浏览该网站将会无法显示内容。
共有以下几种用法：
no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果
private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）
maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。
<meta http-equiv="Cache-Control" content="no-siteapp"/>
//禁止百度转码。
<meta http-equiv=”Set-Cookie” content=”cookievalue=xxx; expires=Friday,12-Jan-2018 18:18:18 GMT; path=/”>  //cookies的有效期。过了这个时间，网页存储在本地的cookies将会被删除。时间格式必须是GMT的时间格式。
文档声明的作用
DOCTYPE 是document type（文档类型）的缩写。用来说明文档是什么版本。
建立符合标准的网页 DOCTYPE声明是必不可少的。一般放在文档的最顶部。
严格模式和混杂模式
严格模式中浏览器根据规范渲染页面。
混杂模式中浏览器以比较宽松的向后兼容的方式显示。模拟低版本浏览器的行为以防止网页无法渲染。
DOCTYPE不存在或者格式不正确会导致文档以混杂模式出现。
<!DOCTYPE html>的作用：
<!DOCTYPE html>一定要在HTML文档的最前面，在<html>标签之前。
声明之后表明你的内容使用HTML5。会让不支持html5的浏览器采用标准模式解析。
浏览器乱码
文档<head>标签里的<meta charset="UTF-8">是告诉浏览器用utf-8这种编码方式来渲染。
但是如果编写之后保存用的不是UTF-8就会出现乱码。用windows系统自带的记事本就是这种情况。
解决办法：
保存文档时注意保存的编码方式，保存的格式要与顶部声明的格式一样。
使用notepad2-mod。比自带的记事本强大多了。