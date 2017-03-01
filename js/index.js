require([
    "esri/Map",
    "esri/views/MapView"
], function (Map, MapView) {

    $(document).ready(function () {

        // Enforce strict mode
        'use strict';

        var map = new Map({
            basemap: "satellite"
            
        });

        var view = new MapView({
            container: "mapDiv",  
            center: [-112, 38],
            zoom: 6,
            map: map
        });

        $("#convertToLegoBtn").on("click", function(evt){
            html2canvas($(".esri-view-root"), {
                useCORS: true,
                onrendered: function(canvas) {
                    var dataURL = canvas.toDataURL();
                    console.log(dataURL);

                    $("#canvasDiv").empty();
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

            // Caman('#processedCanvas', function () {
            //     this.brightness(25);
            //     this.contrast(30);
            //     this.saturation(60);
            //     this.render();
            // });
        }

    });
});