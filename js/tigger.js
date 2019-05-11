// js模拟事件进行调用
function triggerTouchEvent(el, eventType) {
    // 获取目标元素的坐标、大小
    var rect = el.getBoundingClientRect();
    // 构建touch对象
    var touch = new Touch({
        identifier: Date.now(),
        target: el,
        clientX: rect.left + rect.width/2,
        clientY: rect.top + rect.height/2,
        // 下面的都是W3C实验性质的API
        radiusX: 2.5,
        radiusY: 2.5,
        rotationAngle: 10,
        force: 0.5
    });
    // 构建TouchEvent
    var touchEvent = new TouchEvent(eventType, {
        cancelable: true,
        bubbles: true,
        touches: [touch],
        targetTouches: [],
        changedTouches: [touch]
    });
    el.dispatchEvent(touchEvent);
}
var btn = document.getElementById("playerbtn"); 
triggerTouchEvent(btn, 'touchend');

// 调用原生dom事件
document.getElementById('baidu').onclick = function (ev) {
    var ev=event||ev;
    console.log(ev)
    // dom 加载完毕，ev不一定已经具备；
    ev.preventDefault();
    location.href = "http://www.soso.com"
}
// 直接获取element绑定的方法调用就可以了
var triggle = function (element, method) {
    var func = element[method];
    return func();
}
triggle(document.getElementById('baidu'), 'onclick')