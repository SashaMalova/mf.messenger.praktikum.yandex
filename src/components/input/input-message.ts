
import {Input} from "./input";
import {InputProps} from "./input.interface";

export class InputMessage extends Input {
    constructor(props: InputProps)
    {
        super(props);
    }

        render() {
        const template = Handlebars.compile(`
<input type="text" class="newMessage" name="message" placeholder="Сообщение">
<span class="invisible" id="{{idError}}" ></span>
`);
        return template(this.props);
    }
}

