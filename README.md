# FlappyBird
Html5、面向对象、中介者模式、场景管理器、Ajax、localStorage、canvas应用

## flappybird小游戏

------


> * 游戏首页
> * 游戏教程
> * 游戏界面
> * 结束计分界面

### 项目总结
> * Game类统领全局，负责实例化场景管理器和开启游戏主定时器
> * SceneManager类管理游戏的5个场景，根据场景编号进行场景的更新和渲染
> * 碰撞检测：使用AABB盒进行碰撞检测
> * 使用Ajax请求游戏资源；将游戏得分记录在本地存储里面



### 项目展示

#### 游戏结束界面

<img src="https://github.com/Chzfly/FlappyBird/blob/master/captures/gameover.jpg" width="300"/>