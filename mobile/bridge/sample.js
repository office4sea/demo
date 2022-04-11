const ua = navigator.userAgent;

const inputText = document.getElementById('inputText');
const showKpad = document.getElementById('showKeypad');
const closeKpad = document.getElementById('closeKeypad');
const openCam = document.getElementById('openCamera');
const openBrws = document.getElementById('openImageBrowser');
const getMinfo = document.getElementById('getMobileInfo');


showKpad.addEventListener('click', _=> showKeypad());
closeKpad.addEventListener('click', _=> closeKeypad());
openCam.addEventListener('click', _=> openCamera() );
openBrws.addEventListener('click', _=> OpenImageBrowser() );
getMinfo.addEventListener('click', _=> getMobileInfo());

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


function getMobileInfo() {
    var info = '';
    if(ua.indexOf("Android") > 0) {
       info = window.bridge.setCommonData('GetMobileInfo','') ; 
       alert(info);
       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "GetMobileInfo://?"; 
        alert(info);
        return  info;//+data;        
    } else {
        info = 'GetMobileInfo' ;
        alert(info);
        return info;
    }   
}
