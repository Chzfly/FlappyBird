(function (){
    var Pipe = window.Pipe = function (){
        this.imageup = game.R['pipe_up'];
        this.imagedown = game.R.pipe_down;
        this.allheight = game.canvas.height * 0.78;
        this.interspace = 120;
        this.picheight = 320;
        this.height1 = 100 + parseInt(Math.random() * (this.picheight - 100));
        this.height2 = this.allheight - this.interspace - this.height1;
        this.x = game.canvas.width; 
        this.alreadyPass = false;
        game.sm.pipeArr.push(this);
    }
    Pipe.prototype.update = function (){
        this.x -= 2;

        //检测碰撞
        if(game.sm.bird.R > this.x && game.sm.bird.L < this.x + 52){
            if(game.sm.bird.T < this.height1 || game.sm.bird.B > this.height1 + this.interspace){
                game.sm.enter(4);
                game.death.play();
            }
        }
        //通过管子
        if(game.sm.bird.L > this.x + 52 && !this.alreadyPass){
            //顺利通过
            game.score ++;
            game.defen.play();
            //标记为已经通过
            this.alreadyPass = true;
        }
        //检测管子是否已经出视口
        if(this.x < -52){
            for(var i = 0; i < game.sm.pipeArr.length; i ++){
                if(game.sm.pipeArr[i] == this){
                    game.sm.pipeArr.splice(i, 1);
                }
            }
        }
    }
    Pipe.prototype.render = function (){
        game.ctx.drawImage(this.imagedown, 0, this.picheight - this.height1, 52, this.height1, this.x, 0, 52, this.height1);
        game.ctx.drawImage(this.imageup, 0, 0, 52, this.height2, this.x, this.height1 + this.interspace, 52, this.height2);
    }    
})()