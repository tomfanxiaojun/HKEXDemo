$(window).resize(function () {
    if (window.innerWidth <= 767) {
        $('#twitter-section__carousel').addClass('carousel slide');
        $('#twitter-section__carousel').attr('data-ride', 'carousel');
        $("#twitter-section__carousel").carousel("cycle");
    }else{
        $('#twitter-section__carousel').removeClass('carousel slide');
        $('#twitter-section__carousel').attr('data-ride', '');
        $("#twitter-section__carousel").carousel("pause");

    }
});
$(window).on('load', function () {
    if (window.innerWidth <= 767) {
        $('#twitter-section__carousel').addClass('carousel slide');
        $('#twitter-section__carousel').attr('data-ride', 'carousel');
        $("#twitter-section__carousel").carousel("cycle");
    }else{
        $("#twitter-section__carousel").carousel("pause");
    }

});

