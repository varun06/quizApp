(function() {
    var questions = [{"text": "Images/BillGates.jpg", "options": ["Bill Gates", "Steve Jobs", "Elon Musk", "Larry Page", "Jeff Bezos"], "answer": "Bill Gates", "explanation": "Bill Gates"}, {"text": "Images/SteveJobs.jpg", "options": ["Bill Gates", "Steve Jobs", "Elon Musk", "Larry Page", "Jeff Bezos"], "answer": "Steve Jobs", "explanation": "Steve Jobs"}, {"text": "Images/LarryPage.jpg", "options": ["Bill Gates", "Steve Jobs", "Elon Musk", "Larry Page", "Jeff Bezos"], "answer": "Larry Page", "explanation": "Larry Page"}, {"text": "Images/JeffBezos.jpg", "options": ["Bill Gates", "Steve Jobs", "Elon Musk", "Larry Page", "Jeff Bezos"], "answer": "Jeff Bezos", "explanation": "Jeff Bezos"}, {"text": "Images/ElonMusk.jpg", "options": ["Bill Gates", "Steve Jobs", "Elon Musk", "Larry Page", "Jeff Bezos"], "answer": "Elon Musk", "explanation": "Elon Musk"}];
    var UP = 38,
        DOWN = 40,
        ENTER = 13,
        ESCAPE = 27,
        counter = 0,
        quizOver = false,
        resetCounter = 0,
        scoreNode = $('#score'),
        actionButton = $('#submit'),
        answersBlock = $('.answers'),
        questionTitle = $('.question img'),
        errorMessage = $('#error_message'),
        questionNumber = $('#question_number'),
        controlsMessage = $('#controls_message'),
        answerTemplate = $('#answer_template').text(),
        results = {answers: [], currentScore: 0},
        wrap = function(tag, text) {
            return '<{{0}}>{{1}}</{{0}}>'.replace(/\{\{0\}\}/g, tag)
                .replace(/\{\{1\}\}/g, text);
        },
        calculateScore = function(answers) {
            var correctCount = 0;
            answers.map(function(value, index) {
                if (value) correctCount += 1;
            });
            return Math.round(100 * correctCount / answers.length);
        },
        resetQuiz = function() {
            if (resetCounter++ > 1 || quizOver || confirm('Are you sure you want to reset the quiz?')) {
                counter = 0;
                quizOver = false;
                results = {count: 0, answers: [], currentScore: 0};
                scoreNode.addClass('no_score').text('');
                nextQuestion();
            }
        },
        showResults = function() {
            answersBlock.empty();
            questionTitle.text('You answered ' + results.currentScore + '% of '
                + 'the questions correctly.');
            quizOver = true;
            actionButton.text('Play again');
            scoreChart();
        },
        inputCheck = function() {
            if ($('.answer_radio:checked').length) {
                transitionEffect(gradeQuestion);
            } else {
                overlayMessage(errorMessage, {borderRadius: '3px', width: '35%', left: '32%'}, 2000);
            }
        },
        overlayMessage = function(message, css, timeout) {
            $.blockUI({ message: message, css: css });
            if (timeout) {
                setTimeout(function() {
                    $.unblockUI();
                }, timeout);
            }
        },
        transitionEffect = function(func) {
            $('.question').hide('slide', {direction: 'left'}, 200, function() {
                func();
                $('.question').show('slide', {direction: 'right'}, 200);
            });
        },
        dispatchAction = function() {
            var action = actionButton.text();
            if (action === 'Answer') {
                inputCheck();
            } else if (action === 'Next question') {
                transitionEffect(nextQuestion);
            } else if (action === 'Play again') {
                transitionEffect(resetQuiz);
            } else {
                transitionEffect(showResults);
            }
        },
        gradeQuestion = function() {
            var chosenAnswer = $('.answer_radio:checked + .answer').text(),
                correctAnswer = questions[counter-1].answer,
                explanation = questions[counter-1].explanation,
                correct = chosenAnswer === correctAnswer,
                correctText = correct ? 'Correct! ' : 'Incorrect! The correct answer was ';

            results.answers.push(correct);
            results.currentScore = calculateScore(results.answers);

            scoreNode.removeClass('no_score')
                .text(results.currentScore + '% correct');
            questionTitle.html(correctText + wrap('span', correctAnswer)).addClass('show_answer');
            answersBlock.text(explanation);
            if (counter === questions.length) {
                actionButton.text('See results');
            } else {
                actionButton.text('Next question');
            }
        },
        nextQuestion = function() {
            var questionDetails = questions[counter];
            questionNumber.text((counter+1) + ' of ' + questions.length);
            questionTitle.attr({
                  src: questionDetails.text,
                  alt: 'Picture'
                  }).height(400).width(400).removeClass('show_answer');
            answersBlock.empty();
            actionButton.text('Answer');
            for (var i = 0; i < questionDetails.options.length; i++) {
                var newQuestion = answerTemplate
                  .replace(/{{id}}/g, 'answer' + i)
                  .replace('{{text}}', questionDetails.options[i]);
                answersBlock.append($(newQuestion));
            }
            counter++;
        },
        controlsHelp = function() {
            $.blockUI({
                message: controlsMessage,
                css: { borderRadius: '3px',
                       width: '65%',
                       top: '20%',
                       left: '17%' },
                onBlock: function() {
                    $(document).click(function() {
                        $.unblockUI();
                        $(document).unbind('click');
                    });
                }
            });
        }

    $('#reset').click(resetQuiz);
    $('#controls_help').click(controlsHelp);
    $('#submit').click(dispatchAction);

    // Load first question
    nextQuestion();

    // Function to create a BLINK TEXT effect
  function blink(selector){
    $(selector).animate({opacity:0}, 50, "linear", function(){
        $(this).delay(800);
        $(this).animate({opacity:1}, 50, function(){
        blink(this);
        });
        $(this).delay(800);
    });
  }
  blink("h1 #blink");
}());