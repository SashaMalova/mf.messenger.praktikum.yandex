import {loginSigningTemplate} from "../../templates/form-template.js";
import {Button} from "../../components/button/button.js";
import {Input} from "../../components/input/input.js";
import {render} from "../../components/render.js";
import {arrInputsForm} from "../../components/input/arr-inputs-form.js";


declare var Handlebars: any;


let body = document.querySelector('body');

if (body) {

    body.innerHTML = loginSigningTemplate(
        'signin-form',
        'Регистрация',
        {
            link: '../login/login.html',
            text: 'Войти'
        },
    );

    let arr = [{
        nameField: 'Почта',
        type: 'text',
        nameInput: 'email',
        idError: 'email-error',
        validation: [
            (value: string) => {
                return !!value ? null : "заполните поле";
            },
            (value: string) => {
                return (value.includes('@') && value.includes('.')) ? null : "некорректный email";
            }
        ]
    },
        {
            nameField: 'Логин',
            type: 'text',
            nameInput: 'login',
            idError: 'login-error',
            validation: [
                (value: string) => {
                    return !!value ? null : "заполните поле"
                }
            ]
        }, {
            nameField: 'Имя',
            type: 'text',
            nameInput: 'first_name',
            idError: 'first_name-error',
            validation: [
                (value: string) => {
                    return !!value ? null : "заполните поле"
                }
            ]
        }, {
            nameField: 'Фамилия',
            type: 'text',
            nameInput: 'last_name',
            idError: 'last_name-error',
            validation: [
                (value: string) => {
                    return !!value ? null : "заполните поле"
                }
            ]
        }, {
            nameField: 'Телефон',
            type: 'text',
            nameInput: 'phone',
            idError: 'phone-error',
            validation: [
                (value: string) => {
                    return !!value ? null : "заполните поле"
                },
                (value: string) => {
                    return (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gm).test(value) ? null : "некорректный номер"
                }
            ]
        }, {
            nameField: 'Пароль',
            type: 'password',
            nameInput: 'newPassword',
            idError: 'newPassword-error',
            validation: [
                (value: string) => {
                    return !!value ? null : "заполните поле"
                },
                (value: string) => {
                    return (/^.*(?=.{6,})(?=..*[0-9])(?=..*[a-z]|[A-Z]|[а-я]|[А-Я]).*$/gm).test(value) ? null : "Пароль должен содержать 6 символов, хотябы 1 букву и 1 цифру"
                }
            ]
        }, {
            nameField: 'Пароль (ещё раз)',
            type: 'password',
            nameInput: 'newPasswordControl',
            idError: 'newPasswordControl-error',
            validation: [
                (value: string) => {
                    let password = document.querySelector<HTMLInputElement>('input[name=newPassword]');
                    return (password && value === password.value) ? null : "Пароли не совпадают"
                }
            ]
        }
    ];

    let arrInputs = arrInputsForm(arr, Input);

    const button = new Button({classButton: 'data', textButton: 'Зарегистрироваться', inputs: arrInputs});
    render(".button", button);

}

