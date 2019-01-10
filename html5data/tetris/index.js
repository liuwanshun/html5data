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
	ctx.font = Math.floor(27*rem)+"px Microsoft YaHei 100";
	ctx.strokeStyle = textcolor;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.strokeText(text,x+(w/2),y+(h/2));
};

//绘制得分
_a.df_x = Math.floor(578*rem);
_a.df_y = Math.floor(344*rem);
_a.df_w = Math.floor(170*rem);
_a.df_h = Math.floor(40*rem);
_a.df_f = Math.floor(40*rem);
_a.df_num1 = 0;
_a.df_hang = 0;
_b.defen = function(num){
	ctx.clearRect(_a.df_x-Math.floor(15*rem),_a.df_y-Math.floor(15*rem),_a.df_w,_a.df_h);
	ctx.font = _a.df_f+"px Microsoft YaHei";
	ctx.strokeStyle = "#0b2680";
	ctx.textBaseline = "middle";
	ctx.strokeText(num,_a.df_x,_a.df_y);
};

//绘制消灭行数
_a.hang_x = Math.floor(578*rem);
_a.hang_y = Math.floor(522*rem);
_a.hang_w = Math.floor(170*rem);
_a.hang_h = Math.floor(40*rem);
_a.hang_f = Math.floor(22*rem);
_b.hangshu = function(num){
	ctx.clearRect(_a.hang_x-Math.floor(15*rem),_a.hang_y-Math.floor(15*rem),_a.hang_w,_a.hang_h);
	ctx.font = _a.hang_f+"px Microsoft YaHei 100";
	ctx.strokeStyle = "#0b2680";
	ctx.textBaseline = "middle";
	ctx.strokeText(num,_a.hang_x,_a.hang_y);
};

//检测是否触发了点击事件
_b.test_fn = function(x,y,type){
	for(var i=0,len=_d.length;i<len;i++){
		if(x>=_d[i].x && x<=_d[i].x1 && y>=_d[i].y && y<=_d[i].y1){
			_b.btnclick(_d[i],type);
		};
	};
};

