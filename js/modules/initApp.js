define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "configs/mapConfig",
    "esri/map",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer"
], function(declare, lang, mapConfig, 
    Map, Graphic, GraphicsLayer, FeatureLayer, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer
){
   'use strict'; //Enforce strict mode

    return declare(null, {
        
        constructor: function () {
            this.map = this._initMap(); 
        },

        _initMap: function(config){

            var map = new Map(mapConfig.map.container_id, mapConfig.map.options);

            this._initMapLayers(map);
            // map.on("click", lang.hitch(this, function(evt){
            //     this._mapClickEventHandler(evt);
            // }));

            map.on("load", function(){
                $("div.attribute-wrapper").show();
            });

            return map;
        },

        //add layers included in the configuration file to map
        _initMapLayers: function(map){
            if(mapConfig.layers.graphic_layers){
                for(var i = 0, len = mapConfig.layers.graphic_layers.length; i < len; i++){
                    var gLayer = new GraphicsLayer(mapConfig.layers.graphic_layers[i]);
                    map.addLayer(gLayer);
                }  
            }

            if(mapConfig.layers.feature_layers){ 
                for(var i = 0, len = mapConfig.layers.feature_layers.length; i < len; i++){
                    var fLayer = new FeatureLayer(mapConfig.layers.feature_layers[i].url, mapConfig.layers.feature_layers[i].options);
                    map.addLayer(fLayer);
                }
            }
            
            if(mapConfig.layers.dynamic_layers){
                for(var i = 0, len = mapConfig.layers.dynamic_layers.length; i < len; i++){
                    var dLayer = new ArcGISDynamicMapServiceLayer(mapConfig.layers.dynamic_layers[i].url, mapConfig.layers.dynamic_layers[i].options);  
                    dLayer.setVisibleLayers(mapConfig.layers.dynamic_layers[i].options.visibleLayers);
                    map.addLayer(dLayer);  
                }
            }

            var tileLayer = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer", {
                id: "ocean_without_labels",
                visible: false
            });
            map.addLayer(tileLayer);
        },

        //add map click event listener
        _mapClickEventHandler: function(evt){
            console.log(evt)
        } 
    
    }); 
});