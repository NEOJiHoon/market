function isLogin() {
    $.ajax({
        type: "GET",
        url: "/login/is",
        success: function(res){
            console.log("res: ", res);
            if (res === -1) {
                alert("권한이 없습니다.");
                location.href = '/login.html';
            }
        }
    });
}
isLogin();
function cancel() {
    goItemList();
}


function createItem() {
    var params = {
        title: $('#subject').val(),
        price: $('#price').val(),
        contents: $('#item-content').val(),
        itemTp: $('#item-type').val() // 상품분류가 함께 전송되도록 추가
    }
    const imageInput = $('#image')[0];
    console.log('imageInput', imageInput.files);
    if (imageInput.files.length === 0) {
        alert("파일을 선택해주세요.");
        return;
    }
    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("item", JSON.stringify(params));

    // 추가 이미지가 있는 경우 폼에 추가한다.
    if ($('#image-two')[0].files.length > 0) {
        formData.append("imageTwo", $('#image-two')[0].files[0]);
    }
    if ($('#image-three')[0].files.length > 0) {
        formData.append("imageThree", $('#image-three')[0].files[0]);
    }

    $.ajax({
        type:"POST",
        url: "/item",
        processData: false,
        contentType: false,
        data: formData,
        success: function (res) {
            console.log("res: ", res);
            if (res === -1) {
                alert("권한이 없습니다.");
                location.href = '/login.html';
            } else {
                alert("성공");
                goItemList();
            }
        },
        err: function(err){
            console.log("err:", err);
            alert("오류가 발생하였습니다.");
        }
    });
}



