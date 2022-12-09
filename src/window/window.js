// 1. alert
//alert("alert");

// 2. prompt
// 显示提示用户输入的对话框
// 第一个参数是对话框上的提示文字
// 第二个参数是对话框中的默认文字
// 如果按确定，对话框输入栏中的内容会被返回
// 如果按取消，返回null
//var result = prompt("prompt", "default");
//document.write(result);

// 3. confirm
// 显示一个带有一段消息以及确认按钮和取消按钮的对话框
// 点击确定时返回true，点击取消时返回false
//var result = confirm("明天是否出行？");
//document.write(result);

// 4. open
// 如果在初始化的js代码中调用open，不能打开指定网址，并且返回的结果的undefined，因为window对象尚未生成
// 第一个参数是要打的地址，可选
function openQQ() {
	var result = open("http://www.qq.com");
	document.write(result);
}
