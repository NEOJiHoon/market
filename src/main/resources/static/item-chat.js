$(document).ready(function(){
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });
});

function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// 로그인한 사람은 '나' 글을 보내는 사람
var fromMemId = sessionStorage.getItem("id");

// 글쓴이 글을 받는 사람
var toMemId = getParameter("toMemId");
var itemNo = getParameter("itemNo");

console.log(fromMemId, toMemId, itemNo);