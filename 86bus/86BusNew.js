/*************************
86Bus库存监控
*************************/
//商品链接
const url = "https://bus.86xq.com/ajax.php?do=line_info";
//监控价格
const price = 1642;

const method = "POST";
const headers =  {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
};
//双括号里面填入日期即可,比如2021-09-27 填27 多个用逗号分隔,比如27,28,29
const alreadyBuyDate = [27];
var data = "sid=81623050441a472d9f7b16ce0eee9aad_50706394&id=496&timetable_start_date=2021-09-26";

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: data
};

$task.fetch(myRequest).then(response => {
    const ret = response.body;
    jsonObj = JSON.parse(ret)
    var str = ""
    var data = ""
    if(jsonObj["error_code"] == 0){
        jsonObj["info"]["timetable"]["06:50"].forEach(function(e){
                var unSale = e.seatcount - e.buy_num;
                var timearr=e.go_date.replace(" ",":").replace(/\:/g,"-").split("-");

                if(unSale > 0 && !alreadyBuyDate.includes(timearr[timearr.length - 1].toString())){
                    str += e.go_date + ":" + unSale;
                    data += e.go_date + ","
                }
            })
    }
    
    if(str != ""){
        $notify(
            `🎉🎉🎉Bus库存监控,有票啦!!!`,
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
