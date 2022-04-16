const save = {};
const IMG_CHECKED = 'images/checked.png';
const IMG_UNCHECKED = 'images/unchecked.png';

function Check(event) {
    let container = event.currentTarget;
    let checkbox = container.querySelector('.checkbox');
    checkbox.src = IMG_CHECKED;
    if(!container.querySelector('.unchecked')) {
        container.classList.remove('unchecked');        //Rimuovo l'opacità se cambio da unchecked a checked
    }
    container.classList.add('checked');
    Uncheck(container.dataset.choiceId, container.dataset.questionId);
    Controllo();
    save[container.dataset.questionId] = container.dataset.choiceId;
}

function Uncheck(id, num) {
    for(let Box of Boxes) {
        if(Box.dataset.choiceId != id && Box.dataset.questionId == num) {
            Box.classList.add('unchecked');
            Box.classList.remove('checked');
            const boxcheck = Box.querySelector('.checkbox');
            boxcheck.src = IMG_UNCHECKED;
        }
    }
}

function Elabora() {
    if(save.one === save.two && save.one === save.three && save.two === save.three)    return save.one;
    if(save.one !== save.two && save.one !== save.three && save.two !== save.three)    return save.one;
    if(save.two === save.three && save.two !== save.one)  return save.two;
    if(save.three === save.one && save.three !== save.one)  return save.three;
}

function Resetta() {

    for (let Box of Boxes) 
    {
        Box.classList.remove('checked');
        let img = Box.querySelector('.checkbox');
        img.src = IMG_UNCHECKED;
        Box.classList.remove('unchecked');
        Box.addEventListener('click', Check);
    }

    let risultato = document.querySelector('#Results');
    risultato.classList.add('Deactive');

    delete save.one;
    delete save.two;
    delete save.three;
}


function Results() {
    let personalità = Elabora();
 
    let h1 = document.querySelector('#Results h1');
    let p = document.querySelector('#Results p');
    h1.textContent = RESULTS_MAP[personalità].title;
    p.textContent = RESULTS_MAP[personalità].contents;  

    const bottone = document.querySelector('#reset');
    bottone.addEventListener('click', Resetta); 
    
    let risultato = document.querySelector('#Results');
    risultato.classList.remove('Deactive');
}

function StopOut() {
    for(let Box of Boxes) {
        Box.removeEventListener('click', Check);
    }
    Results();
}

function Controllo() {
    let conta = 0;
    for(let Box of Boxes) {
        if(Box.className === 'checked') {
            conta++;
        }
        if(conta >= 3) {
            StopOut();
        }
    }
}

const Boxes = document.querySelectorAll('.choice-grid div');
for (const Box of Boxes) 
{
    Box.addEventListener('click', Check);
}

