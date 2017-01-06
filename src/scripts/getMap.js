(function($) {

    'use strict';

    let getMap = function() {
        if($('#appMap').length > 0){
            var map = null;

            var mapOptions = {
                credentials: "NTXUj3U1SaiW0iOWY7VO~N2ahLpJGtBEe_QBk5EZejQ~Anq_UCrR3Ougr47YwN0kjd9h3ei-YY_EUWUNBJBxUicsGue2Kx57noAiClufAgH7",
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                center: new Microsoft.Maps.Location(22.2839970143,114.1542757758),
                zoom: 16,
                showDashboard: false,
                enableSearchLogo: false,
                enableClickableLogo: false
            };

            map = new Microsoft.Maps.Map(document.getElementById("appMap"), mapOptions);
                    
            // add pin
            var locs = [];
            var Latitude = 22.283889;
            var Longitude = 114.158333;

            var cord = new Microsoft.Maps.Location(Latitude, Longitude);

            locs.push(cord);

            var pin = new Microsoft.Maps.Pushpin(cord,
                { text: "",
                draggable: false
                });

            map.entities.push(pin);

            var bestView = Microsoft.Maps.LocationRect.fromLocations(
                new Microsoft.Maps.Location(22.2839970143,114.1542757758)
            );

            map.setView({ bounds: bestView });
        }
    };

    getMap();

}(jQuery));
