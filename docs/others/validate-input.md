# 只能输入 6 位数字的输入框

监听 input 的 keypress 事件，判断输入的字符是否为数字，如果不是数字则阻止默认事件。

其中设置 `parttern="\d*"`，使得 iPhone 键盘只能输入数字。

```html
<h3>只能输入6位数字</h3>
<p>
    <input
        type="text"
        maxlength="6"
        parttern="\d*"
        onkeypress="return (event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57))"
        style="border: 1px solid;font-size: 16px;"
    />
</p>
```

<script setup>
    import { ref } from 'vue'
    const inputValue = ref(undefined)
</script>

<div flex>
    <input
        v-model="inputValue"
        type="text"
        maxlength="6"
        parttern="\d*"
        onkeypress="return (event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57))"
        style="border: 1px solid;font-size: 16px;"
    />
    <div ml-2>inputValue: {{inputValue}}</div>
</div>

## Reference

+ [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keypress_event)
+ [How to Allow Only Positive Numbers in the Input Number Type](https://www.w3docs.com/snippets/html/how-to-allow-only-positive-numbers-in-the-input-number-type.html)
+ [`<input type="number"\/>` is not showing a number keypad on iOS](https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios)