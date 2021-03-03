import {errorHtml} from "../../templates/error-template.js";

let body = document.querySelector('body');
if (body) {
    body.innerHTML = errorHtml('404', 'Не туда попали');
}


