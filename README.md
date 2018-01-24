#Neighborhood Map Project#

####The Neighborhood Map page shows information about five predetermined locations near me using Google Maps and Wikipedia.####


##Interaction##

####There are two modes for accessing information which are independently controlled by design.####

#####Clicking a location name on the left hand pane will:####
    *highlight that location name
    *display a description of the place that I entered.
    *display a wikipedia description.
     the wikipedia description is also a link to more info in another tab/window.
    *animate the marker at the selected location.

#####Clicking on the markers on the map will:
    *activate the pane information as described above.
    *pop up an info window showing the name and my own description.
     infowindows, which are manually opened, must be manually closed.

#####Note about modes:
Information obtained from one access mode will not effect any information provided from another.
For example, InfoWindows which are opened by a marker click must be closed by a mouse click.
Neither click will effect the information displayed in the left hand pane.
Although a pane selection will bounce a marker to highlight the location,
it will not interfere with manually selected InfoWindows.


#####Filtering:
Locations can be filtered by selecting the desired category in the droplist in the left hand pane.



##Development Sources

Code sources and inspirations cited in the source.

Mapstyles were provided by snazzymaps.com.
Some pane styling for responsiveness comes from w3schools.com.

Javascript source code taken from or inspired by udacity examples where cited.

Knockout.js is used for html interaction.












