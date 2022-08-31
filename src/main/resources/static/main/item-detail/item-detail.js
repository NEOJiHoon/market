function getItem() {
    $.ajax({
        type: "GET",
        url: "/item/detail?memId=" + g_selected_mem_id + "&itemNo=" + g_selected_item_no,
        success: function(res){
            console.log("res: ", res);
            if (res) {
                $("#title").html("").append(res.title);
                $("#memId").html("판매자: ").append(res.nicNm + " (" + res.memId + ")");
                $("#price").html("가격: ").append(res.price.toLocaleString('ko-KR') + '원');
                $("#contents").html("").append(res.contents);

                if (res.imgOne) {
                    $("#img_l_1").attr('src', "data:image/jpg;base64," + res.imgOne);
                    $("#img_s_1").attr('src', "data:image/jpg;base64," + res.imgOne);
                } else {
                    $("#img_l_1").attr('src', "/img/undraw_rocket.svg");
                    $("#img_s_1").attr('src', "/img/undraw_rocket.svg");
                }
                // 아이템이 판매완료(soldOut)인지 확인해서 '판매완료'버튼을 제거한다.
                if (res.soldOutYn === 'Y') {
                    // html의 id가 btn-sold-out 인 요소(엘리먼트)를 찾아 제거한다.
                    $("#btn-sold-out").detach();
                    // 판매완료인 경우 솔드아웃이미지로 src를 변경한다.
                    $("#img-detail-soldout").attr('src', '/img/soldout.png');
                }
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
        chatRendering();
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

function soldOutItem() {
    if (confirm("판매완료로 변경하시겠습니까?")) {
        $.ajax({
            type: "PUT",
            url: "/item/soldout?memId=" + g_selected_mem_id + "&itemNo=" + g_selected_item_no,
            success: function (res){
                console.log("res: ", res);
                if (res === 1) {
                    alert("판매완료로 변경되었습니다.");
                    location.href = "/";
                } else if (res === -1) {
                    alert("판매완료로 변경할 권한이 없습니다.");
                } else if (res === -2) {
                    alert("다른사람의 글을 판매완료로 변경할 수 없습니다.");
                }
            }
        });
    }
}

// 로그인한 id를 확인하기 위해 브라우저 세션스토리지에서 id를 가져온다.
var id = sessionStorage.getItem("id");
// 세션스토리지에서 가져온 id와 선택한 상품의 판매자id가 다른경우
if (id !== g_selected_mem_id) {
    $("#btn-del").remove(); // 삭제 버튼을 제거한다.
    $("#btn-sold-out").remove(); // 판매완료 버튼을 제거한다.
}

// 로그인한 ID와 선택된 상품의 판매자 ID (g_selected_mem_id)가 동일한 경우
// 이 경우는 판매자와 구매자가 같은 경우로 채팅 버튼을 없앤다.
if (id === g_selected_mem_id) {
    $("#btn-chat").remove();
}