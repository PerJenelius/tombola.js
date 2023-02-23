'use strict';

const app = {
    backgrundColors: [
        '#4b0082',
        '#0000ff',
        '#00ff00',
        '#ffff00',
        '#ff7f00',
        '#ff0000'
    ],
    colors: [
        '#fff',
        '#fff',
        '#000',
        '#000',
        '#000',
        '#fff'
    ]
}

const main = () => {
    renderNametags();
    renderNamelist();
}

const renderNametags = () => {
    const radius = document.querySelector('.pointerFrame').offsetWidth / 2 - 70;
    const marginLeft = window.innerWidth / 2 - radius;
    const marginTop = window.innerHeight / 2 - radius;
    const partypants = participants.filter(p => !p.amnesty);

    partypants.map((pant, i) => {
        const colorIndex = i % app.backgrundColors.length;
        const angle = (i / (partypants.length / 2)) * Math.PI;
        const left = marginLeft + (radius * Math.cos(angle)) + radius - 50;
        const top = marginTop + (radius * Math.sin(angle)) + radius - 50;
        
        document.querySelector('#tombola').innerHTML +=
            `<p class="participant" id="${i}" 
                style="top:${top}px; left:${left}px; background-color: ${app.backgrundColors[colorIndex]}; color: ${app.colors[colorIndex]};">
                ${pant.name}
            </p>`;
    });
}

const renderNamelist = () => {
    const namelist = document.querySelector('#participantList');
    participants.map((participant, i) => {
        namelist.innerHTML += 
            `<li>
                <input type="checkbox" ${participant.amnesty ? '' : 'checked'} onchange=updateStatus(${i}) />
                <span>${participant.name}</span>
            </li>`;
    });
}

const clearNametags = () => {
    const labels = document.querySelectorAll('.participant');
    labels.forEach((label) => {
        label.remove();
    });
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
    const totalAngle = Math.floor(fakeSpins * 360 + angle)
    const moment = 2;

    document.querySelector('#pointerArm').style.transform = 'none';
    for (let nameLabel of document.querySelectorAll('.participant')) {
        nameLabel.classList.remove('chosen');
    }

    for (let i = 0; i <= totalAngle; i++) {
        ((j) => {
            setTimeout(() => {
                document.querySelector('#pointerArm').style.transform = `rotate(${i}deg)`;
                if (i === totalAngle) {
                    document.getElementById(random).classList.add('chosen');
                }
            }, moment * j);
        })(i)
    }
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}