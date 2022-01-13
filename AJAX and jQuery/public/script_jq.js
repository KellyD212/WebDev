$(function() {

	var requestConfig = {
		method: 'GET',
		url:'http://api.tvmaze.com/shows',
		dataType: 'json'
	};
		$.ajax(requestConfig).then(function(responseMessage) {
		load = true;
		let apiData = responseMessage;
		$('#showList').show();
		apiData.map((show) => {
	
			const li = `<li><a href = "${show._links.self.href}">${show.name}</a></li>`;
			$('#showList').append(li);
		});
	
	});

	$('#homeLink').click(function(event) {
		event.preventDefault();
		$('#show').hide();
		$('#showList').empty();
		var requestConfig = {
			method: 'GET',
			url:'http://api.tvmaze.com/shows',
			dataType: 'json'
		};
			$.ajax(requestConfig).then(function(responseMessage) {
			load = true;
			let apiData = responseMessage;
			$('#showList').show();
			apiData.map((show) => {
		
				const li = `<li><a href = "${show._links.self.href}">${show.name}</a></li>`;
				$('#showList').append(li);
			});
		
		});
	});

	$('#showList').click(function(event) {
		
		event.preventDefault();
		$('#showList').hide();
		var requestConfig = {
			method: 'GET',
			url: event.target.href,
			dataType: 'json'
		};
		$.ajax(requestConfig).then(function(responseMessage) {
			let apiData = responseMessage;
			$('#show').empty();
			
			const header = `<h1>${apiData.name}</h1>`;
			$('#show').append(header);
			var image = "";
			if (!apiData.image) {
				image = `<img alt = "no image" src = "public/no_image.jpeg"/>`;
			}else {
				image = `<img alt = "show image" src = "${apiData.image.medium}"/>`;
			}
			$('#show').append(image);
			const def = `<dl>
			<dt>language</dt>
			<dd>${apiData.language?apiData.language:"N/A"}</dd>
			<dt>genres</dt>
			<dd><ul id = genreList></ul></dd>
			<dt>average rating</dt>
			<dd>${apiData.rating.average?apiData.rating.average:"N/A"}<dd>
			<dt>network</dt>
			<dd>${apiData.network?apiData.network.name:"N/A"}<dd>
			<dt>summary</dt>
			<dd>${apiData.summary?apiData.summary:"N/A"}<dd>
			</dl>`;
			$('#show').append(def);
			apiData.genres.map((genre) => {
				const li = `<li>${genre}</li>`;
				$('#genreList').append(li);
			});

			$('#show').show();
			$('#homeLink').show();
		});
	});
	//function for what happens when search form submitted
	$('#searchForm').submit(function(event) {
	 	event.preventDefault();
		$('#show').hide();
		$('#homeLink').show();
		const search_term = $('#search_term').val().trim()
	 	if (search_term) {
	 		$('#error').hide();
	 		$('#showList').empty();
	 		
			var requestConfig = {
				method: 'GET',
				url: "http://api.tvmaze.com/search/shows?q=" + search_term,
				dataType: 'json'
			};
			$.ajax(requestConfig).then(function(responseMessage) {
				let apiData = responseMessage;
				
				$('#showList').show();
				console.log(apiData);
				apiData.map((show) => {
					const li = `<li><a href = "${show.show._links.self.href}">${show.show.name}</a></li>`;
					$('#showList').append(li);
				});
			});
	 		$('#searchForm').trigger('reset');
	 		$('#search_term').focus();
	 	} else {
			$('#error').show();
			$('#search_term').focus(); 			
	 	}
	});
 });