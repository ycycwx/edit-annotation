#!/usr/bin/env node

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var jf = require('jsonfile');

var app = express();
var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));     // to support URL-encoded bodies
app.use(morgan('dev')); 					// log every request to the console
app.use(methodOverride()); 					// simulate DELETE and PUT
app.use(express.static(__dirname));
app.use(express.static(__dirname, './views/'));

app.get('/', function(req, res) {
    res.render('editor.html', {});
});

app.post('/', function(req, res) {
    console.log("POST to /")
    console.log(req.body.name);
    filename = './results/' + req.body.name + '.json';
    data     = req.body.data;
    fs.exists(filename, function(exists) { 
        if (exists) { 
            console.log('file \"' + filename + '\" exist');
            // Remove file first
            fs.unlink(filename, function (err) {
                if (err) throw err;
                console.log('successfully deleted ' + filename);
            }); 
        }

        jf.writeFile(filename, data, function(err) {
            if (err) throw err;
            console.log('the json data was written to file!');
        });
    }); 
});

// app.get('/', function(req, res){
//   res.render('editor.html', {});
//   // console.log('res\t' + res);
//   // console.log('req\t' + req);
//   // var p = "./data/"
//   // var files = fs.readdirSync('./data/');
//   // res.send(files);
//   // console.log(req.body.msg);
// });

// app.post('/label', function(req, res){
//     console.log("POST to /label");

//     console.log(req.body.msg);
//     console.log(req.body.filename);

//     var item = req.body.msg;
//     var name = req.body.filename;

//     var res = [];

//     for (var i = 0; i < item.length; i ++) {
//         res.push(item[i].store.name + ":" + item[i].key);
//     }

//     fs.appendFile('./labeled/' + name + '.label', res.join("|") + "\n", function (err) {
//         if (err) throw err;
//         console.log('the "data to append" was appended to file!');
//     });
// });

// app.delete('/label/:name/delete', function(req, res){
//     console.log("Delete to /label");
//     console.log(req.params.name);

//     filename = './labeled/' + req.params.name + '.label'

//     fs.exists(filename, function(exists) { 
//         if (exists) { 
//             console.log('exist');
//             // do something 
//             fs.unlink(filename, function (err) {
//                 if (err) throw err;
//                 console.log('successfully deleted ' + filename);
//             }); 
//         } else {
//             console.log('not exist');
//         }
//     }); 

//     res.send("Success!");
// });

// app.post('/crawler', function(req, res){
//     console.log("POST to /crawler");
//     console.log(req.body.name);

//     var name = req.body.name;

//     var script_path = "ipython3 ./python/spider.py " + name;

//     exec(script_path);
// });


var server = app.listen(7000, function () {

  var host = server.address().address
  var port = server.address().port

  // console.log(json_data ? json_data.length : 'json_data is null or undefined');
  console.log('Example app listening at http://%s:%s', host, port)

});

