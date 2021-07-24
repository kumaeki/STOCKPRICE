import express from 'express';
import cors from 'cors';
import { readFile,readFileSync, writeFile,readdir, readdirSync } from 'fs';
import request from 'request';
import axios from 'axios';

var app = express();
app.use(cors());
app.use(express.json());

app.get('/searchYahoo', function (req, res) {
    var stockCode = req.query.code;
    getStockInfo(stockCode, function (content) {
        res.end(content);
    });
});

 function asyncgetStockInfo(stockid, callback) {
    var options = {
        url:
            'https://query1.finance.yahoo.com/v7/finance/chart/' + stockid +'?range=1d&interval=1d&indicators=quote&includeTimestamps=true',
            //'?range=1d&interval=1m&indicators=quote&includeTimestamps=true',
        method: 'GET',
    };

    request(options, function (error, res, body) {
        //console.log(body);
        callback(body);
    });
}

async function getStockInfo2(stockid) {
    var url= 'https://query1.finance.yahoo.com/v7/finance/chart/' + stockid +'?range=1d&interval=1d&indicators=quote&includeTimestamps=true';
    var data = await axios.get(url);
    return data;
}



app.get('/getAll',function(req,res){
    var path = './Data/';
    var info = [];
    const getInfo = function(path){
        return new Promise((resolve, reject) =>{
            
        });
    }
    readdir(path, function(err,files){
        files.forEach(async function(file){
            console.log(path + file)
            var data = JSON.parse(readFileSync(path + file));
            var code = data.code;
            var result = await getStockInfo2(code);
            var price = result.data.chart.result[0].meta.regularMarketPrice;
            var result = {code : code,cost:data.cost,share:data.share,currency:data.currency, price : price};
            info.push(result);
        });
    });
    console.log(info);
});

app.listen(8081, function () {
    console.log('get json from file : http://127.0.0.1:8081/searchFile');
    console.log('get json from url : http://127.0.0.1:8081/searchYahoo');
});
