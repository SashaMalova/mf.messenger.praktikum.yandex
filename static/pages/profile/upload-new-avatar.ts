import '../../templates/global-partials.js';
import "./profile.js";
import {Button} from "../../components/button/button.js";
import {render} from "../../components/render.js";
import {InputAvatar} from "../../components/input/input-avatar.js";

declare var Handlebars: any;


let h3 = document.querySelector('h3');
if (h3) {
    h3.insertAdjacentHTML(
        'beforebegin', '<a href="upload-new-avatar.html" class="change-avatar">' +
        '<img src="../../images/avatar.png" alt="">Поменять<br> аватар</a>'
    );
}
let avatar = document.querySelector('.avatar-profile');
if (avatar) {
    avatar.classList.add('change');
    if (avatar.firstChild) {
        avatar.firstChild.remove();
    }
}
let body = document.querySelector('body');


function formChangeAvatar(text: string) {
    let template = Handlebars.compile(`
        <div class="blackout"></div>
<div class="upload-new-avatar content-form">

    <span class="content-form">
        <h3 class="center">{{text}}</h3>
    </span>
     <div class="input-div add-file"></div>
    <span class="content-form">
        <div class="button"></div>
    </span>

</div>
`);
    return template({
        text: text,

    })
}

if (body) {
    body.insertAdjacentHTML('beforeend', formChangeAvatar(
        'Загрузите файл',
    ));


    const input = new InputAvatar({
        nameField: '',
        type: 'file',
        nameInput: 'avatar',
        idError: 'avatar-error',
        validation: [
            (value: string) => {
                return !!value ? null : "Нужно выбрать файл";
            },
        ] as any,
    });
    render(".input-div", input);

    const button = new Button({classButton: 'data', textButton: 'Поменять', inputs: [input], alert: true});
    render(".button", button);

}
