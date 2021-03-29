export let profile: {[key:string]:string} = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    first_name: 'Иван',
    last_name: 'Иванов',
    display_name: 'Иван',
    phone: '+7 (909) 967 30 30',
    password: '123654',
    avatar: '../../images/avatar.png',
};

export let contact:any = {
    nameContact: 'Вадим',
    chat: [
        {
            date: '19 июня',
            messages: [
                {
                    contactsMessage: 'contacts-message',
                    message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории\n' +
                        '            — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для\n' +
                        '            полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL\n' +
                        '            — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны,\n' +
                        '            так как астронавты с собой забрали только кассеты с пленкой.\n' +
                        '            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так\n' +
                        '            и на ракету они так никогда и не попали. Всего их было произведено 25 штук,\n' +
                        '            одну из них недавно продали на аукционе за 45000 евро.',
                    time: '12:00',
                },
                {
                    contactsMedia: 'contacts-media',
                    message: '../../images/screenshot.png',
                    time: '12:00',
                },
                {
                    yourMessage: 'your-message',
                    message: 'Круто!',
                    time: '12:00',
                }
            ]
        }
    ]
};

Handlebars.registerPartial('link', `<div class="center" id ="link-under-button" data-link="{{link}}">{{text}}</div>`);

Handlebars.registerPartial('black-line', `<div class="black-line">
<span class="field">{{nameField}}</span>
    <span class="date-profile">{{profileData}}</span>
</div>`);

Handlebars.registerPartial('yellow-line', `<div id="{{id}}" class="yellow-line">
<div class="field">{{text}} </div>
</div>`);

Handlebars.registerPartial('chat-list', `
<li class="sidebar-chat-item" data-id="{{id}}">
    <span class="line"></span>
    <div class="chats-list {{activeClass}}">
<span class="avatar"></span>
<div>
<div>
    <span class="contact">{{titleChat}}</span>
    <time class="time">{{time}}</time>
</div>
<div>
<span class="last-message">{{message}}</span>
{{#if unread}}
    <span class="unread ">{{unread}}</span>
    {{else}}
    <span class="unread invisible">{{unread}}</span>
{{/if}}
    </div>
    </div>
    </div>
    </li>`);

