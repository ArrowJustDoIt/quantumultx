/*************************
亚马逊商品价格监控
*************************/
//var url = "https://www.amazon.cn/gp/product/B07MFZXR1B?smid=A2EDK7H33M5FFG&psc=1";
//var price = 1642;
const url = 'https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json';

const bodyFilter = 'var result = JSON.parse(body); return JSON.stringify(result[167]);';

const myRequest = {
    url: url,
    opts:{'filter': bodyFilter}
};

$task.fetch(myRequest).then(response => {
    console.log(response.body);
    $notify("T", "S", response.body);
    $done();
}, reason => {
    $done();
    // reason.error
});
