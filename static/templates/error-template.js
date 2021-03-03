/// <reference path="../../node_modules/handlebars/types/index.d.ts" />
export let errorHtml = function (errorCode, text) {
    let template = Handlebars.compile(`<div class="error">
        <h1>{{errorCode}}</h1>
        <h2>{{text}}</h2>
    <a href="../chat/select-chat.html">Назад к чатам</a>
    </div>`);
    return template({
        errorCode: errorCode,
        text: text
    });
};
//# sourceMappingURL=error-template.js.map