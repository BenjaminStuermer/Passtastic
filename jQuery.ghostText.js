/* 
 * jQuery.ghostText.js v1.0 Feb. 2, 2013
 * 
 * A jQuery extension that allows the simple application of a "ghost" text - a text
 * in an <input> field that is only visible when the field is empty. To use it,
 * simply call $('#myInput').ghostText('Ghost text');
 * 
 * You will most likely want to include a CSS style for the ghost text's color, since
 * a ghost text looks silly if you don't make it a bit lighter than normal input. To
 * do this, just add a style like
 * 
 * .ghostTextEmptyInput {
 *   color : blah
 * }
 * 
 * ------------------------------------------------------------------------------------
 * 
 * The GhostText jQuery extension is licensed unter the terms of the MIT License:
 * 
 * Copyright (C) 2013 Benjamin Stürmer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of 
 * this software and associated documentation files (the "Software"), to deal in 
 * the Software without restriction, including without limitation the rights to use, 
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
 * Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(window, $, undefined) {
  if($.fn.ghostText) throw('jQuery.ghostText.js - There appears to be a conflict. Either jQuery.ghostText is already defined elsewhere, or you have loaded this file twice!');

  var _emptyClass = 'ghostTextEmptyInput';
  
  /**
   * Private function of $.ghostText(), updates the passed field's contents
   * 
   * @param field the DOM element representing the input to be updated
   * @param ghostText string, the ghost text to show if the field is empty 
   */
  function update(field, ghostText) {
    var jqField = $(field);
    
    if(!jqField.val().length || jqField.val() === ghostText) {
      jqField.addClass(_emptyClass)
             .val(ghostText);
      
      //Password fields display their text like ******, so we change ghost-texted password fields
      // to text so their contents are readable
      if(field.type == 'password') {
        field.type = 'text';
        jqField.data('ghostText-isPassword', true);
      }
    } else {
      jqField.removeClass(_emptyClass);
    }
  }

  $.fn.ghostText = function(ghostText) {
    this.each(function() {
      if(!$(this).is('input') || ($(this).attr('type') != 'text' && $(this).attr('type') != 'password')) {
        throw('jQuery.ghostText.js - Invalid target, ghostText may only be applied to text and password input fields');
      }
      
    
      update(this, ghostText);
    });
    
    this.bind({
      focus : function() {
        var item = $(this);
        if(item.hasClass(_emptyClass)) { 
          item.val('')
              .removeClass(_emptyClass);
        }
        
        if(item.data('ghostText-isPassword')) {
          this.type = 'password';
        }
      },
      blur : function() {
        update(this, ghostText);
      }
    });
  };
})(window, jQuery);