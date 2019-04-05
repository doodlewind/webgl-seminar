# WebGL Seminar
WebGL 学习小组整理的入门资料


## What's This
这个项目提供：

* 以代码清晰、直接、可追溯为目标而编写的一系列 WebGL 示例。
* 与示例配套的讲解文档。

图形学的代码以繁冗而著称——从教程中的概念到实际的实现，往往隔着巨大的工程量鸿沟。虽然 WebGL 已经非常方便，但其相关的示例仍往往有着这个领域里常见的潦草感，会让你有停留在上一个时代的错觉。但在今天，我们已经能够在 Web 前端组织出清晰、简洁、模块化的代码了。因此，我们使用现代的前端工程标准重写了一系列经典的 WebGL 示例，这些示例编写的都是「干净」的代码，甚至无需安装依赖，无需构建流程就能查看。

和这些代码配套的，是相应例子的讲解文档。当然，要入门 WebGL，你也许仍然需要一份经典教材，但我们十分相信，这里的内容能帮助你显著地改善入门这一领域时的心情。示例包括：

* [绘制三角形](./examples/triangle)
* [绘制立方体](./examples/cube)
* [绘制纹理](./examples/texture)
* [实现基础光照](./examples/lighting)
* [实现冯氏光照](./examples/phong)
* [实现图像滤镜](./examples/image-filter)
* 使用帧缓冲区


## Run Examples
示例代码均只需在项目根目录下启动静态服务器即可运行，无需构建与依赖管理：

[Online Demo](https://doodlewind.github.io/webgl-seminar/examples)

``` bash
npm i -g http-server && http-server .
```

在 docs 目录下则包含了每个示例对应的注释资料。

一个非常有意义的事情，是去确认各个示例是如何逐渐从最基本的三角形而演化出来的。这时，你可以使用形如这样的命令：

``` bash
# 从三角形到立方体
git diff --no-index ./examples/triangle ./examples/cube

# 从立方体到纹理
git diff --no-index ./examples/cube ./examples/texture

# 从立方体到基础光照
git diff --no-index ./examples/cube ./examples/lighting

# 从基础光照到冯氏光照
git diff --no-index ./examples/lighting ./examples/phong

# 从纹理绘制到图像滤镜
git diff --no-index ./examples/texture ./examples/image-filter
```

我们对代码的一致性有很高的要求，故而你完全可以将这样的 diff 作为从学习 A 过渡到学习 B 的时候，没有冗余的最短路径。

Enjoy the power of GPU!
