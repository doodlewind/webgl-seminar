# Get Started

## 这么多代码是想干嘛？
就像在浏览器中从输入 URL 到展示页面那样，在 WebGL 中，从顶点数据到屏幕像素也有一段经典的流程：

``` text
顶点数据
→ 顶点着色器
→ 图元组装
→ 光栅化
→ 片元着色器
→ 深度测试与混合模式
→ 屏幕像素
```

这一流程是高度可配置的，其定制主要通过如下两种方式实现：
* 提供顶点和片元着色器给 GPU 执行。
* 在其它的每个步骤，手动维护 GL 状态机。

## 最简单的渲染流程中，有哪些必备的概念？
* Shader - 在 GPU 上并行执行的程序
* Buffer - 手动分配的缓冲区
* Vertex - 顶点
* Fragment - 片元，基本相当于最终输出的像素
* Attribute - 顶点属性，即顶点着色器的输入

请确保理解下面这段话：

要想渲染一个三角形，你需要先编译好 Shader，然后为三角形的 Vertex 数据建立一个 Buffer，让 Vertex Shader 以 Attribute 数组的形式读取这个 Buffer 作为输入并逐个执行。而后，在 Fragment Shader 中，即可逐个为三角形内的 Fragment 上色，从而得到最终输出的图像。

对这些概念的 Q&A
* 顶点着色器是逐顶点属性执行的，即对每个 Attribute 执行一次
* 分配 Buffer 后会由 WebGL 分配相应的内存与显存区域，在此我们不用过多关注

扩展阅读：区分两个概念，VBO (Vertex Buffer Object) 与 VAO (Vertex Array Object)：
* 早先版本的 OpenGL 在每帧绘制时，存在批量传递顶点数据的性能瓶颈
* WebGL 1 支持了 VBO，它支持通过 `gl.bufferData`，在初始化阶段就开辟显存中的 Buffer 来批量缓存顶点。这样在绘制阶段，只需简单配置 `gl.vertexAttribPointer` 即可绘制缓存中的顶点数据
* WebGL 2 中支持了 VAO，可以通过 `gl.bindVertexArray` 的形式来切换 VAO 对象，由 VAO 中存储的状态来决定绘制参数，从而减少对 `gl.vertexAttribArray` 与 `gl.enableVertexAttribArray` 的调用，实现对不同顶点内容更便捷的绘制
* 由于主流的 WebGL 1 中还没有 VAO，需注意在阅读现代 OpenGL 教程时的一些 API 区别

## 这套 API 用起来为什么感觉很古怪？
这是老派 C 风格面向对象编程的手法。其中的对象只是个 struct，它上面是没有直接挂载方法的。因此要想操作一个对象，请谨记常见的素质四连：
* 我是 - `const myBuffer = gl.createBuffer()` - 生成一个到对象的引用
* 我有 - `gl.bindBuffer(gl.ARRAY_BUFFER, myBuffer)` - 把引用挂到状态机的特定位置上
* 我瞎说 - `gl.bufferData(gl.ARRARY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)` - 修改该位置上的对象
* 告辞 - `gl.bindBuffer(gl.ARRAY_BUFFER, null)` - 清理掉状态机里的引用，但不太必须

## 开发 WebGL 相较于一般的前端编码实践，有什么异同？

以 JS 开发者视角来看：
* WebGL 的 gl 对象类似一个有很多内部状态的 class 实例
* WebGL 全部 API 都是同步的
* WebGL 在 CPU 部分才使用 JS，GPU 部分使用 GLSL
* WebGL 中常见类似于 JS Bridge 的数据传递操作

以 Canvas 开发者视角来看：
* WebGL 采用相似的有状态 context 机制
* WebGL 的坐标系统完全与像素尺寸无关
* WebGL 中不能双重 for 循环遍历像素 - 使用片元着色器！
* WebGL 的 JS 部分很少调用绘制指令，主要是配置状态与传递数据
