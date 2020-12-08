/*************************
亚马逊商品价格监控
*************************/
const url = "https://www.amazon.cn/gp/product/B07MFZXR1B?smid=A2EDK7H33M5FFG&psc=1";
const price = 1643;
const method = "GET";
// const headers = {"Field": "test-header-param"};
const headers =  {
    "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"
};
// const data = {"info": "abc"};
var parsers = {
    title: new RegExp(/id="productTitle" .+>\s+(.+)\s+<\/span>/, "i"),
    price: new RegExp(/id="priceblock_ourprice" .+>￥(.+)<\/span>/, "i"),
};
const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
    // body: JSON.stringify(data) // Optional.
};

$task.fetch(myRequest).then(response => {
    const html = response.body;
    const amazon = {
        title: html.match(parsers.title)[1],
        price: html.match(parsers.price)[1],
    };
    console.log(amazon.title + ":" + amazon.price);
    if(amazon.price <= price){
        $.notify(
            `🎉🎉🎉亚马逊商品价格监控 ¥${amazon.price}`,
            `商品名: ${amazon.title}`,
            `当前价格: ${amazon.price}`,
            {
                "open-url": url,
                "media-url": "",
            }
        );
    }
    $done();
}, reason => {
    // reason.error
    console.log(reason.error);
    $notify("Title", "Subtitle", reason.error); // Error!
    $done();
});
