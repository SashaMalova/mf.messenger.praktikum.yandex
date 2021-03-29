
import {Input} from "./input";
import {InputProps} from "./input.interface";

export class InputAvatar extends Input {
    constructor(props: InputProps)
    {
        super(props);
    }

    render() {
        let template = Handlebars.compile(`
            <form id="my-user-form">
            <label for="avatar"><p>Выбрать файл на<br> компьютере</p></label>
             <input id="avatar" class="opacity" type="{{type}}" accept="image/*" name="{{nameInput}}">
            <span class="red invisible" id="{{idError}}"> </span>
            </form>`
        );
        return template(this.props);
    }
}

