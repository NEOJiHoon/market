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
            console.log('success', data);
        },
        error : function (error){
            alert(error);
        }
    });
}
