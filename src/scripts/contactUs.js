'use strict';

(function($) {
    'use strict';

    $('.contact-us-bt').on('click', (e) => {
        let $target = $(e.target);
        $target.parents('#contact_us__form').find('.contact_us__form_text--error-msg').show();
        $target.parents('#contact_us__form').addClass('contact_us__form--error').find("[data-verify-form='true']").addClass('contact_us__form--item-error');
        $('.wl-nextstep').css('top', '336px');
    });

})(jQuery);
