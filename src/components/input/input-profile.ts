
import {Input} from "./input.js";
import {InputProps} from "./input.interface.js";

export class InputProfile extends Input {
    constructor(props: InputProps)
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

