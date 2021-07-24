const https = require('https');
// Bitcoin のレートを json で取得することができるAPI
const URL = "https://query1.finance.yahoo.com/v7/finance/chart/AAPL?range=1d&interval=1m&indicators=quote&includeTimestamps=true";

https.get(URL, function (res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        body += chunk;
    });
    res.on('data', function (chunk) {
        // body の値を json としてパースしている
        //res = JSON.parse(body);
        console.log(body);
    })
  }).on('error', function (e) {
    console.log(e.message);
});