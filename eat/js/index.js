var member = {
    visibleH: "",
    visibleW: "",
    foodlist: {},
    stage: "",
    stageW: 0,
    stageH: 0,
    ptx: "",
    player: "",
    bpx: 0,
    bpy: 0
};

window.onload = function() {
    member.stage = document.getElementById("stage");
    member.stageH = member.stage.height;
    member.stageW = member.stage.width;
    member.visibleH = document.documentElement.clientHeight;
    member.visibleW = document.documentElement.clientWidth;
    member.stage.height = window.innerHeight;
    member.stage.width = window.innerWidth;
    member.bpx = parseInt(member.stage.style.backgroundPositionX);
    member.bpy = parseInt(member.stage.style.backgroundPositionY);
    member.ptx = member.stage.getContext("2d");
    member.player = new hero();
    member.foodlist[Math.random()] = new food();
    setInterval(function() {
        member.player.move();
    }, 1000 / 60);

}

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function hero() {
    this.x = Math.random() * 1000;
    this.y = Math.random() * 1000;
    this.h = 70;
    this.w = 70;
    this.targetx = 0;
    this.targety = 0;
    this.speed = 5;
    this.raduis = 0;
    this.init();
    this.reflush();
}

hero.prototype.init = function() {
    var _this = this;
    this.img = new Image();
    this.img.src = "image/smile.png";
    this.img.onload = function() {
        member.ptx.drawImage(_this.img, member.visibleW / 2 - _this.w, member.visibleH / 2 - _this.h, _this.h, _this.w);
    };
    member.stage.onmousemove = function(e) {
        _this.reflush(e.offsetX, e.offsetY);
    }
    this.raduis = this.w / 2
};

hero.prototype.reflush = function(x, y) {
    this.targetx = x - member.visibleW / 2 - this.w;
    this.targety = y - member.visibleH / 2 - this.h;
    //console.log(this.targetx + "," + this.targety);
}

hero.prototype.move = function() {
    var deg = Math.atan2(this.targety, this.targetx);
    var distandx = this.speed * Math.cos(deg);
    var distandy = this.speed * Math.sin(deg);
    member.bpx -= distandx;
    member.bpy -= distandy;
    this.x += distandx;
    this.y += distandy;
    member.stage.style.backgroundPosition = member.bpx + "px " + member.bpy + "px";
    for (key in member.foodlist) {
        var item = member.foodlist[key];
        item.accpt(distandx, distandy);
    }
};

function food() {
    this.x = 1;
    this.y = 1;
    this.w = 10;
    this.color = this.colorHex();
    this.init();
}

food.prototype.init = function() {
    member.ptx.fillStyle = this.color;
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

food.prototype.accpt = function(x, y) {
    this.clearR();
    this.x -= x;
    this.y -= y;
    member.ptx.fillStyle = this.color;
    member.ptx.arc(this.x, this.y, this.w / 2, 0, Math.PI * 2);
    member.ptx.fill();
};

food.prototype.clearR = function() {
    member.ptx.clearRect(this.x - 10, this.y - 10, this.w, this.w);

};