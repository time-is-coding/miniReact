# fetch相关
> 最近有对接类似于chartGPT回答问题的接口，踩坑记录

### 获取数据方式不同
fetch请求不同于XMLHttpRequest请求，是一种新的请求方式，返回的数据为stream数据，返回结果后需要使用方法获取数据</br>
   response.text() -- 得到文本字符串</br>
   response.json() -- 得到 json 对象</br>
   response.blob() -- 得到二进制 blob 对象</br>
   response.formData() -- 得到 fromData 表单对象</br>
   response.arrayBuffer() -- 得到二进制 arrayBuffer 对象</br>
   response.getReader() -- 得到二进制 BufferReader 对象</br>
```js
fetch("yourUrl",{
    body: JSON.stringify(params)
}).then(res=>{
    return res.Text()
})
```
### 抛出错误的方式不同
fetch请求只要获得响应不会抛出错误，可以使用response.ok判断是否请求成功，返回boolean值，200-299返回true。
```tsx
fetch("yourUrl",{
    body: JSON.stringify(params)
}).then(res=>{
    return res.body.Text()
}).catch(err => {
// mei'you'xiang'yin   
})
```
 
### fetch返回数据方式不同
接口返回的数据有两种情况，一种是所有的数据收到再统一接收，一种是流式数据，获得字符串为切片数据，会有被截断的情况，需要进行数据的容错处理，而使用postMan得到的数据是处理好的每一条都是正常的切片，所以很容易自己请求是不是那里没写对错觉
> 流式数据响应头 respose Header中会有</br>
> ![img.png](img.png)

### 处理流式数据
```tsx
const postMsg = async (data: any) => {
    const res = await fetch("url", {
        method: "POST",
        headers: {"Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (res.status && res.status !== 200){
        return false;
    }
    return res?.body?.getReader();
};
```