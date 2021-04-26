/*************************
86Bus库存监控
*************************/
//商品链接
const url = "https://www.kdwcbus.cn/kdwc/api/wap/line/saleRecord";
//监控价格
const price = 1642;

const method = "POST";
const headers =  {
    "Content-Type": "application/json"
};
var data = {"lineId":70,"time":"06:50"};

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: JSON.stringify(data)
};

$task.fetch(myRequest).then(response => {
    const ret = response.body;
    
    console.log(ret);
    
    // if(amazon.price <= price){
    //     $notify(
    //         `🎉🎉🎉亚马逊商品价格监控 ¥${amazon.price}`,
    //         `商品名: ${amazon.title}`,
    //         `当前价格: ${amazon.price}`,
    //         {
    //             "open-url": url,
    //             "media-url": "",
    //         }
    //     );
    // }
    $done();
}, reason => {
    // reason.error
    console.log(reason.error);
    $done();
});
