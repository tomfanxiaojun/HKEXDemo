(function($) {

    'use strict';

    var getData  = function getData(url) {
          return $.getJSON(url)
                .done(data => data)
                .fail(error => console.log(error));
    };
    $.fn.extend({getData : getData});

}(jQuery));
