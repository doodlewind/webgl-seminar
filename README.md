# WebGL Seminar
WebGL 学习小组整理的入门资料

## 运行示例
示例代码均只需在项目根目录下启动静态服务器即可运行，无需构建与依赖管理：

[Online Demo](https://doodlewind.github.io/webgl-seminar/examples)

``` bash
python -m SimpleHTTPServer 10000
```

在 docs 目录下包含每个示例对应的注释资料。要想确认示例是如何演化的，可以使用形如这样的命令：

``` bash
git diff --no-index ./examples/triangle ./examples/cube
git diff --no-index ./examples/cube ./examples/diffuse
```
