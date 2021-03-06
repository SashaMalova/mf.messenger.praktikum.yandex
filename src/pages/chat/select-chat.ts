import '../../templates/global-partials.js';

export function sidebarChat(arr: {[key:string]:string}[]) {
    let template = Handlebars.compile(`<aside class="sidebar">
    <a href="../profile/profile.html" class="profile">Профиль ></a>
    <span class="search"><img src="../../images/search.png" alt=""><span>Поиск</span></span>
    <ul>
    {{#each arr}}
           {{> chat-list  nameContact = nameContact time = time message = message unread = unread select=select}} 
    {{/each}}
    </ul>
</aside>
<div class="main-view">
    <p>Выберите чат чтобы отправить сообщение</p>
</div>

     `);
    return template({
        arr: arr,
    })
}
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
}




