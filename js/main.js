require([
    "app_modules/initApp"
], function (Application) {

    $(document).ready(function () {

        'use strict';

        var app = new Application();

        var processCapturedImage = function(canvas){

            var mapDivWidth = $("#mapDiv").width();
            var mapDivHeight = $("#mapDiv").height();
            
            var photomosaic = new PhotoMosaic({
                canvas: canvas,
                targetElement: document.getElementById('canvasDiv'),
                width: mapDivWidth + 20,
                height: mapDivHeight,
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

        $(".convert-btn").on("click", function(evt){
            html2canvas($(mapDiv), {
                useCORS: true,
                onrendered: function(canvas) {
                    $("#canvasDiv").empty();
                    processCapturedImage(canvas);
                }
            });
        });


    });
});