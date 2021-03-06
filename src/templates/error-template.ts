

export let errorHtml = function (errorCode: string, text: string) {
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

