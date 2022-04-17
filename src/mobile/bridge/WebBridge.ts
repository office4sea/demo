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
    message_hook: string;
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
        const {webkit, bridge} = this;
        const message_hook = 'message_hook_' + new Date().getTime();
        const payload: Payload = {
            message_hook,
            data: msg.payload || {}
        };;

        (this as any)[message_hook] = (result: any)=> {
            msg.subscribe && msg.subscribe(result);
            requestAnimationFrame(_=> {delete (this as any)[message_hook]});
        };

        if(bridge) {
            bridge[msg.command] && bridge[msg.command](JSON.stringify(payload));
        }
    }
}