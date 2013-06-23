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


function randomPick(arr) {
  return arr[_.random(0, arr.length - 1)];
}



var jqInput = null,
  jqOutput = null;


var triggers = [
  {
    keys: ['password', 'pwd'],
    result: function() {

      outputLine(
        randomPick([
          'Loading your lifetime password history from 100-year storage...',
          'Hacking your account to retrieve your password...',
          'Accessing Global Password Database (GPD) for your details...'
        ])
      );
    }
  },
  {
    keys: ['skype'],
    result: function() {
      outputLine(
        randomPick([
          'Leveraging <a href="http://www.guardian.co.uk/technology/2013/jun/20/skype-nsa-access-user-data" target="_blank">Project Chess</a> to fetch Skype data...',
          'Asking Microsoft servers for your Skype data...',
          'Skype real-time interception link now online...'
        ])
      );
    }
  },
  {
    keys: ['telephone', 'tel'],
    result: function() {

      outputLine(
        randomPick([
          'Networking with <a href="http://news.cnet.com/8301-13578_3-57590364-38/nsa-can-eavesdrop-on-americans-phone-calls-documents-show/" target="_blank">Verizon, Sprint and AT & T</a> for your records...',
          'Overriding FISA restrictions to tap into your phone logs...'
        ])
      );
    }
  },
  {
    keys: ['internet', 'gchq'],
    result: function() {
      randomPick([
        'Contacting GCHQ to share <a href="http://www.guardian.co.uk/uk/2013/jun/21/gchq-mastering-the-internet" target="_blank">Mastering the Internet</a> data...',
        'Accessing Skynet database...'
      ])
    }
  },
  {
    keys: ['russia', 'south africa'],
    result: function(key) {
      randomPick([
        'Asking <a target="_blank" href="http://www.nydailynews.com/news/world/british-agency-repeatedly-hacked-foreign-diplomats-report-article-1.1374618">GCHQ</a> for eavesdropping data on ' + key + '...'
      ])
    }
  }

];


var trackIP = function() {
  jqOutput.append('Tracking your IP: <iframe src="ip.html" seamless="seamless" width="200px" height="30px" />');
};



var outputLine = function(html) {
  jqOutput.append('<div>' + html + '</div>');
};


require(['underscore', 'jquery'], function(_, $) {
  $(function() {
    'use strict';

<<<<<<< HEAD
    //alert('ok!');
=======
    jqInput = $('#input'),
      jqOutput = $('#output');

    jqInput.keyup(function() {
      var text = jqInput.val();
      var caretPos = getCaret(jqInput.get(0));

      _.each(triggers, function(trigger) {
        _.each(trigger.keys, function(key) {

          if (key.toLowerCase() === text.substr(caretPos - key.length, key.length).toLowerCase()) {
            if (!trigger['done']) {
              trigger.result.call(null, key);
              trigger['done'] = true;
            }
          }

        });
      });
    });

    // launch
    trackIP();
    _.delay(function() {
      jqOutput.append('Calculating your geo-coordinates: ');
    }, 3000);

>>>>>>> 5148c7eb9be7e18fb34ca5965ff17d8d19b8245f
  });
});
