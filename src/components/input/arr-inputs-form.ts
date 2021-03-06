import {render} from "../render.js";
import {Block} from "../block.js";
import {Input} from "./input.js";
import {InputProps} from "./input.interface.js";


export function arrInputsForm(array: InputProps[], InputNew: typeof Input):Block[] {
    let arrInputs = [];
    for (let item of array) {
        let input: Input;
        input = new InputNew({
            nameField: item.nameField,
            type: item.type,
            nameInput: item.nameInput,
            idError: item.idError,
            validation: item.validation,
            profileData: item.profileData,
        });
        arrInputs.push(input);
        render(".input-div", input);
    }
    return arrInputs}