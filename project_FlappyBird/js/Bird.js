(function (){
    var Bird = window.Bird = function (){
        //随机小鸟颜色
        this.color = parseInt(Math.random() * 3);
        this.imageArr = [
            game.R['bird' + this.color + '_0'],
            game.R['bird' + this.color + '_1'],
            game.R['bird' + this.color + '_2']
        ];
        this.boomStep = 0;
        //翅膀
        this.wingStep = 0;
        //小鸟位置
        this.x = game.canvas.width * (1 - 0.618) - 24;
        this.y = 100;
        this.d = 0;
        this.fno = 0;
        this.hasEnergy = false;
    }
    Bird.prototype.update = function (){


        this.wing();
        //掉落
        if(!this.hasEnergy){
            this.y += this.fno * 0.1;
        }else{
            this.y -= (30 - this.fno) * 0.1;
            if(this.fno > 30){
                // console.log(game.bird.fno);
                this.hasEnergy = false;
                this.fno = 0;
            }
        }
        //鸟头向下
        this.d += 0.04;
        if(this.d > 0.5){
            this.d = 0.5;
        }
        this.fno ++;
        //天花板
        if(this.y < 0){
            this.y = 0;
        }
        //计算鸟的四个碰撞检测值
        this.T = this.y + 13;
        this.B = this.y + 36;
        this.R = this.x + 40;
        this.L = this.x + 6;
        //落地验证
        if(this.B > game.canvas.height * 0.78){
            game.sm.enter(4);
        }
    }
    Bird.prototype.render = function (){
        game.ctx.save();
        game.ctx.translate(this.x + 24, this.y + 24);
        game.ctx.rotate(this.d);
        game.ctx.drawImage(this.imageArr[this.wingStep], -24, -24);
        game.ctx.restore();
    }
    Bird.prototype.fly = function (){
        this.hasEnergy = true;
        this.d = -0.4;
        this.fno = 0;
    }
    Bird.prototype.wing = function (){
        game.fno % 5 == 0 && this.wingStep ++;
        if(this.wingStep > 2){
            this.wingStep = 0;
        }
    }
    Bird.prototype.boomUpdate = function (){
        
        if(this.fno % 10 == 0){this.boomStep = this.boomStep > 3 ? 0 : this.boomStep + 1} 
        if(this.boomStep == 4){game.sm.enter(5)};
        
    }
    Bird.prototype.boomRender = function (){
        game.ctx.save();
        game.ctx.translate(this.x + 24, this.y + 24);
        game.ctx.rotate(this.d);
        game.ctx.drawImage(game.R['boom' + this.boomStep], -50, -123);
        game.ctx.restore();
    }
})()