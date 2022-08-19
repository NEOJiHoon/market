function getItem() {
    $.ajax({
        type: "GET",
        url: "/item/detail?memId=" + g_selected_mem_id + "&itemNo=" + g_selected_item_no,
        success: function(res){
            console.log("res: ", res);
            if (res) {
                $("#title").html("").append(res.title);
                $("#memId").html("판매자: ").append(res.memId);
                $("#price").html("가격: ").append(res.price + '원');
                $("#contents").html("").append(res.contents);

                $("#img_l_1").attr('src', "data:image/jpg;base64," + res.imgOne);
                $("#img_s_1").attr('src', "data:image/jpg;base64," + res.imgOne);
            } else {
                location.href = "/";
            }


        }
    });
}

getItem();

function goChat() {
    var loginId = sessionStorage.getItem("id");
    if (loginId) {
        // 로그인한 경우
        location.href="/item-chat.html?memId=" + memId + "&itemNo=" + itemNo;
    } else {
        // 로그인 안 한 경우
        location.href="/login.html";
    }
}

function deleteItem() {
    if (confirm("삭제하시겠습니까?")) {
        $.ajax({
            type: "DELETE",
            url: "/item?memId=" + g_selected_mem_id + "&itemNo=" + g_selected_item_no,
            success: function(res){
                console.log("res: ", res);
                if (res === 1) {
                    alert("삭제 되었습니다.");
                    location.href = "/";
                } else if (res === -1) {
                    alert("삭제할 권한이 없습니다.");
                } else if (res === -2) {
                    alert("다른사람의 글을 삭제할 수 없습니다.");
                }
            }
        });
    }
}

var id = sessionStorage.getItem("id");
if (id !== g_selected_mem_id) {
    $("#btn-del").remove();
}