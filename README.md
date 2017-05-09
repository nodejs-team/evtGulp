# evtGulp
mcake专题活动代码集

### 第一步
首次拿到项目，请执行`npm install`

### 第二步
创建项目：

- 方法1：修改根目录下的`config.json`，将其中的`projectName`配置项改成你自己的项目名称，然后执行`gulp create`。

-  方法2：直接执行`gulp create --name my-project`

> PS: 系统会自动进行检验项目名在旧项目列表中是否存在，如果存在则会抛出错误信息并终止项目的创建。

### 第三步
执行`gulp default`开启webserver

### 第四步
项目开发完工后执行`gulp build`

PS: 请将所有图片加上`width`和`height`属性，否则动画在低版本IE下会有瑕疵。
