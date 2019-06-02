# Ajax中的XMLHttpRequest对象详解

XMLHttpRequest对象是Ajax技术的核心。在Internet Explorer 5中，XMLHttpRequest对象以ActiveX对象引入，被称之为XMLHTTP，它是一种支持异步请求的技术。后来Mozilla、Netscape、Safari、Firefox和其他浏览器也提供了XMLHttpRequest类，虽然这些浏览器都提供了XMLHttpRequest类，但它们创建XMLHttpRequest类的方法并不相同。XMLHttpRequest使我们可以使用JavaScript向服务器提出请求并处理响应，而不阻塞用户的其他操作。

不刷新页面就和服务器进行交互是Ajax最大的特点。这个重要的特点主要归功于XMLHttpRequest对象。使用XMLHttpRequest对象使得网页应用程序像windows应用程序一样，能够及时响应用户与服务器之间的交互，不必进行页面刷新或者跳转，并且能够进行一系列的数据处理，这些功能可以使用户的等待时间缩短，同时也减轻了服务器端的负载。

目前XMLHttpRequest对象已经得到了大部分浏览器的支持，因此使用Ajax技术开发Web应用程序的时候一般情况下不会出现问题。不过，当开发人员确定使用Ajax技术来开发时，仍然需要考虑用户会使用什么样的浏览器来对网站进行访问，虽然不支持XMLHttpRequest对象的浏览器占少数。

在使用XMLHttpRequest对象向服务器发送请求和处理响应之前，必修先用JavaScript创建一个XMLHttpRequest对象，然后通过这个对象来和服务器建立请求并接收服务器返回的数据。由于XMLHttpRequest不是一个W3C标准，所以可以采用多种方法使用JavaScript来创建XMLHttpRequest的实例。Internet Explorer把XMLHttpRequest实现为一个ActiveX对象，其他浏览器（如Firefox、Safari和Opera等）把它实现为一个本地JavaScript对象。由于存在这些差别，JavaScript代码中必须包含有关的逻辑，从而使用ActiveX技术或者使用本地JavaScript对象技术来创建XMLHttpRequest的一个实例。

正因为在不同的浏览器中，XMLHttpRequest对象的创建方式不同，因此在程序中创建XMLHttpRequest对象之前需要对浏览器进行判断。使用详细编写代码方式来区别浏览器类型的方式不仅代码量大，而且很不方便也不灵活。在这里我们可以换一种思路来解决，只需要检查浏览器是否提供对ActiveX对象的支持即可。如果浏览器支持ActiveX对象，就可以使用ActiveX来创建XMLHttpRequest对象。否则，就需要在程序中使用本地JavaScript对象技术来创建。下面的代码展示了在不同的浏览器中使用JavaScript代码来创建XMLHttpRequest对象的编程方法。

```js
function createXMLHttpRequest() {
    var xmlreq = false;
    if (window.ActiveXObject) {
        xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlreq = new XMLHttpRequest();
    }
    return xmlreq;
}
```

我们从上面代码中看出，创建XMLHttpRequest对象的过程比较简单。首先在createXMLHttpRequest()方法中创建了一个变量xmlreq来保存对这个对象的引用，并将其默认值设置为false。然后在这个方法中通过简单的判断，确定究竟使用什么方法来创建对象。由于用户使用的浏览器类型不同，代码window.ActiveXObject可能返回一个对象，也可能返回null。If条件语句根据返回的结果来判断浏览器是否能支持ActiveX控件，相应地得知浏览器是IE还是其他浏览器类型。如果判定用户使用的是IE浏览器，则通过实例化ActiveXObject的一个实例的方法来创建XMLHttpRequest对象。使用这种方法时，参数字符串指明要创建何种类型的ActiveX对象。在本例子中，参数是Microsoft.XMLHTTP，这说明需要创建的是XMLHttpRequest的一个实例。

   如果window.ActiveXObject返回null，表示用户使用的浏览器不支持ActiveX对象，那么程序会执行else语句所指定的操作。首先判断浏览器是否把XMLHttpRequest实现为本地JavaScript对象。如果存在window.XMLHttpRequest，那么就创建XMLHttpRequest对象。最后将这个xmlreq变量返回，完成了XMLHttpRequest对象的创建过程。

由于JavaScript具有动态类型的特性，而且XMLHttpRequest对象在不同浏览器上的实现是兼容的，所有可以用同样的方式访问XMLHttpRequest实例的属性和方法，而不论这个实例创建的方法是什么。这就大大简化了开发过程，而且在JavaScript中也不必编写特定于浏览器的逻辑。

XMLHttpRequest对象的属性

XMLHttpRequest对象提供了许多属性，处理XMLHttpRequest时需要频繁用到这些属性，如下所示：

- onreadystatechange

    每个状态改变时都会触发这个事件处理程序，通常会调用一个JavaScript函数

    当XMLHttpRequest对象吧一个HTTP请求发送到服务器时将经历若干种状态。一直等待直到请求被处理，然后，它才接收一个响应。这样以来，脚本才正确响应各种状态，XMLHttpRequest对象暴露一个描述对象的当前状态的readyState属性，对应的值如下：

    0 : 描述一种“未初始化”状态。此时，已经创建了一个XMLHttpRequest对象，但是还没有初始化。

    1 : 描述一种“发送”状态。此时，代码已经调用了XMLHttpRequest open()方法并且XMLHttpRequest已经准备好把一个请求发送到服务器。

    2 : 描述一种“发送”状态。此时，已经通过send()方法把一个请求发送到服务器端，但是还没有收到一个响应。

    3 : 描述一种“正在接收”状态。此时，已经接收到HTTP响应头部信息，但是消息体部分还没有完全接收结束。

    4 : 描述一种“已加载”状态。此时，响应已经被完全接收。

