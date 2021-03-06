import '../../templates/global-partials.js';
import {profile} from '../../templates/global-partials.js';
import {profileChangeTemplates} from "./change-data.js";
import {Button} from "../../components/button/button.js";
import {InputProfile} from "../../components/input/input-profile.js";
import {render} from "../../components/render.js";
import {arrInputsForm} from "../../components/input/arr-inputs-form.js";

let body = document.querySelector('body');
if (body) {
    body.innerHTML = profileChangeTemplates(
        'profile.html',
        profile,
    );

    let arr = [{
        nameField: 'Старый пароль',
        type: 'password',
        nameInput: 'oldPassword',
        profileData: '',
        idError: 'password-error',
        validation: [
            (value: string) => {
                return !!value ? null : "заполните поле";
            },
        ]
    }, {
        nameField: 'Новый пароль',
        type: 'password',
        nameInput: 'newPassword',
        profileData: '',
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
        nameField: 'Повторите новый пароль',
        type: 'password',
        nameInput: 'newPasswordControl',
        profileData: '', idError: 'newPasswordControl-error',
        validation: [
            (value: string) => {
                let password = document.querySelector<HTMLInputElement>('input[name=newPassword]');
                return (password && value === password.value) ? null : "Пароли не совпадают"
            }
        ]
    },
    ];


    let arrInputs = arrInputsForm(arr, InputProfile);

    const button = new Button({classButton: 'data', textButton: 'Сохранить', inputs: arrInputs});
    render(".button", button);

}