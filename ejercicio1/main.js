window.onload = function () {
    var button = document.getElementById('summon');
    button.addEventListener('click', function () {
        var img = new Image();
        img.src = 'https://placekitten.com/g/200/200/';
        document.getElementById('kittens').appendChild(img);
    });
};