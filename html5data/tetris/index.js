'use strict';
var _width = document.body.clientWidth;
var _height = document.body.clientHeight;
var _pc = true;//是否是在pc端
if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    _pc = false;
};
var mycanvas = document.querySelector("#mycanvas");
var _a = {};
if(!_pc){
	_a.width = _width;
	_a.height = Math.floor(_width*1.512);
}else{
	_a.width = 300;
	_a.height = 458;
	mycanvas.style.top = 0+"px";
	mycanvas.style.bottom = "auto";
};
var rem = _a.width/750;
mycanvas.width = _a.width;
mycanvas.height = _a.height;
_a.set_top = mycanvas.offsetTop;
//绘制功能
var _b = {};
var _d = [];//按钮对象数组
//先确定中间的
//画出静态
var ctx = mycanvas.getContext("2d");//获取上下文关系

//画圆角矩形
//z坐标，y坐标，宽，高，圆角，文字，是不是按下效果
_b.rect_ra = function(x,y,w,h,radius,fillcolor,text,textcolor){
	ctx.clearRect(x,y,w,h);
	ctx.beginPath();
	ctx.fillStyle = fillcolor;
	ctx.arc(x+radius,y+radius,radius,Math.PI,1.5*Math.PI,false);
	ctx.lineTo(w-radius+x,y);
	ctx.arc(x+w-radius,y+radius,radius,1.5*Math.PI,0,false);
	ctx.lineTo(w+x,y+h-radius);
	ctx.arc(x+w-radius,y+h-radius,radius,0,.5*Math.PI,false);
	ctx.lineTo(x+radius,y+h);
	ctx.arc(x+radius,y+h-radius,radius,.5*Math.PI,Math.PI,false);
	ctx.closePath();
	ctx.fill();
	ctx.font = 27*rem+"px Microsoft YaHei 100";
	ctx.strokeStyle = textcolor;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.strokeText(text,x+(w/2),y+(h/2));
};

//绘制下一个图案7中图案1~7和用那个颜色值0只绘制背景
_a.n_x = 578*rem;
_a.n_y = 88*rem;
_a.n_w = 140*rem;
_a.n_h = 111*rem;
_b.next = function(type,color){
	ctx.clearRect(_a.n_x,_a.n_y,_a.n_w,_a.n_h);
	ctx.fillStyle = "#433e3e";
	ctx.fillRect(_a.n_x,_a.n_y,_a.n_w,_a.n_h);
	if(type){return};
};

//绘制得分
_a.df_x = 578*rem;
_a.df_y = 314*rem;
_a.df_w = 170*rem;
_a.df_h = 40*rem;
_a.df_f = 22*rem;
_b.defen = function(num){
	ctx.clearRect(_a.df_x-15*rem,_a.df_y-15*rem,_a.df_w,_a.df_h);
	ctx.font = _a.df_f+"px Microsoft YaHei 100";
	ctx.strokeStyle = "#0b2680";
	ctx.textBaseline = "middle";
	ctx.strokeText(num,_a.df_x,_a.df_y);
};

//绘制消灭行数
_a.hang_x = 578*rem;
_a.hang_y = 482*rem;
_a.hang_w = 170*rem;
_a.hang_h = 40*rem;
_a.hang_f = 22*rem;
_b.hangshu = function(num){
	ctx.clearRect(_a.hang_x-15*rem,_a.hang_y-15*rem,_a.hang_w,_a.hang_h);
	ctx.font = _a.hang_f+"px Microsoft YaHei 100";
	ctx.strokeStyle = "#0b2680";
	ctx.textBaseline = "middle";
	ctx.strokeText(num,_a.hang_x,_a.hang_y);
};

//检测是否触发了点击事件
_b.test_fn = function(x,y,type){
	for(var i=0,len=_d.length;i<len;i++){
		if(x>=_d[i].x && x<=_d[i].x1 && y>=_d[i].y && y<=_d[i].y1){
			console.log(_d[i]);
		};
	};
};

