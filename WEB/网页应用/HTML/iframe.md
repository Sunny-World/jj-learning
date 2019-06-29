# iframe
```html
<iframe src=”you page’s url” width=”100″ height=”30″ frameborder=”no” border=”0″ marginwidth=”0″ marginheight=”0″ scrolling=”no” allowtransparency=”yes”></iframe>
```
```html
<iframe runat="server" src="you page's url" width="750" height="30" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
```

runat="server" 这个最好加上Iframe跳转 asp.net  可在当前iframe中跳转

src 链接到的地址URl

frameborder 是否显示边框（0无边框 1有边框）

scrolling 是否有滚动条（yes有滚动条 no无滚动条）

allowtransparency 背景是否透明（yes透明 no不透明）

iframe并不是很常用的，在标准的网页中非常少用。把iframe解释成“浏览器中的浏览器“是很恰当的。<iframe>也应该是框架的一种形式，它与<frame>不同的是，iframe可以嵌在网页中的任意部分。例如：
<iframe frameborder=0 width=170 height=100 marginheight=0 marginwidth=0 scrolling=no src="move-ad.htm"></iframe>
```
SRC=URI 嵌入式柜架的页面文件路径 
NAME=CDATA 嵌入式柜架的名字 
LONGDESC=URI 描述 
WIDTH=Length 宽度 
HEIGHT=Length 高度 
ALIGN=[ top | middle | bottom | left | right ] 对齐方式 
FRAMEBORDER=[ 1 | 0 ] 柜架边框 
MARGINWIDTH=Pixels 左右空出宽度 
MARGINHEIGHT=Pixels 上下空出的高度 
SCROLLING=[ yes | no | auto ] 流动条(yes强制显示|no永不显示|auto自动)
```
Iframe标记的使用格式是:
```html 
<Iframe src="URL" width="x" height="x" scrolling="[OPTION]" frameborder="x" name="main"></iframe> 
```

src：文件的路径，既可是HTML文件，也可以是文本、ASP等； 
width、height："内部框架"区域的宽与高； 

scrolling:当SRC的指定的HTML文件在指定的区域不显不完时，滚动选项，如果设置为NO，则不出现滚动条；如为 Auto：则自动出现滚动条；如为Yes，则显示; 

FrameBorder：区域边框的宽度，为了让“内部框架“与邻近的内容相融合，常设置为0。 

name:框架的名字，用来进行识别。
```
<iframe>用于设置文本或图形的浮动图文框或容器。 
```
border 
```
<iframe border="3"></iframe> 
设定围绕图文框的边缘宽度 
```

frameboder 
```
<iframe frameboder="0"></iframe> 
```
设置边框是不否为3维（0=否，1=是） 

height,width 
```
<iframe height="31" width="88"></iframe> 
```
设质边框的宽度和高度 

scrolling 
```
<iframe scrolling="no"></iframe> 
```
是否有滚动条（yes,no,auto) 

src 
```
<iframe src="girl.gif"></iframe> 
```
指定iframe调用的文件或图片(html,htm,gif,jpeg,jpg,png,txt,*.*) 

注意事项： 
```
一个浮动框架不需要通过<frameset>元素声明为框架设置的一部分; 

WebTV和Netscape 4.x(4.0 到 4.75)不支持浮动框架。 
在HTML4.01严格规范中，<iframe>元素没有被定义。浮动框架可以使用<div>元素和CSS定位方法来模仿实现。

浮动帧标记Iframe的属性： 

1、文件位置：   
语法：src=url   
说明：url为嵌入的HTML文件的位置，可以是相对地址，也可以是绝对地址。   
示例：<iframe   src="iframe.html">  


2、对象名称：   
语法：name=#   
说明：#为对象的名称。该属性给对象取名，以便其他对象利用。   
示例：<iframe   src="iframe.html"   name="iframe1">  

 
3、ID选择符：   
语法：id=#   
说明：指定该标记的唯一ID选择符。   
示例：<iframe   src="iframe.html"   id="iframe1">  

4、容器属性：   
语法：height=#   width=#   
说明：该属性指定浮动帧的高度和宽度。取值为正整数（单位为像素）或百分数。   
height：指定浮动帧的高度；   
width：指定浮动帧的宽度。   
示例：<iframe   src="iframe.html"   height=400   width=400>  


5、尺寸调整：   
语法：noresize   
说明：IE专有属性，指定浮动帧不可调整尺寸。   
示例：<iframe   src="iframe.html"   noresize>  

6、边框显示：   
语法：frameborder=0、1   
说明：该属性规定是否显示浮动帧边框。   
0：不显示浮动帧边框；   
1：显示浮动帧边框。   
示例：<iframe   src="iframe.html"   frameborder=0>   
<iframe   src="iframe.html"   frameborder=1>  


7、边框厚度：   
语法：border=#   
说明：该属性指定浮动帧边框的厚度，取值为正整数和0，单位为像素。为了将浮动帧与页面无缝结合，border一般等于0。   
示例：<iframe   src="iframe.html"   border=1>  


8、边框颜色：   
语法：bordercolor=color   
说明：该属性指定浮动帧边框的颜色。color可以是RGB色（RRGGBB），也可以是颜色名。   
示例：<iframe   src="iframe.html"   bordercolor=red>  

9、对齐方式：   
语法：align=left、right、center   
说明：该属性指定浮动帧与其他对象的对齐方式。   
left：居左；   
right：居右；   
center：居中。   
示例：<iframe   src="iframe.html"   align=left>   
<iframe   src="iframe.html"   align=right>   
<iframe   src="iframe.html"   align=center>  


10、相邻间距：   
语法：framespacing=#   
说明：该属性指定相邻浮动帧之间的间距。取值为正整数和0，单位为像素。   
示例：<iframe   src="iframe.html"   framespacing=10>  

 
11、内补白属性：   
语法：hspace=#   vspace=#   
说明：该属性指定浮动帧内的边界大小。取值为正整数和0，单位为像素。两个属性应同时应用。   
hspace：浮动帧内的左右边界大小；   
vspace：浮动帧内的上下边界大小。   
示例：<iframe   src="iframe.html"   hspace=1   vspace=1>  


12、外补白属性：   
语法：marginheight=#   marginwidth=#   
说明：该属性指定浮动帧的边界大小。取值为正整数和0，单位为像素。两个属性应同时应用。     
marginheight：浮动帧的左右边界大小；   
marginwidth：浮动帧的上下边界大小。   
示例：<iframe   src="iframe.html"   marginheight=1   marginwidth=1>
```