let user = {};

let button = document.querySelector('button');
button.onclick = function() {
    let array = document.querySelectorAll('input');
    for (let item of array) {
        user[item.name] = item.value;
    }
    console.log(user);
};

