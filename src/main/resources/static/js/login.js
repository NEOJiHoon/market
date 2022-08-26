const loginForm = document.querySelector("#Login");

loginForm.addEventListener("submit", login);

function login(event) {
    event.preventDefault();
    console.log('login');

    var params = {
        memId: $('#memId').val(),
        memPw: $('#memPw').val()
    }

    /*
    var params 변수에 담긴 값

    {
        memId: "j"
        memPw: "111"
    }

    JSON.stringify(params)
    {       memId: "j",   memPw: "111"   }
    memId=j&memPw=111
     */

    $.ajax({
        type : "POST",
        url : "/login",
        contentType : "application/json",
        data : JSON.stringify(params),
        success : function(member){   // 가독성을 위해 member로 변수명을 변경
            // 정상응답인 경우 로그인 성공 (HTTP 상태코드 200)
            console.log('member: ', member); // 멤버 정보를 브라우저 전송에 로그를 찍어본다.
            sessionStorage.setItem("id", member.memId); // 세션스토리지에 다음 정보를 저장 ("id", "j"};
            if (member.memImg) {
                // 멤버의 이미지가 있는 경우 해당 이미지를 세션스토리지에 저장 (세션스토리지는 브라우저의 공간)
                sessionStorage.setItem("memImg", member.memImg); // 세션스토리지에 다음 정보로 저장 {"memImg", "이미지 데이터..."}
            }
            location.href = '/'; // 상품 목록 페이지로 이동
        },
        error : function(error){
            console.log('error: ', error);
            if (error.responseText) {
                alert(error.responseText);
            } else {
                alert('로그인오류');
            }
        }
    });

}