
import {Input} from "./input.js";

export interface InputMessageProps {}

export class InputMessage extends Input {
    constructor(props: {
        nameField: string;
        type: string;
        nameInput: string;
        idError: string;
        validation: (value: string) => string | null[];
    })
    {
        super(props);
    }

        render() {
        let template = Handlebars.compile(`
<input type="text" class="newMessage" name="message" placeholder="Сообщение">
<span class="invisible" id="{{idError}}" ></span>
`);
        return template(this.props);
    }
}

