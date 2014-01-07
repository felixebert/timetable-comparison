#!/bin/sh
node schools.js ../data/S4\ Vergleich\ -\ Schulen.csv > ../src/js/data/schools.js
node timetable.js ../data/S4\ Vergleich\ -\ Haltezeiten\ Richtung\ Karlsruhe\ -\ alt.csv forward-old > ../src/js/data/timetable-forward-old.js
node timetable.js ../data/S4\ Vergleich\ -\ Haltezeiten\ Richtung\ Karlsruhe\ -\ neu.csv forward-new > ../src/js/data/timetable-forward-new.js
node timetable.js ../data/S4\ Vergleich\ -\ Haltezeiten\ Richtung\ Schwaebisch\ Hall\ -\ neu.csv reverse-new > ../src/js/data/timetable-reverse-new.js
node timetable.js ../data/S4\ Vergleich\ -\ Haltezeiten\ Richtung\ Schwaebisch\ Hall\ -\ alt.csv reverse-old > ../src/js/data/timetable-reverse-old.js
node stations.js ../data/S4\ Vergleich\ -\ Haltestellen.csv > ../src/js/data/stations.js
