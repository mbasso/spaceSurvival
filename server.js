var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app)
  , tools = require('./tools');

app.use(express.static(__dirname));

var clients = {};
var rooms = {};

var Eureca = require('eureca.io');
var eurecaServer = new Eureca.Server({allow:['setId', 'spawnPlayer', 'killPlayer', 'updateState']});

eurecaServer.attach(server);


eurecaServer.onConnect(function (conn) {    
    //console.log('New Client id=%s ', conn.id, conn.remoteAddress);
    var remote = eurecaServer.getClient(conn.id);    
	clients[conn.id] = new tools.client(conn.id, remote);
	remote.setId(conn.id);
});


eurecaServer.onDisconnect(function (conn) {    
    //console.log('Client disconnected ', conn.id);
	var removeId = clients[conn.id].id;
	
	delete clients[conn.id];
	
	killPlayer(conn.id);

});

/*

	createRoom(1, nome);
	clients[conn.id].room = nome;
	----
	deleteRoom(nome);

*/

var createRoom = function (id, name) {
	rooms[name] = new tools.room(id, name);
}

var deleteRoom = function (name) {
	var removeId = rooms[name].id;
	
	delete rooms[name];
	
	for (var c in clients)
	{
		var remote = clients[c].remote;
		
		//update rooms list
		//remote.updateRoomsList();
	}
}

var killPlayer = function(id){
	for (var c in clients)
	{
		var remote = clients[c].remote;
		remote.killPlayer(id);
	}
}

eurecaServer.exports.killPlayer = function(id)
{
	killPlayer(id);
}

eurecaServer.exports.handshake = function()
{
	for (var c in clients)
	{
		var remote = clients[c].remote;
		for (var cc in clients)
		{
			remote.spawnPlayer(clients[cc].id);		
		}
	}
}

eurecaServer.exports.handleKeys = function (keys) {
	var updatedClient = clients[this.connection.id];
	
	for (var c in clients)
	{
		var remote = clients[c].remote;
		remote.updateState(updatedClient.id, keys);
		
		clients[c].lastState = keys;
	}
}

server.listen(8000);