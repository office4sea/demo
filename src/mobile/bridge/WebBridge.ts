interface Window {
    [index: string]: string;
    webkit: {
        messageHandlers: any
    }
}
interface Option {
    [index: string]: string;
}
interface Payload {
    data: unknown;
    messageHook: string;
}
interface BridgeMessage {
    command: string;
    payload?: unknown;
    subscribe?: (result?: unknown)=>void
}

type PromiseFunction = (arg?: unknown) => void;

class WebBridge {
    static connect(name: string, option: Option = {}) {
        const bridge: any = window[name] || {};
        if(bridge.sendMessage) return;

        (window as any)[name] = new WebBridge(name, option);
    }

    private bridge: any;
    private webkit: any;
    constructor(name: string, option: Option) {
        Object.keys(option).forEach(key=> {
            (this as any)[key] = option[key];
        });
        this.bridge = window[name];
        this.webkit = window.webkit?.messageHandlers;
    }

    sendMessage(msg: BridgeMessage) {
        const messageHook = 'message_hook_' + new Date().getTime();
        const payload: Payload = {
            messageHook,
            data: msg.payload || {}
        };;

        (this as any)[messageHook] = (result: any)=> {
            msg.subscribe && msg.subscribe(result);
            requestAnimationFrame(_=> {delete (this as any)[messageHook]});
        };
        this._sendNative(msg.command, payload);
    }

    _sendNative(command: string, payload: Payload) {
        const {webkit, bridge} = this;
        const jsonData = JSON.stringify(payload);
        const _sendBridge = (method?: Function)=> {
            method && method(jsonData);
        };
        const _sendWebkit = (handle?: {postMessage: Function})=> {
            handle && handle.postMessage(jsonData);
        };
        const _sendSchema = ()=> {
            (window as any)['location'] = command + '://?' + [
                'data=' + payload.data,
                'messageHook=' + payload.messageHook
            ].join('&');
        };

        if(bridge) _sendBridge(bridge[command])
        else if(webkit) _sendWebkit(webkit[command]);
        else {
            _sendSchema();
        }
    }
}