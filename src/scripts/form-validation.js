(function () {

    'use strict';

    var system_msg = $('.wl-newsletter_subscription #system-msg');
    var cancel = $('.wl-newsletter_subscription .cancel');
    var right = $('.wl-newsletter_subscription .right');
    var email = $('.wl-newsletter_subscription .email');
    var wl_form = $('.wl-newsletter_subscription');
    var wl_form_submit = $('.wl-newsletter_subscription .submit');

    var validateEmail = function (val) {
        var atpos = val.indexOf("@");
        var dotpos = val.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= val.length) {
            return false;
        }
        return true;
    };

    var displayErrorMsg = function () {
        system_msg.addClass('error');
        system_msg.html('*Invalid email address');
    };

    var displayErrorIcon = function () {
        system_msg.removeClass('success');
        right.removeClass('display-success');
        cancel.addClass('display-error');
    };

    var displaySubmittedMsg = function () {
        system_msg.addClass('success');
        system_msg.html('Subscribed');
    };

    var displaySuccessIcon = function () {
        cancel.removeClass('display-error');
        system_msg.removeClass('error');
        right.addClass('display-success');
    };

    var resetEmailField = function () {
        email.val('');
        system_msg.removeClass('error');
        system_msg.removeClass('success');
        cancel.removeClass('display-error');
        right.removeClass('display-success');
    };

    var startValidating = function () {
        if (email.val().length > 0) {
            if (validateEmail(email.val()) == false) {
                displayErrorIcon();
                displayErrorMsg();
            } else {
                displaySuccessIcon();
            }
        } else {
            resetEmailField();
        }
    };

    var init = function () {
        email.on({
                keyup: function () {
                    startValidating();
                },
                input: function () {
                    startValidating();
                }
            }, function () {
        });
        cancel.on('click', function () {
            resetEmailField();
        });

        wl_form.on('submit', function () {
            if (validateEmail(email.val()) == false) {
                displayErrorIcon();
                displayErrorMsg();
            } else {
                displaySuccessIcon();
            }
        });
        wl_form_submit.on('click', function () {
            if (validateEmail(email.val()) == false) {
                displayErrorIcon();
                displayErrorMsg();
            } else {
                displaySuccessIcon();
                displaySubmittedMsg();
            }
        });
    };

    init();
})();
