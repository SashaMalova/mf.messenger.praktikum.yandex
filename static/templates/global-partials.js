export let profile = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    first_name: 'Иван',
    last_name: 'Иванов',
    display_name: 'Иван',
    phone: '+7 (909) 967 30 30',
    password: '123654',
    avatar: '../../images/avatar.png',
};
export let contact = {
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
Handlebars.registerPartial('formInput', `<span class="name-field">{{nameField}}</span>
    <div class="input-field"><input type="{{type}}" name="{{nameInput}}" ></div>
    {{#if idError}}
    <span id="{{idError}}">{{textError}}</span>
{{/if}}`);
Handlebars.registerPartial('button', `<button type="submit" class="{{classButton}}">{{textButton}}</button>`);
Handlebars.registerPartial('link', `<a class="center" href="{{link}}">{{text}}</a>`);
Handlebars.registerPartial('linkBack', `<a href="{{link}}" class="back"><span><img src="../../images/arrow-back.png" alt=""></span></a>`);
Handlebars.registerPartial('black-line', `<div class="black-line">
<span class="field">{{nameField}}</span>
    <span class="date-profile">{{profileData}}</span>
</div>`);
Handlebars.registerPartial('yellow-line', `<div class="yellow-line">
<a href="{{link}}" class="field">{{text}}</a>
</div>`);
Handlebars.registerPartial('yellow-line-with-input', `<div class="yellow-line">
            <span class="field">{{nameField}}</span>
            <span class="date-profile"><input type="{{type}}" name="{{nameInput}}" value="{{profileData}}"></span>
        </div>`);
Handlebars.registerPartial('chat-list', `
<li>
    <span class="line"></span>
    <div class="chats-list {{select}}">
<span class="avatar"></span>
<div>
<div>
    <span class="contact">{{nameContact}}</span>
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
//# sourceMappingURL=global-partials.js.map