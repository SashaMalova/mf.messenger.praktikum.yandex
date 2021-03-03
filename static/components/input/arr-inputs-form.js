import { render } from "../render.js";
export function arrInputsForm(array, InputNew) {
    let arrInputs = [];
    for (let item of array) {
        const input = new InputNew({
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
    return arrInputs;
}
//# sourceMappingURL=arr-inputs-form.js.map