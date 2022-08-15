$(document).ready(function () {
    goItemList();
});

function goItemList() {
    $("#main").load("/main/item-list/item-list.html");
}

function goItemAdd() {
    $("#main").load("/main/item-add/item-add.html");
}

// 글로벌(전역으로 사용하기 위해) 변수 2개 선언
var g_selected_mem_id;
var g_selected_item_no;
function goItemDetail(memId, itemNo) {
    g_selected_mem_id = memId;
    g_selected_item_no = itemNo;
    $("#main").load("/main/item-detail/item-detail.html");
}