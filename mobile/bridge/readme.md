# 모바일 브릿지 샘플

웹뷰에서 스크립트를 이용하여 네이티브 기능을 호출 하는 샘플 페이지

## 자바스크립트

WebBridge.js 스크립트를 HTML파일에 추가합니다.

### 네이트브 객체와 연결

`WebBridge.connect` 메소드를 이용하여 네이티브에서 생성된 브릿지 객체를 연결합니다.

네이티브 객체 연결시 두번째 파라메터에 네이티브에서 호출함 함수를 정의 합니다.

```js
/**
 * 네이티브 객체에 연결합니다.
 * @param {string} 브릿지 인터페이스 명
 * @param {object} 네이티브에서 호출 할 함수 모음
 */
WebBridge.connect('webApp', {
    javascriptCall: function() {
    }
});
```

### 네이트브 기능 호출

`WebBridge.sendMessage` 메소드를 이용하여 네이티브의 기능을 호출 합니다.

해당 객체를 통하여 네이티브와 통신 합니다.

command: 호출할 네이티브 함수 이름

payload: 네이티브 함수에 전달할 데이터 객체

subscribe: 네이티브 함수에서 처리한 결과를 받을 함수

```js
/**
 * 네이티브에 연된된 기능을 호출 합니다.
 * @param arg {object} 네이티브에 전달할 메소드
 * @param arg.command {string} 네이티브 함수 명
 * @param arg.payload {object} 네이티브 함수에 전달할 데이터
 * @param arg.subscribe {function} 결과를 받을 고차 함수
 */
WebBridge.sendMessage({
    command: 'setToken',
    payload: {tokenId: 't112233'},
    subscribe: function(result) {
        console.log('setToken', result);
        addList('setToken: ' + JSON.stringify(result));
    }
});
```


## 안드로이드 샘플

자바스크립트의 `WebBridge.sendMessage` 를 통해 command에 해당 하는 함수가 수행 됩니다.

해당 함수의 실행시 함수로 전달할 값과 함수 수행 결과 및 자바스크립트에 결과값을 전달하기 위한 함수 아이디를 JSON 포멧으로 전달 합니다.

전달값 포멧

```json
{
    "data": {}, // 네이티브 함수에 전달된 데이터 값
    "messageHook": "" // 네이티브 함수 수행후 전달할 함수 아이디값
}
```

```kt
class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        webView.addJavascriptInterface(AndroidBridge(this), "webApp")
        webView.loadUrl("http://...")

        // 자바스크립트에 구현된 함수 호출
        var button = findViewById<Button>(R.id.button)
        button.setOnClickListener { reverseBridge("javascriptCall", "") }
    }

    fun reverseBridge(messageHook:String, result: String) {
        Handler(Looper.getMainLooper()).postDelayed({
            // 자바스크립의 함수를 수행 합니다.
            webView.loadUrl("javascript:webApp."+messageHook+"("+result+")")
        }, 100)
    }

    /**
     * 웹뷰 인터페이스와 통신할 브릿지 객체
     */
    class AndroidBridge(private val mainAct: MainActivity) {
        private var token = ""
        @JavascriptInterface
        fun setToken(msg: String) {
            var json = JSONObject(msg)
            // 네이티브에 전달된 데이터 값
            var data = json.getJSONObject("data")
            // 네이티브 함수 처리후
            // 호출할 자바스크립트 함수
            var messageHook = json.getString("messageHook")

            token = data.getString("tokenId")
            // 자바스크립트 함수 호출
            mainAct.reverseBridge(messageHook, json.toString())
        }

        @JavascriptInterface
        fun getToken(msg: String) {
            var json = JSONObject(msg)
            var data = json.getJSONObject("data")
            var messageHook = json.getString("messageHook")

            var result = JSONObject()
            result.put("tokenId", token)
            mainAct.reverseBridge(messageHook, result.toString())
        }
    }
}
```
