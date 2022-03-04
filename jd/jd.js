/*************************
京东商品价格监控
*************************/
//商品链接
// const url = "https://item.jd.com/100033551654.html";
const url = "https://item-soa.jd.com/getWareBusiness?callback=jQuery911344&skuId=100033551654&cat=17329%2C2577%2C2589&area=19_1601_50258_62835&shopId=1000004123&venderId=1000004123&paramJson=%7B%22platform2%22%3A%22100000000001%22%2C%22specialAttrStr%22%3A%22p0ppppppppp2pppppppppppp%22%2C%22skuMarkStr%22%3A%2200%22%7D&num=1";
// const url = "https://item.jd.com/100002718287.html";

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

/*\\
<span id="postNotice" style=""><small><span>无货</span><b id="postTip"></b></small></span>

<div id="store-prompt" class="store-prompt"><strong>无货</strong>，此商品暂时售完</div>
<div id="store-prompt" class="store-prompt"><strong>有货</strong></div>
*/
$task.fetch(myRequest).then(response => {
    const html = response.body;
    const tempH = html.substr(html.indexOf("(") + 1)
    const a= tempH.substr(0, tempH.lastIndexOf(')'))
    var jstr = JSON.parse(a);
	console.log(jstr["stockInfo"]["stockState"]);
	console.log(jstr)
    
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
