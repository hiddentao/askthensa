;require.config({
  paths: {
    underscore                      : "../components/lodash/lodash",
    jquery                          : "../components/jquery/jquery"
  },
  shim: {
    'underscore': { exports: '_' }
  }
});



require(['jquery'], function($) {
  $(function() {
    'use strict';




  });
});
