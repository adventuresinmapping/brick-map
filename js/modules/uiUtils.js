define([
    "dojo/_base/declare",
    "dojo/promise/all", 
    "dojo/Deferred",
    "dojo/_base/lang"
], function(declare, 
    all, Deferred, lang
){
    
    var uiUtils = declare(null, {
        
        //set properties of object
        constructor: function (config) {
            this.app = config.app || null;
            this._startup();
        },
        
        appUIs: {
            
        },
        
        _startup: function(){

        },
       
    });
    
    return uiUtils;
    
});