function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var memId = getParameter("memId");
var itemNo = getParameter("itemNo");

console.log(memId, itemNo);

function getItem() {
    $.ajax({
        type: "GET",
        url: "/item/detail?memId=" + memId + "&itemNo=" + itemNo,
        success: function(res){
            console.log("res: ", res);
            $("#title").html("").append(res.title);
            $("#memId").html("판매자: ").append(res.memId);
            $("#price").html("가격: ").append(res.price + '원');
            $("#contents").html("").append(res.contents);

            $("#img_l_1").attr('src', "data:image/jpg;base64," + res.imgOne);
            $("#img_s_1").attr('src', "data:image/jpg;base64," + res.imgOne);
        }
    });
}

getItem();