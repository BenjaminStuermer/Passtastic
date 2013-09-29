(function() {
  try {
    "use strict";

    if (undefined === window.PasstasticChrome) {
      window.PasstasticChrome = {};
    };
    
    var OUTPUT_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&\'()*+,-./:;<=>?@[/]^_`{|}~';

    /**
     * Controls the browser overlay for the Passtastic password-generator extension.
     */
    window.PasstasticChrome.BrowserOverlay = {
      
      /**
       * Gets the document object. Useful for allowing this script to be run in a test
       * page instead of in the plugin.
       */
      _getDocument : function() {
         if(undefined !== content) { //This is true if the script is running as a plugin
           return content.document;
         }
         
         //Otherwise we're loaded in a normal page
         return document;
      },
      
      /**
       * Opens the password-generator dialog when selected from the menu bar
       */
      generatePwFromMenu : function(event) {
        try {
          this.getOverlayDialog();
        } catch(e) {
          alert('error in generatePwFromMenu(): ' + e);
        }
      },

      /**
       * Gets the DOM element that's overlayed onto the screen to allow password generation
       * without an associated <input type="password"> field.
       * 
       * @return DOM element
       */
      getContainer : function() {
        var _doc = this._getDocument();
        this._container = _doc.createElement('iframe');

        container.src = 'http://passtastic.americanumlaut.de/';
        container.style.display = "none";

        _doc.getElementsByTagName('body')[0].appendChild(container);
      }
    };
  } catch(e) {
    alert(e);
  }
})();