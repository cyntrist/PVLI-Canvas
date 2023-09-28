var party = [
    {name: 'Bat', id: 'bat1', hp: 10, maxHp: 20},
    {name: 'Slime', id: 'slime', hp: 50, maxHp: 50},
    {name: 'Bat', id: 'bat2', hp: 5, maxHp: 20}
];

window.onload = function () {
    var lastRender = 0;
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');

    function render() {
    requestAnimationFrame(function (t) {
        // Borra todo...
        context.clearRect(0, 0, 800, 600);
        // ...y repinta.
        renderParty(t);
        //console.log('Delta time:', t - lastRender);
        lastRender = t;
        render();
    });
    }

    function renderParty(t) {
        renderBackground();
        renderCharacters(t); // pásale t a la función que pinta los enemigos.
        renderUI();
    }

    var bgImage = document.getElementById('background');
    function renderBackground() {
        context.drawImage(bgImage, 0, 0);
    }

    function renderCharacters(t) {
        var charaSpace = 800 / party.length;
        var centerOffset = charaSpace / 2;
        party.forEach(function (char, index) {
          var x = index * charaSpace + centerOffset;
          var y;
          if (char.hp === 0) {
            context.fillStyle = 'grey';
            y = 500; // en el suelo porque está muerto.
          } else if (char.name === 'Bat') {
            context.fillStyle = 'blue';
            y = 50 * Math.sin(t/100) + 300; // flotando en el aire.
          } else if (char.name === 'Slime') {
            context.fillStyle = 'green';
            y = 400; // en el suelo pero no en la tumba.
          }
          context.beginPath();
          context.arc(x, y, 50, 0, 2 * Math.PI);
          context.fill();
        });
    }

    function renderUI() {
        var width = 100;
        var semiWidth = width / 2;
        var height = 20;
        var semiHeight = height / 2;
        var charaSpace = 800 / party.length;
        var centerOffset = charaSpace / 2;
        party.forEach(function (char, index) {
          var x = index * charaSpace + centerOffset;
          var y = 500;
          if (char.hp > 0) {
            var lifeArea = Math.floor(char.hp / char.maxHp * width);
            context.fillStyle = 'red';
            context.fillRect(x - semiWidth, y - semiHeight, lifeArea, height);
            context.lineWidth = 3;
            context.strokeStyle = 'black';
            context.strokeRect(x - semiWidth, y - semiHeight, width, height);
          }
        }); 
    }

    render();

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

    function findCharById(charaID) {
        return party.filter(function (char) { return char.id === charaID; })[0];
    }   
    
    var form = document.querySelector('form[name=killing-machine]');
    form.addEventListener('submit', function (event) {
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