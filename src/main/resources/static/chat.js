var uri = 'ws://localhost:8080/chat/';
var websocket;
var output;
var content;

var memId = prompt("what's your name?");

var sendMessageObj = {};

function  init() {
    output = document.getElementById("output");
    content = document.getElementById("content");
    connect();
}

function connect() {
    if (!websocket) {
        websocket = new WebSocket(uri + memId);
        websocket.onopen = function (evt) {
            console.log(memId + " 님 반갑습니다.");
        };
        websocket.onmessage = function (evt) {
            var itemChat = JSON.parse(evt.data);
            console.log("ItemChat", itemChat);
        }

    }
}

function disconnect() {
    if (websocket) {
        websocket.close();
    }
    console.log(memId + " 님이 퇴장하였습니다.");
}

function sendMessage() {
    var message = content.value;
    sendMessageObj.memId = memId;
    sendMessageObj.msg = message;
    console.log('sendMessageObj', sendMessageObj);
    websocket.send(JSON.stringify(sendMessageObj));
}



window.addEventListener("load", init, false);