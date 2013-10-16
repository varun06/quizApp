(function() {
    //Question object
    var questions = [
    {"text": "Images/BillGates.jpg", "options": ["Bill Gates", "Brad Pitt", "Steve Ballmer", "Johny Depp", "Nate Silver"], "answer": "Bill Gates", "bio": "William Henry Bill Gates III (born October 28, 1955) is an American business magnate, investor, programmer, inventor and philanthropist. Gates is the former chief executive and current chairman of Microsoft, the world’s largest personal-computer software company.Quote - 'Life is not fair; get used to it.'"},
    {"text": "Images/SteveJobs.jpg", "options": ["Asthon Kutcher", "Steve Jobs", "Johny Ive", "Donald Trump", "Steve Wozniak"], "answer": "Steve Jobs", "bio": "Steven Paul Steve Jobs (February 24, 1955 – October 5, 2011) was an American entrepreneur, marketer, and inventor, who was the co-founder, chairman, and CEO of Apple Inc. Through Apple, he is widely recognized as a charismatic pioneer of the personal computer revolution and for his influential career in the computer and consumer electronics fields, transforming one industry after another, from computers and smartphones to music and movies.Quote - 'I want to put a ding in the universe.'"},
    {"text": "Images/LarryPage.jpg", "options": ["Ryan Reynolds", "Jimmy Fellon", "Sergey Brin", "Larry Page", "Drew Houston"], "answer": "Larry Page", "bio": "Lawrence Larry Page (born March 26, 1973) is an American computer scientist and Internet entrepreneur who is the co-founder of Google, alongside Sergey Brin. On April 4, 2011, Page succeeded Eric Schmidt as the chief executive officer of Google.Quote - 'If you are changing the world, you are working on important things. You are excited to get up in the morning.'"},
    {"text": "Images/JeffBezos.jpg", "options": ["Jeff Smith", "Johny Cash", "The Hobbit", "Tom Hanks", "Jeff Bezos"], "answer": "Jeff Bezos", "bio": "Jeffrey Preston Jeff Bezos (born January 12, 1964) is an American Internet entrepreneur and investor. He is a technology entrepreneur who has played a key role in the growth of e-commerce as the founder and CEO of Amazon.com, an online merchant of books and later of a wide variety of products. Under his guidance, Amazon.com became the largest retailer on the World Wide Web and a top model for Internet sales.Quote - 'I believe you have to be willing to be misunderstood if you are going to innovate.'"},
      {"text": "Images/ElonMusk.jpg", "options": ["Benedict Kumberbatch", "Iron Man", "Elon Musk", "Tony Stark", "Nicola Tesla"], "answer": "Elon Musk", "bio": "Elon Musk (born in South Africa, 28 June 1971) is an South-African business magnate, investor, and inventor. He is currently the CEO & CTO of SpaceX and CEO & Chief Product Architect of Tesla Motors.Quote - 'Failure is an option here. If things are not failing, you are not innovating enough.'"}];

    //Variable declaration and assignment
    var counter = 0,
        quizOver = false,
        resetCounter = 0,
        scoreNode = $('#score'),
        actionButton = $('#submit'),
        resetButton = $('#reset')
        answersBlock = $('.answers'),
        questionTitle = $('.question img'),
        questionBlock = $('.question'),
        showResult = $('#result'),
        errorMessage = $('#error_message'),
        questionNumber = $('#question_number'),
        controlsMessage = $('#controls_message'),
        answerTemplate = $('#answer_template').text(),
        results = {answers: [], currentScore: 0};

    //This function handle the text display
    var wrap_html = function(tag, text) {
            return '<{{0}}>{{1}}</{{0}}>'.replace(/\{\{0\}\}/g, tag)
                .replace(/\{\{1\}\}/g, text);
    };

    //This function calculate the percentage of current score
    var calculatePercentage = function(answers) {
            var correctCount = 0;
            answers.map(function(value, index) {
                if (value) correctCount += 1;
            });
            return Math.round(100 * correctCount / answers.length);
    };

    //This function is for reseting the quiz
    var resetQuiz = function() {
            if (resetCounter++ > 1 || quizOver || confirm('Are you sure you want to reset the quiz?')) {
                counter = 0;
                quizOver = false;
                results = {count: 0, answers: [], currentScore: 0};
                scoreNode.addClass('no_score').text('');
                questionBlock.show();
                nextQuestion();
            }
    };
    //This function handle the results
    var showResults = function() {
            answersBlock.empty();
            questionBlock.hide();
            showResult.text('You answered ' + results.currentScore + '% of '
                + 'the questions correctly.');
            quizOver = true;
            showResult.show();
            actionButton.text('Play again');
    };

    //This function check the input value
    var inputCheck = function() {
            if ($('.answer_radio:checked').length) {
                gradeQuestion();
            } else {
                showErrorMessage();
            }
    };

    //Show alert if user doesn't select any option
    var showErrorMessage = function() {
        var message = "Please select a value";
        alert(message);
    };

    //This function handles the button action
    var buttonAction = function() {
            var action = actionButton.text();
            if (action === 'Answer') {
                inputCheck();
            } else if (action === 'Next question') {
                nextQuestion();
            } else if (action === 'Play again') {
                resetQuiz();
                showResult.hide();
            } else {
                showResults();
            }
    };

    // The function grade the question based on user input
    var gradeQuestion = function() {
            var chosenAnswer = $('.answer_radio:checked + .answer').text(),
                correctAnswer = questions[counter-1].answer,
                bio = questions[counter-1].bio,
                correct = chosenAnswer === correctAnswer,
                correctText = correct ? 'Correct! ' : 'Incorrect! The correct answer was ';

            results.answers.push(correct);
            results.currentScore = calculatePercentage(results.answers);

            scoreNode.removeClass('no_score')
                .text(results.currentScore + '% correct');
            questionTitle.html(correctText + wrap_html('span', correctAnswer)).addClass('show_answer');
            answersBlock.text(bio);
            if (counter === questions.length) {
                actionButton.text('See results');
            } else {
                actionButton.text('Next question');
            }
    };
    //This function bring up the next question on page
    var nextQuestion = function() {
            var questionDetails = questions[counter];
            questionNumber.text((counter+1) + ' of ' + questions.length);
            questionTitle.attr({
                  src: questionDetails.text,
                  alt: 'Picture'
                  }).removeClass('show_answer');
            answersBlock.empty();
            actionButton.text('Answer');
            for (var i = 0; i < questionDetails.options.length; i++) {
                var newQuestion = answerTemplate
                  .replace(/{{id}}/g, 'answer' + i)
                  .replace('{{text}}', questionDetails.options[i]);
                answersBlock.append($(newQuestion));
            }
            counter++;
    };

    // Function to create a BLINK TEXT effect
    var blink = function(selector){
      $(selector).animate({opacity:0}, 50, "linear", function(){
        $(this).delay(800);
        $(this).animate({opacity:1}, 50, function(){
          blink(this);
        });
        $(this).delay(800);
      });
    };

    resetButton.click(resetQuiz);
    actionButton.click(buttonAction);

    // Load first question
    nextQuestion();
    //Blink the text
    blink('h1 #blink');
}());
