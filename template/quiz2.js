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
	var randyNum;
	var titleArr = [];
	var bakedGood = document.cookie;
	
	if (bakedGood.includes("quiz2")) {
		var afterSign = bakedGood.indexOf('=') + 1;
		randyNum = Number(bakedGood.substring(afterSign, bakedGood.length));
		$.ajax({
			url: 'http://www.mattbowytz.com/simple_api.json',
			type: 'GET',
			datatype: 'json',
			data: { data: 'quizData' },
			success: function(data) {
				titleArr = data.data;
				$('#button1').html("Change It");
				var randyTitle = titleArr[randyNum];
				$('#data').text(randyTitle);
				$('.api').append("<button class='button' id='button2'>Keep It</button>");
			}
		});
	}
	
	$('#button1').on('click', function() {
		if (titleArr.length == 0) {
			$.ajax({
				url: 'http://www.mattbowytz.com/simple_api.json',
				type: 'GET',
				datatype: 'json',
				data: { data: 'quizData' },
				success: function(data) {
					titleArr = data.data;
					$('#button1').html("Change It");
					randyNum = Math.floor(Math.random() * titleArr.length);
					var randyTitle = titleArr[randyNum];
					$('#data').text(randyTitle);
					$('.api').append("<button class='button' id='button2'>Keep It</button>");
				}
			});
		}
		else {
			randyNum = Math.floor(Math.random() * titleArr.length);
			var randyTitle = titleArr[randyNum];
			$('#data').text(randyTitle);
		}
	});
	
	$(document).on('click', '#button2', function() {
		document.cookie="quiz2=" + randyNum +"; expires=(Date.getTime() * 1000 + 60)";
		console.log(randyNum);
	});
	
	
});