const inputFile = document.querySelector('#inputFile');
let table = document.getElementById('table');
let tbody = table.getElementsByTagName('tbody')[0];
let massivTable = tbody.getElementsByTagName('tr');
let find_corn = document.getElementById('find_corn');
let run_vch = document.getElementById('run_vch');
let massiv= [];

let table2 = document.getElementById('table2');
let tbody2 = table2.getElementsByTagName('tbody')[0];
let massivTable2 = tbody2.getElementsByTagName('tr');

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
    massivTable = Array.prototype.slice.call(massivTable);
    massivTable.forEach((el, index) => {
        let timemass = el.getElementsByTagName('td');
        massiv[index].forEach((elem, int) => {
            timemass[int + 1].innerHTML = elem;
        })
    });
    find_corn.style.display = "block";
}

run_vch.addEventListener('click', findCorni);

function findCorni() {
    let cloneMas = JSON.parse(JSON.stringify(massiv));
    let mainDet = findDet(cloneMas);
    let massDet = [];
    for(let i = 0; i < massiv.length; i++) {
        cloneMas = JSON.parse(JSON.stringify(massiv));
        for(let j = 0; j < massiv.length; j++) {
            cloneMas[j][i] = massiv[j][10];
        }
        massDet.push(findDet(cloneMas));
    }
    let massCorn = [];
    massCorn = massDet.map(el => el / mainDet);
    massivTable2 = Array.prototype.slice.call(massivTable2);
    let timemass = massivTable2[0].getElementsByTagName('td');
    massDet.forEach((el, int) => {
        timemass[int + 1].innerHTML = el;
    });
    timemass = massivTable2[1].getElementsByTagName('td');
    massCorn.forEach((el, int) => {
        timemass[int + 1].innerHTML = el;
    });
}

function findDet(arr) {
    let mb = [];
    let x = 1;
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        mb[i] = [];
        for (let j = i + 1; j < n; j++) mb[i][j] = arr[i][j] / arr[i][i];
        for (ii = i + 1; ii < n; ii++) 
            for (jj = i + 1; jj < n; jj++) arr[ii][jj] = arr[ii][jj] - arr[ii][i] * mb[i][jj];
    }
    for (i = 0; i < n; i++) x *= arr[i][i];
    return x;
}