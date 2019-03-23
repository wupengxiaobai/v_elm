# project_elmm

## 环境设置
- 创建项目 `vue create 项目名称`
    + 进入项目 执行 `npm run serve` 启动项目
- 安装 Cube-ui 一款适用于 vue 的移动ui框架
    + `vue add cube-ui` 初始化项目后执行即可
    + 配置: 
        + post-compile 后编译  y
        + import type  引用方式, 选择 partly 局部方式引用
        + custom theme 风格(我们有的不一样) y
        + 布局方式, rem,vw? n

- vue.config.js
    +   mock 数据的布置 -> 配置devServer 
    +   相对路径配置 -> 配置 chainWebpack

- eslint 配置

## 准备工作
### 公共部分准备(src/common)
- 样式共用 stylus
    + variable(共用变量) 准备
    + mixin(混入) 准备
    + icon(字体图标) 准备
    + base(共用样式) 准备

- 方法共用 js
    + tools 工具方法库
    + 其它

## 公共组件抽取(components/common/)
- 商标图片组件(support-ico) 
    根据传入 size 和 type 值来确定个元素添加 “不同” 类名以指向的需要的背景图片
- 头部组件(header) 




# 项目学习进度
- 2019/3/23
    + 项目搭建
    + 公共资源部分引入
    + header组件开发 1/2

    
