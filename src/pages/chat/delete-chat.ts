import '../../templates/global-partials.js';
import "./chat.js";
import {Button} from "../../components/button/button.js";
import {render} from "../../components/render.js";

function formDeleteChat(text: string, textButton: string) {
    let template = Handlebars.compile(`
        <div class="blackout"></div>       
        <div class="add-user-form content-form">
    <span class="content-form">
        <h2 class="center">{{text}}</h2>
    </span>
    <span class="content-form">
     <div class="button"></div> 
    </span>
</div>
`);
    return template({
        text: text,
        textButton: textButton,
    })
}

let body = document.querySelector('body');
if (body) {
    body.insertAdjacentHTML('beforeend', formDeleteChat(
        'Удалить чат?',
        'Удалить',
    ));

    const button = new Button({classButton: 'data', textButton: 'Удалить', inputs: []});
    const buttonCancel = new Button({classButton: 'link', textButton: 'Отмена', inputs: [], link: './chat.html'});
    render(".button", button);
    render(".button", buttonCancel);
}