require([
    "app_modules/initApp"
], function (Application) {

    $(document).ready(function () {

        'use strict';

        var app = new Application();

        var onWindowResizeEndHandler;

        var captureCurrentMapFrame = function(){

            html2canvas($(mapDiv), {
                useCORS: true,
                onrendered: function(canvas) {
                    $("#canvasDiv").empty();
                    processCapturedImage(canvas);
                }
            });
        };

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
                var adjustmentValues = getCanvasAdjustmentValues();
                this.brightness(adjustmentValues[0]);
                this.contrast(adjustmentValues[1]);
                this.saturation(adjustmentValues[2]);
                this.render();
            });
        };

        var getCanvasAdjustmentValues = function(){

            var currentBaseMap = $(".toggle-basemap-btn.active").text();

            var brightness;
            var contrast;
            var saturation;

            if(currentBaseMap === "Map"){
                brightness = -5;
                contrast = 0;
                saturation = 100;
            } else {
                brightness = 25;
                contrast = 30;
                saturation = 80;
            }

            return [brightness, contrast, saturation];
        }

        var resizeMapWrapper = function(isFirstAdjustment){

            isFirstAdjustment = isFirstAdjustment | false;

            $("#canvasDiv").empty();

            $(".map-wrapper > .top-wrapper").each(function() {

                var mapWrapper = $(this);

                mapWrapper.css("width", "100%");

                var curWidth = parseInt(mapWrapper.width());
                var newWidth = Math.floor(curWidth/30) * 30;
                mapWrapper.width(newWidth);
            });

            if(!isFirstAdjustment){
                clearTimeout(onWindowResizeEndHandler);
                onWindowResizeEndHandler = setTimeout(captureCurrentMapFrame, 1000);
            }
        }

        $(window).resize(resizeMapWrapper);

        $(".convert-btn").on("click", captureCurrentMapFrame);

        $(".toggle-basemap-btn").on("click", function(evt){

            var currentBaseMap = $(this).text();

            if(currentBaseMap !== "Map") {
                app.map.setBasemap("satellite");
            } else {
                app.map.setBasemap("topo");
            }

            $(".toggle-basemap-btn").removeClass("active");
            $(this).addClass("active");
        });

        $(".download-canvas-image").on('click', function(evt) {
            var canvas = document.getElementById('processedCanvas');
            var dataUrl = canvas.toDataURL();
            var link = document.createElement('a');

            link.download = 'Legoifer.jpeg';
            link.href = dataUrl;
            link.click();
        });

        $('.twitter-popup').on('click', function(event) {
            var message = 'Check out this Legoifer App';
            var width  = 500,
                height = 300,
                left   = ($(window).width()  - width)  / 2,
                top    = ($(window).height() - height) / 2,
                url    = 'http://twitter.com/intent/tweet?hashtags=Legoifer&text=' + message + '&url=' + encodeURIComponent(window.location.href),
                opts   = 'status=1' +
                        ',width='  + width  +
                        ',height=' + height +
                        ',top='    + top    +
                        ',left='   + left;
            
            window.open(url, 'twitter', opts);
        
            return false;
        }); 

        $('.facebook-popup').on('click', function(event) {
            FB.ui({
                method: 'share',
                display: 'popup',
                quote: 'Check out this Legoifer App',
                href: window.location.href,
            }, function(response){});
        
            return false;
        }); 

        resizeMapWrapper(true);
    });
});