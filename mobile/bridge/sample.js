const showKeypad = document.getElementById('showKeypad');
const closeKeypad = document.getElementById('closeKeypad');
const openCam = document.getElementById('openCam');

showKeypad.addEventListener('click', _=> alert('showKeypad'));
closeKeypad.addEventListener('click', _=> alert('closeKeypad'));
openCam.addEventListener('click', _=> window.android2.openPhoneCamera());

