const loginForm = document.querySelector("#Login");

loginForm.addEventListener("submit", login);

function login(event) {
    event.preventDefault();
    console.log('login');

    var params = {
        memId: $('#memId').val(),
        memPw: $('#memPw').val()
    }

    $.ajax({
        type : "POST",
        url : "/login",
        contentType : "application/json",
        data : JSON.stringify(params),
        success : function(data){
            console.log('data: ', data);
            if (data === 'success') {
                location.href = '/item-list.html';
            } else {
                alert(data);
            }
        },
        error : function(error){
            alert('로그인오류');
        }
    });

}