/*************************
亚马逊商品价格监控
*************************/
const url = "https://www.amazon.cn/gp/product/B07MFZXR1B?smid=A2EDK7H33M5FFG&psc=1";
const price = 1642;
const method = "GET";
// const headers = {"Field": "test-header-param"};
const headers = {"Field": "test-header-param"};
// const data = {"info": "abc"};
const parsers = {
    title: new RegExp(/id="priceblock_ourprice" .+>￥(.+)<\/span>/, "i"),
    price: new RegExp(/id="productTitle" .+>(.+)<\/span>/, "i"),
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
    console.log(amazon);
    if(amazon.price <= price){
        $.notify(
            `🎉🎉🎉亚马逊商品价格监控`,
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