//绘制静态的按钮区域
_b.initialize = function(){
	ctx.font = Math.floor(26*rem)+"px Microsoft YaHei 100";
	ctx.strokeStyle = "#000";
	ctx.textBaseline = "middle";
	ctx.strokeText("电脑可以用",Math.floor(25*rem),Math.floor(840*rem));

	//画小箭头
	ctx.save();
	ctx.translate(Math.floor(172*rem),Math.floor(848*rem));
	ctx.beginPath();
	ctx.fillStyle = "#3a0e0e";
	ctx.moveTo(Math.floor(-3*rem),Math.floor(18*rem));
	ctx.lineTo(Math.floor(3*rem),Math.floor(18*rem));
	ctx.lineTo(Math.floor(3*rem),Math.floor(-15*rem));
	ctx.lineTo(Math.floor(10*rem),Math.floor(-15*rem));
	ctx.lineTo(0,Math.floor(-38*rem));
	ctx.lineTo(Math.floor(-10*rem),Math.floor(-15*rem));
	ctx.lineTo(Math.floor(-3*rem),Math.floor(-15*rem));
	ctx.closePath();
	ctx.fill();
	ctx.restore();

	ctx.strokeText("键变换",Math.floor(190*rem),Math.floor(840*rem));

	//画向左的小箭头
	ctx.save();
	ctx.translate(Math.floor(315*rem),Math.floor(840*rem));
	ctx.rotate(-90*Math.PI/180);
	ctx.beginPath();
	ctx.moveTo(Math.floor(-3*rem),Math.floor(18*rem));
	ctx.lineTo(Math.floor(3*rem),Math.floor(18*rem));
	ctx.lineTo(Math.floor(3*rem),Math.floor(-15*rem));
	ctx.lineTo(Math.floor(10*rem),Math.floor(-15*rem));
	ctx.lineTo(0,Math.floor(-38*rem));
	ctx.lineTo(Math.floor(-10*rem),Math.floor(-15*rem));
	ctx.lineTo(Math.floor(-3*rem),Math.floor(-15*rem));
	ctx.closePath();
	ctx.fill();
	ctx.restore();

	ctx.strokeText("键向左",Math.floor(340*rem),Math.floor(840*rem));

	//画向右的小箭头
	ctx.save();
	ctx.translate(Math.floor(455*rem),Math.floor(840*rem));
	ctx.rotate(90*Math.PI/180);
	ctx.beginPath();
	ctx.moveTo(Math.floor(-3*rem),Math.floor(18*rem));
	ctx.lineTo(Math.floor(3*rem),Math.floor(18*rem));
	ctx.lineTo(Math.floor(3*rem),Math.floor(-15*rem));
	ctx.lineTo(Math.floor(10*rem),Math.floor(-15*rem));
	ctx.lineTo(0,Math.floor(-38*rem));
	ctx.lineTo(Math.floor(-10*rem),Math.floor(-15*rem));
	ctx.lineTo(Math.floor(-3*rem),Math.floor(-15*rem));
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	ctx.strokeText("键向右",Math.floor(505*rem),Math.floor(840*rem));

	//画向下的小箭头
	ctx.save();
	ctx.translate(Math.floor(605*rem),Math.floor(835*rem));
	ctx.rotate(180*Math.PI/180);
	ctx.beginPath();
	ctx.moveTo(Math.floor(-3*rem),Math.floor(18*rem));
	ctx.lineTo(Math.floor(3*rem),Math.floor(18*rem));
	ctx.lineTo(Math.floor(3*rem),Math.floor(-15*rem));
	ctx.lineTo(Math.floor(10*rem),Math.floor(-15*rem));
	ctx.lineTo(0,Math.floor(-38*rem));
	ctx.lineTo(Math.floor(-10*rem),Math.floor(-15*rem));
	ctx.lineTo(Math.floor(-3*rem),Math.floor(-15*rem));
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	ctx.strokeText("下落",Math.floor(620*rem),Math.floor(840*rem));

	//画圆角矩形
	//把按钮的坐标点保存起来
	//变换按钮
	var jsn = {
		type:1,
		msg:"变换",
		x:Math.floor(209*rem),
		y:Math.floor(879*rem),
		w:Math.floor(125*rem),
		h:Math.floor(56*rem),
		x1:Math.floor(209*rem)+Math.floor(125*rem),
		y1:Math.floor(879*rem)+Math.floor(56*rem),
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,Math.floor(10*rem),jsn.fillcolor,jsn.msg,"#efb456");

	//向左按钮
	jsn = {
		type:2,
		msg:"向左",
		x:Math.floor(69*rem),
		y:Math.floor(944*rem),
		w:Math.floor(125*rem),
		h:Math.floor(56*rem),
		x1:Math.floor(69*rem)+Math.floor(125*rem),
		y1:Math.floor(944*rem)+Math.floor(56*rem),
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,Math.floor(10*rem),jsn.fillcolor,jsn.msg,"#efb456");

	//向右按钮
	jsn = {
		type:3,
		msg:"向右",
		x:Math.floor(346*rem),
		y:Math.floor(944*rem),
		w:Math.floor(125*rem),
		h:Math.floor(56*rem),
		x1:Math.floor(346*rem)+Math.floor(125*rem),
		y1:Math.floor(944*rem)+Math.floor(56*rem),
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,Math.floor(10*rem),jsn.fillcolor,jsn.msg,"#efb456");

	//下落按钮
	jsn = {
		type:4,
		msg:"下落",
		x:Math.floor(209*rem),
		y:Math.floor(1000*rem),
		w:Math.floor(125*rem),
		h:Math.floor(56*rem),
		x1:Math.floor(209*rem)+Math.floor(125*rem),
		y1:Math.floor(1000*rem)+Math.floor(56*rem),
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,Math.floor(10*rem),jsn.fillcolor,jsn.msg,"#efb456");

	//开始按钮
	jsn = {
		type:5,
		msg:"开始",
		x:Math.floor(562*rem),
		y:Math.floor(897*rem),
		w:Math.floor(125*rem),
		h:Math.floor(56*rem),
		x1:Math.floor(562*rem)+Math.floor(125*rem),
		y1:Math.floor(897*rem)+Math.floor(56*rem),
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,Math.floor(10*rem),jsn.fillcolor,jsn.msg,"#efb456");

	//暂停按钮
	jsn = {
		type:6,
		msg:"暂停",
		x:Math.floor(562*rem),
		y:Math.floor(972*rem),
		w:Math.floor(125*rem),
		h:Math.floor(56*rem),
		x1:Math.floor(562*rem)+Math.floor(125*rem),
		y1:Math.floor(972*rem)+Math.floor(56*rem),
		fillcolor:"#3a0e0e",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,Math.floor(10*rem),jsn.fillcolor,jsn.msg,"#efb456");

	//音乐按钮
	jsn = {
		type:7,
		msg:"音乐开/关",
		x:Math.floor(566*rem),
		y:Math.floor(701*rem),
		w:Math.floor(152*rem),
		h:Math.floor(40*rem),
		x1:Math.floor(566*rem)+Math.floor(152*rem),
		y1:Math.floor(701*rem)+Math.floor(40*rem),
		fillcolor:"#2e2c2c",
		fillcolor_hover:"#1a0a0a",
	};
	_d.push(jsn);
	_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,Math.floor(10*rem),jsn.fillcolor,jsn.msg,"#efb456");

	//文字
	ctx.font = Math.floor(40*rem)+"px Microsoft YaHei normal";
	ctx.strokeStyle = "#15e24f";
	ctx.textAlign = "start";
	ctx.textBaseline = "top";
	ctx.strokeText("下一个",Math.floor(576*rem),Math.floor(28*rem));
	ctx.strokeText("得分",Math.floor(576*rem),Math.floor(259*rem));
	ctx.strokeText("消灭行数",Math.floor(576*rem),Math.floor(426*rem));
	//下一个图案
	_b.next();

	//绘制得分
	_b.defen(_a.df_num1);

	//消灭行数
	_b.hangshu(_a.df_hang);

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

	_b.downstatus = false;
	if(_pc){
		//键盘事件
		document.onkeydown = function(event){
			if(event.keyCode === 38){
				//变形
				if(_b.downstatus){return;};
				_b.downstatus = true;
				_b.btnclick(_d[0],true);
			}else if(event.keyCode === 37){
				//向左
				if(_b.downstatus){return;};
				_b.downstatus = true;
				_b.btnclick(_d[1],true);
			}else if(event.keyCode === 39){
				//向右
				if(_b.downstatus){return;};
				_b.downstatus = true;
				_b.btnclick(_d[2],true);
			}else if(event.keyCode === 40){
				//下落
				if(_b.downstatus){return;};
				_b.downstatus = true;
				_b.btnclick(_d[3],true);
			}
		};
		document.onkeyup = function(event){
			if(event.keyCode === 38){
				//变形
				_b.downstatus = false;
				_b.btnclick(_d[0],false);
			}else if(event.keyCode === 37){
				//向左
				_b.downstatus = false;
				_b.btnclick(_d[1],false);
			}else if(event.keyCode === 39){
				//向右
				_b.downstatus = false;
				_b.btnclick(_d[2],false);
			}else if(event.keyCode === 40){
				//下落
				_b.downstatus = false;
				_b.btnclick(_d[3],false);
			}
		};
	};
};
//向上被按下变换type=true按下false抬起
_b.btnclick = function(jsn,type){
	if(type){
		_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,10*rem,jsn.fillcolor_hover,jsn.msg,"#fff");
	}else{
		_b.rect_ra(jsn.x,jsn.y,jsn.w,jsn.h,10*rem,jsn.fillcolor,jsn.msg,"#efb456");
	};
	if(jsn.type === 1){
		//变换按钮
		if(type){
		if(!_e.conduct){return;};
			_b.deformation();
		};
	}else if(jsn.type === 2){
		//向左
		if(!_e.conduct){return;};
		if(type){
			_a.time2 && clearInterval(_a.time2);
			_a.time2 = setInterval(_b.to_left,100);
			_b.to_left();
		}else{
			_a.time2 && clearInterval(_a.time2);
		};
	}else if(jsn.type === 3){
		//向右
		if(!_e.conduct){return;};
		if(type){
			_a.time2 && clearInterval(_a.time2);
			_a.time2 = setInterval(_b.to_right,100);
			_b.to_right();
		}else{
			_a.time2 && clearInterval(_a.time2);
		};
	}else if(jsn.type === 4){
		//下落
		if(!_e.conduct){return;};
		if(type){
			_a.time1 && clearInterval(_a.time1);
			_a.time2 && clearInterval(_a.time2);
			_a.time2 = setInterval(_b.to_lower,25);
			_b.to_lower();
		}else{
			_a.time2 && clearInterval(_a.time2);
			_b.start_go();
		};
		
	}else if(jsn.type === 5){
		//开始
		if(_e.status === 0){
			_b.start();
		}else if(_e.status === 1){
			_b.start_go();
		};
	}else if(jsn.type === 6){
		//暂停
		_a.time1 && clearInterval(_a.time1);
	}else if(jsn.type === 7){
		//是否播放音乐
		console.log("暂停/播放");
	};
};
//绘制
//一个小方格的边长
var _e = {};
_e._w = Math.floor(32*rem);//每个小方格边长
_e._x = Math.floor(80*rem);//游戏区域的x坐标
_e._y = Math.floor(30*rem);//游戏区域的y坐标
_e.numx = 14;//横向多少个
_e.numy = 25;//竖向多少个
_e.ico_1 = document.querySelector(".ico_1");
_e.ico_2 = document.querySelector(".ico_2");
_e.ico_3 = document.querySelector(".ico_3");
_e.ico_4 = document.querySelector(".ico_4");
_e.ico_5 = document.querySelector(".ico_5");
_e.ico_6 = document.querySelector(".ico_6");
_e.ico_7 = document.querySelector(".ico_7");
_e.ico_bg = document.querySelector(".ico_bg");
_e.domimg = [];
_e.domimg.push(_e.ico_1);
_e.domimg.push(_e.ico_2);
_e.domimg.push(_e.ico_3);
_e.domimg.push(_e.ico_4);
_e.domimg.push(_e.ico_5);
_e.domimg.push(_e.ico_6);
_e.domimg.push(_e.ico_7);
_e.all_w = _e.numx*_e._w;
_e.all_h = _e.numy*_e._w;
_e.all = [];//所有坐标的数组
_e.status = 0;//游戏状态0未开始1开始2暂停中
_b.draw_bg = function(){
	ctx.clearRect(0,0,_e.all_w,_e.all_h);
	for(var i=0;i<_e.numy;i++){
		for(var j=0;j<_e.numx;j++){
			ctx.drawImage(_e.ico_bg,j*_e._w,i*_e._w,_e._w,_e._w);
		};
	};
};

