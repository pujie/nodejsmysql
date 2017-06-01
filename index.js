var express = require('express'),
app = express(),
path = require("path"),
mysql=require("mysql"),
moment=require("moment"),
con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:""
});
var sql = "select url,pic,packagetype,description from irham.clients";
app.engine('html', require('ejs').renderFile);
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname+'/views'));
app.locals.moment = moment;

myquery = function(){
    con.connect(function(err){
        if(err)throw err;
        console.log("Connected");
        con.query(sql,function(err,result){
            if(err)throw err;
            console.log(result);
        })
    });
}

app.get('/',function(req,res){
    con.connect(function(err){
        if(err)throw err;
        console.log("Connected");
        con.query(sql,function(err,result){
            if(err)throw err;
            console.log(result);
            res.render('home.html',{title:'Webdev',username:"Dude",jaminan1bpkb:result});
        })
    });
    
});
app.listen(process.env.PORT || 2000);