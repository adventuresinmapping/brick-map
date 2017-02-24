define({
    //basic infomation needed to create map object
    map: {
        container_id: "mapDiv",
        options: {
            basemap: 'satellite',
            center: [-95, 38],
            zoom: 4, 
            showAttribution: false,
            logo: false,
            slider: false
        }
    },

    layers: {
        graphic_layers: [
            // {id: 'foo'}
        ],
        feature_layers: [
            // {url: '', options: {}}
        ],
        dynamic_layers: [
            // {url: '', options: {}}
        ]
    },

    application_data: {
  
    }
});