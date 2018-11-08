(function (){
    var Land = window.Land = function (){
        this.image = game.R.land;
        this.y = game.canvas.height * 0.78;
        this.x = 0;
        //大地图片尺寸
        this.w = 336;
        this.h = 112;
    }
    Land.prototype.update = function (){
        this.x -= 2.5;
        if(this.x < -this.w){
            this.x = 0;
        }
    }
    Land.prototype.render = function (){
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);

        game.ctx.fillStyle = '#DED895';
        game.ctx.fillRect(0, this.y + this.h - 5, game.canvas.width, game.canvas.height - this.y - this.h + 5);
    }
})()