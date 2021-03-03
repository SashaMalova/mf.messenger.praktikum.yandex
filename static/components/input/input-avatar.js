import { Input } from "./input.js";
export class InputAvatar extends Input {
    constructor(props) {
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
//# sourceMappingURL=input-avatar.js.map