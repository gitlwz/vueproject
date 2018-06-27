//Hybrid基本逻辑
window.Hybrid = window.Hybrid || {};
window.Hybrid.ui = window.Hybrid.ui || {};
//Hybrid.callback = function (data) {
//    var callbackId = data.callback;
//    if(!callbackId) return;
//
//    //alert(typeof data);
//    //alert(callbackId);
//    //
//    //showFormatData(Hybrid);
//
//    if(typeof data == 'string') data = JSON.parse(data);
//
//    if(data.errno) data.errcode = 0;
//
//    data = data.data;
//
//    if(typeof data == 'string' && data.length > 0) data = JSON.parse(data);
//
//
//    if(data.errcode !== 0) {
//        APP && APP.showToast(data.errmsg);
//        return;
//    }
//
//    if(callbackId.indexOf('header_') != -1 && Hybrid['Header_Event']) {
//        Hybrid['Header_Event'][callbackId] && Hybrid['Header_Event'][callbackId](data || {});
//    } else {
//        Hybrid[callbackId] && Hybrid[callbackId](data || {});
//    }
//    return true;
//};

// Hybrid.callback = function (data) {
//     var callbackId = data.callback;
//     if (!callbackId) return;

//     //alert(typeof data);
//     //alert(callbackId);
//     //
//     //showFormatData(Hybrid);

//     if (typeof data == 'string') data = JSON.parse(data);

//     if (callbackId.indexOf('header_') != -1 && Hybrid['Header_Event']) {
//         Hybrid['Header_Event'][callbackId] && Hybrid['Header_Event'][callbackId](data.data || {});
//     } else {
//         Hybrid[callbackId] && Hybrid[callbackId](data.data || {}, data);
//     }
//     return true;
// };

var bridgePostMsg = function (params) {
    var url = _getHybridUrl(params);

    //兼容ios6
    var ifr = document.createElement("iframe");
    ifr.style.display = "none";
    ifr.setAttribute("src",url);

    console.log(params.tagname + '-hybrid请求发出-' + new Date().getTime() + 'url: ' + url)

    //Android情况协议发的太快会有问题
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    if (isAndroid) {
        setTimeout(function () {
            document.body.appendChild(ifr)
        })
    } else {
        document.body.appendChild(ifr)
    }
    setTimeout(function () {
        document.body.removeChild(ifr)
        ifr = null;
    }, 1000);
};

var _getHybridUrl = function (params) {
    var k, paramStr = '',
        url = 'hybrid://',
        flag = '?';
    url += params.tagname; //时间戳，防止url不起效

    if (params.callback) {
        flag = '&';
        url += '?callback=' + params.callback;
        //delete params.callback;
    }
    if (params.param) {
        paramStr = typeof params.param == 'object' ? JSON.stringify(params.param) : params.param;
        url += flag + 'param=' + encodeURIComponent(paramStr);
    }
    return url;
};

var requestHybrid = function (params) {
    if (!params.tagname) {
        alert('必须包含tagname');
    }
    //生成唯一执行函数，执行后销毁
    var tt = (new Date().getTime());
    var t = 'hybrid_' + params.tagname + '_' + tt;
    var tmpFn;

    ////针对组件通信做的特殊处理
    //if(params.param && params.param.events) {
    //    params.param.events =  _handleMessage(params.param.events, params.tagname);
    //}

    //处理有回调的情况
    if (params.callback) {
        tmpFn = params.callback;
        params.callback = t;
        window.Hybrid[t] = function (data) {
            console.log(params.tagname + '-hybrid请求响应-' + new Date().getTime())
            tmpFn(data);
            delete window.Hybrid[t];
        }
    }
    bridgePostMsg(params);
};




export default requestHybrid