(function(){
var index ={};
//	用于记录当前可拖拽的对象
var dialogInstace , onMoveStartId , mousePos = {x:0,y:0};
//	获取元素对象	
function g(id){
	return document.getElementById(id);
}
//	自动居中元素
function autoCenter (element) {
	//获取可视区域的宽和高
	var bodyWidth = document.documentElement.clientWidth;
	var bodyHeight = document.documentElement.clientHeight;
	//获取元素的高和宽
	var elementHeight = element.offsetHeight;
	var elementWidth =  element.offsetWidth;
	//设置居中
	element.style.top = (bodyHeight - elementHeight) / 2 + "px";
	element.style.left = (bodyWidth - elementWidth) / 2 + "px";
}
//	自动扩展元素到全部显示区域
function fillToBody(element){
	element.style.width  = document.documentElement.clientWidth + 'px';
	element.style.height = document.documentElement.clientHeight + 'px';
}
//	重新调整对话框的位置和遮罩，并且展现
index.showDialog = function(){
	g('dialog').style.display = 'block';
	g('mask').style.display = 'block';
	autoCenter( g('dialog') );
	fillToBody( g('mask') );
}
//	关闭对话框
index.hideDialog = function(){
	g('dialog').style.display = 'none';
	g('mask').style.display = 'none';
}
//	侦听浏览器窗口大小变化
window.onresize = index.showDialog;
//	Dialog实例化的方法
index.Dialog = function(dragId , moveId){
	var instance = {};
	//	允许执行 拖拽操作 的元素
	instance.dragElement = g(dragId);
	//	拖拽操作时，移动的元素
	instance.moveElement = g(moveId);
	//	拖拽操作时，移动元素的起始 X 点
	instance.mouseOffsetLeft = 0;
	//	拖拽操作时，移动元素的起始 Y 点			
	instance.mouseOffsetTop = 0;	
	instance.dragElement.addEventListener("mousedown",  function(event) {
		var event = event || window.event;
		dialogInstace = instance;
		//拖拽对象移动的距离
		instance.mouseOffsetLeft = event.pageX - instance.moveElement.offsetLeft ;
		instance.mouseOffsetTop  = event.pageY - instance.moveElement.offsetTop ;
		onMoveStartId = setInterval(onMoveStart,10);
		return false;
	});
	return instance;		
}
//	在页面中侦听 鼠标弹起事件
document.onmouseup = function(e){
	dialogInstace = false;
	clearInterval(onMoveStartId);
}
document.onmousemove = function(event){
	var event = window.event || event;
	mousePos.x = event.clientX;
	mousePos.y = event.clientY;
		
	event.stopPropagation && event.stopPropagation();
	event.cancelBubble = true;
	event = this.originalEvent;
    event && (event.preventDefault ? event.preventDefault() : event.returnValue = false);

    document.body.style.MozUserSelect = 'none';
}	

function onMoveStart(){
	var instace = dialogInstace;
	if (instace) {
	    var maxX = document.documentElement.clientWidth -  instace.moveElement.offsetWidth;
	    var maxY = document.documentElement.clientHeight - instace.moveElement.offsetHeight ;

		instace.moveElement.style.left = Math.min( Math.max( ( mousePos.x - instace.mouseOffsetLeft) , 0 ) , maxX) + "px";
		instace.moveElement.style.top  = Math.min( Math.max( ( mousePos.y - instace.mouseOffsetTop ) , 0 ) , maxY) + "px";
	}
}
window.index = index;
})();