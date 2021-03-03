import { loginSigningTemplate } from '../../templates/form-template.js';
import "./chat.js";
import { Button } from "../../components/button/button.js";
import { render } from "../../components/render.js";
import { Input } from "../../components/input/input.js";
let body = document.querySelector('body');
if (body) {
    body.insertAdjacentHTML('beforeend', '<div class="blackout"></div>');
    body.insertAdjacentHTML('beforeend', loginSigningTemplate('add-user-form content-form', 'Добавить пользователя', ''));
    const input = new Input({
        nameField: 'Логин',
        type: 'text',
        nameInput: 'login',
        idError: 'login-error',
        validation: [
            (value) => {
                return !!value ? null : "заполните поле";
            },
        ],
    });
    render(".input-div", input);
    const button = new Button({ classButton: 'data', textButton: 'Добавить', inputs: [input] });
    render(".button", button);
}
//# sourceMappingURL=add-user.js.map