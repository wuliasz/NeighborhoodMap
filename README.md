# Neighborhood Map Project

#### The Neighborhood Map page shows information about five predetermined locations near me using Google Maps and Wikipedia.


## Interaction

#### There are two modes for accessing information which are independently controlled by design.

##### Clicking a location name on the left hand pane will:
    * Highlight that location name
    * Display a description of the place that I entered.
    * Display a wikipedia description.
      (The wikipedia description is also a link to more info in another tab/window.)
    * Animate the marker at the selected location.

##### Clicking on the markers on the map will:
    * Activate the pane information as described above.
    * Pop up an info window showing the name and my own description.

##### Note about modes:
In a prior version there were problems managing info window pop ups
and marker animations, such that, info windows would remain open
after refiltering or when a different list entry was clicked.
It doesn't happen anymore.

##### Filtering:
Locations can be filtered by selecting the desired category in the droplist in the left hand pane.



## Setup

To use the neighborhood map,
1. Create a new folder somewhere on your computer.
1. Navigate to this project on github in your browser: https://github.com/wuliasz/NeighborhoodMap
1. Click on the **Clone or download** button on the github repository page.
1. Copy the URL specified by github.
1. Open a command prompt and navigate to the folder you created in step 1.
1. Enter __git clone__ followed by the URL copied in step 4.
1. When the download completes, open the index.html file in your browser.



## Development Sources

Code sources and inspirations cited in the source.

Mapstyles were provided by snazzymaps.com.
Some pane styling for responsiveness comes from w3schools.com.

Javascript source code taken from or inspired by udacity examples where cited.

Knockout.js is used for html interaction.












