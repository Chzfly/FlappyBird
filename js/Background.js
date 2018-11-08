(function (){
    var Background = window.Background = function (){
        this.image = game.R.bg_day;
        this.y = 0.75 * game.canvas.height - 396;
        this.w = 288;
        this.h = 512;
        this.x = 0;
        this.speed = 1;
    }
    Background.prototype.update = function (){
        this.x -= this.speed
        if(this.x < -this.w){
            this.x = 0;
        }
    }
    Background.prototype.render = function (){
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
        //天空补充
        game.ctx.fillStyle = '#4EC0CA';
        game.ctx.fillRect(0, 0, game.canvas.width, this.y + 10);
        //草地补充
        game.ctx.fillStyle = '#5EE270';
        game.ctx.fillRect(0, this.y + this.h - 5, game.canvas.width, game.canvas.height - this.h - this.y + 5);
    }
})()