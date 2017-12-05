// fixes titles of videos
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

//runs the query though omdb
function runQuery(queryURL) {
	
	$.ajax({
		url: queryURL, 
		method: 'GET'
	}).done(function(response){
		console.log(response);
	});

}

//runs the query for youtube
function youtubeQuery(request){

       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#newMovieInput").val()).replace(/%20/g, "+"),
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $(".display").html("");
          $.each(results.items, function(index, item) {
            $.get("./tpl/item.html", function(data) {
                $(".display").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
   
            });
          });
          resetVideoHeight();
       });
    $(window).on("resize", resetVideoHeight);
    };

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyDUpVML5L2NgWnB9BRdCcsayZu-i8j5eHo");
    gapi.client.load("youtube", "v3", function() {
    	youtubeQuery();
        // yt api is ready
    });
}

// METHODS
// ==========================================================

// on.("click") function associated with the Search Button	
$("#run-search").on("click", function(event) {
	// This line allows us to take advantage of the HTML "submit" property
	// This way we can hit enter on the keyboard and it registers the search
	// (in addition to clicks).
	event.preventDefault();

	// Grabbing text the user typed into the search input
	var searchTerm = $("#newMovieInput").val().trim();
	var searchURL = queryURL ;

	var queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

	//Number of results the user would like displayed
	//numResults = $("#num-records-select").val();

	// Then we will pass the final searchURL and the number of results to
	// include to the runQuery function
	runQuery(queryURL);
	youtubeQuery();
});

//$(document).on("click", "#run-search", youtubeQuery);
