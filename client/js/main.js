$(function(){
	'use strict';
	var header = $('<header class="container">');
	header.css({
		paddingTop: '40px',
		paddingBottom: '40px'
	});
	var row = $('<div class="row">');
	var col = $('<div class="col-lg-12">');
	var title = $('<h1>GET flickr picture</h1>');
	var inputGroup = $('<div class="input-group">');
	var inputGroupBtn = $('<span class="input-group-btn">');
	var input = $('<input type="text" class="form-control" placeholder="car">');
	var button = $('<button class="btn btn-secondary" type="button">GO</button>');
	button.css({
		borderRadius: '0px'
	});

	input.css({
		borderRadius: '0px'
	});

	var url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=car&format=json&jsoncallback=?';

	$('body').append(header);
	header.append(row);
	row.append(col);
	col.append(title).append(inputGroup);
	
	
	inputGroup.append(input);
	inputGroup.append(inputGroupBtn);
	inputGroupBtn.append(button);

	button.on('click', function(e){
		var team = input.val();
		if (team != ''){
			input.attr('placeholder', team);
			url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + team + '&format=json&jsoncallback=?'
			photoRow.fadeOut(250, function(){photoRow.empty(); getPhoto(url); photoRow.fadeIn();});
		}
	});

	input.on('keypress', function(e){
		if (e.keyCode == 13){
			button.trigger('click');
		} 
	});


	

	var photoContainer = $('<div class="container">');
	var photoRow = $('<div class="row d-flex flex-row justify-content-stretch">');
	var delay = 500;
	var maxDelay = 1500;

	getPhoto(url);

	function getPhoto(url){
		$.getJSON(url, function(response){
		console.log(response);
		$('body').append(photoContainer);
		$(photoContainer).append(photoRow);
		response.items.forEach(function(item){
			var col = $('<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 d-flex flex-column align-items-stretch align-self-stretch align-content-stretch justify-content-stretch">');
			
			var a = $('<a href="' + item.link + '">');
			$(photoRow).append(col);
			var img = $('<img class="img-fluid mx-auto d-block">');
			img.attr('src', item.media.m);
			img.css({
				marginBottom: '10px'
			});

			var itemContainer = $('<div class="d-flex flex-column justify-content-between itemContainer">').hide();
			itemContainer.css({
				marginBottom: '30px',
				height: '100%'
			});
			
			if (item.title == '' || item.title == null || item.title == undefined || item.title == ' '){
				item.title = 'No name'
			}
			if (item.author == '' || item.author == null || item.author == undefined || item.author == ' '){
				item.author == 'incognito'
			}
			var author = $('<p class="author small text-muted text-center">Автор: ' + item.author + '</p>');
			var title = $('<h2 class="text-center">' + item.title + '</h2>');
			title.css({
				width: '100%',
				marginBottom: '10px',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis'
			});

			author.css({
				width: '100%',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis'
			});

			col.append(itemContainer);
			itemContainer.append(title).append(a).append(author);
			a.append(img);
			
			itemContainer.fadeIn(delay);

			if (delay < maxDelay){
				delay += 200;
			}
		});
	});
	}
});