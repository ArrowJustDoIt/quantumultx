/*************************
京东商品价格监控
*************************/
//商品链接
const url = "https://item.jd.com/100033551654.html";
// const url = "https://item.jd.com/100002718287.html";
//监控价格
const price = 1642;

const method = "GET";
const headers =  {
    "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"
};
var parsers = {
    // title: new RegExp(/id="store-prompt" class="store-prompt"><strong>(.+)<\/strong>/, "i"),
    // title: new RegExp(/id="store-prompt" .+><strong>(.+)<\/strong>/, "i"),
    title: new RegExp(/(\d+)/, "i"),
};
const myRequest = {
    url: url,
    method: method,
    headers: headers,
};

/*\\

<div id="store-prompt" class="store-prompt"><strong>无货</strong>，此商品暂时售完</div>


<div id="store-prompt" class="store-prompt"><strong>有货</strong></div>
*/
$task.fetch(myRequest).then(response => {
    const html = response.body;
    console.log(html.match(parsers.title));
    console.log(html);
    
    /*const amazon = {
        title: html.match(parsers.title)[1],
    };
    console.log(amazon.title);
    if(amazon.title == "有货"){
        $notify(
            `🎉🎉🎉爱奇艺有货啦 ¥${amazon.title}`,
            {
                "open-url": url,
                "media-url": "",
            }
        );
    }*/
    $done();
}, reason => {
    // reason.error
    console.log(reason.error);
    $done();
});
