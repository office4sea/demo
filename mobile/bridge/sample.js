const ua = navigator.userAgent;

const inputText = document.getElementById('inputText');
const showKpad = document.getElementById('showKeypad');
const closeKpad = document.getElementById('closeKeypad');
const openCam = document.getElementById('openCamera');
const openBrws = document.getElementById('openImageBrowser');
const openWeb = document.getElementById('openWebPage');

const getMinfo1 = document.getElementById('getMobileInfo1');
const getMinfo2 = document.getElementById('getMobileInfo2');
const getMinfo3 = document.getElementById('getMobileInfo3');


showKpad.addEventListener('click', _=> showKeypad());
closeKpad.addEventListener('click', _=> closeKeypad());
openCam.addEventListener('click', _=> openCamera() );
openBrws.addEventListener('click', _=> OpenImageBrowser() );
openWeb.addEventListener('click', _=> openWebPage());

getMinfo1.addEventListener('click', _=> getMobileInfo1());
getMinfo2.addEventListener('click', _=> getMobileInfo2());
getMinfo3.addEventListener('click', _=> getMobileInfo3());

function openCamera() {
    if(ua.indexOf("Android") > 0) {
        //window.bridge.openPhoneCamera() ;
        window.bridge.setCommonData('OpenCamera','1');
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "OpenCamera://?";//+data;        
        //	window.webkit.messageHandlers.RetBdCode.postMessage(data);	
    } else {
        alert('OpenCamera:1');
    }   
}

function showKeypad() {
    var info = '';
    if(ua.indexOf("Android") > 0) {
        //window.bridge.showKeypad() ;
        info = window.bridge.setCommonData('ShowKeyPad','1');

        //alert();
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "ShowKeyPad://?";//+data;        
    } else {
        alert('ShowKeyPad:1');
    }   

   // inputText.focus();
}

function closeKeypad() {
    closeKpad.focus();
    if(ua.indexOf("Android") > 0) {
        //window.bridge.closeKeypad() ;
        window.bridge.setCommonData('ShowKeyPad','0');
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "ShowKeyPad://?";//+data;        
    } else {
        alert('ShowKeyPad:0');
    }   
}


function OpenImageBrowser() {
    if(ua.indexOf("Android") > 0) {
        //window.bridge.closeKeypad() ;
        window.bridge.setCommonData('OpenImageBrowser','1');
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "OpenImageBrowser://?";//+data;        
    } else {
        alert('OpenImageBrowser:1');
    }   
}

function openWebPage() {
    var info = '';
    if(ua.indexOf("Android") > 0) {
       info = window.bridge.setCommonData('OpenWebPage','http://www.naver.com') ; 
      // alert(info);
       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "OpenWebPage://?"; 
        //alert(info);
        return  info;//+data;        
    } else {
        info = 'OpenWebPage:http://www.naver.com' ;
        alert(info);
        return info;
    }   
}

//1 : hashmap
//2 : ArrayList
//3 : 일반 스트링 배열 String[]

function getMobileInfo1() {
    if(ua.indexOf("Android") > 0) {
      var info = window.bridge.setCommonData('GetMobileInfo1','') ; 
       alert(info);
       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "GetMobileInfo1://?"; 
        alert(info);
        return  info;//+data;        
    } else {
        info = 'GetMobileInfo1' ;
        alert(info);
        return info;
    }   
}

function getMobileInfo2() {
    if(ua.indexOf("Android") > 0) {
      var info = window.bridge.setCommonData('GetMobileInfo2','') ; 
       alert(info);
       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "GetMobileInfo2://?"; 
        alert(info);
        return  info;//+data;        
    } else {
        info = 'GetMobileInfo2' ;
        alert(info);
        return info;
    }   
}

function getMobileInfo3() {
    if(ua.indexOf("Android") > 0) {
      var info = window.bridge.setCommonData('GetMobileInfo3','') ; 
       alert(info);
       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "GetMobileInfo3://?"; 
        alert(info);
        return  info;//+data;        
    } else {
        info = 'GetMobileInfo3' ;
        alert(info);
        return info;
    }   
}

