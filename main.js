var tableSize = 4;
var cells, allPictures;
var found = [];
var open = [];
var timerInterval = null;
var timer = 0;
var clicks = 0;

function shuffle(arr) {
    var result = [];
    var size = arr.length;
    do {
        var r = Math.floor(Math.random() * size);
        if (arr[r] != 'x') {
            result.push(arr[r]);
            arr[r] = 'x';
        }
    } while (result.length < size);
    return result;
}

function getPictures(size) {    
    var pictures = [];
    do {
        var r = Math.floor(Math.random() * 9) + 1;
        if( pictures.indexOf(r) == -1)
            pictures.push(r);
    } while (pictures.length < size);
    pictures = pictures.concat(pictures);
    return shuffle(pictures);
}

function showPictures() {
    for (var i = 0; i < (tableSize * tableSize); i++) {
        cells[i].innerHTML = '<img src="icons/0' + allPictures[i] + '.png">';
    } 
}

function isFound(num) {
    for (var i = 0; i < found.length; i++) {
        if (found[i] == num) {
            return true;
        }
    }
    return false;
}

function hidePictures() {
    for (var i = 0; i < (tableSize * tableSize); i++) {
        if (!isFound(allPictures[i])) {
            //cells[i].innerHTML = '';
            cells[i].classList.remove('flipped');
        }
    } 
}

function startTimer() {
    var timerEl = document.querySelector('.timer');
    timerEl.innerHTML = timer++;
    timerInterval = setInterval(function() {
        timerEl.innerHTML = timer++;
    }, 1000);
}

function showPic(event) {
    event.stopPropagation();
    var cell = event.target.parentElement
    var id = cell.getAttribute('data-key');
    console.log(cell)
    // if (cell.innerHTML > '') return;
    if (cell.classList.contains('flipped')) return;
    if (open.length == 2) {
        hidePictures();
        open = [];
    }
    open.push(allPictures[id]);
    if (open.length == 2 && open[0] == open[1]) {
        found.push(allPictures[id]);
    }
    if (timerInterval == null) {
        startTimer();
    }
    if (found.length == 8) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    document.querySelector('.clicks').innerHTML = ++clicks;
    //this.innerHTML = '<img src="icons/0' + allPictures[id] + '.png">';
    cell.classList.add('flipped');
}

var onLoad = function() {
    allPictures = getPictures(tableSize * tableSize / 2);
    cells = document.querySelectorAll('.cell');
    for(var i = 0; i < cells.length; i++) {
        cells[i].setAttribute('data-key', i);
        cells[i].addEventListener('click', showPic);
        cells[i].innerHTML = '<div class="front"></div><div class="back"><img src="icons/0' + allPictures[i] + '.png"></div>'
    }
}

window.addEventListener('load', onLoad);