const ctx = document.getElementById('myChart').getContext('2d');
let a3 = document.getElementById('a3');
let a2 = document.getElementById('a2');
let a1 = document.getElementById('a1');
let a0 = document.getElementById('a0');
let left = document.getElementById('AA');
let right = document.getElementById('BB');
let number = document.getElementById('number');
let button_run = document.getElementById('button__run');
let error = document.getElementById('error');
let urav = document.getElementById('urav');
let corni = document.getElementById('corni');

let myChart = new Chart(ctx, {});

let num_a3 = 0;
let num_a2 = 0;
let num_a1 = 0;
let num_a0 = 0;
let arrCorni = [];
button_run.addEventListener('click', chekNum);

function chekNum() {
    if ((a3.value == '') || (a2.value == '') || (a1.value == '') || (a0.value == '') || (left.value == '') || (right.value == '') || (number.value == '') || (parseFloat(left.value) >= parseFloat(right.value))) {
        error.innerHTML = 'Введите все параметры корректно';
    } else {
        error.innerHTML = '';
        urav.innerHTML = ' y='+a3.value+'x³+'+a2.value+'x²+'+a1.value+'x¹+'+a0.value;
        createGraph();
    }
};

function result(num) {
    let fin = num*num*num*num_a3 + num*num*num_a2 + num*num_a1 + num_a0;
    return fin;
}

function createGraph() {
    myChart.destroy()
    arrCorni = [];
    num_a3 = parseFloat(a3.value);
    num_a2 = parseFloat(a2.value);
    num_a1 = parseFloat(a1.value);
    num_a0 = parseFloat(a0.value);
    let listValues = [];
    let listNameValues = [];
    let start = parseFloat(left.value);
    let end = parseFloat(right.value);
    let st = (end - start) / 400;
    for (i = start; i <= end; i += st) {
        listValues.push(i);
        listNameValues.push(result(i));
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: listValues,
            datasets: [{
                label: 'Lab',
                data: listNameValues,
                backgroundColor: 'rgba(69, 75, 247, 0.5)',
                borderColor: 'rgba(69, 75, 247, 0.5)',
                fill: true,
                tension: 0.1,
                pointBorderWidth: 0.1,
                borderWidth: 1,
                pointRadius: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    findCorni(start, end);

    let text_corn = '<div>Корни:</div>';
    arrCorni.forEach(el => text_corn += '<div>'+el+'</div>')
    corni.innerHTML = text_corn;
}

function findCorni(start, end) {
    step = (end - start) / parseFloat(number.value);
    for (i = start; i < end; i += step) {
        if ((result(i) * result(i + step)) < 0) {
            doubleDiv(i, i + step);
        }
        if (result(i) == 0) {
            arrCorni.push(i); 
        }
    }
}

function doubleDiv(start, end) {
    while (Math.abs(end-start) > 0.00000000001) {
        if ((result(start + (end-start)/2) * result(start)) > 0) {
            start = start + (end-start)/2;
        } else {
            if (result(start + (end-start)/2) == 0) {
                arrCorni.push(start + (end-start)/2);
                return; 
            }
            end = end - (end-start)/2;
        }
    }
    arrCorni.push(start + (end-start)/2);
}