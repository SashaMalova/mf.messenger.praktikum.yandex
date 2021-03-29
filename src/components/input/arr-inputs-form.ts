import {render} from "../render";
import {Input} from "./input";
import {InputProps} from "./input.interface";


export function arrInputsForm(array: InputProps[], InputNew: typeof Input, notRender?:boolean):Input[] {
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
        if (!notRender){
            render(".input-div", input);
        }

    }
    return arrInputs
}
