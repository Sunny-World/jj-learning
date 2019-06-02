//获取对象中的所有方法并执行
function getObjAllFunc(obj){
    var stack = [];
    for(var key in obj){
        if(typeof obj[key]=='function'){
            // 若当前属性是function，则进行存储
            stack.push(obj[key]);
        }else if(typeof obj[key]=='object'){
            // 若当前属性是object，则进行递归检查
            stack = stack.concat(getAllFunc(obj[key]));
        }
        // 其他类型不进行操作
    }
    for(var i=0, t=stack.length; i<t; i++){
        stack[i]();
    }
}