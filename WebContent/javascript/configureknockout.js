var ConfigureKnockout = function () {

    /* Method to add custom currency binding */
    var applyCurrencyBinding = function () {
        /* custom binding for the currency*/
        ko.bindingHandlers.currency = {
            update: function (element, valueAccessor) {
                var val = ko.utils.unwrapObservable(valueAccessor()) || 0;
                var formattedText = "$" + val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                $(element).text(formattedText);
            }
        };
    };

    /* method to add memento observable */
    var createMementoObservable = function () {
        /* memento custom observable */
        ko.mementoObservable = function (initialValue) {
            //the current state

            var state = ko.observable(initialValue);
            //the remembered state
            var mementoState = initialValue;
            //commit the state
            state.commit = function () {
                mementoState = state();
            };
            //reset state from memory
            state.reset = function () {
                state(mementoState);
            };
            //return the current state
            return state;
        };
    };

    var configureValidationPlugin = function () {
        ko.validation.init(
            {
                errorElementClass: 'has-error',
                errorMessageClass: 'help-block'
            }
        );
    };


    var init = function () {
        applyCurrencyBinding();
        createMementoObservable();
        configureValidationPlugin();

    }();

    return {
        //nothing to return
    }

}();