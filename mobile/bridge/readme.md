# 모바일 브릿지 샘플

웹뷰에서 스크립트를 이용하여 네이티브 기능을 호출 하는 샘플 페이지

## 자바스크립트

WebBridge.js 스크립트를 HTML파일에 추가합니다.

### 네이트브 객체와 연결

`WebBridge.connect` 메소드를 이용하여 네이트브에서 생성된 브릿지 객체를 연결합니다.

파라미터로 네이티브에서 생성된 브릿지 인터페이스명을 전달합니다.


```js
WebBridge.connect('webApp');
```

## 안드로이드

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        webView.addJavascriptInterface(AndroidBridge(this), "webApp")
        webView.loadUrl("http://...")
    }

    fun reverseBridge(messageHook:String, result: String) {
        Handler(Looper.getMainLooper()).postDelayed({
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
            var data = json.getJSONObject("data")
            var messageHook = json.getString("messageHook")

            token = data.getString("tokenId")
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

## 브릿지 객체

윈도우 상위 객체에 등록된 `bridge` 객체를 통해 네이티브 기능을 호출 합니다.

### 키패드 호출

bridge.showKeypad();

### 키패드 종료

bridge.showKeypad();
