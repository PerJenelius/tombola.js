const app = {
    backgrundColors: [
        '#9400d3',
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
    const radius = document.querySelector('.pointerFrame').offsetWidth / 2 - 70;
    const marginLeft = window.innerWidth / 2 - radius;
    const marginTop = window.innerHeight / 2 - radius;
    const partypants = participants.filter(p => !p.amnesty);
    for (let i = 0; i < partypants.length; i++) {
        const colorIndex = i % app.backgrundColors.length;
        const angle = (i / (partypants.length / 2)) * Math.PI;
        const left = marginLeft + (radius * Math.cos(angle)) + radius - 50;
        const top = marginTop + (radius * Math.sin(angle)) + radius - 50;
        document.querySelector('#tombola').innerHTML +=
            `<p class="participant" id="${i}" 
                style="top:${top}px; left:${left}px; background-color: ${app.backgrundColors[colorIndex]}; color: ${app.colors[colorIndex]};">
                ${partypants[i].name}
            </p>`;
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