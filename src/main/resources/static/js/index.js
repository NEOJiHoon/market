$(document).ready(function () {
    goItemList();
});

function goItemList() {
    $("#main").load("/main/item-list/item-list.html");
}

function goItemAdd() {
    $("#main").load("/main/item-add/item-add.html");
}

function chatRendering() {
    $("#main").load("/main/item-chat/item-chat.html");
}

function  myRendering() {
    $("#main").load("/main/my/my.html");
}

// 글로벌 변수 선언
var g_chat_alert_item_no; // 채팅알림의 상품번호
var g_chat_alert_buyer_id; // 채팅알림의 구매자ID
// 채팅알림의 알림내역을 클릭했을 경우 호출되는 함수
function goChatAlert(itemNo, buyerId) {
    console.log('goChatAlert', itemNo, buyerId);
    g_chat_alert_item_no = itemNo;
    g_chat_alert_buyer_id = buyerId;
    $("#main").load("/main/item-chat-seller/item-chat-seller.html");
}

// 글로벌(전역으로 사용하기 위해) 변수 2개 선언
var g_selected_mem_id;
var g_selected_item_no;
// 상품목록에서 상품을 클릭했을 경우 호출되는 함수
function goItemDetail(memId, itemNo) {
    g_selected_mem_id = memId;
    g_selected_item_no = itemNo;
    $("#main").load("/main/item-detail/item-detail.html");
}

var g_login_id = sessionStorage.getItem("id");
if (g_login_id) {
    // 로그인이 된 경우
    $("#login-id").html(g_login_id);

    if (sessionStorage.getItem("memImg")) {
        // 세션스토리지에 이미지가 있는 경우, 로그인 옆에 아이콘의 이미지를 교체한다.
        $("#login-img").attr('src', "data:image/jpg;base64," + sessionStorage.getItem("memImg"));
    }

    // 채팅알림 내역을 가져온다.
    getChatAlertList();

} else {
    // 로그인이 안 된 경우
    $("#login-id-menu").detach();
    $("#login-img").detach();
    $("#chat-alert-list").detach();
    $("#login-id").click(function() {
        location.href="/login.html";
    });
}

function getChatAlertList() {
    $.ajax({
        type: "GET",
        url : "/item/chat/alert?memId=" + g_login_id,
        success : function (list){
            console.log('chat alert list: ', list);
            $("#chat-alert-data-list").html("");
            for (var i in list) {
                $("#chat-alert-data-list").append(makeChatAlertHtml(list[i]));
            }
        }
    });
}

function makeChatAlertHtml(chatAlert) {
    var imgHtml = "";
    if (chatAlert.memImg) {
        imgHtml = "<img class=\"rounded-circle\" src=\"data:image/jpg;base64," + chatAlert.memImg +"\">";
    } else {
        imgHtml = "<img class=\"rounded-circle\" src=\"img/undraw_profile.svg\">";
    }
    return "<a class=\"dropdown-item d-flex align-items-center\" href=\"#\" " +
        "onclick=\"goChatAlert(" + chatAlert.itemNo + ", '" + chatAlert.toMemId + "')\">" +
        "    <div class=\"dropdown-list-image mr-3\">" +
        imgHtml +
        "    </div>" +
        "    <div class=\"font-weight-bold\">" +
        "        <div class=\"text-truncate\">" + chatAlert.title + "</div>" +
        "        <div class=\"small text-gray-500\">"+ chatAlert.nicNm +"(" + chatAlert.toMemId +")</div>" +
        "    </div>" +
        "</a>";
}

function logout() {
    $.ajax({
        type : "GET",
        url : "/logout",
        success : function(data){
            console.log('data: ', data);
            if (data === 'success') {
                sessionStorage.removeItem("id");
                sessionStorage.removeItem("memImg");
                location.href = '/';
            }
        }
    });
}