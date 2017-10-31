var member = {
    foodlist: {},
    stage: "",
    stageW: 0,
    stageH: 0,
    ptx: "",
    player: ""
};

window.onload = function() {
    member.stage = document.getElementById("stage");
    member.stageH = member.stage.height;
    member.stageW = member.stage.width;
    member.ptx = member.stage.getContext("2d");
    member.player = new hero();
    window.requestAnimationFrame(animate);
    var tt = new food();
}

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


function animate(time) {
    member.player.move();
    window.requestAnimationFrame(animate);
}


function hero() {
    this.x = 1;
    this.y = 1;
    this.h = 70;
    this.w = 70;
    this.targetx = 0;
    this.targety = 0;
    this.speed = 5;
    this.raduis = 0;
    this.init();
    this.reFlushTarget();
}

hero.prototype.init = function() {
    var _this = this;
    this.img = new Image();
    this.img.src = "image/smile.png";
    this.img.onload = function() {
        member.ptx.drawImage(_this.img, _this.x, _this.y, _this.h, _this.w);
    };
    member.stage.onmousemove = function(e) {
        _this.reFlushTarget(e.offsetX, e.offsetY);
    }
    this.raduis = this.w / 2
};

hero.prototype.reclear = function() {
    member.ptx.globalCompositeOperation = "destination-out";
    member.ptx.arc(this.x + this.raduis, this.y + this.raduis, this.w / 2, 0, Math.PI * 2);
    member.ptx.strokeStyle = 'rgba(250,250,250,0)';
    member.ptx.fill();
    member.ptx.globalCompositeOperation = "source-over";
};

hero.prototype.reFlushTarget = function(x, y) {
    this.targetx = x - this.x;
    this.targety = y - this.y;
};

hero.prototype.move = function() {
    this.reclear();
    var deg = Math.atan2(this.targety, this.targetx);
    var distandx = this.speed * Math.cos(deg);
    var distandy = this.speed * Math.sin(deg);
    member.ptx.drawImage(this.img, this.x += distandx, this.y += distandy, this.h, this.w);
};

function food() {
    this.x = 500;
    this.y = 500;
    this.w = 10;
    this.init();
}

food.prototype.init = function() {
    member.ptx.globalCompositeOperation = "source-over";
    member.ptx.fillStyle = this.colorHex();
    member.ptx.arc(this.x, this.y, this.w / 2, 0, Math.PI * 2);
    member.ptx.fill();

};

food.prototype.colorHex = function() {
    var color = "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")";
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);

    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
};