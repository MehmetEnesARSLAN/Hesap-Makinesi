const display = document.querySelector('.HMinput');
const keys = document.querySelector('.hesapmakinesituslar');

var gorunenDeger = '0';
var ilkDeger = null;
var operator = null;
var ikinciDegerBekle = false;

goruntuyuGuncelle();

function goruntuyuGuncelle() {
    display.value = gorunenDeger;
}

keys.addEventListener('click', function (e) {

    const element = e.target;

    if (!element.matches('button')) return;

    if (element.classList.contains('operator')) {
         console.log('operator', element.value);
        handleOperator(element.value);
        goruntuyuGuncelle();
        return;
    }

    if (element.classList.contains('ondalik')) {
        inputOndalik();
        goruntuyuGuncelle();
        return;
    }

    if (element.classList.contains('temizle')) {
        temizle();
        goruntuyuGuncelle();
        return;
    }

    inputSayi(element.value);
    goruntuyuGuncelle();
});

function handleOperator(nextOperator) {
    const value = parseFloat(gorunenDeger);

    if (operator && ikinciDegerBekle) {
        operator = nextOperator;
        return;
    }

    if (ilkDeger === null) {
        ilkDeger = value;
    } else if (operator) {
        const result = hesapla(ilkDeger, value, operator);

        gorunenDeger = `${parseFloat(result.toFixed(7))}`;
        ilkDeger = result;
    }

    ikinciDegerBekle = true;
    operator = nextOperator;
}

function hesapla(ilk, ikinci, operator) {
    if (operator === '+') {
        return ilk + ikinci;
    } else if (operator === '-') {
        return ilk - ikinci;
    } else if(operator === '*') {
        return ilk * ikinci;
    } else if (operator === '/') {
        return ilk / ikinci;
    }

    return ikinci;
}

function inputSayi(sayi) {
    if (ikinciDegerBekle) {
        gorunenDeger = sayi;
        ikinciDegerBekle = false;
    } else {
        gorunenDeger = gorunenDeger === '0' ? sayi : gorunenDeger + sayi;
    }
}

function inputOndalik() {
    if (!gorunenDeger.includes('.')) {
        gorunenDeger += '.';
    }   
}

function temizle() {
    gorunenDeger = '0';
}