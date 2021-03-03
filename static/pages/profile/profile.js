/// <reference path="../../../node_modules/handlebars/types/index.d.ts" />
import '../../templates/global-partials.js';
import { profile } from '../../templates/global-partials.js';
export function profileTemplate(link, profile, arrBlack, arrYellow) {
    let template = Handlebars.compile(`
        {{> linkBack   link = link}} 
        <div class="profile-main">
    <div class="avatar-profile"><span><img src="{{profile.avatar}}" alt=""></span>
        <h3>{{profile.first_name}}</h3></div>
    <div>
    {{#each arrBlack}}
           {{> black-line  nameField = nameField profileDate = profileDate}} 
     {{/each}}
     </div>
     <div class="end">
         {{#each arrYellow}}
           {{> yellow-line  link = link text = text}} 
     {{/each}}
       
    </div>
</div>
`);
    return template({
        link: link,
        profile: profile,
        arrBlack: arrBlack,
        arrYellow: arrYellow,
    });
}
let body = document.querySelector('body');
if (body) {
    body.innerHTML = profileTemplate('../chat/select-chat.html', profile, [{
            nameField: 'Почта',
            profileData: profile.email,
        }, {
            nameField: 'Логин',
            profileData: profile.login,
        }, {
            nameField: 'Имя',
            profileData: profile.first_name,
        }, {
            nameField: 'Фамилия',
            profileData: profile.last_name,
        }, {
            nameField: 'Имя в чате',
            profileData: profile.display_name,
        }, {
            nameField: 'Телефон',
            profileData: profile.phone,
        },
    ], [{
            link: 'change-data.html',
            text: 'Изменить данные',
        }, {
            link: 'change-password.html',
            text: 'Изменить пароль',
        }, {
            link: '../login/login.html',
            text: 'Выйти',
        }]);
}
//# sourceMappingURL=profile.js.map