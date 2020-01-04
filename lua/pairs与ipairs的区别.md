# pairs与ipairs区别
一般的迭代器是在内部维护一个状态的（当前迭代的位置），但是 Lua 的迭代器是 Stateless（无状态的），这样的好处是可以重复多次迭代。不像 Python 的 Iterator 和 Iterable，如果多次迭代的话，需要从 Iterable 获得一个迭代器 Iterator。Lua 的迭代器需要循环的时候自己维护。

每一次迭代，for 都会调用迭代器函数，传入的参数有 2 个，一个是无状态的、要迭代的对象，一个就是控制参数（迭代的状态，1 2 3 …）。

比如下面这个循环：
```
a = {"one", "two", "three"}
for i, v in ipairs(a) do
 print(i, v)
end
```
首先 ipairs(a) 执行，返回三个值： iter 函数（从这里看出 Lua 和 Python 一样是有 “一等函数” 的），迭代的对象 a ，和迭代开始的下标 0 。然后第一次 for 循环调用 iter(a, 0) （参数如我们上面所说），得到返回值当前下标 i 和 a[i] 的值 v ，将这两个值赋值给 for 循环定义时候的变量 i 和 v 。用 Lua 实现这个逻辑，如下：
```
function iter (a, i)
 i = i + 1
 local v = a[i]
 if v then
  return i, v
 end
end
  
function ipairs (a)
 return iter, a, 0
end
```
那么上面的 for 循环调用的逻辑类似下面这样，首先调用 ipairs 函数得到 iter 函数，然后每次调用 iter 函数。
```
iter_function, stateless, index = ipairs(a)
iter_function(stateless, index)
1  one
iter_function(stateless, index+1)
2  two
iter_function(stateless, index+2)
3  three
```
另外一个要注意的点是，上面的 Lua 代码判断了 v ，如果不为 nil 才继续。而实际的 for 循环中也是这样的。比如我们下面这个循环，因为第二个值是 nil ，所以打印只会出现第一个元素。
```
a = {"one", nil, "three"}
for i, k in ipairs(a) do
 print(i, k)
end
1  one
```
然后我们在来说说 pairs 。其实从上面的描述中也可以发现， ipars 是从 1 开始取值到 nil 截止，那么如果 table 中如果有 nil 但是又想取出所有的元素，就很不方便了。这个时候就可以用 pairs 。
```
function pairs (t)
 return next, t, nil
end
```
for 循环的逻辑在上面已经说了， pairs 在这里的不同是，它返回的三个元素是 next 函数，迭代的对象 a ，开始的状态 nil 。可以看到不同点主要有两个：第一个是函数 next ，它和 iter 的不同是，它返回的是下一个 key value ，并且顺序固定，直到没有任何 key value 对了，迭代结束。

我们可以通过几个例子看它们的区别。
```
a = {"one", "two", "three"}
for i, v in ipairs(a) do
 print(i, v)
end
for i, v in pairs(a) do
 print(i, v)
end
```
打印值如下：
```
1       one
2       two
3       three
1       one
2       two
3       three
```
两个结果一样，因为在这个 table 中 key 都是 1 2 3 ，所以 pair 用 iter 循环（下标从 1 开始到第一个不是 nil 的值），还是 ipairs 用 next 循环（下标从 nil 开始遍历所有的 key value ），效果都是一样的。
```
t = {
 a = "apple",
 b = "baby",
 c = "cool"
}
for i, v in ipairs(t) do
 print(i, v)
end
for k, v in pairs(t) do
 print(k, v)
end
```
结果是 pairs 可以打印出来结果， ipairs 打印的结果为空。因为 t[1] 的值是 nil ，所以 ipairs 循环刚开始就停止了。

再来看最后一组例子（从参考资料1抄来的）：
```
ocal t = {
 a=100,10,20,[5]=30
}
  
for key,value in ipairs(t) do
 print(key,value) 
 --1 10
 --2 20
end
  
for key,value in pairs(t) do
 print(key,value) 
 --1 10
 --2 20
 --a 100
 --5 30
end
```
结果如注释中所示，就不必解释了吧。

了解了它们的区别，用起来就非常简单了。 ipairs 一般用于需要下标、迭代 array 形式的 table； pairs 可以用来迭代字典形式的 table 。

总结

以上就是这篇文章的全部内容了，希望本文的内容对大家的学习或者工作具有一定的参考学习价值，如果有疑问大家可以留言交流，谢谢大家对脚本之家的支持。