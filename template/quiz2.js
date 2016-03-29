(function($){
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

	var $mouseover = $('.mouse-over');
	var $click = $('.click');
	var $submit = $('.submit');

	$mouseover.on('mouseover', function() {
		$this = $(this);
		$(this).html('<p>Scrooge McDuck!</p>');
		$(this).height($(this).height() + 50);
	});

	$click.on('click', function() {
		$this.html('<p>Peace Out!</p>');
		$(this).fadeout(1500);
	});

	$('form').submit('submit', function(e) {
		e.preventDefault();
		if ($(this).find('input[type="text"]').val() !== '') {
			$(this).find('input[type="text"]').each(function() {
				$(this).fadeOut('slow');
			});
			$(this).append('<h2>Congratulations! You\'ve entered some text!</h2>');
		}
	});

	$(document).ready(function() {
		setTimeout(function() {
			$('.timeout').fadeIn('slow');
		}, 1000);
	});

})(jQuery);

$(document).ready(function() {
	var randyNum;					// Holds the array index number for comic book titles
	var titleArr = [];				// Holds the array of titles after the AJAX request
	var bakedGood = document.cookie;		// Holds the string of the cookie (if present)
	
	if (bakedGood.includes("quiz2")) {					// Conditional if the cookie exists
		var afterSign = bakedGood.indexOf('=') + 1;
		randyNum = Number(bakedGood.substring(afterSign, bakedGood.length));	// Gets the last saved array index
		$.ajax({
			url: 'http://www.mattbowytz.com/simple_api.json',
			type: 'GET',
			datatype: 'json',
			data: { data: 'quizData' },
			success: function(data) {
				titleArr = data.data;					// Stores the array from the JSON object
				$('#button1').html("Change It");			// Changes button1 from "Get Title" to "Change It"
				var randyTitle = titleArr[randyNum];		// Gets the last saved comic book title
				$('#data').text(randyTitle);
				$('.api').append("<button class='button' id='button2'>Keep It</button>");		// Adds title and new button to DOM
			}
		});
	}
	
	$('#button1').on('click', function() {				// Event handler for button1
		if (titleArr.length == 0) {					// Makes an AJAX request if the array is empty (same as above)
			$.ajax({
				url: 'http://www.mattbowytz.com/simple_api.json',
				type: 'GET',
				datatype: 'json',
				data: { data: 'quizData' },
				success: function(data) {
					titleArr = data.data;
					$('#button1').html("Change It");
					randyNum = Math.floor(Math.random() * titleArr.length);		// Generates a random array index number
					var randyTitle = titleArr[randyNum];
					$('#data').text(randyTitle);
					$('.api').append("<button class='button' id='button2'>Keep It</button>");
				}
			});
		}
		else {									// Otherwise, simply generates a new random index number and displays that title
			randyNum = Math.floor(Math.random() * titleArr.length);
			var randyTitle = titleArr[randyNum];
			$('#data').text(randyTitle);
		}
	});
	
	$(document).on('click', '#button2', function() {			// Event handler for button2
		document.cookie="quiz2=" + randyNum +"; expires=(Date.getTime() * 1000 + 60)";		// Sets a cookie with the current array index number
	});
});