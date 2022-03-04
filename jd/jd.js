/*************************
京东商品价格监控
*************************/
//商品链接
const url = "https://cd.jd.com/stocks?type=getstocks&skuIds=100033551654&area=19_1601_50283_53526";
// const url = "https://item-soa.jd.com/getWareBusiness?callback=jQuery5862734&skuId=100033551654&cat=652%2C12345%2C12349&area=19_1601_50283_53526&shopId=1000091849&venderId=1000091849&paramJson=%7B%22platform2%22%3A%221%22%2C%22specialAttrStr%22%3A%22p0pp1ppppppp2pppppppppppp%22%2C%22skuMarkStr%22%3A%2200%22%7D&num=1";


const method = "GET";
const headers =  {
    "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"
};
const myRequest = {
    url: url,
    method: method,
    headers: headers,
};

$task.fetch(myRequest).then(response => {
    const html = response.body;
    // const tempH = html.substr(html.indexOf("(") + 1)
    // const a= tempH.substr(0, tempH.lastIndexOf(')'))
    var jstr = JSON.parse(a);
    if(jstr["100033551654"]["StockState"] == 34){
        $notify(
            `🎉🎉🎉爱奇艺有货啦`,
            `商品名: `,
            `当前价格: `,
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
