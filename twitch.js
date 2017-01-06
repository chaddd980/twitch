$("document").ready(function() {
  streamers = [
    "freecodecamp",
    "ESL_SC2",
    "brunofin"
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
            "'><img class='img-circle' src='" + streamLogo + "'></a><li>" + streamer + "</li></div><div class='game-info col-xs-8 text-center'>" + streamGame + "</div></div>")
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
                  var streamLogo = "https://inst.eecs.berkeley.edu/~cs194-26/fa14/upload/files/projFinalUndergrad/cs194-ma/sean_hickey_final_proj/pics/keyboard-random.jpg"
                  $("ul").append("<div class='channels' id='" + streamer + "'><div class='logo-div col-xs-4 text-center'><a href='" + streamLink +
                  "'><img class='img-circle' src='" + streamLogo + "'></a><li>" + streamer + "</li></div><div class='game-info col-xs-8 text-center'>" + streamGame + "</div></div>")
                } else {
                  streamer = info["display_name"];
                  var streamLogo = info["logo"];
                  var streamGame = "Offline";
                  var streamLink = info["url"];
                  $("ul").append("<div class='channels' id='" + streamer + "'><div class='logo-div col-xs-4 text-center'><a href='" + streamLink +
                  "'><img class='img-circle' src='" + streamLogo + "'></a><li>" + streamer + "</li></div><div class='game-info col-xs-8 text-center'>" + streamGame + "</div></div>")
                }
              }
            });
          }
        },
      });
  }
})
