function goDetail(memId, itemNo) {
    console.log('goDetail', memId, itemNo);
    location.href='/item-detail.html?memId=' + memId + '&itemNo=' +itemNo;
}

function getItemList() {
    $.ajax({
        type:"GET",
        url:"/item",
        success: function(list){
            console.log("list: ", list);

            $("#item-list").html("");
            for (var i = 0; i < list.length; i++) {
                $("#item-list")
                    .append("<div class=\"container\">"
                        + "<div class=\"well\">" + "<div class=\"media\">"
                        + "<a class=\"pull-left\" href=\"#\">"
                        + "<img class=\"media-object\" width='250' height='250'"
                        + "onclick='goDetail(\"" + list[i].memId + "\"," + list[i].itemNo + ")' "
                        + "src=\"data:image/jpg;base64," + list[i].imgOne + "\">"
                        + "</a>"
                        + "<div class=\"media-body\">"
                        + "<h4 class=\"media-heading\">" + list[i].title + "</h4>"
                        + "<h5>" + list[i].price + " 원</h5>"
                        + "<p class=\"text-right\">판매자 " +list[i].memId + "</p>"
                        + "<p>" + list[i].contents + "</p>"
                        + "<ul class=\"list-inline list-unstyled\">"
                        + "<li><span><i class=\"glyphicon glyphicon-calendar\"></i> "
                        + list[i].createDt + " </span></li>"
                        + "<li>|</li>"
                        + "<li>"
                        + "<button class=\"btn btn-primary\">채팅하기</button>"
                        + "</li>" + "</ul>" + "</div>" + "</div>" + "</div>" + "</div>"
                    )
            }
        }
    })
}
getItemList();


// contents: "맛좋은 수박"
// createDt: null
// delDt: null
// delYn: null
// imgOne: null
// imgThree: null
// imgTwo: null
// itemNo: 1
// memId: "gogoman"
// price: 20000
// soldOutDt: null
// soldOutYn: null
// title: "수박"