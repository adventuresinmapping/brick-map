var resizeMapDom = (function(){

    $("div.canvas-buttons").hide();

    $(".map-wrapper > .top-wrapper").each(resizeDOM);

    // $("#canvasDiv").each(resizeDOM);

    function resizeDOM(){
        var mapWrapper = $(this);

        mapWrapper.css("width", "100%");
        mapWrapper.css("height", "100%");
        mapWrapper.css("left", "0");
        mapWrapper.css("top", "0");

        var curWidth = parseInt(mapWrapper.width());
        var newWidth = Math.floor(curWidth/30) * 30;
        mapWrapper.width(newWidth);   

        mapWrapper.siblings("div").css("width", newWidth); 
    }

    $("#canvasDiv").css("opacity", "1");

}());
