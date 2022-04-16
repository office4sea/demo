class WebBridge {
    static get(bridgeName, option) {
        return new WebBridge(bridgeName, option);
    }

    constructor(bridgeName, option={}) {
        if(window.__bridge__) return window.__bridge__;

        const messageMap = {};
        window.__bridge__ = Object.assign(this, option, _properties());

        function _properties() {
            return {
                sendMessage: _sendMessage,
                messageHook: _messageHook,
            };
        }
        function _sendMessage(arg) {
            if(window[bridgeName]) _callBridge(window[bridgeName], arg);
            else if(window.webkit) _callWebkit(window.webkit.messageHandlers, arg);
            else {
                _callSchema(arg);
            }
        }
        function _callBridge(bridge, {command, payload, subscribe}) {
            const seq = new Date().getTime();
            Object.assign(messageMap, {
                [seq]: arg=> (subscribe && subscribe(arg))
            })

            bridge[command] && bridge[command](_getJson(payload, seq));
        }
        function _callWebkit(handler, {command, payload, subscribe}) {
        }
        function _callSchema({command, payload, subscribe}) {
        }
        function _getJson(payload={}, seq) {
            return JSON.stringify(Object.assign(payload||{}, {messageHook: seq}));
        }
        function _setMessageHook() {
        }

        function _messageHook(hookid, result) {
            messageMap[hookid] && messageMap[hookid](JSON.parse(result));
            requestAnimationFrame(_=> {
                delete messageMap[hookid];
            });
        }
    }
}
