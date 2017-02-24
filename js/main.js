require([
    "configs/uiConfig",
    "app_modules/initUI",
    "app_modules/initApp"
], function (uiConfig, initUI, Application) {
    //var ui = new initUI(uiConfig);
    var app = new Application();

    $("#convertToLegoBtn").on("click", function(evt){
        html2canvas($(mapDiv), {
            useCORS: true,
            onrendered: function(canvas) {
                $("#canvasDiv").empty();
                // $("#canvasDiv").append(canvas);
                processCapturedImage(canvas);
            },
            width: 800,
            height: 450
        });
    });

    function processCapturedImage(canvas){
        
        var photomosaic = new PhotoMosaic({
            canvas: canvas,
            targetElement: document.getElementById('canvasDiv'),
            width: 840,
            height: 450,
            tileHeight: 30,
            tileWidth: 30,
            tileShape: 'rectangle',
        });

        Caman('#processedCanvas', function () {
            this.brightness(25);
            this.contrast(30);
            this.saturation(60);
            this.render();
        });
    }


});