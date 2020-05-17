py2app

[参考](https://py2app.readthedocs.io/en/latest/tutorial.html)

1. 安装
```
pip install py2app
```

2. 创建setup.py
```
py2applet --macke-setup main.py
```

3. 删除旧文件
```
rm -rf build dist
```

4. 打包
```
python setup.py py2app
```