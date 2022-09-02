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

// 첫번째 이미지에 변경(이벤트)이 발생한 경우에 수행될 함수를 등록한다.
$("#image").change(function (e){
    if (e.target.files.length > 0) {
        // 선택된 이미지가 있는 경우
        var reader = new FileReader();
        // 리더에 이미지 로드 이벤트가 발생할 때 수행될 함수를 등록한다.
        reader.onload = function (e) {
            // image-one-display 에 이미지를 변경한다.
            $("#image-one-display").attr('src', e.target.result);
        };
        // 리더로 선택된 이미지를 읽는다. (이미지를 읽음으로 인해 위의 onload 이벤트가 발생함)
        reader.readAsDataURL(e.target.files[0]);
    } else {
        // 선택된 이미지가 없는 경우 (기본이미지(로켓)로 복구)
        $("#image-one-display").attr('src', '/img/undraw_rocket.svg');
    }
});

// 두번째 이미지에 변경(이벤트)이 발생한 경우에 수행될 함수를 등록한다.
$("#image-two").change(function (e){
    if (e.target.files.length > 0) {
        // 선택된 이미지가 있는 경우
        var reader = new FileReader();
        // 리더에 이미지 로드 이벤트가 발생할 때 수행될 함수를 등록한다.
        reader.onload = function (e) {
            // imager-two-display 에 이미지를 변경한다.
            $("#image-two-display").attr('src', e.target.result);
        };
        // 리더로 선택된 이미지를 읽는다. (이미지를 읽음으로 인해 위의 onload 이벤트가 발생함)
        reader.readAsDataURL(e.target.files[0]);
    } else {
        // 선택된 이미지가 없는 경우 (기본이미지(로켓)로 복구)
        $("#image-two-display").attr('src', '/img/undraw_rocket.svg');
    }
});

// 세번째 이미지에 변경(이벤트)이 발생한 경우에 수행됨 함수를 등록한다.
$("#image-three").change(function (e) {
   if (e.target.files.length > 0) {
       // 선택된 이미지가 있는 경우
       var reader = new FileReader();
       // 리더에 이미지 로드 이벤트가 발생할 때 수행될 함수를 등록한다.
       reader.onload = function (e) {
           // image-three-display 에 이미지를 변경한다.
           $("#image-three-display").attr('src', e.target.result);
       };
       // 리더로 선택된 이미지를 읽는다. (이미지를 읽음으로 인해 위의 onload 이벤트가 발생함)
       reader.readAsDataURL(e.target.files[0]);
   } else {
       // 선택된 이미지가 없는 경우 (기본이미지(로켓)로 복구)
       $("#image-three-display").attr('src', '/img/undraw_rocket.svg');
   }
});


