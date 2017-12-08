
//runs the query though omdb
function runQuery(queryURL) {
	
	$.ajax({
		url: queryURL, 
		method: 'GET'
	}).done(function(response){
		console.log(response);
		//clear facts
		$('#displayfacts').html('');

		// Creating a div to hold the facts
          var factsDiv = $("<div class='col-md-12 facts'>");

          var DYK = $("<p>").text("Did You Know??");

          DYK.attr("id", DYK);

          factsDiv.append(DYK);

          // Storing the rating data
          var boxOffice = response.BoxOffice;

          // Creating an element to have the box office displayed
          var pOne = $("<p>").text("Box Office: " + boxOffice);

          // Displaying the box office
          factsDiv.append(pOne);

          // Storing the awrds
          var awards = response.Awards;

          // Creating an element to hold the awards
          var pTwo = $("<p>").text("Awards: " + awards);

          // Displaying the release year
          factsDiv.append(pTwo);

          // Putting the entire facts above the previous movies
          $("#displayfacts").append(factsDiv);

	});

};

//runs the query for youtube
function search(){
	//clear results
	$('#display').html('');
	$('#buttons').html('');

	//get form input
	q = $('#newMovieInput').val();

	//run GET request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q + "movie bloopers",
			type: 'video',
			key: 'AIzaSyDUpVML5L2NgWnB9BRdCcsayZu-i8j5eHo'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				//log data
				console.log(data);

				$.each(data.items, function(i, item){
					//Get output
					var output = getOutput(item);


					//Display results
					$('#display').append(output);

				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				//display buttons
				$('#display').append(buttons);
			}
		);
}

//Next page function
function nextPage() {
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');

	//clear results
	$('#display').html('');
	$('#buttons').html('');

	//get form input
	q = $('#newMovieInput').val();

	//run GET request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyDUpVML5L2NgWnB9BRdCcsayZu-i8j5eHo'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				//log data
				console.log(data);

				$.each(data.items, function(i, item){
					//Get output
					var output = getOutput(item);

					//Display results
					$('#display').append(output);

				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				//display buttons
				$('#display').append(buttons);
			}
		);
}

//Prev page function
function prevPage() {
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');

	//clear results
	$('#display').html('');
	$('#buttons').html('');

	//get form input
	q = $('#newMovieInput').val();

	//run GET request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyDUpVML5L2NgWnB9BRdCcsayZu-i8j5eHo'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				//log data
				console.log(data);

				$.each(data.items, function(i, item){
					//Get output
					var output = getOutput(item);

					//Display results
					$('#display').append(output);

				})

				var buttons = getButtons(prevPageToken, nextPageToken);

				//display buttons
				$('#display').append(buttons);
			}
	);
}
	
//Build Output
function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	//Build output string
	var output = '<li>' +
	'<div class = "list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'+
	'<small>By <span class="cTitle">'+channelTitle+'</span on '+videoDate+'</small>' +
	'<p>'+description+'</p>'+
	'</div>'+
	'</li>' +
	'<div class="clearfix"></div>'+
	'';

	return output;
}


// Build the buttons
function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">'+
						'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query"'+q+'"'+
						'onclick="nextPage();">Next Page</button></div>';	
	} else {
		var btnoutput = '<div class="button-container">'+
						'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'"data-query"'+q+'"'+
						'onclick="prevPage();">Prev Page</button></div>'+
						'<div class="button-container">'+
						'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query"'+q+'"'+
						'onclick="nextPage();">Next Page</button></div>';
					}
	return btnoutput;
}

// METHODS
// ==========================================================

//create an initial recent count variable
var recentCount = 0;

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

	// create div to hold the text and clear button
	var recentSearch = $('<div class="col-md-2"></div>');
	var recentSearchBtn = $("<button>")

	recentSearch.attr("id", "recent-" + recentCount);
	recentSearch.append(recentSearchBtn);

	recentSearchBtn.append(searchTerm);
	recentSearchBtn.attr("class", "recentSearchBtn")
	recentSearchBtn.attr("value", searchTerm);

	

	var recentClose = $("<button>");

	recentClose.attr("recent-search", recentCount);
	recentClose.addClass("checkbox");
	recentClose.append("X");

	// Append the button to the recent search
	recentSearch = recentSearch.prepend(recentClose);

	// Add the button and recent search to the recent div
	$('#recentsDiv').append(recentSearch);

	// Then we will pass the final searchURL and the number of results to
	// include to the runQuery function
	runQuery(queryURL);
	search();


	// Clear the textbox when done
	$('#newMovieInput').val("");

	recentCount++;




});

$(document.body).on("click", ".checkbox", function(){

	var recentNumber = $(this).attr("recent-search");

	$("#recent-" + recentNumber).remove();
});


	$(document.body).on("click",".recentSearchBtn", function(){
		var text = $(this).text();
		$("#newMovieInput").val(text);
		console.log(text);
		$(this).remove();
		$("#recentClose").remove();

		});