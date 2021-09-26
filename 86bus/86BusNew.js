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
var data = "sid=81623050441a472d9f7b16ce0eee9aad_50706394&id=496&timetable_start_date=2021-09-26";

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
    if(jsonObj["error_code"] == 0){
        jsonObj["info"]["timetable"]["06:50"].forEach(function(e){
                var unSale = e.seatcount - e.buy_num;
                if(unSale > 0){
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
