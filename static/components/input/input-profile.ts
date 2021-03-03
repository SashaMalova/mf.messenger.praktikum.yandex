
import {Input} from "./input.js";

export interface InputProfileProps {
    profileData: string;
    nameField: string;
    type: string;
    nameInput: string;
    idError: string;
    validation: (value: string) => string | null[];

}

export class InputProfile extends Input {
    constructor(props: InputProfileProps)
    {
        super(props);
    }

    render() {
        let template = Handlebars.compile(`<div class="yellow-line">
            <span class="field">{{nameField}}</span>
            <span class="date-profile"><input type="{{type}}" name="{{nameInput}}" value="{{profileData}}"></span>
                    </div>
<span class="invisible right" id="{{idError}}" ></span>`);
        return template(this.props);
    }
}

