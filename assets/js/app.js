// Play theme song on load
// $(document).ready(function() {
//     $("#themeSong").get(0).play();
// });

// Game functions - begin game, next question, reset
$('#start').on('click', function(){
	$('#background').remove();
	$('#start').remove();
	game.loadQuestion();
})

$(document).on('click','.answer-button',function(e) {
	game.clicked(e);
})

$(document).on('click', '#reset', function() {
	game.reset();
})

// Questions and answers

var questions = [{
		question: "What name appears on the address label of Chandler and Joey\'s TV Guide?",
		answers: ["Mr Chandler Bing", "Mrs Chanandler Bing", "Ms Chanandler Bong", "Mr Chandler Bong"],
		correctAnswer: "Ms Chanandler Bong"
	}, {
		question: "Which famous person does Phoebe believe is her Grandfather?",
		answers: ["Albert Einstein", "Isaac Newton", "Winston Churchill", "Beethoven"],
		correctAnswer: "Albert Einstein"
	}, {
		question: "Who scored the winning point at ping-pong in Barbados?",
		answers: ["Mike", "Monica", "Chandler", "David"],
		correctAnswer: "Chandler"
	}, {
		question: '"There\'s nothing to tell" is the first sentence spoken by Phoebe in the first episode of Friends',
		answers: ["True", "False"],
		correctAnswer: "False"
	}, {
		question: "What happened to Monica on her thirtieth birthday?",
		answers: ["She broke her leg", "She kissed Joey", "She got drunk", "All of the above"],
		correctAnswer: "She got drunk"
	}, {
		question: "When Phoebe changed her name to Princess Consuela, then what did Mike change his name to?",
		answers: ["Garbage Bag", "Crap Bag", "Dust Pan", "Dirt Bag"],
		correctAnswer: "Crap Bag"
	}, {
		question: "What did Monica\'s parents call her as a child?",
		answers: ["Our Little Harmonica", "Mon", "Harmonica", "Fatty"],
		correctAnswer:"Our Little Harmonica"
	}, {
		question: "What fruit is Ross allergic to?",
		answers: ["Strawberries", "Cranberries", "Kiwi", "Oranges"],
		correctAnswer: "Kiwi"
	}, {
		question: "Chandler says he hates dogs.",
		answers: ["True", "False"],
		correctAnswer: "True"
	}, {
		question: "Which Friend hates thanksgiving?",
		answers: ["Phoebe", "Rachel", "Chandler", "Joey"],
		correctAnswer: "Chandler"
	}, {
		question: "What are Phoebe and Joey\'s all purpose aliases?",
		answers: ["Regina Phalange & Ken Adams", "Rowena Phalange & Keith Adams", "Regina Phalange & Kevin Adams", "Rachel Phalange & Ken Adams"],
		correctAnswer: "Regina Phalange & Ken Adams"
	}, {
		question: "Who acts as Ben?",
		answers: ["Justin Cooper", "Cole Sprouse", "Dylan Srouse", "Kyle Massey"],
		correctAnswer: "Cole Sprouse"
	}, {
		question: "Freddie Prinze Jr plays a police officer in Friends.",
		answers: ["True", "False"],
		correctAnswer: "False"
	}, {
		question: "What does Joey name his new boat?",
		answers: ["Mr. Beaumont", "MS Rachel", "The Joey boat", "Joey Love"],
		correctAnswer: "Mr. Beaumont"
	}, {
		question: "In the end of season 10, Rachel goes to Paris.",
		answers: ["True", "False"],
		correctAnswer: "False"
}];

// Game variable and functions

var game = {
	questions: questions,
	currentQuestion: 0,
	counter: 10,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	countdown: function() {
		game.counter--;
		$('#counter').html(game.counter);
		if(game.counter<=0) {
			console.log("Time is up!");
			game.timeUp();
		}
	},
	loadQuestion: function() {
		timer = setInterval(game.countdown, 1000);
		$('#subwrapper').html("<h2 class='time'><span id='counter'>10</span> seconds remaining</h2>")
		$('#subwrapper').append('<h2 class="question">' + questions[game.currentQuestion].question + '</h2>');
		for (var i=0; i<questions[game.currentQuestion].answers.length; i++){
			$('#subwrapper').append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i]+ '</button>');
		}
	},
	nextQuestion: function() {
		game.counter = 10;
		$('#counter').html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();
	},
	timeUp: function() {
		clearInterval(timer);
		game.unanswered++;
		$('#subwrapper').html('<h2>Out of time!</h2>');
		$('#subwrapper').append('<h3>Correct answer: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
		if(game.currentQuestion==questions.length - 1) {
			setTimeout(game.results, 2*1000);
		} else {
			setTimeout(game.nextQuestion, 2*1000);
		}
	},
	results: function() {
		clearInterval(timer);
		$('#subwrapper').html("<h2>Game Over!</h2>");
		$('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
		$('#subwrapper').append("<h3>Incorrect: " + game.incorrect + "</h3>");
		$('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>");
		$('#subwrapper').append("<button id='reset'>Replay Game</button>");
	},
	clicked: function(e) {
		clearInterval(timer);
		if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer) {
			game.answeredCorrectly();
		} else {
			game.answeredIncorrectly();
		}
	},
	answeredCorrectly: function() {
		clearInterval(timer);
		game.correct++;
		$('#subwrapper').html('<h2>Correct!</h2>');
		if(game.currentQuestion==questions.length - 1) {
			setTimeout(game.results, 1000);
		} else {
			setTimeout(game.nextQuestion, 1000);
		}

		//Testing
		console.log("Correct!");

	},
	answeredIncorrectly: function() {
		clearInterval(timer);
		game.incorrect++;
		$('#subwrapper').html('<h2>Wrong :(</h2>');
		$('#subwrapper').append('<h3>Correct answer: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
		if(game.currentQuestion==questions.length - 1) {
			setTimeout(game.results, 2*1000);
		} else {
			setTimeout(game.nextQuestion, 2*1000);
		}

		//Testing
		console.log("Wrong!");
	},
	reset: function() {
		game.currentQuestion = 0;
		game.counter = 0;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		game.loadQuestion();
	}
}