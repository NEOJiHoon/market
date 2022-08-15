$(document).ready(function () {
    goItemList();
});

function goItemList() {
    $("#main").load("/main/item-list/item-list.html");
}

function goItemAdd() {
    $("#main").load("/main/item-add/item-add.html");
}