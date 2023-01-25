const app = {
    radius: 420,
    amnesty: []
}

const main = () => {
    grantAmnesty();
    renderNametags();
}

const grantAmnesty = () => {
    app.amnesty = [];
    for (let i = 0; i < participants.length; i++) {
        if (participants[i].amnesty) {
            app.amnesty.push(i);
        }
    }
}

const renderNametags = () => {
    const marginLeft = window.innerWidth / 2 - app.radius;
    const marginTop = window.innerHeight / 2 - app.radius;
    for (let i = 0; i < participants.length; i++) {
        const angle = (i / (participants.length / 2)) * Math.PI;
        const left = marginLeft + (app.radius * Math.cos(angle)) + app.radius - 45;
        const top = marginTop + (app.radius * Math.sin(angle)) + app.radius - 35;
        document.querySelector('#tombola').innerHTML +=
            `<p class="participant ${ participants[i].amnesty ? 'amnesty' : ''}" id="${i}" style="top:${top}px; left:${left}px">${participants[i].name}</p>`;
    }
}

const startTheWheel = () => {
    let random = 0;

    do {
        random = Math.floor(Math.random() * participants.length);
    } while (app.amnesty.includes(random))

    const angle = random * (360 / participants.length);

    document.querySelector('#pointerArm').style.transform = 'none';
    for (let nameLabel of document.getElementsByClassName('participant')) {
        nameLabel.classList.remove('chosen');
    }

    for (let i = 0; i <= (2 * 360 + angle); i++) {
        (function(j, myCallback) {
            setTimeout(() => {
                document.querySelector('#pointerArm').style.transform = `rotate(${i}deg)`;
            }, 2.5 * j);
        })(i)
    }

    window.setTimeout(() => {
        document.getElementById(random).classList.add('chosen');
    }, (3 * 2 * 360) + angle)
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}