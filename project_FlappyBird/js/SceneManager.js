(function (){
    var SceneManager = window.SceneManager = function (){
        //添加场景编号 1：开始界面 2： 教程界面 3：游戏界面 4： 死亡界面 5：  计分界面
        this.sceneNumber = 1;
        this.bg = new Background();
        this.land = new Land();
        this.bird = new Bird();
        this.logoY = -48;
        this.button_playY = game.canvas.height;
        this.button_playX = game.canvas.width / 2 - 58;
        this.pipeArr = [];
        this.tutorialOpacity = 0.9;
        this.tutorialFlag = true;
        this.text_readyX = game.canvas.width / 2 - 98;
        this.text_readyY = 100;
        this.okButtonOpacity = 0.9;
        this.okButtonFlag = true;
        //分数牌的位置
        this.score_panelY = -126;
        //奖牌等级——金牌1，银牌0
        this.medal = 1;

        this.bindEvent();
    }
    SceneManager.prototype.update = function (){
        switch(this.sceneNumber){
            case 1:
                this.logoY ++;
                this.logoY = this.logoY > 120 ? 120 : this.logoY;
                this.button_playY -= 2;
                this.button_playY = this.button_playY < 300 ? 300 : this.button_playY;
                break;
            case 2:
                this.bird.wing();
                //教程图片渐变
                this.tutorialFlag = (this.tutorialOpacity > 0.9) || (this.tutorialOpacity < 0.1) ? !this.tutorialFlag : this.tutorialFlag;
                this.tutorialOpacity = this.tutorialFlag ? this.tutorialOpacity + 0.01 : this.tutorialOpacity - 0.01;
                this.text_readyY = this.text_readyY > 100 ? 100 : this.text_readyY + 1;
                break;
            case 3:
                this.bird.update();
                this.land.update();
                this.bg.update();
                game.fno % 150 == 0 && (new Pipe());
                for(var i = 0; i < this.pipeArr.length; i ++){
                    this.pipeArr[i] && this.pipeArr[i].update();
                }
                break;
            case 4:
                //小鸟死亡掉落动画
                if(this.bird.y < game.canvas.height * 0.78 - 30){
                    this.bird.fno ++;
                    this.bird.y += this.bird.fno * 2;
                }else{
                    this.bird.y = game.canvas.height * 0.78 - 30;
                    this.bird.fno ++;
                    this.bird.boomUpdate();
                }
                break;
            case 5:
                this.score_panelY = this.score_panelY >= 200 ? 200 : this.score_panelY + 3;
                //okButton渐变
                this.okButtonFlag = (this.okButtonOpacity > 0.9) || (this.okButtonOpacity < 0.1) ? !this.okButtonFlag : this.okButtonFlag;
                this.okButtonOpacity = this.okButtonFlag ? this.okButtonOpacity + 0.01 : this.okButtonOpacity - 0.01;
                
                
                break;

        }
    }
    SceneManager.prototype.render = function (){
        switch(this.sceneNumber){
            case 1:
                this.bg.render();
                this.land.render();
                this.bird.render();
                this.bird.x = game.canvas.width / 2 - 24;
                this.bird.y = 220;
                game.ctx.drawImage(game.R['logo'],game.canvas.width / 2 - 89, this.logoY);
                game.ctx.drawImage(game.R['button_play'], this.button_playX, this.button_playY);
                break;
            case 2:
                this.bg.render();
                this.land.render();
                this.bird.render();
                //教程图片渐变
                game.ctx.save();
                game.ctx.globalAlpha = this.tutorialOpacity;
                game.ctx.drawImage(game.R['tutorial'], game.canvas.width / 2 - 57, 220);
                game.ctx.drawImage(game.R['text_ready'], this.text_readyX, this.text_readyY);
                game.ctx.restore();
                break;
            case 3:
                this.bg.render();
                this.land.render();
                this.bird.render();
                for(var i = 0; i < this.pipeArr.length; i ++){
                    this.pipeArr[i] && this.pipeArr[i].render();
                }
                //渲染分数
                var scoreLength = game.score.toString().length;
                for(var i = 0; i < scoreLength; i ++){
                    game.ctx.drawImage(game.R['shuzi' + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i + 5, 100);
                }
                break;
            case 4:
                this.bg.render();
                this.land.render();
                for(var i = 0; i < this.pipeArr.length; i ++){
                    this.pipeArr[i] && this.pipeArr[i].render();
                }
                //得分
                var scoreLength = game.score.toString().length;
                for(var i = 0; i < scoreLength; i ++){
                    game.ctx.drawImage(game.R['shuzi' + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i + 5, 100);
                }
                if(!(this.bird.y < game.canvas.height * 0.78 - 30)){
                    this.bird.boomRender();
                }else{
                    this.bird.render();
                }
                break;
            case 5:
                this.bg.render();
                this.land.render();
                for(var i = 0; i < this.pipeArr.length; i ++){
                    this.pipeArr[i] && this.pipeArr[i].render();
                }
                //渲染结束图片
                game.ctx.drawImage(game.R['text_game_over'],game.canvas.width / 2 - 102, 100);
                //分数牌图片渲染
                game.ctx.drawImage(game.R['score_panel'],game.canvas.width / 2 - 119, this.score_panelY);
                //奖牌图片渲染
                game.ctx.drawImage(game.R['medals_' + this.medal],game.canvas.width / 2 - 119 + 32, this.score_panelY + 46);
                //渲染奖牌上分数
                var scoreLength = game.score.toString().length;
                for(var i = 0; i < scoreLength; i ++){
                    game.ctx.drawImage(game.R['number_context_0' + game.score.toString().charAt(i)],game.canvas.width / 2 - 119 + 188 - scoreLength / 2 * 14 + 12 * i, this.score_panelY + 37);
                }
                //渲染奖牌上的历史分数
                var localscoreLength = game.localscore.toString().length;
                for(var i = 0; i < localscoreLength; i ++){
                    game.ctx.drawImage(game.R['number_context_0' + game.localscore.toString().charAt(i)],game.canvas.width / 2 - 119 + 188 - localscoreLength / 2 * 14 + 12 * i, this.score_panelY + 75);
                }
                //okButton渐变
                game.ctx.save();
                game.ctx.globalAlpha = this.okButtonOpacity;
                game.ctx.drawImage(game.R['button_ok'], game.canvas.width / 2 - 40, 420);
                game.ctx.restore();
        }
    }
    SceneManager.prototype.enter = function (number){
        this.sceneNumber = number;
        switch(this.sceneNumber){
            case 1:
                game.jiuguan.play();//不加这个第一遍的死亡音效播放不了？？？
                this.bird = new Bird();
                this.pipeArr = [];
                game.fno = 0;
                game.score = 0;
                this.logoY = -48;
                this.button_playY = game.canvas.height;
                // game.bird.d = 0;
                break;
            case 2:
                game.jiuguan.pause();
                this.bird.y = 150;
                this.bird.x = game.canvas.width / 2 - 24;
                this.text_readyY = -50;
                break;
            case 3:
                // game.bgm.play();
                break;
            case 4:
                // game.bgm.pause();
                this.bird.fno = 0;
                break;
            case 5:
                //如果有历史分数则获取历史分数
                if(localStorage.getItem('localScore')){
                    game.localscore = localStorage.getItem('localScore');
                }
                //如果没有历史分数记录或者当前得分大于历史记录分数则将当前分数写入记录，并且将奖牌置为金牌；否则奖牌是银牌且不更新历史分数记录
                if(game.score >= game.localscore || !localStorage.getItem('localScore')){
                    localStorage.setItem('localScore', String(game.score));
                    this.medal = 1;
                }else{
                    this.medal = 0;
                } 
                break;
        }
    }
    SceneManager.prototype.bindEvent = function (){
        var self = this;
        game.canvas.onclick = function (e){
            var e = e || window.event;
            var mousex = e.clientX;
            var mousey = e.clientY;
            bindler(mousex, mousey);
        }
        game.canvas.addEventListener('touchstart', function (e){
            var e = e || window.event;
            if(e.preventDefault){e.preventDefault()}
            var mousex = e.touches[0].clientX;
            var mousey = e.touches[0].clientY;
            bindler(mousex, mousey);
        });
        //点击事件
        function bindler(mousex, mousey){
            switch (self.sceneNumber){
                case 1:
                    if(mousex > self.button_playX && mousex < self.button_playX + 116 && mousey > self.button_playY && mousey < self.button_playY + 70){
                        self.enter(2);
                    }
                    break;
                case 2:
                    self.enter(3);
                    game.dianji.play();
                    break;
                case 3:
                    self.bird.fly();
                    game.dianji.play();
                break;
                case 5:
                    if(mousex > game.canvas.width / 2 - 40 && mousex < game.canvas.width / 2 && mousey > 420 && mousey < 448){
                        self.enter(1);
                    }
                    break;
            }
        }
    }
})()