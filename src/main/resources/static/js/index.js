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

// 글로벌(전역으로 사용하기 위해) 변수 2개 선언
var g_selected_mem_id;
var g_selected_item_no;
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

} else {
    // 로그인이 안 된 경우
    $("#login-id-menu").detach();
    $("#login-img").detach();
    $("#login-id").click(function() {
        location.href="/login.html";
    });
}

function logout() {
    $.ajax({
        type : "GET",
        url : "/logout",
        success : function(data){
            console.log('data: ', data);
            if (data === 'success') {
                sessionStorage.removeItem("id");
                location.href = '/';
            }
        }
    });
}