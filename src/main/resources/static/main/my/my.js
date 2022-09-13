$.ajax({
    type:"GET",
    url:"/member?memId=" + g_login_id,
    success: function (member){ // member 는 응답데이터 (변수명은 자유롭게 지을 수 있음 member 로 지은 것은 변수명에 의미를 부여하기 위함
        console.log("member: ", member);
        $("#memId").val(member.memId);
        $("#nicNm").val(member.nicNm);
        $("#memCp").val(member.memCp);
        $("#memNm").val(member.memNm);

        if (member.memImg) {
            // 성공 응답으로 받은 변수 member 에 memImg 의 값이 있는 경우
            $("#login-img").attr("src", "data:image/jpg;base64," + member.memImg); // 오른쪽 상단 작은 이미지 변경
            $("#my-img").attr("src", "data:image/jpg;base64," + member.memImg); // 프로필 이미지 변경
            // 추가적으로 페이지 이동간에도 로그인 이미지를 유지하기 위해 세션스토리지에 해당 이미지를 저장
            sessionStorage.setItem("memImg", member.memImg); // 세션스토리지에 다음 정보로 저장 {"memImg", "이미지 데이터..."}
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