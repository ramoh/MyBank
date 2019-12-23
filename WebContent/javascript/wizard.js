var Wizards = function (steps) {

    //number of step in the wizard
    var numberOfSteps;

    //current step
    var currentStep = ko.observable();

    var init = function () {
        numberOfSteps = steps;
        currentStep(1);
    };
    init();

    return {
        currentStep: currentStep
    };


}();