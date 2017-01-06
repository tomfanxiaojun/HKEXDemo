(function($) {

    $(`table.marginTable`).scrollTable({
        freezeCols: 1,
        maxFreezeWidth: 0.33
    });
    
    $(`.marginTable .table`).scrollTable({
        freezeCols: 2,
        maxFreezeWidth: 0.33
    });
      $(`#stockTable`).scrollTable({
        freezeCols: 0,
        maxFreezeWidth: 0.33
    });

}(jQuery));
