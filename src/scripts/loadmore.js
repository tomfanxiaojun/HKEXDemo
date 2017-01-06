	(function() {
    $('#loadmoreButton').on('click', () => {
       $('#loadmoreButtonImg').attr("src","images/load-more.gif");
       setTimeout(() => {
         getData();
         $('#loadmoreButtonImg').attr("src","images/loadmore-img.png");
       } , 3000);

    });

		$('.loadMore__wrapper').on('click', () => {
			 $('.loadMore__icon').css("background-image","url(../images/load-more.gif)");
			 setTimeout(() => {
				 $('.loadMore__icon').css("background-image","url(../images/loadmore-img.png)");
			 } , 3000);

		});
    function getData(){
      $.getJSON('files/fqamockdata.json', function(data) {
        var items = [];
        var panelList = $(".panel-default");
        let index = panelList.length;
        $.each(data, function(key, val) {
          let collapseButton = $("<a></a>").addClass("collapsed");
              $(collapseButton).attr("role","button");
              $(collapseButton).attr("data-toggle","collapse");
              $(collapseButton).attr("data-parent","#accordion");
              $(collapseButton).attr("href","#collapseThree-"+index);
              $(collapseButton).attr("aria-expanded","false");
              $(collapseButton).attr("aria-controls","collapseThree-"+index);
              $(collapseButton).text(key);
              $(collapseButton).append("<i></i>");

          let panelBody = $("<div></div>").addClass("panel-body");
              $(panelBody).text(val);

          let panelDefault = $("<div></div>").addClass("panel");
              $(panelDefault).addClass("panel-default");
          let panelHeading = $("<div></div>").addClass("panel-heading");
              $(panelHeading).attr("id","headingThree-"+index);
              $(panelHeading).attr("role","tab");
          let panelTitle = $("<h3></h3>").addClass("panel-title");
              $(panelTitle).append(collapseButton);
              $(panelHeading).append(panelTitle);
          let panelCollapse = $("<div></div>").addClass("panel-collapse");
              $(panelCollapse).addClass("collapse");
              $(panelCollapse).attr("id","collapseThree-"+index);
              $(panelCollapse).attr("role","tabpanel");
              $(panelCollapse).attr("aria-labelledby","headingThree-"+index);

              $(panelCollapse).append(panelBody);
              $(panelDefault).append(panelHeading,panelCollapse);
          items.push(panelDefault);
          index++;
        });
       
        $('.panel-group').append(items);
      });
    }

})();
