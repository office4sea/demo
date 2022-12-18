class RtcCamera {
    /**@type {HTMLElement} */
    _view;
    /**@type {HTMLVideoElement} */
    _camera;

    constructor(selector) {
        if(!this._isDeviceSupport()) throw '카메라 기능을 지원하지 않습니다.';

        this._view = document.querySelector(selector);
        if(!this._view) throw `카메라 구성을 위한 엘리먼트(${selector})가 없습니다.`;

        this._camera = this._createCamera();
        this._initCamera();
    }

    play() {
        if(!this._isStandBy()) return alert('카메라 접근 권한을 확인 해주세요.');
        this._camera.play();
    }

    capture() {
        const {_camera} = this;
        _camera.pause();

        const {offsetWidth, offsetHeight} = _camera;
        const canvas = Object.assign(document.createElement('canvas'), {
            width:offsetWidth,
            height:offsetHeight
        });

        const ctx = canvas.getContext('2d');
        ctx.drawImage(_camera, 0, 0, offsetWidth, offsetHeight);
        return canvas.toDataURL();
    }

    _isStandBy() {
        return this._camera && !!this._camera.srcObject;
    }
    _initCamera() {
        const {mediaDevices} = navigator;
        mediaDevices.getUserMedia({video:{
            facingMode: {exact: 'environment'}
        }})
            .then(srcObject=> Object.assign(this._camera, {srcObject}));
    }
    _createCamera() {
        const {innerWidth} = window;
        const camera = document.createElement('video');
        camera.width = innerWidth;
        return this._view.appendChild(camera);
    }
    _isDeviceSupport() {
        const {mediaDevices} = navigator;
        return mediaDevices && !!mediaDevices.getUserMedia;
    }
}


const camera = new RtcCamera('#camView');

// 카메라 실행
const camOpen = document.getElementById('camOpen');
camOpen.addEventListener('click', _=> camera.play());

// 화면 캡처
const camCapture = document.getElementById('camCapture');
camCapture.addEventListener('click', _=> {
    const camData = document.getElementById('camData');
    camData.value = camera.capture();
});
