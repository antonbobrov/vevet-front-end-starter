import { selectAll } from 'vevet-dom';
import { IAjaxFormElements } from './types';
import { getFormInputValue, onFormInputChange } from './helpers';

export interface FormCombinationItem {
    name: string;
    value: string;
}

type InputType = HTMLInputElement | HTMLTextAreaElement;
type InputsType = NodeListOf<InputType>;



/**
 * Create form combinations
 */
export default function createFormCombinations (
    outer: Element,
    combinations: FormCombinationItem[][] = [],
    onChangeCallback: (valid: number | false) => void,
): IAjaxFormElements {
    const destroyableElements: IAjaxFormElements[] = [];

    // get names of inputs
    let watchNames: string[] = [];
    combinations.forEach((combination) => {
        combination.forEach((inputData) => {
            watchNames.push(inputData.name);
        });
    });
    watchNames = watchNames.filter((v, i, a) => a.indexOf(v) === i);

    // get inputs selector
    const selectors: string[] = [];
    watchNames.forEach((name) => {
        selectors.push(`input[name='${name}']`);
        selectors.push(`select[name='${name}']`);
        selectors.push(`textarea[name='${name}']`);
    });

    // get all inputs
    let inputs: InputsType;
    if (watchNames.length > 0) {
        inputs = selectAll(selectors.join(','), outer) as InputsType;
    } else {
        // @ts-ignore
        inputs = [];
    }

    // set events on inputs
    inputs.forEach((input) => {
        destroyableElements.push(
            onFormInputChange(input.name, () => {
                const isValid = validateInputs(outer, inputs, combinations, watchNames);
                onChangeCallback(isValid);
            }, outer),
        );
    });
    const isValid = validateInputs(outer, inputs, combinations, watchNames);
    onChangeCallback(isValid);

    return {
        destroy: () => {
            destroyableElements.forEach((el) => {
                el.destroy();
            });
        },
    };
}



/**
 * Action on some input changes
 */
function validateInputs (
    outer: Element,
    inputs: InputsType,
    combinations: FormCombinationItem[][] = [],
    watchNames: string[],
): number | false {
    // enable all inputs
    inputs.forEach((input) => {
        input.disabled = false;
    });

    // get current combination
    const inputsCombination = getCurrentInputsCombination(outer, inputs);

    // get overlapping combinations
    let hasOverlaps: false | number = false;
    combinations.forEach((currentCombination, combinationIndex) => {
        let currentOverlaps = 0;

        currentCombination.forEach((combinationInput) => {
            inputsCombination.forEach((currentInput) => {
                if (currentInput.name === combinationInput.name) {
                    if (currentInput.value === combinationInput.value) {
                        currentOverlaps++;
                    }
                }
            });
        });

        if (
            currentOverlaps === currentCombination.length
            && inputsCombination.length === currentCombination.length
        ) {
            hasOverlaps = combinationIndex;
        }
    });

    // process inputs
    watchNames.forEach((name) => {
        processInputs(inputs, inputsCombination, combinations, name);
    });

    return hasOverlaps;
}



/**
 * Get current combination of inputs that are active
 */
function getCurrentInputsCombination (
    outer: Element,
    inputs: InputsType,
) {
    const inputsCombination: FormCombinationItem[] = [];

    inputs.forEach((input) => {
        const value = getFormInputValue(input.name, outer);
        if (value.length > 0) {
            let existsInStaticCombinations = false;
            inputsCombination.forEach((currentCombinationInput) => {
                if (currentCombinationInput.name === input.name) {
                    existsInStaticCombinations = true;
                }
            });
            if (!existsInStaticCombinations) {
                inputsCombination.push({
                    name: input.name,
                    value,
                });
            }
        }
    });

    return inputsCombination;
}



function processInputs (
    inputs: InputsType,
    inputsCombination: FormCombinationItem[],
    staticCombinations: FormCombinationItem[][],
    targetName: string,
) {
    const targetInputsCombination: FormCombinationItem[] = [];

    // get current input combination except for the current name
    inputsCombination.forEach((inputData) => {
        // get value of current input
        if (inputData.name === targetName) {
            targetInputsCombination.push(inputData);
        }
    });

    // get inputs that must be checked inputs
    const checkInputs: InputType[] = [];
    inputs.forEach((input) => {
        if (input.name !== targetName) {
            checkInputs.push(input);
        }
    });

    // get available values of the target input
    const availableTargetInputs: FormCombinationItem[] = [];
    staticCombinations.forEach((currentStaticCombination) => {
        let overlapsWithTargetCombination = 0;
        currentStaticCombination.forEach((staticInputData) => {
            targetInputsCombination.forEach((targetInputData) => {
                if (
                    (targetInputData.name === staticInputData.name)
                    && (targetInputData.value === staticInputData.value)
                ) {
                    overlapsWithTargetCombination++;
                }
            });
        });

        if (
            (overlapsWithTargetCombination === targetInputsCombination.length)
            && overlapsWithTargetCombination > 0
        ) {
            currentStaticCombination.forEach((staticInputData) => {
                if (staticInputData.name !== targetName) {
                    availableTargetInputs.push(staticInputData);
                }
            });
        }
    });

    // process inputs
    checkInputs.forEach((currentCheckInput) => {
        let valueExists = false;
        availableTargetInputs.forEach((currentAvailableTargetInput) => {
            if (currentAvailableTargetInput.name === currentCheckInput.name) {
                if (currentAvailableTargetInput.value === currentCheckInput.value) {
                    valueExists = true;
                }
            }
        });

        currentCheckInput.disabled = !valueExists;
    });
}
