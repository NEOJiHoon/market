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
                    .append(makeItemListHtml(list[i]));
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

    var imgStr = "";
    if (item.imgOne) {
        imgStr = "src=\"data:image/jpg;base64," + item.imgOne + "\">";
    } else {
        imgStr = "src=\"/img/undraw_rocket.svg\">";
    }

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
        "                           onclick='goItemDetail(\"" + item.memId + "\"," + item.itemNo + ")' " +

        imgStr +

        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>";
}