//绘制静态的按钮区域
_b.initialize = function(){
	ctx.font = 26*rem+"px Microsoft YaHei 100";
	ctx.strokeStyle = "#000";
	ctx.textBaseline = "middle";
	ctx.strokeText("电脑可以用",25*rem,840*rem);

	//画小箭头
	ctx.save();
	ctx.translate(172*rem,848*rem);
	ctx.beginPath();
	ctx.fillStyle = "#3a0e0e";
	ctx.moveTo(-3*rem,18*rem);
	ctx.lineTo(3*rem,18*rem);
	ctx.lineTo(3*rem,-15*rem);
	ctx.lineTo(10*rem,-15*rem);
	ctx.lineTo(0,-38*rem);
	ctx.lineTo(-10*rem,-15*rem);
	ctx.lineTo(-3*rem,-15*rem);
	ctx.closePath();
	ctx.fill();
	ctx.restore();

	ctx.strokeText("键变换",190*rem,840*rem);

	//画向左的小箭头
	ctx.save();
	ctx.translate(315*rem,840*rem);
	ctx.rotate(-90*Math.PI/180);
	ctx.beginPath();
	ctx.moveTo(-3*rem,18*rem);
	ctx.lineTo(3*rem,18*rem);
	ctx.lineTo(3*rem,-15*rem);
	ctx.lineTo(10*rem,-15*rem);
	ctx.lineTo(0,-38*rem);
	ctx.lineTo(-10*rem,-15*rem);
	ctx.lineTo(-3*rem,-15*rem);
	ctx.closePath();
	ctx.fill();
	ctx.restore();

	ctx.strokeText("键向左",340*rem,840*rem);

	//画向右的小箭头
	ctx.save();
	ctx.translate(455*rem,840*rem);
	ctx.rotate(90*Math.PI/180);
	ctx.beginPath();
	ctx.moveTo(-3*rem,18*rem);
	ctx.lineTo(3*rem,18*rem);
	ctx.lineTo(3*rem,-15*rem);
	ctx.lineTo(10*rem,-15*rem);
	ctx.lineTo(0,-38*rem);
	ctx.lineTo(-10*rem,-15*rem);
	ctx.lineTo(-3*rem,-15*rem);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	ctx.strokeText("键向右",505*rem,840*rem);

	//画向下的小箭头
	ctx.save();
	ctx.translate(605*rem,835*rem);
	ctx.rotate(180*Math.PI/180);
	ctx.beginPath();
	ctx.moveTo(-3*rem,18*rem);
	ctx.lineTo(3*rem,18*rem);
	ctx.lineTo(3*rem,-15*rem);
	ctx.lineTo(10*rem,-15*rem);
	ctx.lineTo(0,-38*rem);
	ctx.lineTo(-10*rem,-15*rem);
	ctx.lineTo(-3*rem,-15*rem);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	ctx.strokeText("下落",620*rem,840*rem);

	//画圆角矩形
	//把按钮的坐标点保存起来
	//变换按钮
	var jsn = {
		type:1,
		msg:"变换",
		x:209*rem,
		y:879*rem,
		w:125*rem,
		h:56*rem,
		x1:209*rem+125*rem,
		y1:879*rem+56*rem,
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,10*rem,jsn.fillcolor,jsn.msg,"#efb456");

	//向左按钮
	jsn = {
		type:2,
		msg:"向左",
		x:69*rem,
		y:944*rem,
		w:125*rem,
		h:56*rem,
		x1:69*rem+125*rem,
		y1:944*rem+56*rem,
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,10*rem,jsn.fillcolor,jsn.msg,"#efb456");

	//向右按钮
	jsn = {
		type:3,
		msg:"向右",
		x:346*rem,
		y:944*rem,
		w:125*rem,
		h:56*rem,
		x1:346*rem+125*rem,
		y1:944*rem+56*rem,
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,10*rem,jsn.fillcolor,jsn.msg,"#efb456");

	//下落按钮
	jsn = {
		type:4,
		msg:"下落",
		x:209*rem,
		y:1000*rem,
		w:125*rem,
		h:56*rem,
		x1:209*rem+125*rem,
		y1:1000*rem+56*rem,
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,10*rem,jsn.fillcolor,jsn.msg,"#efb456");

	//音乐按钮
	jsn = {
		type:5,
		msg:"音乐开/关",
		x:566*rem,
		y:701*rem,
		w:152*rem,
		h:40*rem,
		x1:566*rem+152*rem,
		y1:701*rem+40*rem,
		fillcolor:"#2e2c2c",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,10*rem,jsn.fillcolor,jsn.msg,"#efb456");

	//文字
	ctx.font = 32*rem+"px Microsoft YaHei 100";
	ctx.strokeStyle = "#15e24f";
	ctx.textAlign = "start";
	ctx.textBaseline = "top";
	ctx.strokeText("下一个",576*rem,28*rem);
	ctx.strokeText("得分",576*rem,259*rem);
	ctx.strokeText("消灭行数",576*rem,426*rem);
	//下一个图案
	_b.next(0);

	//绘制得分
	_b.defen(0);
	_b.defen(100);

	//消灭行数
	_b.hangshu(4);

	//事件的处理和添加
	//判断是移动端或者pc用的事件不同
	if(_pc){
		mycanvas.onmousedown = function(event){
			var _x = event.clientX;
			var _y = event.clientY-_a.set_top;
			_b.test_fn(_x,_y,true);//false代表按下
		};
		mycanvas.onmouseup = function(event){
			var _x = event.clientX;
			var _y = event.clientY-_a.set_top;
			_b.test_fn(_x,_y,false);//false代表按下
		};
	}else{
		mycanvas.ontouchstart = function(event){
			var _x = event.changedTouches[0].clientX;
			var _y = event.changedTouches[0].clientY-_a.set_top;
			_b.test_fn(_x,_y,true);//false代表按下
		};
		mycanvas.ontouchend = function(event){
			var _x = event.changedTouches[0].clientX;
			var _y = event.changedTouches[0].clientY-_a.set_top;
			_b.test_fn(_x,_y,false);//false代表按下
		};
	};

	if(_pc){
		//键盘事件
		document.onkeydown = function(event){
			if(event.keyCode === 38){
				//变形
			}else if(event.keyCode === 37){
				//向左
			}else if(event.keyCode === 39){
				//向右
			}else if(event.keyCode === 40){
				//下落
			}
		};
		document.onkeyup = function(event){
			if(event.keyCode === 38){
				//变形
			}else if(event.keyCode === 37){
				//向左
			}else if(event.keyCode === 39){
				//向右
			}else if(event.keyCode === 40){
				//下落
			}
		};
	};
};

_b.initialize();
