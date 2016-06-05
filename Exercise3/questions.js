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
                        alert('You has submitted');
                    } else {
                        $rootScope.checked = true;
                        $rootScope.answer = iElm.attr('href');
                        controller.onAnswer(iElm, $rootScope.answer === $rootScope.question.answer);
                    }
                });
            }
        };
    }]).

    directive('codeTarget', ['$timeout', '$rootScope', function($timeout, $rootScope) {
        return {
            controller: function CodeTargetController($scope, $element, $attrs, $transclude, $document) {
                var vm = this;
                var $button = angular.element('#select-button');

                vm.$selectedCodeEl = angular.element('#selected-code');

                vm.createButton = function(rect) {
                    let { left, top } = rect || {};
                    let text = getSelectionText();

                    if (text) {
                        $button.css( { left, top: top - $button.height() - 10 }).show();
                    } else {
                        $button.hide();
                    }
                };

                vm.onSelectText = function(e) {
                    let text = getSelectionText();
                    vm.$selectedCodeEl.text(text);
                    Prism.highlightElement(vm.$selectedCodeEl[0]);
                };

                $rootScope.$on('select-text', vm.onSelectText);
            },
            link: function($scope, iElm, iAttrs, controller) {
                iElm.mouseup(e => {
                    $timeout(() => controller.createButton(getSelectionRect()), 200);
                });
            }
        };
    }]);;

    /**
     * Keep the final answer.
     */
    function AnswerController() {
        var vm = this;
        vm.onAnswer = function(el, correct) {
            alert(correct);
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


function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function getSelectionRect() {
    var selection = window.getSelection();
    if (selection.rangeCount === 0) {
        return null;
    }
    var oRange = selection.getRangeAt(0); //get the text range
    var oRect = oRange.getBoundingClientRect();
    return oRect;
}