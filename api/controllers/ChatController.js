/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  addConv: function(req, res) {
    var data_from_client = req.params.all();
    if (req.isSocket && req.method === 'POST') {
      // this is the message from connect client
      // so add new conversation
      console.log(data_from_client);
      Chat.create(data_from_client).exec(function(error, data_from_client) {
        console.log(data_from_client);
        Chat.publishCreate({id: data_from_client.id, message: data_from_client.message, user: data_from_client.user});
      });
    } else if (req.isSocket) {
      // subscribe client to model changes
      Chat.watch(req.socket);
      console.log('User subscribe to ' + req.socket.id);
    }
  },

  showRooms: function(req, res) {
    console.log(sails);
    var roomNames = JSON.stringify(sails.sockets.rooms());
    res.json({
      message: 'A list of all the rooms: ' + roomNames
    });
  }
};

