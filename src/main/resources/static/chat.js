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

    }
}

function disconnect() {
    if (websocket) {
        websocket.close();
    }
    console.log(memId + " 님이 퇴장하였습니다.");
}

function sendMessage() {

}

window.addEventListener("load", init, false);