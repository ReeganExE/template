(function() {
    var questions = [{
        content: 'Where is Module name?',
        answer: 'module-name'
    }, {
        content: 'Where is module dependencies?',
        answer: 'dependencies'
    }, {
        content: 'Where is the declaration of module?',
        answer: 'declare-module'
    }, {
        content: 'Where is usage of module?',
        answer: 'use-module'
    }, {
        'content': 'Where is module variable?',
        answer: 'app'
    }];

    /**
     * questions Module
     *
     */
    angular.module('questions', [])

    /**
     * A directive that adds hover behavior to map elements.
     */
    .directive('usemap', [function() {
        return {
            restrict: 'A',
            link: function($scope, iElm, iAttrs, controller) {
                iElm.maphilight();
            }
        };
    }])

    /**
     * Add random question to view.
     */
    .directive('question', ['$rootScope', function($rootScope) {
        return {
            controller: function QuestionController() {
                var vm = this;
                vm.init = function(el) {
                    var q = random(0, questions.length);
                    q = questions[q];
                    el.text(q.content);
                    el.data('answer', q);
                    $rootScope.question = q;
                }
            },
            link: function($scope, iElm, iAttrs, controller) {
                controller.init(iElm);
            }
        };
    }])

    /**
     * Handle answer from user.
     */
    .directive('area', ['$rootScope', function($rootScope) {
        return {
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            controller: AnswerController,
            link: function($scope, iElm, iAttrs, controller) {
                iElm.click(e => {
                    e.preventDefault();
                    if ($rootScope.checked) {
                        console.log('You has submitted');
                    } else {
                        $rootScope.checked = true;
                        $rootScope.answer = iElm.attr('href');
                        controller.onAnswer(iElm, $rootScope.answer === $rootScope.question.answer);
                    }
                });
            }
        };
    }])

    .run(function() {
        if (window.parent !== window) {
            channel = Channel.build({
                window: window.parent,
                origin: "*",
                scope: "JSInput"
            });

            channel.bind("checkAnswer", checkAnswer);
            channel.bind("emptyFn", emptyFn);
        }
    });

    /**
     * Keep the final answer.
     */
    function AnswerController() {
        var vm = this;
        vm.onAnswer = function(el, correct) {
            console.log(correct);
            document.answered = correct;
        }
    }

    /**
     * Random number from a range.
     */
    function random(a, b) {
        return Math.floor(Math.random() * b) + a;
    }

})();


/**
 * Returns the user's answer.
 */
function checkAnswer() {
    return document.answered;
}


function emptyFn() {
    return '';
}