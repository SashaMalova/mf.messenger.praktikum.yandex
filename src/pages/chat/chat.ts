import '../../templates/global-partials.js';
import {sidebarChat} from './select-chat.js';
import {contact} from '../../templates/global-partials.js';
import {Button} from "../../components/button/button.js";
import {InputMessage} from "../../components/input/input-message.js";
import {render} from "../../components/render.js";

let body = document.querySelector('body');
if (body) {
    body.innerHTML = sidebarChat([{
        nameContact: 'Андрей',
        time: '10:49',
        message: 'Изображение',
        unread: '2',
    }, {
        nameContact: 'Киноклуб',
        time: '12:00',
        message: ' стикер',
        unread: '',
    }, {
        nameContact: 'Илья',
        time: '15:12',
        message: 'Друзья, у меня для вас особенный выпуск новостей!...',
        unread: '4',
    }, {
        nameContact: 'Вадим',
        time: 'Пт',
        message: 'Вы: Круто!',
        unread: '',
        select: 'select-chat',
    }, {
        nameContact: 'тет-а-теты',
        time: 'Ср',
        message: 'И Human Interface Guidelines и Material Design рекомендуют...',
        unread: '',
    }, {
        nameContact: '1, 2, 3',
        time: 'Пн',
        message: 'Миллионы россиян ежедневно проводят десятки часов свое...',
        unread: '',
    }, {
        nameContact: 'Design Destroyer',
        time: 'Пн',
        message: 'В 2008 году художник Jon Rafman  начал собирать...',
        unread: '',
    }, {
        nameContact: 'Day.',
        time: '1 Мая 2020',
        message: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
        unread: '',
    }, {
        nameContact: 'Стас Рогозин',
        time: '12 Апр 2020',
        message: 'Можно или сегодня или завтра вечером.',
        unread: '',
    }
    ]);


    let divMain = document.querySelector('.main-view');
    if (divMain) {
        divMain.innerHTML = mainChat(contact);
    }
}

export function mainChat(contact: {[key:string]:string|{}[]}) {
    let template = Handlebars.compile(`
 <div class="top-menu">
        <div>
            <span class="avatar"></span>
            <span class="contact"> {{nameContact}} </span>
        </div>
        <div>
            <a class="not-margin" href="delete-chat.html"><img src="../../images/trash.png" alt=""></a>
            <span class="three-point">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>
    </div>
    <span class="line"></span>
    <div class="chat">
        <time class="date">{{contact.chat.date}}</time>
        {{#each contact.chat}}
            {{#each messages}}
                {{#if contactsMessage}}
                   <p class="{{contactsMessage}}">{{message}}
                    <time class="time-message ">{{time}}</time>
                </p>
                {{/if}}
                {{#if contactsMedia}}
                    <div class="{{contactsMedia}}">
                    <img src="{{message}}" alt="">
                    <time class="time-message ">{{time}}</time>
                </div>
                {{/if}}
                {{#if yourMessage}}
                    <p class="{{yourMessage}}">
                    <span>{{message}}</span>
                    <span><img src="../../images/check-marks.png" alt="">
                        <time class="time-message ">{{time}}</time></span>
                </p>
                {{/if}}
            {{/each}}
        {{/each}}
        <div class="function-clip invisible">
            <div>
                <img src="../../images/media.png" alt="">
                <span>Фото или видео</span>
            </div>
            <div>
                <img src="../../images/file.png" alt="">
                <span>Файл</span>
            </div>
            <div>
                <img src="../../images/location.png" alt="">
                <span>Локация</span>
            </div>
        </div>
        <div class="function-three-point invisible">
            <div><a href="add-user.html" class="without-changes">
                <img src="../../images/add-user.png" alt="">
                <span>Добавить пользователя</span></a>
            </div>
            <div><a href="delete-user.html" class="without-changes">
                <img src="../../images/delete-user.png" alt="">
                <span>Удалить пользователя</span></a>
            </div>
        </div>
    </div>
    <span class="line"></span>
    <div class="footer">
        <div><img src="../../images/clip.png" alt=""></div>
        <div class="message-div"></div>
        <div class="button-img"></div> 
      
    </div>  `);

    return template({
        contact: contact,
    })
}


const messageInput = new InputMessage({
    nameField: '',
    type: 'text',
    nameInput: 'message',
    idError: 'message-error',
    validation: [
        (value: string) => {
            return !!value ? null : "заполните поле";
        },
    ],
});
render(".message-div", messageInput);

const buttonSend = new Button({
    classButton: 'data',
    textButton: `../../images/arrow.png`,
    classImg: 'button-send',
    inputs: [messageInput],
    alert: true,
});
render(".button-img", buttonSend);
