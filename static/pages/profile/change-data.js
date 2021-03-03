import '../../templates/global-partials.js';
import { profile } from '../../templates/global-partials.js';
import { Button } from "../../components/button/button.js";
import { render } from "../../components/render.js";
import { InputProfile } from "../../components/input/input-profile.js";
import { arrInputsForm } from "../../components/input/arr-inputs-form.js";
export function profileChangeTemplates(link, profile) {
    let template = Handlebars.compile(`
        {{> linkBack   link = link}} 
        <div class="profile-main">
    <div class="avatar-profile"><span><img src="{{profile.avatar}}" alt=""></span>
        <h3 class="invisible">{{profile.first_name}}</h3></div>
    <div>
     <div class="input-div"></div>
     </div>
     <div class="end">
<div class="button"></div>
</div>
</div>
`);
    return template({
        link: link,
        profile: profile,
    });
}
let body = document.querySelector('body');
if (body) {
    body.innerHTML = profileChangeTemplates('profile.html', profile);
    let arr = [
        {
            nameField: 'Почта',
            type: 'text',
            nameInput: 'email',
            profileData: profile.email,
            idError: 'email-error',
            validation: [
                (value) => {
                    return !!value ? null : "заполните поле";
                },
                (value) => {
                    return (value.includes('@') && value.includes('.')) ? null : "некорректный email";
                }
            ]
        }, {
            nameField: 'Логин',
            type: 'text',
            nameInput: 'login',
            profileData: profile.login,
            idError: 'login-error',
            validation: [
                (value) => {
                    return !!value ? null : "заполните поле";
                }
            ]
        }, {
            nameField: 'Имя',
            type: 'text',
            nameInput: 'first_name',
            profileData: profile.first_name,
            idError: 'first_name-error',
            validation: [
                (value) => {
                    return !!value ? null : "заполните поле";
                }
            ],
        }, {
            nameField: 'Фамилия',
            type: 'text',
            nameInput: 'second_name',
            profileData: profile.last_name,
            idError: 'last_name-error',
            validation: [
                (value) => {
                    return !!value ? null : "заполните поле";
                }
            ],
        }, {
            nameField: 'Имя в чате',
            type: 'text',
            nameInput: 'display_name',
            profileData: profile.display_name,
            idError: 'display_name-error',
            validation: [
                (value) => {
                    return !!value ? null : "заполните поле";
                }
            ]
        }, {
            nameField: 'Телефон',
            type: 'text',
            nameInput: 'phone',
            profileData: profile.phone,
            idError: 'phone-error',
            validation: [
                (value) => {
                    return !!value ? null : "заполните поле";
                },
                (value) => {
                    return (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gm).test(value) ? null : "некорректный номер";
                }
            ],
        },
    ];
    let arrInputs = arrInputsForm(arr, InputProfile);
    const button = new Button({ classButton: 'data', textButton: 'Сохранить', inputs: arrInputs });
    render(".button", button);
}
//# sourceMappingURL=change-data.js.map