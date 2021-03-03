import { Input } from "./input.js";
export class InputMessage extends Input {
    constructor(props) {
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
//# sourceMappingURL=input-message.js.map