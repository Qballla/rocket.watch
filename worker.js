var RocketWatch = require('./server.js');
var Notify = require('./notifications.js');

console.log("Worker initiated @ " + RocketWatch.ReadableDateString(Date.now()));

//every minute
setInterval(function() {
  //console.log("1 minute loop");
  RocketWatch.load("/launch/next/4?status=1,5,6", function(next) {
    for (var i in next.launches) {
      //cache next 3 launches and notify if needed
      RocketWatch.load("/launch?mode=verbose&id=" + next.launches[i].id + "&format=live");
    }
  })
  RocketWatch.load("/launch?limit=4&sort=desc&mode=summary&status=3,4,7", function(prev) {
    for (var i in prev.launches) {
      RocketWatch.load("/launch?mode=verbose&id=" + prev.launches[i].id + "&format=live");
    }
  });
}, 60000);

//every ten minutes
setInterval(function() {

  //console.log("10 minute loop");
  RocketWatch.load("/agency/spx?mode=verbose&format=news");
  RocketWatch.load("/launch?limit=200&mode=summary&sort=desc&name=&lsp=121&format=stats", function(d) {
    for (var i in d.launches) {
      RocketWatch.load("/launch?mode=verbose&id=" + d.launches[i].id + "&format=live");
    }
  });
  RocketWatch.load("/agency/ula?mode=verbose&format=news");
  RocketWatch.load("/launch?limit=200&mode=summary&sort=desc&name=&lsp=124&format=stats", function(d) {
    for (var i in d.launches) {
      RocketWatch.load("/launch?mode=verbose&id=" + d.launches[i].id + "&format=live");
    }
  });
  RocketWatch.load("/agency/asa?mode=verbose&format=news");
  RocketWatch.load("/launch?limit=200&mode=summary&sort=desc&name=&lsp=115&format=stats", function(d) {
    for (var i in d.launches) {
      RocketWatch.load("/launch?mode=verbose&id=" + d.launches[i].id + "&format=live");
    }
  });
  RocketWatch.load("/agency/rfsa?mode=verbose&format=news");
  RocketWatch.load("/launch?limit=200&mode=summary&sort=desc&name=&lsp=63&format=stats", function(d) {
    for (var i in d.launches) {
      RocketWatch.load("/launch?mode=verbose&id=" + d.launches[i].id + "&format=live");
    }
  });

  RocketWatch.load("/agency?limit=30&islsp=1&offset=0", function(d) {
    for (i = 1; (30 * i) - d.total < 30; i++) {
      RocketWatch.load("/agency?limit=30&islsp=1&offset=" + (i * 30), function(c) {
        for (var j in c.agencies) {
          RocketWatch.load("/agency/" + c.agencies[j].id + "?format=news");
        }
      });
    }
    for (var i in d.agencies) {
      RocketWatch.load("/agency/" + d.agencies[i].id + "?format=news");
    }
  });

  RocketWatch.load("/agency?limit=30&mode=verbose&islsp=1&offset=0", function(d) {
    for (i = 1; (30 * i) - d.total < 30; i++) {
      RocketWatch.load("/agency?limit=30&mode=verbose&islsp=1&offset=" + (i * 30), function(c) {
        for (var j in c.agencies) {
          RocketWatch.load("/agency/" + c.agencies[j].id + "?format=news");
        }
      });
    }
    for (var i in d.agencies) {
      RocketWatch.load("/agency/" + d.agencies[i].id + "?format=news");
    }
  });

  RocketWatch.load("/rocket?mode=verbose&limit=30&offset=0", function(d) {
    for (i = 1; (30 * i) - d.total < 30; i++) {
      RocketWatch.load("/rocket?mode=verbose&limit=30&offset=" + (i * 30), function(c) {
        for (var j in c.rockets) {
          RocketWatch.load("/rocket/" + c.rockets[j].id + "?mode=verbose");
        }
      });
    }
    for (var i in d.rockets) {
      RocketWatch.load("/rocket/" + d.rockets[i].id);
    }
  });

}, 60 * 60 * 1000);
