//正负值均适用，取整
var a = ~~2.33 ;//类似parseInt
var b= '-4.03' | 0 ;//两边变成二进制再相加
var c= -3.33 << 0 ;//二进制后左移

//金钱千位符转化
function (num){
	return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
//或
function formatCash(str) {
   return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
   })
}

//交换数值（二进制的异运算）
a ^= b;
b ^= a;
a ^= b;

//把"1"字符串转换成数字
var a='1';
+a;

//数组去重
console.log( [...new Set([1, "1", 2, 1, 1, 3])] )

//取最大值与最小值，负数适用
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
var maxInNumbers = Math.max.apply(Math, numbers); 
var minInNumbers = Math.min.apply(Math, numbers);

//将argruments对象转换成数组
var argArray = Array.prototype.slice.call(arguments);
var argArray = Array.from(arguments)