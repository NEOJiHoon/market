$.ajax({
    type:"GET",
    url:"/member?memId=" + g_login_id,
    success: function (member){
        console.log("member: ", member);
        $("#memId").val(member.memId);
        $("#nicNm").val(member.nicNm);
        $("#memCp").val(member.memCp);
        $("#memNm").val(member.memNm);

        if (member.memImg) {
            $("#login-img").attr("src", "data:image/jpg;base64," + member.memImg);
            $("#my-img").attr("src", "data:image/jpg;base64," + member.memImg);
        }
    }
});

function updateMy() {
    var member = {
        memId : $("#memId").val(),
        memNm : $("#memNm").val(),
        nicNm : $("#nicNm").val(),
        memPw : $("#memPw").val(),
        memCp : $("#memCp").val()
    };
    console.log('member: ', member);

    const formData = new FormData();
    formData.append("member", JSON.stringify(member));

    const imageInput = $('#memImg')[0];
    if (imageInput.files.length > 0) {
        // 이미지를 첨부한 경우
        formData.append("memImg", imageInput.files[0]);
    }

    $.ajax({
        type: "PUT",
        url: "/member",
        processData: false,
        contentType: false,
        data: formData,
        success: function (res) {
            console.log("res", res);
            if (res === 1) {
                alert("성공");
                myRendering();
            }
        }
    });
}