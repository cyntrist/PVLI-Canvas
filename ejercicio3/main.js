var party = [
    {name: 'Bat', id: 'bat1', hp: 10, maxHp: 20},
    {name: 'Slime', id: 'slime', hp: 50, maxHp: 50},
    {name: 'Bat', id: 'bat2', hp: 5, maxHp: 20}
];

window.onload = function () {
    var list = document.getElementById('party-monsters');
    party.forEach(function (character) {
        var li = document.createElement('li');
        li.innerHTML = character.name + ' (<code>' + character.id + '</code>)';
        li.dataset.charaid = character.id;
        list.appendChild(li);
    });

    var select = document.querySelector('select[name=chara]');
    party.forEach(function (character) {
        var option = document.createElement('option');
        option.innerHTML = character.name;
        option.value = character.id;
        select.appendChild(option);
    });
    
    var form = document.querySelector('form[name=killing-machine]');
    form.addEventListener('submit', function (event) {
        function findCharById(charaID) {
            return party.filter(function (char) { return char.id === charaID; })[0];
        }

        event.preventDefault();
        var charaID = form.querySelector('[name=chara]').value;
        var character = findCharById(charaID);
        character.hp -= 5;
        if (character.hp <= 0) {
        character.hp = 0; // corrige el valor en caso de que sea negativo.
        var li = list.querySelector('[data-charaid=' + charaID + ']');
        li.classList.add('dead');
        }
    });
};