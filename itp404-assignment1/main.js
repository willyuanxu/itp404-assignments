let search = function(event){
	event.preventDefault(); // prevent behavior of the anchor default behavior (appending # to link)
	$("#results").html('<div class="loader">Loading...</div>');
	let sub = $("#search-box").val()
	let url = `https://www.reddit.com/r/${sub}.json`;

	let promise = $.ajax({
		type: 'GET',
		url: url
	});

	promise.then(function(posts){
		let html = "";
		posts.data.children.forEach(function(post){
			html += `<div>
				<h4>${post.data.title}</h4>
				<span><strong>Author:</strong> ${post.data.author}</span>
				<span><strong>Score:</strong> ${post.data.score}</span>
			</div> <br/>`;
		});
		$('#results').html(html);
	}, function(error){
		console.log(error);
	})
};

$("#search-btn").on('click', search);
$("#search-form").on('submit', search);