let subredditsTemplateString = document.getElementById('subreddits').innerHTML;

let renderSubreddits = Handlebars.compile(subredditsTemplateString); 


Handlebars.registerHelper('format-subscriber', (num) => {
	return num.toLocaleString();
});

Handlebars.registerHelper('format-num-comments', (num) => {
	if(num == 0){
		return "No comments.";
	}
	else {
		return "Number of comments: " + num.toLocaleString();
	}
});



let search = function(event){
	event.preventDefault(); // prevent behavior of the anchor default behavior (appending # to link)
	$("#content").html('<div class="loader">Loading...</div>');
	let sub = $("#search-box").val()
	let url = `https://www.reddit.com/r/${sub}.json`;

	let promise = $.ajax({
		type: 'GET',
		url: url
	});

	promise.then(function(posts){
		let renderedSubreddits = renderSubreddits(posts.data)
		$('#content').html(renderedSubreddits);

	}, function(error){
		console.log(error);
		$('#content').html("<h3>Oops! Something went wrong!</h3>");
	})
};

$("#search-btn").on('click', search);
$("#search-form").on('submit', search);