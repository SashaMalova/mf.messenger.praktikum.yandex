
import {Input} from "./input.js";

export interface InputProfileProps {
    nameField: string;
    type: string;
    nameInput: string;
    idError: string;
    validation: (value: string) => string | null[];

}

export class InputAvatar extends Input {
    constructor(props: InputProfileProps)
    {
        super(props);
    }

    render() {
        let template = Handlebars.compile(`
<input class="opacity" type="{{type}}" accept="image/*" name="{{nameInput}}">
          <p>Выбрать файл на<br> компьютере</p>
        <span class="red invisible" id="{{idError}}"> </span>`);
        return template(this.props);
    }
}

