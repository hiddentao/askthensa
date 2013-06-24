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
  return str.substr(0,1).toUpperCase() + str.substr(1);
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

require(['underscore', 'jquery', 'countries'], function(_, $, countries) {

  var countryNames = [];
  _.each(countries, function(c) {
    if (-1 === _.indexOf(['NZ', 'AU', 'GB', 'IL', 'US', 'DE'])) {
      countryNames.push(c.name.toLowerCase());
    }
  });

  var jqInput = null,
    jqOutput = null;


  var triggers = [
    {
      keys: ['skype'],
      result: function() {
        outputLines([
          'Skype <a href="http://www.guardian.co.uk/technology/2013/jun/20/skype-nsa-access-user-data" target="_blank">real-time interception</a> link now online...',
          'Hacking Skype for your data...',
          'Retrieving your most recent calls...',
          'Listing your talk contacts...',
          'Checking your contacts against against the national terrorist database...',
          'Re-routing all future calls through NSA Priority 1 servers...',
          '<em>Skype terrorist plots foiled today: ' + _.random(1, 30) + '</em>'
        ]);
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
        
        outputLines([
          'Firing up <a href="http://www.guardian.co.uk/world/2013/jun/06/us-tech-giants-nsa-data" target="_blank">PRISM</a> link to ' + company + '...',
          'Contacting official NSA data routing point (Microsoft)...',
          'Merging your social networking data from clandestine storage...',
          'Filtering your closest friends and contacts...',
          'Your close contacts have now been added to the no-fly list...',
          '<em>' + company + ' terrorist plots foiled today: ' + _.random(1, 30) + '</em>'
        ]);
      }
    },
    {
      keys: ['phone', 'verizon', 'at & t', 'at&t', 'att', 'sprint', 'mobile', 'cell'],
      result: function() {
        outputLines([
          'Networking with <a href="http://news.cnet.com/8301-13578_3-57590364-38/nsa-can-eavesdrop-on-americans-phone-calls-documents-show/" target="_blank">Verizon, Sprint and AT & T</a> for your records...',
          '<a href="http://www.guardian.co.uk/world/2013/jun/20/fisa-court-nsa-without-warrant" target="_blank">Overriding FISA restrictions</a> to tap into your phone logs...',
          'Pulling up your most recent calls...',
          'Cross-referencing against known terrorist list...',
          'Adding your phone number to the watch list...',
          '<em>Phone terrorist plots foiled today: ' + _.random(1, 30) + '</em>'
        ]);
      }
    },
    {
      keys: ['internet', 'web', 'gchq', 'surveillance', 'wifi', 'prism'],
      result: function() {
        outputLines([
          'Contacting GCHQ to share <a href="http://www.guardian.co.uk/uk/2013/jun/21/gchq-mastering-the-internet" target="_blank">Mastering the Internet</a> data...',
          'Accessing <a href="http://www.guardian.co.uk/world/2013/jun/22/nsa-leaks-britain-us-surveillance" target="_blank">Five Eyes</a> database...',
          'Loading hacked <a href="http://www.guardian.co.uk/uk/2013/jun/21/gchq-cables-secret-world-communications-nsa" target="_blank">transcontinental cable</a> data...',
          'Filtering for packets related to you...',
          'Cross-referencing against your browser history...',
          'Filtering out porn (70% size reduction)...',
          'Adding your identifiers to <a href="http://www.privacysos.org/technologies_of_control/naurus" target="_blank">Narus deep packet inspection</a>...',
          '<em>Internet terrorist plots foiled today: ' + _.random(1, 30) + '</em>'
        ]);
      }
    },
    {
      keys: countryNames,
      result: function(key) {
        var country = capitalize(key);
        outputLines([
          'Asking GCHQ for <a target="_blank" href="http://www.nydailynews.com/news/world/british-agency-repeatedly-hacked-foreign-diplomats-report-article-1.1374618">eavesdropping</a> data on ' + country + '...',
          'Disseminating information to all OECD countries...',
          '<em>Foreign terrorist plots foiled today: ' + _.random(1, 30) + '</em>'
        ]);
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
        outputLine('Trigger keyword detected: MANNING (category: terrorist)', 2000, function() {
          outputLine('[BAUER] Calculating your geo-coordinates...', 2000, function() {
            outputLine('[BAUER] Taking over your bank accounts and assets...', 2000, function() {
              outputLine('[BAUER] Dispatching Cheney to your location...', 2000);
            });
          });
        });
      }
    },
    {
      keys: ['greenwald'],
      result: function(key) {
        outputLine('Trigger keyword detected: GREENWALD (category: extremist)', 2000, function() {
          outputLine('[TREADSTONE] Calculating your geo-coordinates...', 2000, function() {
            outputLine('[TREADSTONE] Informing JSOC of your location...', 2000, function() {
              outputLine('[TREADSTONE] Dispatching SEAL Team 6 (good luck!)...', 2000);
            });
          });
        });
      }
    },
    {
      keys: ['snowden', 'hong kong'],
      result: function(key) {
        outputLine('Trigger keyword detected: SNOWDEN (category: traitor)', 2000, function() {
          outputLine('[TERMIN8] Calculating your geo-coordinates...', 2000, function() {
            outputLine('[TERMIN8] Informing the CIA of your location...', 2000, function() {
              outputLine('[TERMIN8] Drone dispatched and heading your way.', 2000);
            });
          });
        });
      }
    }
  ];


  var defaultTasks = function() {
    outputLine('Tracking your IP: <iframe id="iptracker" src="ip.html" seamless="seamless"/>', 2000, function() {
      outputLine('We are now tracking you via a dedicated satellite...', 2000, function() {
        outputLine('Accessing your bank accounts and tax history...', 2000, function() {
          outputLine('Analyzing your call history for suspicious contacts...', 2000, function() {
            outputLine('NDAA violation: you appear to be an Al Qaeda <a href="http://digitaljournal.com/article/321389" target="_blank">associated force</a>...', 2000, function() {
              outputLine('<em>You have been added to the FBI most-wanted list.</em>', 2000);
            });
          });
        });
      });
    });
  };


  var outputLines = function(lines) {
    var current = 0;
    var _outputLineFunc = null;

    (_outputLineFunc = function() {
      if (lines.length <= current) return;
      outputLine(lines[current], 1000, function() {
        current++;
        _outputLineFunc();
      });
    })();
  };


  var outputLine = function(html, delay, cb) {
    jqOutput.prepend('<div class="result">' + html + '</div>');
    if (cb) {
      _.delay(cb, delay);
    }
  };


  $(function() {
    'use strict';

    $('form').submit(function(e) {
      e.preventDefault();
    });

    jqInput = $('#input'),
      jqOutput = $('#output');

    var doneOne = false;

    jqInput.keyup(function() {
      var text = jqInput.val().toLowerCase();

      _.each(triggers, function(trigger) {
        if (trigger.done) return;

        _.each(trigger.keys, function(key) {
          if (0 <= text.indexOf(key)) {
            trigger.result.call(null, key);
            trigger.done = true;
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


