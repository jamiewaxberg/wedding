var cnv = document.getElementById('cnv');
var context = cnv.getContext('2d');
cnv.width  = window.innerWidth;
cnv.height = window.innerHeight;

var confettis = [];
var nconfettis = 75;
var confettispeed = 1.7;
function atom(x,y,rx,ry){
	function randomRange(min, max) {
		return min + Math.random() * (max - min);
	}
	function convertToRadians(degree) {
		return degree * (Math.PI / 180);
	}
	var colors = [
		'#007f8f', '#84DCC6', '#c1f2e6', '#d7fcec',
		'#ffebe8', '#ffd8d8', '#ffdde0', '#ffe8e8', '#FFE099'
	];
	this.x = window.innerWidth/2;
	this.y = window.innerHeight/2.3;
	this.sx = 0;
	this.sy = 0;
	this.rx = rx;
	this.ry = ry;
	this.boxW = randomRange(5, 20);
	this.boxH = randomRange(5, 20);
	this.size = randomRange(2, 8);
	this.spikeran = randomRange(3, 5);
	this.velX = randomRange(-8, 8);
	this.velY = randomRange(-50, -10);
	this.angle = convertToRadians(randomRange(0, 360));
	this.color = colors[Math.floor(Math.random() * colors.length)];
	this.anglespin = randomRange(-0.2, 0.2);
	this.draw = function(context){
		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.angle);
		context.fillStyle = this.color;
		context.beginPath();
		context.fillRect(this.boxW / 2 * -1, this.boxH / 2 * -1, this.boxW, this.boxH);
		context.fill();
		context.closePath();
		context.restore();
		this.angle += this.anglespin;
		this.x += this.velX;
		this.y += this.velY;
		if (this.y < 0) {
			this.velY *= -0.2;
			this.velX *= 0.1;
		}
	}
}

function update(){
  for (var i = 0; i < nconfettis; i++) {
		confettis[i].x+=confettis[i].sx;
		confettis[i].y+=confettis[i].sy;
		if(confettis[i].x > cnv.width) 
			confettis[i].x = 0;
		else if(confettis[i].x < 0) 
			confettis[i].x = cnv.width;
		if(confettis[i].y > cnv.height) 
			confettis[i].y = 0;
  };
}

function render(){
	var oldArray = context.getImageData(0,0,cnv.width,cnv.height);
	for(var d=3;d<oldArray.data.length;d+=4){
	    oldArray.data[d] = Math.floor(oldArray.data[d]*0.000001);
	}
	context.putImageData(oldArray,0,0);
  for (var i = 0; i < nconfettis; i++) {
  	confettis[i].draw(context);
  };
}

function loop(){
	update();
	render();
	requestAnimationFrame(loop, cnv);
};

function initialize(){
	for (var i = 0; i < nconfettis; i++) {
		var t = new atom(Math.random()*cnv.width,Math.random()*cnv.height,1+Math.random()*5,1+Math.random()*5);
		t.sx = Math.random()*confettispeed*2-confettispeed;
		t.sy = Math.random()*confettispeed+confettispeed;
		confettis[i]=t;
	};
}

function main(){
	initialize();
	loop();
}

main();