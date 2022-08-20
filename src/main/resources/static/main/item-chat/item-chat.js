$(document).ready(function(){
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });
});

// 로그인한 사람은 '나' 글을 보내는 사람
var toMemId = sessionStorage.getItem("id");

var uri = 'ws://localhost:8080/chat/';
var websocket;
var chatInput; // 채팅을 입력한 인풋박스
var chatList; // 채팅 내역 (대화 내역)
var msgObj = {}; // 채팅정보 (보내는이, 받는이, 상품번호, 메시지 시간등)

function init() {
    // 판매자 이름 채팅창 화면에 표시
    $("#seller_name").html(g_selected_mem_id);

    chatList = $("#chat-list");
    chatInput = $("#chat-input");
    connect();

    $.ajax({
        type:"GET",
        url: "/item/chat?memId=" + g_selected_mem_id + "&itemNo=" + g_selected_item_no + "&toMemId=" + toMemId,
        success: function (chats){
            console.log("chats: ", chats);
            chatList.html("");
            for (var i = 0; i < chats.length; i++) {
                chatList.append(makeHtmlMsg(chats[i].msg, chats[i].createDt));
            }
        }
    });
}

function makeHtmlMsg(msg, creatDt) {
    return "<div class=\"d-flex justify-content-end mb-4\">"
        + "<div class=\"msg_cotainer_send\">"
        + msg
        + "<span class=\"msg_time_send\">"
        + moment(creatDt).format('LT');
    + "</span></div></div>";
}

function connect() {
    if (!websocket) {
        websocket = new WebSocket(uri + toMemId + '/' + g_selected_mem_id + '/' + g_selected_item_no + '/1' );
        websocket.onopen = function (evt) {
            console.log(toMemId + "입장!");
        };
        websocket.onmessage = function (evt) {
            var itemChat = JSON.parse(evt.data);
            console.log(itemChat.memId + " : " + itemChat.msg);
        };
    }
}

function sendMessage() {
    var msg = chatInput.val();
    console.log("메세지: ", msg);

    var sendMessageObj = {
        "msg": msg
    }

    websocket.send(JSON.stringify(sendMessageObj));
    chatInput.val("");

    var htmlMsg = makeHtmlMsg(msg, moment());

    chatList.append(htmlMsg);
}

init();