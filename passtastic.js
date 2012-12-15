/**
 * Passtastic v0.1
 * 
 * Author: Benjamin Stuermer
 * 
 * A deterministic password generator.
 */
(function(window, $, undefined){
  "use strict";
  
  var BCRYPT_WORK_PARAM = '10';
  var BCRYPT_VERSION = '2a'; //TODO: See if a bcrypt implementation using 2y exists, otherwise need to update jBcrypt to support it
  
  window.Passtastic = {
    /**
     * 
     * @param str The password from which the bcrypt hash will be generated
     * @param resultCallback A callback function, will be called and passed the
     *                 hash result when the bcrypt function completes.
     * @param progress An optional callback function, will be called periodically as the
     *                 bcrypt function runs. The bcrypt documentation claims that this is
     *                 always 100 times, but it's actually less and depends on the work parameter.
     */
    getBCrypt : function(str, resultCallback, progress) {
      var bcrypt = new bCrypt();
      var salt = 'b0MHMsT3ErLoTRjpjzsCie'; //TODO: salt needs to be deterministically generated based on input values
                                           // presumably I can do that by seeding Clipperz.PRGN and then letting bCrypt
                                           // generate the salt at "random"
      bcrypt.hashpw(str, '$'+BCRYPT_VERSION+'$'+BCRYPT_WORK_PARAM+'$'+salt, resultCallback, progress);
    }
  };
})(window, jQuery);