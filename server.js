/* importing modules */
var express = require('express');
var Parse = require('parse').Parse;
var http = require('http');
var fs = require('fs');


/* Inicializa o express */
var app = express();
Parse.initialize("lLT4FaRKGEP7O2CFIq7p9g99VOR4qsCH6Seh6BnD", "DQLZI1H8gpmdL2xds9WGQ5WyUQVB8acVHr9fnoaJ");


app.get('/historia/:id', function(req, res, next){
	console.log("ID do cara: " + req.params.id);
	
	var objectID = req.params.id;

	var objHistoria = Parse.Object.extend("Historia");
	var query = new Parse.Query(objHistoria);
	
	var html = "aa";
	res.write("");
	
	query.get(objectID, {
  		success: function(object) {
  			console.log(object);
    		//console.log("ID Historia: " + object.id);
    		console.log("Descrição: " + object["attributes"].descricao);
			//console.log("Titulo: " + object["attributes"].titulo);
    		//console.log("ID do autor: " + object["attributes"].autor.id);

    		//console.log("Foto URL: " + object["attributes"].foto._url);
    		//console.log("Audio URL: " + object["attributes"].audio._url);

    		
    		var titulo = object["attributes"].titulo;
    		var descricao = object["attributes"].descricao;
    		var audioURL = object["attributes"].audio._url;
    		var fotoURL = object["attributes"].foto._url;

   			html = "<html>" + 
							"<head>"+
								"<title> Share Audio </title>" +
							"</head>" +
							"<body>" +
								"<h2>" + titulo + "</h2>" +
								"<h3>" + descricao + "</h3>" +
								"<img src="+fotoURL+" width='340 height='340' >" +
								"<br><a href="+ audioURL +">Baixe aqui</a>" +
							"</body>"+
						"</html>";

    		
        	res.write(html, function(err){
        		res.end();
        		next();
        	});
  		},
  		error: function(error) {
	  		console.log("NAO PEGOU NADA");

  		}

	});

});

var port = Number(process.env.PORT || 3000);

app.listen(port);
console.log("Server is running ....");
