///// MODEL /////////////////////////////////////////////////////////////////////////////////////
var model = {
map,
markers: [],
onlyInfoWindow: null,
places: [
    { name: 'Modern Apizza',
      location: {lat: 41.313897 , lng: -72.913342 },
      desc: 'The BEST PIZZA EVER!',
      category: 'Food',
      isFavorite: true
    },
    {
       name: 'Himalaya Restaurant',
       location: {lat: 41.6277582, lng: -72.7570101},
       desc: 'Good Indian Food.',
       category: 'Food'  ,
       isFavorite: false
    },
    {
       name: 'Chauncey Peak',
       location: {lat: 41.5574852, lng: -72.7591303},
       desc: 'Moderate hike with quick view of New Haven and Hartford.',
       category: 'Hiking',
       isFavorite: false
    },
    {
       name: 'West Hartford Reservoir',
       location: {lat: 41.7523814, lng: -72.7890223},
       desc: 'Mountain biking for all skill levels.',
       category: 'Biking',
       isFavorite: false
    },
    {
       name: 'Rails to Trails Entrance',
       location: {lat: 41.7702602, lng: -72.8486968},
       desc: 'Paved walkway for leisurely hiking and biking.',
       category: 'Biking, Hiking',
       isFavorite: false
    }
   ],


   // map styles from taken from:  https://snazzymaps.com/style/61/blue-essence
   mapStyles: [
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#e0efef"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#1900ff"
                        },
                        {
                            "color": "#c0e8e8"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": 700
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#7dcdcd"
                        }
                    ]
                }
            ]

};


///// VIEW-MODEL ////////////////////////////////////////////////////////////////////////////////
var viewmodel = {

   init: function() {
        //view.init();
        ko.applyBindings(new view.init());
   },


   getPlaces: function () {
        return model.places;
   },


   getPlace: function (atIndex) {
        return model.places[atIndex];
   },


   getMap: function () {
        return model.map;
   },


   setMap: function (useMap) {
        model.map = useMap;
   },


   getMapStyles: function () {
        return model.mapStyles;
   },


   getMarkers: function () {
        return model.markers;
   },


   getMarker: function (atIndex) {
        return model.markers[atIndex];
   },


   addMarker: function (marker) {
        model.markers.push(marker);
   },


   getInfoWindow: function() {
      return model.onlyInfoWindow;
   },


   initializeMap: function () {

        var map       =  viewmodel.getMap();
        var useStyles =  viewmodel.getMapStyles();

        map = new google.maps.Map(document.getElementById('map'), {
             center: {lat: 41.6102538, lng: -72.8219422},
             styles: useStyles,
             zoom: 13,
             mapTypeControl: false
        });

        viewmodel.setMap(map);

        //var theInfoWindow = viewmodel.placeInfoWindow();
        model.onlyInfoWindow = new google.maps.InfoWindow();

        // ICON SIZES (21, 34) TAKEN FROM UDACITY EXAMPLES
        var mImageDflt    = viewmodel.makeIcon('99AACC', 21, 34, 21, 34);
        var mImageFav     = viewmodel.makeIcon('CCCC33', 21, 34, 21, 34);
        var mapBounds = new google.maps.LatLngBounds();

        var thePlaces = viewmodel.getPlaces();

        for (var i = 0; i < thePlaces.length; i++) {
            var loc  = thePlaces[i].location;
            var name = thePlaces[i].name;
            var useIcon = mImageDflt;
            if (thePlaces[i].isFavorite){
                useIcon = mImageFav;
            }

            var marker = new google.maps.Marker({
                map: map,
                position: loc,
                title: name,
                animation: google.maps.Animation.DROP,
                icon: useIcon,
                id: i
            });

            mapBounds.extend(marker.position);

            // anticipate and respond to click event
            viewmodel.addTheListener(marker, model.onlyInfoWindow, thePlaces[i].desc);

            viewmodel.addMarker(marker);
        }
        map.fitBounds(mapBounds);
        // added this listener per rejected review from udacity.
        google.maps.event.addDomListener(window, 'resize', function() {
            map.fitBounds(mapBounds);
        });
   },


    addTheListener: function (marker, infowindow, useDesc) {
        // Check to make sure the infowindow is not already opened on this marker.
        marker.addListener('click', function () {
            infowindow.marker = marker;

            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
                view.resetIndex(-1);
            });

            var useContent = '<div id="infowindowtitle">' + marker.title + '</div>';
            useContent = useContent + '<div id="infowindow">' + useDesc + '</div>';
            infowindow.setContent(useContent);

            // Open the infowindow on the correct marker.
            var thisMap = viewmodel.getMap();
            infowindow.open(thisMap, marker);
            view.resetIndex(marker.id);
        });
    },


    // makeIcon function is a modified copy of
    // makeMarkerIcon function taken from UDACITY ud864 project sample:
    // Project_Code_5_BeingStylish.html
    // found here:  ***TODO ADD THE LINK TO THE GITHUB REPOSITORY *** *** *** ***
    // i took the ICON URL and default sizes from the UDACITY example.
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Icon
    makeIcon: function (markerColor, useWidth, useHeight, scaledWidth, scaledHeight) {
        var icon = {
             url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
             size: new google.maps.Size(useWidth, useHeight),
             origin: new google.maps.Point(0, 0),
             anchor: new google.maps.Point(10,34),
             scaledSize: new google.maps.Size(scaledWidth, scaledHeight)
        };
        return icon;
    }
};


