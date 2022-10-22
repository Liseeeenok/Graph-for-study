const inputFile = document.querySelector('#inputFile');

let massiv= [];

function downloadArr(input) {
    let file = input.files[0];
    let read = new FileReader();
    let data;
    read.readAsText(file);
    read.onload = function() {
        loadTable(read.result);
    };
};

function loadTable(data) {
    data = data.split('\n');
    data.length = 10;
    for (i = 0; i < data.length; i++) {
        massiv[i] = data[i].split('|');
        massiv[i] = massiv[i].map(item => parseFloat(item));
    }
    console.log(massiv);
}