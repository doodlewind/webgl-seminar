# WebGL Seminar
WebGL 学习小组整理的入门资料


## What's This
这个项目提供：

* 以代码清晰、直接、可追溯为目标而编写的一系列 WebGL 示例。
* 与示例配套的讲解文档。

要入门 WebGL，你也许仍然需要一份经典教材，但这里的示例能显著地降低从概念到实现的难度——我们重写了符合现代前端标准的「干净」示例，无需安装依赖，无需构建流程。


## Run Examples
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
