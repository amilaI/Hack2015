"use strict"; //Defines that JavaScript code should be executed in "strict mode".The "use strict" directive is new in JavaScript 1.8.5 (ECMAScript version 5).

var express = require('express');
var http = require('http');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 8081);
app.use(express.static(__dirname + '/app/'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(8081,function(){
	console.log("RRR MS console is listening to 8081");
});

//This route will be hanling the Real Education user authentication
app.post('/createReleaseNode', function(req, res , next) {


    if(req && req.body.projectKEY && req.body.selectedVersionName){

            var apiPortalURL = "http://localhost:8080/createRelease";

            request({
                url: apiPortalURL,
                qs: {},
                json: req.body,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, function(error, response, body){

                if(error) {
                    console.log("error "+error);
                    res.sendStatus(error);
                } else {
                    console.log(response.statusCode, body);
                    res.status(response.statusCode);
                    res.sendStatus(response.statusCode);
                }
            });

    }else{
            res.send('authentication failed.login Id or password missing');
    }

});


app.get('/getJenkinsData', function(req, res , next) {


            var apiPortalURL = "http://10.52.133.54:8080/job/MLP_Admin_Tool_Staging_BVT/10/testReport/api/json?pretty=true";

            request({
                url: apiPortalURL,
                qs: {},
                json: req.body,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, function(error, response, body){

                if(error) {
                    console.log("error "+error);
                    res.sendStatus(error);
                } else {
                    console.log(response.statusCode, body);
                    res.send(response.body);
                }
            });



});