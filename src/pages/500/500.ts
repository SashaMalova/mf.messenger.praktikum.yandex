import {errorHtml} from "../../templates/error-template.js";

let body = document.querySelector('body');
if (body) {
    body.innerHTML = errorHtml('500', 'Мы уже фиксим');
}

