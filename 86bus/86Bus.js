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
    jsonObj = JSON.parse(ret)
    var str = ""
    var data = ""
    if(jsonObj["total"] !== 0){
        jsonObj["records"].forEach(function(e){
                var unSale = e.totalSeats - e.totalSaled;
                if(unSale >= 0){
                    str += e.recordDate + ":" + unSale + "<br/>";
                    data += e.recordDate + ","
                }
            })
    } 
    console.log(jsonObj);
    
    if(str != ""){
        $notify(
            `🎉🎉🎉Bus库存监控`,
            `日期: ${data}`,
            `余票: ${str}`,
            {
                "open-url": "",
                "media-url": "",
            }
        );
    }
    $done();
}, reason => {
    // reason.error
    console.log(reason.error);
    $done();
});
