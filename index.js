var express = require('express'),
app = express(),
path = require("path"),
mysql=require("mysql"),
moment=require("moment"),
url=require('url'),
bodyParser = require('body-parser'),
con = mysql.createConnection({
    host:"localhost",
    user:"puji",
    password:"puji"
});
var sql = "select url,pic,packagetype,description from irham.clients";
app.engine('html', require('ejs').renderFile);
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname+'/views'));
app.locals.moment = moment;
app.use(bodyParser.urlencoded({
	extended:true
}))
con.connect(function(err){
    if(err)throw err;
    console.log("Connected");
    con.query(sql,function(err,result){
        if(err)throw err;
        console.log(result);
    })
});

app.get('/',function(req,res){
    console.log("Connected");
    con.query(sql,function(err,result){
        if(err)throw err;
        console.log(result);
        res.render('home.html',{title:'Webdev',username:"Dude",jaminan1bpkb:result});
    })
});
function addclient(req,callback){
    console.log("req : ",req.body);
  var sql = "INSERT INTO irham.clients (url, pic,packagetype,description,createdAt) VALUES ('"+req.body.url+"','"+req.body.pic+"','1','"+req.body.description+"',now())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}
app.post('/zaveclient',function(req,res){
	addclient(req,function(error,success){
		if(error){
			console.log("error menyimpan");
			res.sendStatus(error);
		}else{
			console.log("sukses menyimpan "+success);
			res.sendStatus('{"result":'+success+'}');
		}
	})
});
app.listen(process.env.PORT || 2000);