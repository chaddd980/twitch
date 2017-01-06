$("document").ready(function() {
  streamers = [
    "freecodecamp",
    "ESL_SC2",
    "brunofin",
    "OgamingSC2",
    "cretetion",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "comster404"
  ]
  var noStream = false;
  for (var i = 0; i < streamers.length; i++) {
    var url = "https://wind-bow.gomix.me/twitch-api/streams/" + streamers[i]
      $.ajax ({
        url: url,
        dataType: 'json',
        async: false,
        type: 'GET',
        success: function(data) {
          if (data["stream"]){
            var streamInfo = data;
            var streamLink = data["stream"]['channel']['url'];
            var streamGame = data["stream"]["game"];
            var streamLogo = data["stream"]["channel"]["logo"];
            var streamer = data["stream"]["channel"]["display_name"]

            $("ul").append("<div class='channels' id='" + streamer + "'><div class='logo-div col-xs-4 text-center'><a href='" + streamLink +
            "'><img class='img-circle' src='" + streamLogo + "'><li>" + streamer + "</li></a></div><div class='game-info col-xs-8 text-center'>" + streamGame + "  <img class='indicator' src='http://images.clipshrine.com/wheel/medium-yellow-glossy-circle-oval-shiny-0-15656.png'></div></div>")
          } else if (data["stream"] === null) {
            var streamer = streamers[i];
            $.ajax({
              url: "https://wind-bow.gomix.me/twitch-api/channels/" + streamers[i],
              dataType: 'json',
              async: false,
              type: 'GET',
              success: function(info) {
                if (info["display_name"] === undefined) {
                  var streamGame = "Account Closed"
                  var streamLogo = "http://etc.usf.edu/presentations/extras/letters/fridge_magnets/red/34/x-300.png"
                  $("ul").append("<div class='channels' id='" + streamer + "'><div class='logo-div col-xs-4 text-center'><img class='img-circle' src='" + streamLogo +
                  "'><li>" + streamer + "</li></div><div class='game-info col-xs-8 text-center'>" + streamGame + "  <img class='indicator' src='http://images.clipshrine.com/wheel/medium-yellow-glossy-circle-oval-shiny-66.6-15656.png'></div></div>")
                } else {
                  streamer = info["display_name"];
                  var streamLogo = info["logo"];
                  var streamGame = "Offline";
                  var streamLink = info["url"];
                  $("ul").append("<div class='channels' id='" + streamer + "'><div class='logo-div col-xs-4 text-center'><a href='" + streamLink +
                  "'><img class='img-circle' src='" + streamLogo + "'><li>" + streamer + "</li></a></div><div class='game-info col-xs-8 text-center'>" + streamGame + "  <img class='indicator' src='http://images.clipshrine.com/getimg/PngMedium-yellow-glossy-circle-oval-shiny-15656.png'></div></div>")
                }
              }
            });
          }
        },
      });
  }
})
