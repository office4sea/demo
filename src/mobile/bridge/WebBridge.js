"use strict";
var WebBridge = /** @class */ (function () {
    function WebBridge(name, option) {
        var _this = this;
        var _a;
        Object.keys(option).forEach(function (key) {
            _this[key] = option[key];
        });
        this.bridge = window[name];
        this.webkit = (_a = window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers;
    }
    WebBridge.connect = function (name, option) {
        if (option === void 0) { option = {}; }
        if (!WebBridge.instance) {
            WebBridge.instance = window[name] = new WebBridge(name, option);
        }
    };
    WebBridge.sendMessage = function (msg) {
        WebBridge.instance._sendMessage(msg);
    };
    WebBridge.prototype._sendMessage = function (msg) {
        var _this = this;
        var messageHook = 'message_hook_' + new Date().getTime();
        var payload = {
            messageHook: messageHook,
            data: msg.payload || {}
        };
        this[messageHook] = function (result) {
            msg.subscribe && msg.subscribe(result);
            requestAnimationFrame(function (_) { delete _this[messageHook]; });
        };
        this._sendNative(msg.command, payload);
    };
    WebBridge.prototype._sendNative = function (command, payload) {
        var _a = this, webkit = _a.webkit, bridge = _a.bridge;
        var jsonData = JSON.stringify(payload);
        if (bridge) {
            bridge[command] && bridge[command](jsonData);
        }
        else if (webkit) {
            webkit[command] && webkit[command].postMessage(jsonData);
        }
        else {
            window['location'] = command + '://?' + [
                'data=' + payload.data,
                'messageHook=' + payload.messageHook
            ].join('&');
        }
    };
    return WebBridge;
}());
