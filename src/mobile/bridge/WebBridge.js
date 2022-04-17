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
        var bridge = window[name] || {};
        if (bridge.sendMessage)
            return;
        window[name] = new WebBridge(name, option);
    };
    WebBridge.prototype.sendMessage = function (msg) {
        var _this = this;
        var _a = this, webkit = _a.webkit, bridge = _a.bridge;
        var messageHook = 'message_hook_' + new Date().getTime();
        var payload = {
            messageHook: messageHook,
            data: msg.payload || {}
        };
        ;
        this[messageHook] = function (result) {
            msg.subscribe && msg.subscribe(result);
            requestAnimationFrame(function (_) { delete _this[messageHook]; });
        };
        if (bridge) {
            bridge[msg.command] && bridge[msg.command](JSON.stringify(payload));
        }
    };
    return WebBridge;
}());
