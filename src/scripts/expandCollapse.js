(function() {
    'use strict';
    // Expand and Collapse All
    // =================

    const EXPAND_TEXT = "Expand All Steps";
    const COLLAPSE_TEXT = "Collapse All Steps";

    let $toggleButton = $('.expandAll');
    let $stepHeader = $('.listing-step__header');
    let stepHeaderCount = $stepHeader.length;
    let stepHeaderCollapsedCount = null;
    let stepHeaderExpandedCount = null;

    let target = null;

    function toggleListingProcessAccrodion() {
        let $collapse = $('.collapse');

        if ($toggleButton.text() === EXPAND_TEXT) {
            $collapse.collapse('show');
        } else {
            $collapse.collapse('hide');
        }

    }

    function changeText() {
        getExpandedAndCollpaseCount();

        $toggleButton.text(function(i, text) {
            let isExpanded = text === EXPAND_TEXT && stepHeaderExpandedCount === stepHeaderCount;
            let isCollapsed = text === COLLAPSE_TEXT && stepHeaderCollapsedCount === stepHeaderCount;

            if (isExpanded) {
                text = COLLAPSE_TEXT;
            } else if (isCollapsed) {
                text = EXPAND_TEXT;
            }
            return text;
        });
    }

    function changeIcon() {
        $toggleButton.attr('aria-expanded') == 'true' ? $toggleButton.attr('aria-expanded', 'false') : $toggleButton.attr('aria-expanded', 'true');
    }

    function getExpandedAndCollpaseCount() {
        stepHeaderCollapsedCount = $('.listing-step__header[aria-expanded="false"]').length;
        stepHeaderExpandedCount = $('.listing-step__header[aria-expanded="true"]').length;
    }

    function changeToggleState() {
        getExpandedAndCollpaseCount();

        if (stepHeaderCollapsedCount === stepHeaderCount) {
            changeText();
            $toggleButton.attr('aria-expanded', 'false');
        } else if (stepHeaderExpandedCount === stepHeaderCount) {
            changeText();
            $toggleButton.attr('aria-expanded', 'true');
        }
    }

    function init() {

        function toggleStateHandler(e) {
          
          // This is for cancelling the 'hide.bs.collapse' event, automatically triggered by bootstrap
            if (target === 'expandAll') {
                return;
            }
            changeToggleState();
        }
        $('body').on('hidden.bs.collapse', function(e) {
            toggleStateHandler(e);
        });

        $('body').on('shown.bs.collapse', function(e) {
            toggleStateHandler(e);
        });

        $('.listing-step__header').on('click', function(e) {
            target = e.target.className;
        });

        $('.expandAll').on('click', function(e) {
            e.preventDefault();
            target = e.target.className;

            toggleListingProcessAccrodion();
            changeText();
            changeIcon();
        });

    }
    init();
})();
