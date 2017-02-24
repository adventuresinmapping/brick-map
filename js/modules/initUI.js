define([
    "dojo/_base/declare",
    "dojo/promise/all", 
    "dojo/Deferred",
    "dojo/_base/lang",
], function(declare, 
    all, Deferred, lang
){
    
    var uiUtils = declare(null, {
        
        //set properties of object
        constructor: function (config) {
            this.config = (config) ? config : {};
            this._startup();
        },
        
        appUIs: {
            map: $('#mapDiv'),
        },
        
        _startup: function(){
            this._setDocumentTitle(this.config.app_title);
            this._appendEventListener(this);
        },

        _setDocumentTitle: function(value){
            $(document).attr('title', value);
        },

        _setElementWidth: function(targetElement, value){
            $(targetElement).css('width', value);
        },

        _setElementRight: function(targetElement, value){
            $(targetElement).css('right', value);
        },

        _setElementColor: function(targetElement, values) {
            if(values.backgroundColor){
                $(targetElement).css('background-color', values.backgroundColor);
            }

            if(values.color){
                $(targetElement).css('color', values.color);
            }
        },

        _appendEventListener: function(app){

        }
       
    });
    
    return uiUtils;
    
});