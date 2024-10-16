var Cat = require("../models/cat").Cat


module.exports = async function(req,res,next){
    res.locals.nav = []

   var menu =  await Cat.find(null,{_id:0,title:1,nick:1});
   if (menu.length != 0) {
    res.locals.nav = menu;
   }
   next();
}


