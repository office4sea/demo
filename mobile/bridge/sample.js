const showKpad = document.getElementById('showKeypad');
const closeKpad = document.getElementById('closeKeypad');
const openCam = document.getElementById('openCamera');
const getMinfo = document.getElementById('getMobileInfo');


showKpad.addEventListener('click', _=> showKeypad());
closeKpad.addEventListener('click', _=> closeKeypad());
openCam.addEventListener('click', _=> openCamera() );
getMinfo.addEventListener('click', _=> alert('getMobileInfo'));

function openCamera() {
    if(ua.indexOf("Android") > 0) {
        window.android2.openPhoneCamera() ;
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "openPhoneCamera://?";//+data;        
        //	window.webkit.messageHandlers.RetBdCode.postMessage(data);	
    } else {
        alert('openCamera');
    }   
}

function showKeypad() {
    if(ua.indexOf("Android") > 0) {
        window.android2.showKeypad() ;
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "showKeypad://?";//+data;        
    } else {
        alert('showKeypad');
    }   
}

function closeKeypad() {
    if(ua.indexOf("Android") > 0) {
        window.android2.closeKeypad() ;
    }
    else if(ua.indexOf("iPhone") > 0) {
        window.location = "closeKeypad://?";//+data;        
    } else {
        alert('closeKeypad');
    }   
}

