

export let errorHtml = function (errorCode: string, text: string) {
    let template = Handlebars.compile(`<div class="error">
        <h1>{{errorCode}}</h1>
        <h2>{{text}}</h2>
    <div class="back">Назад к чатам</div>
    </div>`);

    return template({
        errorCode: errorCode,
    text: text
    });
};

