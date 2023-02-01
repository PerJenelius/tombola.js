const app = {
    radius: 330
}

const main = () => {
    renderNametags();
    renderNamelist();
}

const renderNamelist = () => {
    const namelist = document.querySelector('#participantList');
    for (let i = 0; i < participants.length; i++) {
        namelist.innerHTML += `<li><input type="checkbox" ${participants[i].amnesty ? '' : checked="checked"} onchange=updateStatus(${i}) /><span>${participants[i].name}</span></li>`;
    }
}

const clearNametags = () => {
    const labels = document.querySelectorAll('.participant');
    labels.forEach(label => {
        label.remove();
    });
}

const renderNametags = () => {
    const marginLeft = window.innerWidth / 2 - app.radius;
    const marginTop = window.innerHeight / 2 - app.radius;
    const partypants = participants.filter(p => !p.amnesty);
    for (let i = 0; i < partypants.length; i++) {
        const angle = (i / (partypants.length / 2)) * Math.PI;
        const left = marginLeft + (app.radius * Math.cos(angle)) + app.radius - 45;
        const top = marginTop + (app.radius * Math.sin(angle)) + app.radius - 35;
        document.querySelector('#tombola').innerHTML +=
            `<p class="participant" id="${i}" style="top:${top}px; left:${left}px">${partypants[i].name}</p>`;
    }
}

const updateStatus = (index) => {
    participants[index].amnesty = !participants[index].amnesty;
    clearNametags();
    renderNametags();
}

const startTheWheel = () => {
    const partypants = participants.filter(p => !p.amnesty);
    const random = Math.floor(Math.random() * partypants.length);
    const fakeSpins = Math.ceil(Math.random() * 5);
    const angle = random * (360 / partypants.length);

    document.querySelector('#pointerArm').style.transform = 'none';
    for (let nameLabel of document.querySelectorAll('.participant')) {
        nameLabel.classList.remove('chosen');
    }

    for (let i = 0; i <= (fakeSpins * 360 + angle); i++) {
        (function(j) {
            setTimeout(() => {
                document.querySelector('#pointerArm').style.transform = `rotate(${i}deg)`;
                if (i === fakeSpins * 360 + angle) {
                    document.getElementById(random).classList.add('chosen');
                }
            }, 2 * j);
        })(i)
    }
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}