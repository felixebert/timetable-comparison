/*! timetable-comparison 19-12-2013 */
var tc={timetable:{}};tc.schools=[{name:"Andreas-Schneider-Schule",station:"Berufsschulzentrum",footway:"5",begin:"08:00:00",end5:"12:10:00",end6:"13:00:00",end8:"14:40:00",end10:"16:20:00"},{name:"Realschule Eppingen",station:"Eppingen West",footway:"10",begin:"07:45:00",end5:"12:05:00",end6:"12:50:00",end8:"14:30:00",end10:"16:10:00"},{name:"Hartmanni-Gymnasium Eppingen",station:"Eppingen",footway:"10",begin:"07:45:00",end5:"12:05:00",end6:"12:50:00",end8:"14:35:00",end10:"16:15:00"},{name:"Christiane-Herzog-Schule",station:"Berufsschulzentrum",footway:"5",begin:"08:00:00",end5:"12:10:00",end6:"13:00:00",end8:"14:40:00",end10:"16:20:00"},{name:"Elly-Heuss-Knapp-Gymnasium Heilbronn",station:"Berufsschulzentrum",footway:"12",begin:"08:00:00",end5:"12:15:00",end6:"13:05:00",end8:"15:30:00",end10:"17:15:00"},{name:"Robert-Mayer-Gymnasium",station:"Friedensplatz",footway:"3",begin:"07:45:00",end5:"12:10:00",end6:"13:00:00",end8:"15:45:00",end10:"17:25:00"},{name:"Mönchsee-Gymnasium Heilbronn",station:"Friedensplatz",footway:"3",begin:"07:45:00",end5:"12:10:00",end6:"13:00:00",end8:"-",end10:"17:00:00"},{name:"Theodor-Heuss-Gymnasium Heilbronn",station:"Friedensplatz",footway:"5",begin:"07:45:00",end5:"12:10:00",end6:"13:00:00",end8:"15:35:00",end10:"17:20:00"}],tc.stations=["Waldenburg (Württ)","Neuenstein","Öhringen Cappel","Öhringen Hbf","Öhringen West","Bitzfeld","Bretzfeld","Scheppach","Wieslensdorf","Eschenau (b. Heilbronn)","Affaltrach","Willsbach","Sülzbach Schule","Sülzbach","Ellhofen","Weinsberg/Ellhofen Gewerbeg.","Weinsberg","Weinsberg West","Heilbronn Trappensee","Pfühlpark","Finanzamt","Friedensplatz","Harmonie","Rathaus","Neckar-Turm am K.-Schum.-Pl.","Hbf/Willy-Brandt-Platz","Böckingen Sonnenbrunnen","Berufsschulzentrum","Böckingen West","Leingarten Ost","Leingarten","Mitte","Mitte West","Schwaigern Ost","Schwaigern (Württ.)","Schwaigern West","Stetten am Heuchelberg","Gemmingen","Gemmingen West","Eppingen","Eppingen West","Sulzfeld"],function(a,b){"use strict";var c={getSchoolNames:function(){var b=[];return a.schools.forEach(function(a){b.push(a.name)}),b},generateOptionTags:function(a){var b="";return a.forEach(function(a){b+='<option value="'+a+'">'+a+"</option>"}),b},init:function(){b("#school").html(this.generateOptionTags(this.getSchoolNames())),b("#station").html(this.generateOptionTags(a.stations))}};a.form=c}(tc,jQuery);