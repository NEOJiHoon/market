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

// 판매자의 정보를 가져온다. (필요한 정보로 판매자 닉네임, 아이디, 이미지)
// 가져온 판매자의 정보로 채팅의 판매자 정보 html을 변경한다.
function changeHtmlSellerInfo() {
    $.ajax({
       type: "GET",
       url: "/member?memId=" + g_selected_mem_id,
       success: function (seller) {
           // html id가 seller_name 인 엘리먼트를 찾아서 내용을 변경
           $("#seller_name").html(seller.nicNm + '(' + seller.memId + ')');

           // 판매자의 이미지가 등록된 경우 등록된 이미지로 교체
           if (seller.memImg) {
               $("#seller-chat-img").attr('src', 'data:image/jpg;base64,' + awllwe.mwmImg);
           }
       }
    });
}

function init() {
    // 채팅창 html 변경 (판매자 이미지, 판매자 ID, 판매자 닉네임 등)
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
                // 채팅 박스 스타일에서 flex-direction: column-reverse; 으로 설정하여 역순으로 보이게 스타일을 처리함
                // 역순으로 보이게 하는 이유는 채팅 스크롤이 항상 하단으로 내려가 있게 하기 위해서임
                // 따라서 채팅 내역을 취로 붙이는 append 를 사용하지 않고 앞으로 붙이는 prepend 로 변경 시킴
                chatList.prepend(makeHtmlMsg(chats[i].msg, chats[i].createDt, chats[i].writerTp));
            }
        }
    });
}

function makeHtmlMsg(msg, creatDt, writerTp) {
    return "<div class=\"d-flex justify-content-" + (writerTp === 1 ? "end" : "start") + " mb-4\">"
        + "<div class=\"msg_cotainer" + (writerTp === 1 ? "_send" : "") + "\">"
        + msg
        + "<span class=\"msg_time" + (writerTp === 1 ? "_send" : "") + "\">"
        + moment(creatDt).format('LT');
        + "</span></div></div>";
}

function connect() {
    if (!websocket) {
        websocket = new WebSocket(uri + toMemId + '/' + g_selected_mem_id + '/' + g_selected_item_no + '/1' );
        // 웹소켓이 연결되었을 때 한 번 호출되는 함수
        websocket.onopen = function (evt) {
            console.log(toMemId + "입장!");
        };
        // 웹소켓을 통해서 서버로부터 메시지가 해당 브라우저로 전달받을 때 마다 호출되는 함수
        websocket.onmessage = function (evt) {
            var itemChat = JSON.parse(evt.data);
            console.log(itemChat.memId + " : " + itemChat.msg);
            // 채팅 내역 역순 정렬을 위해 append 를 사용하지 않고 앞으로 붙이는 perpend 로 변경 시킴
            chatList.prepend(makeHtmlMsg(itemChat.msg, moment(), itemChat.writerTp));
        };
    }
}

// 구매자가 글을 쓰고 글 전송버튼을 눌렀을 떄 호출되는 함수
function sendMessage() {
    var msg = chatInput.val();
    console.log("메세지: ", msg);

    var sendMessageObj = {
        "msg": msg
    }
    // 웹소켓을 통해 서버로 메시지를 전송
    websocket.send(JSON.stringify(sendMessageObj));
    chatInput.val("");

    var htmlMsg = makeHtmlMsg(msg, moment(), 1); //글쓴이가 구매자이므로 1번

    // 채팅 내역 역순 정렬을 위해 append 를 사용하지 않고 앞으로 붙이는 prepend 로 변경 시킴
    chatList.prepend(htmlMsg);
}

function keyDown() {
    // 엔터키는 13임
    if (event.keyCode === 13) {
        sendMessage(); // 메시지를 전송 (전송 버튼 클릭시 수행되는 함수와 동임)
    }
}

init();