/* importing modules */
var express = require('express');
var Parse = require('parse').Parse;
var Player = require('player');
var audiosprite = require('audiosprite')
var http = require('http');
var fs = require('fs');


/* Inicializa o express */
var app = express();


var file = fs.createWriteStream("./	file.caf");

/* Inicia configurações conversor e player da musica */
var files = ['./file.caf']
var opts = {output: 'result'}

//var player = new Player("./result.mp3");


app.get('/historia/:id', function(req, res, next){
	console.log("ID do cara: " + req.params.id);

	Parse.initialize("lLT4FaRKGEP7O2CFIq7p9g99VOR4qsCH6Seh6BnD", "DQLZI1H8gpmdL2xds9WGQ5WyUQVB8acVHr9fnoaJ");

	var objHistoria = Parse.Object.extend("Historia");
	var query = new Parse.Query(objHistoria);
	query.equalTo("objectId", "qH8lXfA9Bv");
	
	var html = "aa";
	res.write("");
	
	query.first({
  		success: function(object) {
    		console.log("ID Historia: " + object.id);
    		console.log("Descrição: " + object["attributes"].descricao);
			console.log("Titulo: " + object["attributes"].titulo);
    		console.log("ID do autor: " + object["attributes"].autor.id);

    		console.log("Foto URL: " + object["attributes"].foto._url);
    		console.log("Audio URL: " + object["attributes"].audio._url);


    		var titulo = object["attributes"].titulo
    		var descricao = object["attributes"].descricao
    		var audioURL = object["attributes"].audio._url;
    		var fotoURL = object["attributes"].foto._url;

   			html = "<html>" + 
							"<head>"+
								"<title> Audio cool! </title>" +
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
        	});
  		},
  		error: function(error) {
	  		console.log("NAO PEGOU NADA" + error.message);

  		}

	});

	
	// res.end();
	// next();
});

var port = Number(process.env.PORT || 3000);

app.listen(port);
console.log("Server is running ....");


/*
player.play(function(err, player){
  console.log('playend!');
});


// event: on playing 
player.on('playing',function(item){
  console.log('im playing... src:' + item);
});
 
// event: on playend 
player.on('playend',function(item){
  // return a playend item 
  console.log('src:' + item + ' play done, switching to next one ...');
});
 
// event: on error 
player.on('error', function(err){
  // when error occurs 
  console.log(err);
});*/

    		//files = [object["attributes"].audio._url];
			
			/*
    		var request = http.get(audioURL, function(response) {
  				response.pipe(file);
  				console.log("Fiz o download");

  				audiosprite(files, opts, function(err, obj) {
					if (err) return console.error(err)

					console.log(files);
					//player.play();
					console.log(JSON.stringify(obj, null, 2))
				})

			});
    		
    		*/
    		//player = new Player(object["attributes"].audio._url);
    		//player.play();



