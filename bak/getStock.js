var request = require('request');

function doSomething(stockid, callback) {
    var options = {
        url:
            'https://query1.finance.yahoo.com/v7/finance/chart/' +
            stockid +
            '?range=1d&interval=1m&indicators=quote&includeTimestamps=true',
        method: 'GET',
    };

    request(options, function (error, res, body) {
        console.log(options.url);
        callback(body);
    });
}

var stockid = 'AAPL';

doSomething(stockid, function (content) {
    console.log(content);
});
