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

// 상품분류 조회를 위한 글로벌변수 선언
// 기본값은 0(전체)으로 (1:의류, 2:가전, 3:도서, 4:식품, 5:주방, 6:생활잡화)
var g_item_type = 0;

function goItemTypeList(itemTp) {
    console.log("goItemTypeList", itemTp);
    g_item_type = itemTp; // 상품분류를 저장하기 위한 글로벌 변수에 파라미터(인자)로 전달된 값을 저잗
    // 그러고나서 html id가 main인 엘리먼트를 item-list.html로 렌더링시킨다.
    $("#main").load("/main/item-list/item-list.html");
}

// 글로벌 변수 선언
var g_chat_alert_item_no; // 채팅알림의 상품번호
var g_chat_alert_buyer_id; // 채팅알림의 구매자ID
var g_chat_alert_buyer_nic_nm; // 채팅알림의 구매자닉네임
var g_chat_alert_buyer_img; // 채팅알림의 구매자 이미지
var g_chat_alert_buyer_title; //채팅알림의 구매자 제목
// 채팅알림의 알림내역을 클릭했을 경우 호출되는 함수
function goChatAlert(itemNo, buyerId, buyerNicNm, buyerImg, buyerTitle) {
    console.log('goChatAlert', itemNo, buyerId, buyerNicNm, buyerImg, buyerTitle);
    g_chat_alert_item_no = itemNo;
    g_chat_alert_buyer_id = buyerId;
    g_chat_alert_buyer_nic_nm = buyerNicNm;
    g_chat_alert_buyer_img = buyerImg;
    g_chat_alert_buyer_title = buyerTitle;
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
            if (list.length === 0) {
                // 채팅 알림 내역이 없는 경우
                $("#chat-alert-counter").hide();
            } else {
                // 채팅 알림 내역이 있는 경우 -> 알림 갯수를 표시
                $("#chat-alert-counter").html(list.length);
            }
            $("#chat-alert-data-list").html(""); // 채팅알림내역을 초기화(전부 지우고)
            for (var i in list) {
                // 채팅알림내역을 list의 갯수 만큼 append 붙힌다.
                // 붙힐 때 makeChatAlertHtml 함수를 적용해서 스타일이 적용된 html로 append 붙힌다.
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
        "onclick=\"goChatAlert(" + chatAlert.itemNo + ", '" + chatAlert.toMemId + "', '"
                     + chatAlert.nicNm + "', '" + chatAlert.memImg + "', '" + chatAlert.title + "')\">" +
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

// 검색단어를 저장하기 위한 글로벌 변수
var g_search_word = "";

// PC에서 검색버튼을 누른 경우 수행
function searchItemPc() {
    // 검색단어를 입력창에 가져와 글로벌변수에 저장한다.
    g_search_word = $("#search-item-text-pc").val();
    // 상품목록 페이지를 id가 main인 html 엘리먼트에 로드(렌더링)(load)한다.
    $("#main").load("/main/item-list/item-list.html");
}

// 모바일에서 검색버튼을 누른 경우 수행
function searchItemMob() {
    // 검색단어를 입력창에 가져와 글로벌변수에 저장한다.
    g_search_word = $("#search-item-text-mob").val();
    // 상품목록 페이지를 id가 main인 html 엘리먼트에 로드(렌더링)(load)한다.
    $("#main").load("/main/item-list/item-list.html");
}

function searchKeyDownPc() {
    // 엔터키는 13dla
    if (event.keyCode === 13) {
        searchItemPc(); // PC에서 검색버튼 눌렀을 때 호출되는 함수 호출
    }
}



