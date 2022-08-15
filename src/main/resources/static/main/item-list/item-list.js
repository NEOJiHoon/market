function goDetail(memId, itemNo) {
    console.log('goDetail', memId, itemNo);
    location.href='/item-detail.html?memId=' + memId + '&itemNo=' +itemNo;
}

function getItemList(searchType) {
    $.ajax({
        type:"GET",
        url:"/item?type=" + searchType,
        success: function(list){
            console.log("list: ", list);

            $("#item-list").html("");
            for (var i = 0; i < list.length; i++) {
                $("#item-list")
                    .append(makeItemListHtml2(list[i]));
            }
        }
    })
}
getItemList(0);

function searchChanged() {
    var element = $("#search-type");
    console.log('option value: ', element.val());
    getItemList(element.val());
}

function makeItemListHtml(item) {
    return "<div class=\"container\">"
        + "<div class=\"well\">" + "<div class=\"media\">"
        + "<a class=\"pull-left\" href=\"#\">"
        + "<img class=\"media-object\" width='250' height='250'"
        + "onclick='goDetail(\"" + item.memId + "\"," + item.itemNo + ")' "
        + "src=\"data:image/jpg;base64," + item.imgOne + "\">"
        + "</a>"
        + "<div class=\"media-body\">"
        + "<h4 class=\"media-heading\">" + item.title + "</h4>"
        + "<h5>" + item.price + " 원</h5>"
        + "<p class=\"text-right\">판매자 " +item.memId + "</p>"
        + "<p>" + item.contents + "</p>"
        + "<ul class=\"list-inline list-unstyled\">"
        + "<li><span><i class=\"glyphicon glyphicon-calendar\"></i> "
        + item.createDt + " </span></li>"
        + "<li>|</li>"
        + "<li>"
        + "<button class=\"btn btn-primary\">채팅하기</button>"
        + "</li>" + "</ul>" + "</div>" + "</div>" + "</div>" + "</div>";

}

function makeItemListHtml2(item) {
    return "<div class=\"col-xl-3 col-md-6 mb-4\">\n" +
        "        <div class=\"card border-left-primary shadow h-100 py-2\">\n" +
        "            <div class=\"card-body\">\n" +
        "                <div class=\"row no-gutters align-items-center\">\n" +
        "                    <div class=\"col mr-2\">\n" +
        "                        <div class=\"text-xs font-weight-bold text-primary text-uppercase mb-1\">\n" +
        "                            " + item.title + "</div>\n" +
        "                        <div class=\"h5 mb-0 font-weight-bold text-gray-800\">" + item.price + " 원</div>\n" +
        "                    </div>\n" +
        "                    <div class=\"col-auto\">\n" +
        "                       <img width='150' height='150'" +
        "                           onclick='goDetail(\"" + item.memId + "\"," + item.itemNo + ")' " +
        "                           src=\"data:image/jpg;base64," + item.imgOne + "\">" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>";
}

/*
"<img width='150' height='150'" +
"onclick='goDetail(\"" + item.memId + "\"," + item.itemNo + ")' " +
"src=\"data:image/jpg;base64," + item.imgOne + "\">" +

    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Earnings (Monthly)</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
 */