///// VIEW //////////////////////////////////////////////////////////////////////////////////////
var view = {

    Place: function (data) {
        this.name       = ko.observable(data.name);
        this.location   = ko.observable(data.location);
        this.desc       = ko.observable(data.desc);
        this.category   = ko.observable(data.category);
        this.isFavorite = ko.observable(data.isFavorite);
        this.itemclass  = ko.observable('placeList');
    },


    HighlightedPlace: function (data) {
        this.name       = ko.observable(data.name);
        this.location   = ko.observable(data.location);
        this.desc       = ko.observable(data.desc);
        this.category   = ko.observable(data.category);
        this.isFavorite = ko.observable(data.isFavorite);
        this.itemclass  = ko.observable('placeListHighlight');
    },


    WikiEntry: function (data) {
        this.desc = ko.observable(data.desc);
        this.url  = ko.observable(data.url);
    },


    init: function() {
        // set up connections between KO and the DOM
        // and define listeners... etc.

        var self = this;

        placeList           = ko.observableArray([]);
        selectedPlaceName   = ko.observable();
        selectedDescription = ko.observable('');
        selectedIndex       = ko.observable(-1);
        selectedCategory    = ko.observable('All');
        wikiHeader          = ko.observable();
        wikiList            = ko.observableArray([]);

        this.filterTypes        = ko.observableArray(['All','Food','Biking','Hiking']);
        this.categorySelector   = ko.observableArray();

        this.highlightLoc = function (index) {
            selectedIndex(index);
            view.render();
        };

        this.applyFilters = function () {
            selectedIndex(-1);
            view.render();
        };

        view.render();
    },


    render: function() {
        placeList.removeAll();
        let thePlaces       = viewmodel.getPlaces();
        let currentCategory = selectedCategory();
        let currentIndex    = selectedIndex();
        let thisIndex = -1;
        let actualIndex = -1;
        let thisPlace;


        selectedPlaceName('');
        selectedDescription('');
        wikiHeader('');
        wikiList.removeAll();
        let useDescription = '';
        theMarkers = viewmodel.getMarkers();
        let thisMarker;

        // first try to reset every marker animation.
        for (let i = 0; i < theMarkers.length; i++) {
            thisMarker = theMarkers[i];
            try {
                thisMarker.setMap(null);
                thisMarker.setAnimation(null);
            } catch (err) {
                let x = true;
            }
        }

        thePlaces.forEach(function(individualPlace){
            thisPlace = new view.Place(individualPlace);
            categoryMatches = (thisPlace.category().indexOf(currentCategory) >= 0);
            actualIndex++;
            let thisMarker = theMarkers[actualIndex];
            theMap = viewmodel.getMap();

            if (currentCategory == 'All' || categoryMatches ) {
                thisIndex++;
                try {
                    thisMarker.setMap(theMap);
                } catch (err) {
                  console.log("set Map error:  " + err);
                }

                if (thisIndex == currentIndex) {
                    thisPlace = new view.HighlightedPlace(individualPlace);
                    selectedPlaceName(thisPlace.name());
                    selectedDescription(thisPlace.desc());
                    thisMarker.setAnimation(google.maps.Animation.BOUNCE);
                }
                placeList.push(thisPlace);
            }
        });

        view.getWikipedia();

        try {
            let theInfoWindow = viewmodel.getInfoWindow();
            let iwMarker = theInfoWindow.marker;
            let iwmID = iwMarker.id;
            if (currentIndex != iwmID ) {
                    theInfoWindow.close();
            }
        } catch (err) {
            console.log("Error attempting to close info window:  " + err);
        }

    },


    // reach out to wikipedia to find info about the selected place
    // elements in this block inspired by Udacity exercises.
    getWikipedia: function () {

        // i moved the getWikipedia call into view.render()
        // so that it is always called
        // but i really don't want to run it
        // if no place has been selected.
        // which is the case on a page load
        // or a filter change.
        if (selectedPlaceName().length > 0) {
          // clear out old data before new request
          wikiHeader('searching wikipedia for "' + selectedPlaceName() + '"');
          wikiList.removeAll();

          var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
          wikiURL += selectedPlaceName() +'&format=json&callback=wikiCallBack';

          // changed this ajax block per rejected project review from udacity.
          $.ajax({
              url: wikiURL,
              dataType: 'jsonp'
          }).done(function (response) {
              // the description in the response is element 2
              pages = response[2];
              // set up a default exception message, if response not good.
              description = 'Unable to parse wikipedia response.';
              wUrl = '#';
              if (pages.length > 0) {

                  // capture wikipedia's description
                  description = pages[0];
                  // then get the name wikipedia will use in their url
                  pages = response[1];
                  linkIdentifier = pages[0];
                  wUrl = 'http://en.wikipedia.org/wiki/' + linkIdentifier;
              }
              // turn the info into json, then into an object
              wiStr = {desc: description, url: wUrl};
              thisEntry = new view.WikiEntry(wiStr);
              wikiList.push(thisEntry);
              // clear the error information label upon successful
              // retrieval and parsing of wikipedia info.
              wikiHeader('');
          }).fail(function (jqXHR, textStatus) {
              // display information when an error occurs
              wikiHeader('Wikipedia lookup failed:  ' + textStatus);
          });
        }
    },

    resetIndex: function(useIndex) {
      selectedIndex(useIndex);
      view.render();
    },


    googleMapError: function () {
        wikiHeader('Unable to load the google map!');
    }
};

viewmodel.init();