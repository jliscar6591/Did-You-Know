
// These variables will hold the results we get from the user's inputs via HTML
var showSearch = "";
var numResults = 0;

var queryURL = "https://www.omdbapi.com/?t=" + thisShow + "&y=&plot=short&apikey=trilogy";

// Counter to keep track of video numbers as they come in
var vidCounter = 0;

function runQuery(numArticles, queryURL) {
		
		$.ajax({
			url: queryURL, 
			method: 'GET'
		}).done(function(response){
			var currentVid = response.data;

			console.log(currentVid);
		});


			/*$.each(currentVid, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;*/