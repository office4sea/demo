const rtcCamera = {
    /**
     * 카메라 디스플레이를 출력할 엘리먼트
     * @type {HTMLElement}
     */
    _camera: undefined,
    /**
     * 카메라 디스플레이 생성 옵션
     */
    _option: undefined,

    /**
     * 디스플레이 엘리먼트 바인딩
     * @param {string} selector 
     * @param {*} option 
     */
    bindDisplay(selector, option={}) {
        const _camera = this._getCameraDisplay(selector, option);
        const _option = Object.assign({
            isMobile: /android|iPhone/i.test(navigator.userAgent)
        }, option);
        Object.assign(this, {_camera, _option})
    },
    /**
     * 카메라를 실행합니다.
     */
    play() {
        const {_camera, _option} = this;
        if(!_camera) return Promise.reject('카메라 디스플레이가 초기화 되지 않았습니다.');

        const {isMobile} = _option;
        return navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    facingMode: isMobile ? {exact:'environment'} : 'user',
                    frameRate: {ideal:10},
                    width: {ideal:1920},
                    height:{ideal:1440},
                },

            })
            .then(srcObject=> Object.assign(_camera, {srcObject}).play())
            .catch(reason=> {
                console.error(reason);
                return Promise.reject('카메라 접근 권한이 처리되지 못했습니다.');
            });
    },
    /**
     * 카메라 이미지를 캡처합니다.
     */
    capture() {
        const {_camera} = this;
        if(!_camera.srcObject) return;
        _camera.pause();

        // const {offsetWidth:width, offsetHeight:height} = _camera;
        const {width, height} = _camera.getFrameRect();
        const canvas = Object.assign(document.createElement('canvas'), {width, height});

        console.log(width, height, _camera.offsetWidth, _camera.offsetHeight);
        const ctx = canvas.getContext('2d');
        // ctx.drawImage(_camera, 0, 0, width, height);
        ctx.drawImage(_camera, (width - _camera.offsetWidth)/2, (height - _camera.offsetHeight)/2, _camera.offsetWidth, _camera.offsetHeight);

        const getData = format=> canvas.toDataURL(format);
        const preview = selector=> {
            const el = document.querySelector(selector);
            if(el) {
                el.src = getData();
            }
        };
        return {getData, preview};
    },
    stop() {
        this._removeCamera();
    },
    getDevices() {
        return navigator.mediaDevices.enumerateDevices();
    },

    _getCameraDisplay(selector, option) {
        const cover = document.querySelector(selector);
        if(!cover) throw `카메라 디스플레이 설정을 위한 엘리먼트(${selector})가 존재 하지 않습니다.`;

        const fram = cover.appendChild(this._makeEl('div', {
            position: 'relative',
            display: 'flex',
            background: '#000',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
        }));
        const camera = fram.appendChild(this._makeEl('video'));

        const uiList = [];
        camera.getFrameRect = _=> {
            const {offsetWidth:width, offsetHeight:height} = fram;
            return {width, height};
        };
        camera.addEventListener('canplay', _=> {
            const cameraData = document.querySelector('#camera-data');
            const {offsetWidth:width, offsetHeight:height} = fram;
            const {videoHeight, videoWidth} = camera;

            console.log('fram', width, height, (camera.videoHeight / camera.videoWidth) * width);
            console.log('video', camera.videoWidth, camera.videoHeight);
cameraData.value = `fram: ${width}, ${height}
video: ${camera.videoWidth}, ${camera.videoHeight}
`;

            // Object.assign(camera, {
            //     width,
            //     height: (videoHeight / videoWidth) * width
            // });
            camera.width = width;
            camera.height = height;
            uiList.forEach(ui=> {ui.style.display = ''});
        });

        // 디스플레이 가이드
        const guide = this._getDisplayGuide(option);
        guide && uiList.push(fram.appendChild(guide));

        // 카메라 셔터
        const shutter = this._getCameraShutter(option);
        shutter && uiList.push(fram.appendChild(shutter));

        return camera;
    },
    _getDisplayGuide({guide}) {
        if(!guide) return;

        const {size='80%'} = guide;
        const guideLine = this._makeEl('div', {
            display: 'flex',
            flexFlow: 'column',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            display: 'none'
        });

        const background='rgba(255,255,255,.5)', opacity='.9';
        const line='solid .8rem #fff', position='-.4rem', weight='1.5rem';
        guideLine.innerHTML = `
        <div style="background:${background}; height:calc((100% - ${size})/2);"></div>
        <div style="display:flex; height:${size}">
            <div style="background:${background}; width:calc((100% - ${size})/2);"></div>
            <div style="position:relative; width:${size}">
                <div style="position:absolute; border-top:${line}; border-left:${line}; left:${position}; top:${position}; width:${weight}; height:${weight}; opacity:${opacity};"></div>
                <div style="position:absolute; border-top:${line}; border-right:${line}; right:${position}; top:${position}; width:${weight}; height:${weight}; opacity:${opacity};"></div>
                <div style="position:absolute; border-bottom:${line}; border-left:${line}; left:${position}; bottom:${position}; width:${weight}; height: ${weight}; opacity:${opacity};"></div>
                <div style="position:absolute; border-bottom:${line}; border-right:${line}; right:${position}; bottom:${position}; width:${weight}; height: ${weight}; opacity:${opacity};"></div>
            </div>
            <div style="background: ${background}; width: calc((100% - ${size})/2);"></div>
        </div>
        <div style="background: ${background}; height: calc((100% - ${size})/2)"></div>
        `;
        return guideLine;
    },
    _getCameraShutter({shutter}) {
        if(!shutter?.onCapture) return;

        const shutterButton = this._makeEl('button', {
            position: 'absolute',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            left: 'calc(100% / 2 - 50px / 2)',
            bottom: '10%',
            opacity: '.9',
            display: 'none'
        });

        const {onCapture} = shutter;
        shutterButton.addEventListener('click', _=> onCapture && onCapture(this.capture()));
        return shutterButton;
    },
    _removeCamera() {
        const {_camera} = this;
        if(!_camera) return;

        _camera.srcObject = null;
        _camera.parentElement.remove();
    },
    _makeEl(tag, style) {
        const el = document.createElement(tag);
        const toCebab = v=> v.replace(/^\w/, v=>v.toLowerCase()).replace(/[A-Z]/g, v=>`-${v.toLowerCase()}`);

        style && Object.assign(el.style, {
            cssText: Object.entries(style).map(([k, v])=>`${toCebab(k)}: ${v}`).join(';')
        });
        return el;
    }
};