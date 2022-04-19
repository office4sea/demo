const ua = navigator.userAgent;

const inputText = document.getElementById('inputText');
const showKpad = document.getElementById('showKeypad');
const closeKpad = document.getElementById('closeKeypad');
const openCam = document.getElementById('openCamera');
const openWeb = document.getElementById('openWebPage');

const getMinfo1 = document.getElementById('getMobileInfo1');
const getMinfo2 = document.getElementById('getMobileInfo2');
const getMinfo3 = document.getElementById('getMobileInfo3');
const getMinfo4 = document.getElementById('getMobileInfo4');
const getMinfo = document.getElementById('getMobileInfo');

const openBrws1 = document.getElementById('OpenBrowser1');
const openBrws2 = document.getElementById('OpenBrowser2');
const openBrws3 = document.getElementById('OpenBrowser3');
const openBrws4 = document.getElementById('OpenBrowser4');

showKpad.addEventListener('click', _=> showKeypad());
closeKpad.addEventListener('click', _=> closeKeypad());
openCam.addEventListener('click', _=> openCamera() );
openWeb.addEventListener('click', _=> openWebPage());

openBrws1.addEventListener('click', _=> OpenBrowser('1') );
openBrws2.addEventListener('click', _=> OpenBrowser('2') );
openBrws3.addEventListener('click', _=> OpenBrowser('3') );
openBrws4.addEventListener('click', _=> OpenBrowser('4') );

getMinfo1.addEventListener('click', _=> getMobileInfo1());
getMinfo2.addEventListener('click', _=> getMobileInfo2());
getMinfo3.addEventListener('click', _=> getMobileInfo3());
getMinfo4.addEventListener('click', _=> getMobileInfo4());
getMinfo.addEventListener('click', _=> getMobileInfo());

function openCamera() {
    if(ua.indexOf("Android") > 0) {
        //window.bridge.openPhoneCamera() ;
        window.webApp.setCommonData('OpenCamera','1');
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "OpenCamera://?";//+data;        
        window.webkit.messageHandlers.openCamera.postMessage(data);	
    } else {
        alert('OpenCamera:1');
    }   
}

function showKeypad() {
    var info = '';
    if(ua.indexOf("Android") > 0) {
        //window.bridge.showKeypad() ;
        info = window.webApp.setCommonData('ShowKeyPad','1');

        //alert();
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "ShowKeyPad://?1";//+data;      
        window.webkit.messageHandlers.ShowKeyPad.postMessage('1');	  
    } else {
        alert('ShowKeyPad:1');
    }   

   // inputText.focus();
}

function closeKeypad() {
    closeKpad.focus();
    if(ua.indexOf("Android") > 0) {
        //window.bridge.closeKeypad() ;
        window.webApp.setCommonData('ShowKeyPad','0');
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "ShowKeyPad://?";//+data;        
    } else {
        alert('ShowKeyPad:0');
    }   
}

// 0은 전체파일
// 1은 이미지동영상
// 2는 기타문서
function OpenBrowser( type) {
    if(ua.indexOf("Android") > 0) {
        //window.bridge.closeKeypad() ;
        window.webApp.setCommonData('OpenBrowser',type);
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "OpenBrowser://?";//+data;        
    } else {
        alert('OpenBrowser:'+type);
    }   
}

function openWebPage() {
    var info = '';
    if(ua.indexOf("Android") > 0) {
       info = window.webApp.setCommonData('OpenWebPage','http://www.naver.com') ; 
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
      var info =  window.webApp.getMobileInfo1() ;//window.webApp.setCommonData('GetMobileInfo1','') ; 
       alert(info);
       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "getMobileInfo1://?"; 
        alert(info);
        return  info;//+data;        
    } else {
        info = 'getMobileInfo1' ;
        alert(info);
        return info;
    }   
}

function getMobileInfo2() {
    if(ua.indexOf("Android") > 0) {
      var info = window.webApp.getMobileInfo2() ;// setCommonData('GetMobileInfo2','') ; 
       alert(info);
       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "getMobileInfo2://?"; 
        alert(info);
        return  info;//+data;        
    } else {
        info = 'getMobileInfo2' ;
        alert(info);
        return info;
    }   
}

function getMobileInfo3() {
    if(ua.indexOf("Android") > 0) {
      var info = window.webApp.getMobileInfo3() ;// setCommonData('GetMobileInfo3','') ; 
       alert(info);
       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "getMobileInfo3://?"; 
        alert(info);
        return  info;//+data;        
    } else {
        info = 'getMobileInfo3' ;
        alert(info);
        return info;
    }   
}

function getMobileInfo4() {
    if(ua.indexOf("Android") > 0) {
      var info = window.webApp.getMobileInfo4() ;//setCommonData('GetMobileInfo4','') ; 
       alert(info);
       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "getMobileInfo4://?"; 
        alert(info);
        return  info;//+data;        
    } else {
        info = 'getMobileInfo4' ;
        alert(info);
        return info;
    }   
}

function getMobileInfo() {
    if(ua.indexOf("Android") > 0) {
      //var info = JSON.stringify( window.bridge.setCommonData('GetMobileInfo','') ); 
      var info = JSON.parse( window.webApp.getMobileInfo());// setCommonData('GetMobileInfo','') ); 
       alert(info);

       var info2 = JSON.stringify( window.webApp.getMobileInfo());// setCommonData('GetMobileInfo','') ); 
       alert(info2);

       return info;
    }
    else if(ua.indexOf("iPhone") > 0) {
        info = window.location = "getMobileInfo://?"; 
        alert(info);
        return  info;//+data;        
    } else {
        info = 'GetMobgetMobileInfoileInfo' ;
        alert(info);
        return info;
    }   
}
