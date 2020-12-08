/*************************
亚马逊商品价格监控
*************************/
const url = "https://www.amazon.cn/gp/product/B07MFZXR1B?smid=A2EDK7H33M5FFG&psc=1";
const price = 1642;
const method = "GET";
// const headers = {"Field": "test-header-param"};
const headers = {"Field": "test-header-param"};
// const data = {"info": "abc"};

const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
    // body: JSON.stringify(data) // Optional.
};

$task.fetch(myRequest).then(response => {
    // response.statusCode, response.headers, response.body
    console.log(response.body);
    $notify("Title", "Subtitle", response.body); // Success!
    $done();
}, reason => {
    // reason.error
    $notify("Title", "Subtitle", reason.error); // Error!
    $done();
});
