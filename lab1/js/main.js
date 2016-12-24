function loadTweets() {

    $("#tweets").empty();

    var tweetsCount = $('#tweets_count').val();
    var userId = $('#user_id').val();
    var userName = $('#user_name').val();
    var timeFromStr = $('#time_from').val();
    var timeSinceStr = $('#time_since').val();

    var params = {
        include_entities: true,
        include_rts: true,
        count: tweetsCount
    };

    if (userId.length > 0) {
        params["user_id"] = userId;
    } else {
        params["screen_name"] = userName;
    }

    var proxyEndPoint = "http://localhost:8888/1.1/";
    $.ajax({
        url: proxyEndPoint + "statuses/user_timeline.json",
        type: "GET",
        dataType: "jsonp",
        data: params,
        success: function (response) {
            $.each(response, function (i, item) {
                var $header = $("<h1>")
                    .append($("<img>", { src: item.user.profile_image_url}).addClass("img-circle tweetimg"))
                    .append($("<span class='floating'>").html(item.user.name));

                var $text = $("<h4>").html(item.text);

                var $details = $("<details>").append(
                    $("<span>").html(item.created_at)
                );

                var tweetDate = new Date(item.created_at);

                if (timeFromStr.length > 0 && timeSinceStr.length > 0) {
                    var timeFrom = new Date(parseInt(timeFromStr.substr(0, 4)),
                                             parseInt(timeFromStr.substr(5, 2)) - 1,
                                             parseInt(timeFromStr.substr(8)) + 1
                    );
                    var dateSince = new Date(parseInt(timeSinceStr.substr(0, 4)),
                                             parseInt(timeSinceStr.substr(5, 2)) - 1,
                                             parseInt(timeSinceStr.substr(8)) + 1
                    );

                    if (timeFrom <= tweetDate && tweetDate <= dateSince) {
                        $("<li class='list-group-item rowspace'>", {id: item.id})
                            .append($header, $text, $details)
                            .appendTo("#tweets");
                    }
                } else {
                    $("<li class='list-group-item rowspace'>", {id: item.id})
                        .append($header, $text, $details)
                        .appendTo("#tweets");
                }

            });
        },
        error: function (xhr, status, error) {
            alert("Произошла ошибка: " + status);
        }
    });
}

document.onready = loadTweets();