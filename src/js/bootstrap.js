;require.config({
  paths: {
    jquery                          : "../components/jquery/jquery",
    underscore                      : "../components/lodash/lodash"
  },
  shim: {
    'underscore': { exports: '_' }
  }
});


function capitalize(str) {
  return str.substr(0).toUpperCase() + str.substr(1);
}


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
    keys: ['skype'],
    result: function() {
      outputLine('Skype <a href="http://www.guardian.co.uk/technology/2013/jun/20/skype-nsa-access-user-data" target="_blank">real-time interception</a> link now online...');
      outputLine('Hacking Skype for your data...');
      outputLine('Retrieving your most recent calls...');
      outputLine('Listing your talk contacts...');
      outputLine('Checking your contacts against against the national terrorist database...');
      outputLine('Re-routing all future calls through NSA Priority 1 servers...');
      outputLine('<em>Skype terrorist plots foiled today: ' + _.random(1, 30) + '</em>');
    }
  },
  {
    keys: ['privacy', 'constitution', 'rights', 'fisa', 'warrant', 'amendment'],
    result: function(key) {
      outputLine('ERROR: term not found: ' + key);
    }
  },
  {
    keys: ['twitter'],
    result: function(key) {
      outputLine('<a href="http://qz.com/91889/twitter-boosts-its-privacy-cred-with-its-absence-from-the-nsas-surveillance-program/" target="_blank">Unable to access</a> Twitter');
    }
  },
  {
    keys: ['google', 'facebook', 'microsoft'],
    result: function(key) {
      var company = capitalize(key);

      outputLine('Firing up <a href="http://www.guardian.co.uk/world/2013/jun/06/us-tech-giants-nsa-data" target="_blank">PRISM</a> link to ' + company + '...');
      outputLine('Contacting official NSA data routing point (Microsoft)...');
      outputLine('Merging your social networking data from clandestine storage...');
      outputLine('Filtering your closest friends and contacts...');
      outputLine('Your close contacts have now been added to the no-fly list...');
      outputLine('<em>: ' + company + ' terrorist plots foiled today: ' + _.random(1, 30) + '</em>');
    }
  },
  {
    keys: ['phone', 'verizon', 'at & t', 'at&t', 'att', 'sprint', 'mobile', 'cell'],
    result: function() {
      outputLine('Networking with <a href="http://news.cnet.com/8301-13578_3-57590364-38/nsa-can-eavesdrop-on-americans-phone-calls-documents-show/" target="_blank">Verizon, Sprint and AT & T</a> for your records...');
      outputLine('<a href="http://www.guardian.co.uk/world/2013/jun/20/fisa-court-nsa-without-warrant" target="_blank">Overriding FISA restrictions</a> to tap into your phone logs...');
      outputLine('Pulling up your most recent calls...');
      outputLine('Cross-referencing against known terrorist list...');
      outputLine('Adding your phone number to the watch list...');
      outputLine('<em> Terrorist plots foiled today: ' + _.random(1, 30) + '</em>');
    }
  },
  {
    keys: ['internet', 'web', 'gchq', 'surveillance', 'wifi'],
    result: function() {
      outputLine('Contacting GCHQ to share <a href="http://www.guardian.co.uk/uk/2013/jun/21/gchq-mastering-the-internet" target="_blank">Mastering the Internet</a> data...');
      outputLine('Accessing Skynet database...');
      outputLine('Loading hacked transcontinental cable data...');
      outputLine('Filtering for packets related to you...');
      outputLine('Cross-referencing against your browser history...');
      outputLine('Filtering out porn (70% size reduction)...');
      outputLine('Adding your identifiers to <a href="http://www.privacysos.org/technologies_of_control/naurus" target="_blank">Narus deep packet inspection</a>...');
      outputLine('<em> Terrorist plots foiled today: ' + _.random(1, 30) + '</em>');
    }
  },
  {
    keys: ['russia', 'south africa', 'china'],
    result: function(key) {
      var country = capitalize(key);
      outputLine('Asking GCHQ for <a target="_blank" href="http://www.nydailynews.com/news/world/british-agency-repeatedly-hacked-foreign-diplomats-report-article-1.1374618">eavesdropping</a> data on ' + country + '...');
      outputLine('Disseminating information to all OECD countries...');
      outputLine('<em> Terrorist plots foiled today: ' + _.random(1, 30) + '</em>');
    }
  },
  {
    keys: ['classified'],
    result: function(key) {
      jqInput.remove();
      jqOutput.addClass('error').html('Illegal access detected. Requesting extradition.');
    }
  },
  {
    keys: ['manning'],
    result: function(key) {
      outputLine('Trigger keyword detected: MANNING (category: terrorist)');
      _.delay(function() {
        outputLine('[BAUER] Calculating your geo-coordinates...');
        _.delay(function() {
          outputLine('[BAUER] Taking over your bank accounts and assets...');
          _.delay(function() {
            outputLine('[BAUER] Dispatching Cheney to your location...');
          }, 2000);
        }, 2000);
      }, 2000);
    }
  },
  {
    keys: ['greenwald'],
    result: function(key) {
      outputLine('Trigger keyword detected: GREENWALD (category: extremist)');
      _.delay(function() {
        outputLine('[TREADSTONE] Calculating your geo-coordinates...');
        _.delay(function() {
          outputLine('[TREADSTONE] Informing JSOC of your location...');
          _.delay(function() {
            outputLine('[TREADSTONE] Dispatching SEAL Team 6 (good luck!)...');
          }, 2000);
        }, 2000);
      }, 2000);
    }
  },
  {
    keys: ['snowden', 'hong kong'],
    result: function(key) {
      outputLine('Trigger keyword detected: SNOWDEN (category: traitor)');
      _.delay(function() {
        outputLine('[TERMIN8] Calculating your geo-coordinates...');
        _.delay(function() {
          outputLine('[TERMIN8] Informing the CIA of your location...');
          _.delay(function() {
            outputLine('[TERMIN8] Drone dispatched and heading your way.');
          }, 2000);
        }, 2000);
      }, 2000);
    }
  }

];


var defaultTasks = function() {
  outputLine('Tracking your IP: <iframe id="iptracker" src="ip.html" seamless="seamless"/>');
  _.delay(function() {
    outputLine('We are now tracking you via a dedicated satellite');
    _.delay(function() {
      outputLine('Accessing your bank accounts and tax history');
      _.delay(function() {
        outputLine('Analyzing your call history for suspicious contacts');
        _.delay(function() {
          outputLine('NDAA violation: you appear to be an Al Qaeda <a href="http://digitaljournal.com/article/321389" target="_blank">associated force</a>...');
          _.delay(function() {
            outputLine('<em>You have been added to the FBI most-wanted list.</em>');
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);
};



var outputLine = function(html) {
  _.delay(function() {
    jqOutput.prepend('<div class="result">' + html + '</div>');
  }, 1000);
};


require(['underscore', 'jquery'], function(_, $) {
  $(function() {
    'use strict';

    jqInput = $('#input'),
      jqOutput = $('#output');

    var doneOne = false;

    jqInput.keyup(function() {
      var text = jqInput.val().toLowerCase();

      _.each(triggers, function(trigger) {
        if (trigger['done']) return;

        _.each(trigger.keys, function(key) {
          if (0 <= text.indexOf(key)) {
            trigger.result.call(null, key);
            trigger['done'] = true;
            doneOne = true;
          }
        });

        if (!doneOne && 20 < text.length) {
          doneOne = true;
          defaultTasks();
        }
      });
    });


  });
});
