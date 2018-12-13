(function (){
    var Game = window.Game = function (params){
        //得到画布
        this.canvas = document.querySelector(params.canvasid);
        //获取audio节点
        this.bgm = document.querySelector('.bgm');
        this.jiuguan = document.querySelector('.jiuguan');
        this.dianji = document.querySelector('.dianji');
        this.death = document.querySelector('.death');
        this.defen = document.querySelector('.defen');




        //上下文
        this.ctx = this.canvas.getContext('2d');
        //设置画布的宽度和高度
        this.init();
        //分数
        this.score = 0;
        //历史记录分数
        this.localscore = 0;
        this.fno = 0;
        //资源地址
        this.Rjsonurl = params.Rjsonurl;
        //读取资源
        var self = this;
        this.loadAllResource(function (){
            self.start();
        });
        // console.log(this.R);
    }
    //初始化，设置画布宽高
    Game.prototype.init = function (){
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;
        if(windowW > 414){
            windowW = 414
        }else if(windowW < 320){
            windowW = 320
        }
        if(windowH > 812){
            windowH = 812
        }else if(windowH < 500){
            windowH = 500
        }
        //匹配视口
        this.canvas.width = windowW;
        this.canvas.height = windowH;
    }
    //读取资源
    Game.prototype.loadAllResource = function (callBack){
        this.R = {};
        var self = this;
        var alreadyDoneNumber = 0;
        var xhr =new XMLHttpRequest();
        xhr.onreadystatechange = function (){
            if(xhr.readyState == 4){
                var Robj = JSON.parse(xhr.responseText);
                for(var i = 0; i < Robj.images.length; i ++){
                    self.R[Robj.images[i].name] = new Image();
                    self.R[Robj.images[i].name].src = Robj.images[i].url;
                    self.R[Robj.images[i].name].onload = function (){
                        alreadyDoneNumber ++;
                        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                        var txt = '正在加载' + alreadyDoneNumber + '/' + Robj.images.length + '请稍等';
                        self.ctx.textAlign = 'center';
                        self.ctx.font = "20px 微软雅黑";
                        self.ctx.fillText(txt, self.canvas.width / 2, self.canvas.height * (1 - 0.618));
                        if(alreadyDoneNumber == Robj.images.length){
                            callBack.call(self);
                        }
                    }
                }
            }
        }
        xhr.open("get", this.Rjsonurl, true);
        xhr.send();
    }
    //开始游戏
    Game.prototype.start = function (){
        //实例场景管理器，所有场景都在场景管理器当中
        this.sm = new SceneManager();
        //浏览器禁止用户无交互的自动播放
        // setTimeout(function (){
        //     game.jiuguan.play();
        // },16)
        var self = this;
        //主定时器
        this.timer = setInterval(function (){
            //清屏
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.fno ++;
            //场景管理器的渲染和更新
            self.sm.update();
            self.sm.render();
            //打印帧编号
            self.ctx.font = "16px consolas";
            self.ctx.textAlign = "left";
            self.ctx.fillText("FNO:" + self.fno, 10, 20);
            // self.ctx.fillText('场景编号：' + self.sm.sceneNumber, 10, 50);
        },16)
    }

})()