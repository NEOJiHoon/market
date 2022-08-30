$(document).ready(function(){
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });
});

// 로그인한 사람은 '나' 글을 보내는 사람
var toMemId = sessionStorage.getItem("id");

var uri = 'ws://' + window.location.host +'/chat/';
var websocket;
var chatInput; // 채팅을 입력한 인풋박스
var chatList; // 채팅 내역 (대화 내역)
var msgObj = {}; // 채팅정보 (보내는이, 받는이, 상품번호, 메시지 시간등)

function init() {
    $("#buyer_title").html(g_chat_alert_buyer_title); // 구매자 제목(구매하는 상품제목) html 화면 수정
    $("#buyer_id").html(g_chat_alert_buyer_nic_nm + '(' + g_chat_alert_buyer_id + ')'); // 구매자 닉네임(ID) html 화면 수정

    // 구매자 이미지가 있는 경우 그리고 구매자 이미지가 'null'(널문자)가 아닌 경우 (이미지 없는 경우 'null'문자로 들어오는 경우 대비)
    if (g_chat_alert_buyer_img && g_chat_alert_buyer_img !== 'null') {
        // 구매자 이미지가 있으므로 html 의 이미지에 해당하는 부분을 구매자 이미지로 교체
        $("#buyer-chat-img").attr('src', "data:image/jpg;base64," + g_chat_alert_buyer_img);
    }

    chatList = $("#chat-list");
    chatInput = $("#chat-input");
    connect();

    $.ajax({
        type:"GET",
        url: "/item/chat?memId=" + g_login_id + "&itemNo=" + g_chat_alert_item_no + "&toMemId=" + g_chat_alert_buyer_id,
        success: function (chats){
            console.log("chats: ", chats);
            chatList.html("");
            for (var i = 0; i < chats.length; i++) {
                // 채팅 박스 스타일에서 flex-direction: column-reverse; 으로 설정하여 역순으로 보이게 스타일을 처리함
                // 역순으로 보이게 하는 이유는 채팅 스크롤이 항상 하단으로 내려가 있게 하기위해서임
                // 따라서 채팅 내역을 뒤로 붙이는 append 를 사용하지 않고 앞으로 붙이는 prepend로 변경 시킴
                chatList.prepend(makeHtmlMsg(chats[i].msg, chats[i].createDt, chats[i].writerTp));
            }
        }
    });
}

function makeHtmlMsg(msg, creatDt, writerTp) {
    return "<div class=\"d-flex justify-content-" + (writerTp === 0 ? "end" : "start") + " mb-4\">"
        + "<div class=\"msg_cotainer" + (writerTp === 0 ? "_send" : "") + "\">"
        + msg
        + "<span class=\"msg_time" + (writerTp === 0 ? "_send" : "") + "\">"
        + moment(creatDt).format('LT');
    + "</span></div></div>";
}

function connect() {
    if (!websocket) {
        websocket = new WebSocket(uri + g_login_id + '/' + g_chat_alert_buyer_id + '/' + g_chat_alert_item_no + '/0' );
        // 웹소켓이 연결되었을 때 한 번 호출되는 함수
        websocket.onopen = function (evt) {
            console.log(toMemId + "입장!");
        };
        // 웹소켓을 통해서 서버로부터 메시지가 해당 브라우저로 전달받을 때 마다 호출되는 함수
        websocket.onmessage = function (evt) {
            var itemChat = JSON.parse(evt.data);
            console.log(itemChat.memId + " : " + itemChat.msg);
            // 채팅 내역 역순 정렬을 위해 append 를 사용하지 않고 앞으로 붙이는 prepend 로 변경 시킴
            chatList.prepend(makeHtmlMsg(itemChat.msg, moment(), itemChat.writerTp));
        };
    }
}
// 판매자가 글을 쓰고 글 전송버튼을 눌렀을 때 호출되는 함수
function sendMessage() {
    var msg = chatInput.val();
    console.log("메세지: ", msg);

    var sendMessageObj = {
        "msg": msg
    }
    // 웹소켓을 통해 서버로 메시지를 전송
    websocket.send(JSON.stringify(sendMessageObj));
    chatInput.val("");

    var htmlMsg = makeHtmlMsg(msg, moment(), 0); //전송하는 사람은 판매자이므로 0으로 세팅

    // 채팅 내역 역순 정렬을 위해 append 를 사용하지 않고 앞으로 붙이는 prepend 로 변경시킴
    chatList.prepend(htmlMsg);
}

function keyDown() {
    // 엔터키는 13 임
    if (event.keyCode === 13) {
        sendMessage(); // 메시지를 전송 (전송 버튼 클릭시 수행되는 함수와 동일)
    }
}

init();