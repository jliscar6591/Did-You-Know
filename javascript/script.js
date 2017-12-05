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
	youtubeQuery(youtubequeryURL);
});

$(document).on("click", "#run-search", youtubeQuery);
