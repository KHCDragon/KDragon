function obj2str(data) {
    /*
    {
        'userName':'cjh',//-----数组A传入AjaxToStr函数
        'userPwd':'123',
        'time':'获取的当前时间'
    }
    */ 
    data = data || {}; // 如果没有传参, 为了添加随机因子,必须自己创建一个对象
    data.time = new Date().getTime();
    var strRes = [];
    for(var strKey in data) {
        strRes.push(encodeURIComponent(strKey)+'='+encodeURIComponent(data[strKey]));//这个会把数组A变为字符串输出[key=value,key=value]//encodeURIComponent用来把中文转码(url不能有中文)
    }
    return strRes.join('&');
}
function Ajax(option) {//参数见24行
    var str = obj2str(option.data);//key=value&key=value;
    //第一行创建的obj2str，给str赋值
    var xmlhttp,timer;//1.创建一个异步对象
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest ();
    } else if (window.ActiveXObject) {//1.1兼容性写法
        xmlhttp = new ActiveXObject ('Microsoft.XMLHTTP');//1.1兼容性写法
    };
    if (option.type.toLowerCase() === 'get'){
        xmlhttp.open(option.type,option.url+'?'+str,true);//2.设置请求方式和请求地址
        //XMLHttp.open的参数由html页面传进来
        xmlhttp.send();//3.发送请求
    } else {
        xmlhttp.open(option.type,option.url,true);//2.设置请求方式和请求地址
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");//post请求重点
        xmlhttp.send(str);//3.发送请求//如果php中设置$_POST['userName'],会自动提取Cjh值
    }
        xmlhttp.onreadystatechange = function() {//4.监听状态的变化
        if (xmlhttp.readyState === 4){
            clearInterval(timer);
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status ===304){
                option.success(xmlhttp);
            } else {
                option.error(xmlhttp);
            };
        };
    };
        if (option.timeout){//设置服务器超时未回应的操作
        timer = setInterval(function () {
            alert('超时，中断请求');
            xmlhttp.abort();
            clearInterval(timer);
        },option.timeout)
    }
};
    


