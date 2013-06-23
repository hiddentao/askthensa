;require.config({
  paths: {
    jquery                          : "../components/jquery/jquery",
    underscore                      : "../components/lodash/lodash"
  },
  shim: {
    'underscore': { exports: '_' }
  }
});


/** From http://stackoverflow.com/questions/263743/how-to-get-caret-position-in-textarea */
function getCaret(el) {
  if (el.selectionStart) {
    return el.selectionStart;
  } else if (document.selection) {
    el.focus();

    var r = document.selection.createRange();
    if (r == null) {
      return 0;
    }

    var re = el.createTextRange(),
      rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    return rc.text.length;
  }
  return 0;
}




require(['underscore', 'jquery'], function(_, $) {
  var jqInput = null,
    jqOutput = null;



  var triggers = [
    {
      keys: ['password', 'pwd'],
      result: function() {
        outputLine('Loading your lifetime password history...');
      }
    },
    {
      keys: ['skype'],
      result: function() {
        outputLine('Leveraging <a href="http://www.guardian.co.uk/technology/2013/jun/20/skype-nsa-access-user-data" target="_blank">Project Chess</a> to fetch Skype data...');
      }
    },
    {
      keys: ['telephone', 'tel'],
      result: function() {
        outputLine('Networking with <a href="http://news.cnet.com/8301-13578_3-57590364-38/nsa-can-eavesdrop-on-americans-phone-calls-documents-show/" target="_blank">Verizon, Sprint and AT & T</a> for your records...');
      }
    }
  ];

  var outputLine = function(html) {
    jqOutput.append('<p>' + html + '</p>');
  };


  $(function() {
    'use strict';

    jqInput = $('#input'),
      jqOutput = $('#output');

    jqInput.keyup(function() {
      var text = jqInput.val();
      var caretPos = getCaret(jqInput.get(0));

      _.each(triggers, function(trigger) {
        _.each(trigger.keys, function(key) {

          if (key.toLowerCase() === text.substr(caretPos - key.length, key.length).toLowerCase()) {
            if (!trigger['done']) {
              trigger.result.call();
              trigger['done'] = true;
            }
          }

        });
      });
    });

  });
});
