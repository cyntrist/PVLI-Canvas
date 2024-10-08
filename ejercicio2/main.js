var party = [
    { name: 'Bat', id: 'bat1' },
    { name: 'Slime', id: 'slime' },
    { name: 'Bat', id: 'bat2' }
];

window.onload = function () {
    var list = document.getElementById('party-monsters');
    party.forEach(function (character) {
        var li = document.createElement('li');
        li.innerHTML = character.name + ' (<code>' + character.id + '</code>)';
        li.dataset.charaid = character.id;
        list.appendChild(li);
    });

    let but = document.getElementById('boton');
    var select = document.querySelector('select[name=chara]');
    select.addEventListener('change', function (event) {
        event.preventDefault();
        var charaID = form.querySelector('[name=chara]').value;
        var li = list.querySelector('[data-charaid=' + charaID + ']');
        if (li.classList.contains('dead')) {
            but.disabled = true;
        }
        else {
            but.disabled = false;
        }
    });

    party.forEach(function (character) {
        var option = document.createElement('option');
        option.innerHTML = character.name;
        option.value = character.id;
        select.appendChild(option);
    });

    var form = document.querySelector('form[name=killing-machine]');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var charaID = form.querySelector('[name=chara]').value;
        var li = list.querySelector('[data-charaid=' + charaID + ']');
        li.classList.add('dead');
        but.disabled = true;
    });
};