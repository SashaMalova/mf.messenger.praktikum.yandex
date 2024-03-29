

export const errorHtml = function (errorCode: string, text: string) {
    const template = Handlebars.compile(`<div class="error">
        <h1>{{errorCode}}</h1>
        <h2>{{text}}</h2>
    <div class="error__back">Назад к чатам</div>
    </div>`);

    return template({
        errorCode: errorCode,
    text: text
    });
};

