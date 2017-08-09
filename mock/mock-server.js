const express = require('express');
const app = new express();
const fs = require('fs');

const appData = require('../data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;

app.get('/api/seller', function(req, res){
    res.header({'Access-Control-Allow-Origin' : '*'});
    res.json({
        code: 0,
        data: seller
    });
});

app.get('/api/goods', function(req, res){
    res.header({'Access-Control-Allow-Origin': '*'});
    res.json({
        code: 0,
        data: goods
    });
});

app.get('/api/ratings', function(req, res){
    res.header({'Access-Control-Allow-Origin': '*'});
    res.json({
        code: 0,
        data: ratings
    });
});

app.listen(3000);