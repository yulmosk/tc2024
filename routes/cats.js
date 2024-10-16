var express = require('express');
var router = express.Router();
var Cat = require('../models/cat').Cat;
var checkAuth = require("../middlewares/checkAuth.js");


/* GET cats listing. */
router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор, для маршрутов, начинающихся с cats');
});

/* Страница котов */
router.get("/:nick", checkAuth, async function(req, res, next) {
    var cats = await Cat.find({nick: req.params.nick});
    console.log(cats)
    if(!cats.length) return next(new Error("Нет такого котенка в мультфильме Три кота"))
        var cat = cats[0];
        res.render('cat', {
            title: cat.title,
            picture: cat.avatar,
            desc: cat.desc
        })
});


//Hero.find({},{_id:0,title:1,nick:1},callback)


module.exports = router;
