var login = require("./facebook-chat-api");
var bot = require("./bot");


login('config.json', function(api) {
  api.listen(function(message, closeConnection) {
    console.log(message);

    var msg = bot(message.body, message.sender_name.split(' ')[0], message.thread_id, message.participant_names);
    console.log(msg);

    if(msg.text && msg.text.length > 0) api.sendMessage(msg.text, message.thread_id);
    if(msg.sticker_id) api.sendMessage('', message.thread_id, msg.sticker_id);
  });
});