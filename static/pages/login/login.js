import { loginSigningTemplate } from "../../templates/form-template.js";
import { Button } from "../../components/button/button.js";
import { Input } from "../../components/input/input.js";
import { render } from "../../components/render.js";
import { arrInputsForm } from "../../components/input/arr-inputs-form.js";
let body = document.querySelector('body');
if (body) {
    body.insertAdjacentHTML('beforeend', loginSigningTemplate('login-form', 'Вход', {
        link: '../signin/signin.html',
        text: 'Нет аккаунта?'
    }));
    let arr = [{
            nameField: 'Логин',
            type: 'text',
            nameInput: 'login',
            idError: 'login-error',
            validation: [
                (value) => {
                    return !!value ? null : "заполните поле";
                },
            ]
        },
        {
            nameField: 'Пароль',
            type: 'password',
            nameInput: 'password',
            idError: 'password-error',
            validation: [
                (value) => {
                    return !!value ? null : "заполните поле";
                },
            ]
        }];
    let arrInputs = arrInputsForm(arr, Input);
    const button = new Button({ classButton: 'data', textButton: 'Авторизоваться', inputs: arrInputs });
    render(".button", button);
}
//# sourceMappingURL=login.js.map