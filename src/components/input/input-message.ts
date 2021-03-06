
import {Input} from "./input.js";
import {InputProps} from "./input.interface.js";

export class InputMessage extends Input {
    constructor(props: InputProps)
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

