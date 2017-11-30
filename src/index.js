const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();

const config = {
    channelAccessToken: "y5dQuFSNT2nKdOR7tZRyuivJag56imvnuD33E+6nKDTQQsQnGgW/fp+czUAGLzfD7Gx+tv5kJ+7DfJZHKfQAuS051Uw2f9JaFAJe1+z+AkudSmoR4kIdSXLBk04CALuJAOrFpMpoAD0ET3NibpNBhQdB04t89/1O/w1cDnyilFU=",
    channelSecret: "811a41c998754baaff7e2c39f6ffd20f"
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});