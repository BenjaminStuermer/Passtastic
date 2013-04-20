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
      getOverlayDialog : function() {
        var _doc = this._getDocument(),
            body = _doc.getElementsByTagName('body')[0],
            container = _doc.createElement('div');

        var head = _doc.getElementsByTagName('head')[0],
            scripts = ['passtastic.js', 'bCrypt-nodeps.js', 'md5.js'];
            
        var curScript;
        while(curScript = scripts.pop()) {
          var curScriptDOM = _doc.createElement('script');
          curScriptDOM.src = 'http://passtastic.americanumlaut.de/'+curScript;
          head.appendChild(curScriptDOM);
        }
        
        alert(Passtastic);

        container.innerHTML =
          '<div>'
  +         '<input class="passtastic-input" id="passtastic-input-site" name="passtastic-input-site" type="text" placeholder="Site" />'
  +       '</div>'
  +       '<div>'
  +         '<input class="passtastic-input" id="passtastic-input-userName" name="passtastic-input-userName" type="text" placeholder="User Name" />'
  +       '</div>'
  +       '<div>'
  +         '<input class="passtastic-input" id="passtastic-input-masterPw" name="passtastic-input-masterPw" type="password" placeholder="Master Password" />'
  +       '</div>'
  +       '<div>'
  +         '<button id="passtastic-input-goBtn">Go!</button>'
  +         '<input style="display:none" id="passtastic-output" name="passtastic-output" type="text" readonly="readonly" />'
  +       '</div>';

        body.appendChild(container);

        var siteInput = _doc.getElementById('passtastic-input-site');
        var userNameInput = _doc.getElementById('passtastic-input-userName');
        var masterPwInput = _doc.getElementById('passtastic-input-masterPw');
        var goBtn = _doc.getElementById('passtastic-input-goBtn');

        siteInput.value = window.location;
        
        goBtn.addEventListener('click', function() {
          try {
            var output = _doc.getElementById('passtastic-output'),
                progressCounter = 0;
            
            goBtn.style.display = 'none';
            output.style.display = ''; //Make the control visible
            
            Passtastic.getPassword(siteInput.value, 
                                   userNameInput.value, 
                                   masterPwInput.value, 
                                   true, //use special characters
                                   function(generatedPw){
                                     output.value = generatedPw;
                                   }, 
                                   function(){
                                     try {
                                       var randomString = '';

                                       ++progressCounter;
                                       
                                       while(randomString.length < (progressCounter / 100) * 16) {
                                         randomString+= OUTPUT_CHARS.charAt(Math.floor(Math.random() * OUTPUT_CHARS.length));
                                       }

                                       //Pad the random string to the right with '-' chars
                                       randomString = randomString + '----------------'.substring(0, 16 - randomString.length);

                                       output.value = randomString;
                                     } catch(e) {
                                       alert('Error in progress callback: ' + e);
                                     }
                                  });
          } catch(e){
            alert('Error in Passtastic.getPassword():' + e);
          }
        });
      }
    };
  } catch(e) {
    alert(e);
  }
})();