- readyState

    请求的状态

    无论readyState值何时发生改变，XMLHttpRequest对象都会激发一个readystatechange事件。其中，onreadystatechange属性接收一个EventListener值，向该方法指示无论readyState值何时发生改变，该对象都将激活。

- responseText

    服务器的响应，表示为一个串

    这个responseText属性包含客户端接收到的HTTP响应的文本内容。当readyState值为0、1或2时，responseText包含一个空字符串。当readyState值为3（正在接收）时，响应中包含客户端还未完成的响应信息。当readyState为4（已加载）时，该responseText包含完整的响应信息。

- responseXML

    服务器的响应，表示为XML，这个对象可以解析为一个DOM对象

    此属性用于当接收到完整的HTTP响应时（readyState为4）描述XML响应；此时，Content-Type头部指定MIME（媒体）类型为text/xml，application/xml或以+xml结尾。如果Content-Type头部并不包含这些媒体类型之一，那么responseXML的值为null。无论何时，只要readyState值不为4，那么该responseXML的值也为null。

    其实，这个responseXML属性值是一个文档接口类型的对象，用来描述被分析的文档。如果文档不能被分析（例如，如果文档不是良构的或不支持文档相应的字符编码），那么responseXML的值将为null。

- status

    服务器的HTTP状态

    这个属性描述了HTTP状态代码，而且其类型为short。而且，仅当readyState值为3（正在接收中）或4（已加载）时，这个status属性才可用。当readyState的值小于3时试图存取status的值将引发一个异常。例如：status等于200表示成功，404表示未找到资源。

- statusText属性

    这个属性描述了HTTP状态代码文本，并且仅当readyState值为3或4才可用。当readyState为其它值时试图存取statusText属性将引发一个异常。


XMLHttpRequest对象的方法
- abort()方法
    
    可以使用这个abort()方法来暂停与一个XMLHttpRequest对象相联系的HTTP请求，从而把该对象复位到未初始化状态。
- open()方法

    此方法用来和服务器之间建立连接。其完整的方法参数是
    ```
    open( string method, string uri, boolean asynch, string username, string password
    )
    ```
    其中前两个参数是必要的，后面三个为可选参数。

    method参数是必须提供的，用于指定用来发送请求的HTTP方法（GET，POST，PUT，DELETE或HEAD）。为了把数据发送到服务器，应该使用POST方法；为了从服务器端检索数据，应该使用GET方法。

    uri参数用于指定XMLHttpRequest对象把请求发送到的服务器相应的URI。借助于window.document.baseURI属性，该uri被解析为一个绝对的URI。换句话说，如果使用相对的URI，它将使用与浏览器解析相对的URI一样的方式被解析。

    Asynch参数指定是否请求是异步的，缺省值为true。为了发送一个同步请求，需要把这个参数设置为false。但Ajax技术的最大优点是 调用，因此如果这个参数设置为false，则将失去使用XMLHttpRequest对象的意义。对于要求认证的服务器，可以提供可选的用户名和口令参数。

    在调用open()方法后，XMLHttpRequest对象把它的readyState属性设置为1（打开）并且把responseText、responseXML、status和statusText属性复位到它们的初始值。另外，它还复位请求头部。注意，如果调用open()方法并且此时readyState为4，则XMLHttpRequest对象将复位这些值。

- send()方法

   在通过调用open()方法准备好一个请求之后，需要把该请求发送到服务器。仅当readyState值为1时，才可以调用send()方法。否则的话，XMLHttpRequest对象将引发一个异常。该请求被使用提供给open()方法的参数发送到服务器。当asynch参数为true时，send()方法立即返回，从而允许其它客户端脚本处理继续。在调用send()方法后，XMLHttpRequest对象把readyState的值设置为2（发送）。当服务器响应时，在接收消息体之前，如果存在任何消息体的话，XMLHttpRequest对象将把readyState设置为3（正在接收中）。当请求完成加载时，它把readyState设置为4（已加载）。对于一个HEAD类型的请求，它将在把readyState值设置为3后再立即把它设置为4。

   send()方法使用一个可选的参数，该参数可以包含可变类型的数据。典型地，使用它并通过POST方法把数据发送到服务器。另外，可以显式地使用null参数调用send()方法，这与不用参数调用它一样。对于大多数其它的数据类型，在调用send()方法之前，应该使用setRequestHeader()方法（见后面的解释）先设置Content-Type头部。

    如果在send(content)方法中的content参数的类型为string，那么，数据将被编码为UTF-8。

    如果数据是Document类型，那么将使用由data.xmlEncoding指定的编码串行化该数据。

    注意，由于调用这个方法后就把请求发出去了，所以对于XMLHttpRequest对象的设置需要在调用这个方法之前来完成。另外，对于send()方法中的那个参数，虽然是可选的，但是最好在不需要发送数据的时候也不能省略这个参数，应该将其设置成null，否则将会在Firefox中有错误。

- setRequestHeader("header","value")方法

    该方法用来设置请求的头部信息。当readyState值为1时，可以在调用open()方法后调用这个方法。否则，将得到一个异常。

- getResponseHeader("header")方法

    该方法用于检索响应的头部值。仅当readyState值是3或4（换句话说，在响应头部可用以后）时，才可以调用这个方法；否则，该方法返回一个空字符串。

- getAllResponseHeaders()方法

    该方法以一个字符串形式返回所有的响应头部（每一个头部占单独的一行）。如果readyState的值不是3或4，则该方法返回null。