//绘制下一个图案7中图案1~7和用那个颜色值0只绘制背景
_a.n_x = 578*rem;
_a.n_y = 88*rem;
_a.n_w = 140*rem;
_a.n_h = 150*rem;
_a.n_data = false;
_b.next = function(data){
	if(_a.n_data){
		_e.conduct = _a.n_data;
	};
	_a.n_data = data;
	ctx.clearRect(_a.n_x,_a.n_y,_a.n_w,_a.n_h);
	ctx.fillStyle = "#433e3e";
	ctx.fillRect(_a.n_x,_a.n_y,_a.n_w,_a.n_h);
	if(!data){return};
	var x = 598*rem;
	var y = 111*rem;
	var this_data = data.style[data.this_style];
	for(var i=0,len=this_data.length;i<len;i++){
		ctx.drawImage(data.color,this_data[i][0]*_e._w+x,this_data[i][1]*_e._w+y,_e._w,_e._w);
	};
};
//包括了形状变化的坐标
_e.suiji = [
	[
		[[1,1],[1,2],[2,2],[3,2]],
		[[1,2],[2,2],[2,1],[2,0]],
		[[0,1],[1,1],[2,1],[2,2]],
		[[1,1],[1,2],[1,3],[2,1]]
	],
	[
		[[2,0],[2,1],[2,2],[2,3]],
		[[0,1],[1,1],[2,1],[3,1]]
	],
	[
		[[0,1],[1,1],[1,2],[2,2]],
		[[2,0],[2,1],[1,1],[1,2]]
	],
	[
		[[0,2],[1,2],[2,2],[2,1]],
		[[1,1],[2,1],[2,2],[2,3]],
		[[1,2],[1,1],[2,1],[3,1]],
		[[1,0],[1,1],[1,2],[2,2]]
	],
	[
		[[1,1],[2,1],[1,2],[2,2]]
	],
	[
		[[1,0],[1,1],[2,1],[2,2]],
		[[1,2],[2,2],[2,1],[3,1]]
	],
	[
		[[1,2],[2,2],[2,1],[3,2]],
		[[1,0],[1,1],[1,2],[2,1]],
		[[1,1],[2,1],[3,1],[2,2]],
		[[1,1],[2,0],[2,1],[2,2]]
	]
];
// _e.suiji = [
// 	[[0,0],[0,1],[0,2],[0,3]],
// 	[[0,0],[0,1],[1,1],[2,1]],
// 	[[0,1],[1,1],[2,1],[2,0]],
// 	[[0,0],[0,1],[1,1],[1,0]],
// 	[[0,1],[1,1],[1,0],[2,0]],
// 	[[1,0],[0,1],[1,1],[2,1]],
// 	[[0,0],[1,0],[1,1],[2,1]],
// ];
//绘制
_b.draw = function(){
	ctx.save();
	ctx.translate(_e._x,_e._y);
	_b.draw_bg();
	var arr = _e.all;//绘制静态
	var x1,y1;
	for(var i=0,len=arr.length;i<len;i++){
		ctx.drawImage(arr[i].color,arr[i].x*_e._w,arr[i].y*_e._w,_e._w,_e._w);
	};
	//绘制不断下落的元素
	var b = _e.conduct;
	var c = b.style[b.this_style];
	for(var j=0,jen = c.length;j<jen;j++){
		x1 = (c[j][0]+b.x)*_e._w;
		y1 = (c[j][1]+b.y)*_e._w;
		if(x1>-1 && y1>-1){
			ctx.drawImage(b.color,x1,y1,_e._w,_e._w);
		};
	};
	ctx.restore();
};
//接触检测和触边检测
_b.contact = function(b){
	var c = b.style[b.this_style];
	var x1,y1;
	var arr = _e.all;//绘制静态
	var is_ok = false;
	for(var i=0,len = c.length;i<len;i++){
		x1 = (c[i][0]+b.x1);
		y1 = (c[i][1]+b.y1);
		if(y1>=_e.numy){
			is_ok = true;
			break;
		};
		if(x1<0 || x1>_e.numx-1){
			is_ok = true;
			break;
		};
		if(!is_ok){
			for(var j=0,jen=arr.length;j<jen;j++){
				if((arr[j].x === x1) && (arr[j].y === y1)){
					is_ok = true;
					break;
				};
			};
		};
		if(is_ok){
			break;
		};
	};
	return is_ok;
};
//变形
_b.deformation = function(){
	var b = _e.conduct;
	var a = b.style.length;
	var x = b.this_style;
	var c = b.this_style;
	if(a === 0){return;};
	x++;
	if(x === a){
		x = 0;
	};
	b.this_style = x;
	var is_ok = _b.contact(b);//接触检测
	if(is_ok){
		//不能变
		b.this_style = c;
	}else{
		//可以变
		_b.draw();
	};
};
//向左移动
_b.to_left = function(){
	var b = _e.conduct;
	var c = b.x;
	b.x1 = b.x-1;
	var is_ok = _b.contact(b);//接触检测
	if(is_ok){
		//不可以变
		b.x1 = c;
	}else{
		//可以变
		b.x = b.x1;
		_b.draw();
	};
};
//向左移动
_b.to_right = function(){
	var b = _e.conduct;
	var c = b.x;
	b.x1 = b.x+1;
	var is_ok = _b.contact(b);//接触检测
	if(is_ok){
		//不可以变
		b.x1 = c;
	}else{
		//可以变
		b.x = b.x1;
		_b.draw();
	};
};
//向下移动
_b.to_lower = function(){
	var b = _e.conduct;
	var c = b.y;
	b.y1 = b.y+1;
	var is_ok = _b.contact(b);//接触检测
	if(is_ok){
		//不可以变
		b.y1 = c;
	}else{
		//可以变
		b.y = b.y1;
		_b.draw();
	};
};
//消除特效绘制
_b.clear_draw = function(x1,arry,data){
	ctx.save();
	ctx.translate(_e._x,_e._y);
	for(var i=0;i<arry.length;i++){
		ctx.clearRect(arry[i].x,arry[i].y*_e._w,_e.all_w,_e._w);
	};
	for(var i=0;i<data.length;i++){
		var a = data[i];
		for(var j=0,jen=a.length;j<jen;j++){
			if(a[j].x<=x1){
				ctx.drawImage(_e.ico_bg,a[j].x*_e._w,a[j].y*_e._w,_e._w,_e._w);
			}else{
				ctx.drawImage(a[j].color,a[j].x*_e._w,a[j].y*_e._w,_e._w,_e._w);
			};
		};
	};
	ctx.restore();
};
//特效显示后整体下移
_b.move_down = function(arry){
	var c = [];
	for(var i=0,len=arry.length;i<len;i++){
		c.push(arry[i].y);
	};
	var arr = _e.all;
	var a1 = [];
	var a2 = {};
	for(var i=0,len=arr.length;i<len;i++){
		if(!arr[i].state){
			if(a2[arr[i].y] === undefined){
				var num1 = 0;
				for(var j=c.length-1;j>=0;j--){
					if(arr[i].y<=c[j]){
						num1++;
					};
				};
				a2[arr[i].y] = num1;
			};
			arr[i].y = arr[i].y+a2[arr[i].y];
			a1.push(arr[i]);
		};
	};
	_e.all = a1;
	_b.suiji_next();
	_b.start_go();
	_b.draw();
};
//特效处理
_b.effects = function(data){
	//关闭定时器
	_a.time1 && clearInterval(_a.time1);
	//处理特效
	_a.df_num1 += data.length*10;
	_a.df_hang += data.length;
	//绘制得分
	_b.defen(_a.df_num1);
	//消灭行数
	_b.hangshu(_a.df_hang);
	//把要消除的对象用参数标记下
	//从左到右消失
	var arry = [];
	for(var i=0;i<data.length;i++){
		var a = data[i];
		arry.push({x:a[0].x,y:a[0].y});
		for(var j=0,jen=a.length;j<jen;j++){
			a[j].state = 1;//表示要消失了
		};
	};
	//先把需要重绘的地方计算出来
	var time1 = null;
	var x1 = 0;//闪4下
	time1 = setInterval(function(){
		_b.clear_draw(x1,arry,data);
		x1++;
		if(x1 === _e.numx){
			//消除行后整体下移
			_b.move_down(arry);
			clearInterval(time1);
		};
	},30);
};
//检测是否有得分
_b.score = function(b){
	//得到这个图像的所有y坐标
	var c = b.style[b.this_style];
	var a = [];
	for(var i=0,len=c.length;i<len;i++){
		var y = c[i][1]+b.y;
		if(a.indexOf(y) === -1){
			a.push(y);
		};
	};
	a.sort();
	var e = [];
	var arr = _e.all;
	for(var i=0,len=a.length;i<len;i++){
		var e1 = [];
		for(var j=0,jen=arr.length;j<jen;j++){
			if(arr[j].y === a[i]){
				e1.push(arr[j]);
			};
		};
		e.push(e1);
	};
	//判断那个数组的长度达到了满行
	var d = [];
	for(var i=0;i<e.length;i++){
		if(e[i].length === _e.numx){
			d.push(e[i]);
		};
	};
	if(d.length>0){
		return d;
	}else{
		return false;
	};
};
//数据检测计算
_b.calculation = function(){
	var x1,y1;
	var b = _e.conduct;
	b.y1 = b.y+1;

	var is_ok = _b.contact(b);//接触检测
	
	if(is_ok){
		b.state = 2;
		//这里不是放进去整个形状的对象而是把形状中所占坐标的每个方块
		var c = b.style[b.this_style];
		for(var i=0,len=c.length;i<len;i++){
			var jsn = {
				x:c[i][0]+b.x,
				y:c[i][1]+b.y,
				color:b.color
			};
			_e.all.push(jsn);
		};
		//这里要进行判断是否有要消除的行
		//有的话关闭定时器显示消行特效
		//显示完毕加分开启定时器进行下一个
		var is_defen = _b.score(b);//检测有没有得分返回boolean值false没有得分或者返回数组
		if(is_defen){
			//有得分处理特效
			_b.effects(is_defen);
		}else{
			//没有得分继续下一个
			_b.suiji_next();
		};
	}else{
		b.y = b.y1;
		b.x = b.x1;
		_b.draw();
	};
	
};
//开始
_b.start = function(){
	if(_e.status === 0){
		_e.status = 1;
		//要产生2个随机图形
		for(var i=0;i<2;i++){
			_b.suiji_next();
		};
		//表示是下落中的对象
		//下落完成后才放入all数组中
		_a.num1 = 1;//定时器累加的
		_a.jiange = 10;
		_b.start_go();
	};
};
//随机产生下一个图形
_b.suiji_next = function(){
	var a = _e.suiji.length;
	var shiji = Math.floor(Math.random()*a);
	var jsn = {
		this_style:0,
		style:_e.suiji[shiji],
		color:_e.domimg[Math.floor(Math.random()*7)],
		x:6,//x坐标的基数
		y:-2,//y坐标的基数每次都会加1
		x1:6,//下一帧的坐标
		y1:-2,//下一帧的坐标
		index:0,//所在矩阵当中的那个位置比如第10个也是在不会动之后才计算出来
		state:0,//0预显示//1开始下落//2固定//3消失
	};
	_b.next(jsn);
};
_b.start_go = function(){
	_a.time1 && clearInterval(_a.time1);
	_a.time1 = setInterval(function(){
		_a.num1++;
		if(_a.num1%_a.jiange === 0){
			_b.calculation();
		};
	},30);
};
_b.initialize();
setTimeout(function(){
	ctx.save();
	ctx.translate(_e._x,_e._y);
	_b.draw_bg();
	ctx.restore();
},10);


