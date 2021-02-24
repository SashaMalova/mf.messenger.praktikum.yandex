const button = document.querySelector('button');
button.onclick = function () {
    const user = Array.from(document.querySelectorAll('input'))
        .reduce((acc, {name, value}) => {
            acc[name] = value;
            return acc;
        }, {});

    console.log(user);
};

