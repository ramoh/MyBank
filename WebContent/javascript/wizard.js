var Wizards = function (steps) {

    //number of step in the wizard
    var numberOfSteps;

    //current step
    var currentStep = ko.observable();

    var init = function () {
        numberOfSteps = steps;
        currentStep(1);
    };

    var back = function () {
        currentStep(currentStep() - 1);
    };

    var next = function () {
        currentStep(currentStep() + 1);
    };

    var done = function () {
        console.log("User clicked on done .....");
        currentStep(1);
    };

    var isLastStep = ko.pureComputed(function () {
        return currentStep() === numberOfSteps;
    });
    var isFirstStep = ko.pureComputed(function () {
        return currentStep() === 1;

    });
    init();

    return {
        currentStep: currentStep,
        isLastStep: isLastStep,
        isFirstStep: isFirstStep,
        back: back,
        next: next,
        done: done
    };


};
console.log("Wizards has been added to scope");