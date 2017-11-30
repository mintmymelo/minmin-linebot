const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();

const config = {
    channelAccessToken: "iz4jrqAaHmI4hRueYLq/inHkuUtK3GEK8+1tJ7DDLPLq4KV4lDkm61klM2o59UpF7Gx+tv5kJ+7DfJZHKfQAuS051Uw2f9JaFAJe1+z+AkuCoJ53d0TGi+8/HlAas7X055k+3Q//EoBfM1sRPts64QdB04t89/1O/w1cDnyilFU=",
    channelSecret: "811a41c998754baaff7e2c39f6ffd20f"
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

app.get('/', (req, res) => {
    res.send('minmin server')
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