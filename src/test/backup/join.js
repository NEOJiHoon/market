function join() {
    var params ={
        memId: $('#memId').val(),
        memNm: $('#memNm').val(),
        nicNm: $('#nicNm').val(),
        memPw: $('#memPw').val(),
        memCp: $('#memCp').val()
    }
    console.log('join', params);

    $.ajax({
        type : "POST",
        url : "/member",
        contentType : "application/json",
        data :JSON.stringify(params),
        success : function(data){
            console.log('success', data); // Data는 서버에서 준 데이터
            if (data === -2) {
                alert("아이디가 중복됐습니다. 다른 아이디로 가입해주세요.");
            } else if (data === 1) {
                alert("가입이 완료되었습니다.");
                location.href = '/item-list.html';
            } else if (data === -3) {
                alert("ID를 입력해 주세요.");
            } else if (data === -4) {
                alert("이름을 입력해 주세요.");
            } else if (data === -5) {
                alert("닉네임을 입력해 주세요.");
            } else if (data === -6) {
                alert("패스워드를 입력해 주세요.");
            } else if (data === -7) {
                alert("휴대폰번호를 입력해 주세요.");
            } else {
                alert("가입처리 중 오류가 발생했습니다.");
            }
        },
        error : function (error){
            alert(error);
        }
    });
}
