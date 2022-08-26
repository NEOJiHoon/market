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
        success : function(data){
            console.log('data: ', data);
            if (data === 'success') {
                sessionStorage.setItem("id", params.memId);
                location.href = '/';
            } else {
                alert(data);
            }
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