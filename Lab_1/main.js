const ctx = document.getElementById('myChart').getContext('2d');
const inputFile = document.querySelector('#inputFile');
const averageValueGraph = document.querySelector('#averageValueGraph');
const varianceValuesGraph = document.querySelector('#varianceValuesGraph');
const ckoGraph = document.querySelector('#ckoGraph');
let listValues = [];
let listNameValues = [];
let arrBackgroundColor = [];
let arrBorderColor = [];
let averageValue = 0;
let varianceValues = 0;
let sum = 0;
let average = 0;
let cko = 0;
let dispers = 0;
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: listValues,
        datasets: [{
            label: 'Lab',
            data: listNameValues,
            backgroundColor: arrBackgroundColor,
            borderColor: arrBorderColor,
            borderWidth: 1
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

function downloadGraph(input) {
    let file = input.files[0];
    let read = new FileReader();
    let data;
    read.readAsText(file);
    read.onload = function() {
      generationGraph(read.result);
    };
};

function generationGraph(data) {
    listValues = [];
    listNameValues = [];
    arrBackgroundColor = [];
    arrBorderColor = [];
    averageValue = 0;
    varianceValues = 0;
    sum = 0;
    average = 0;
    cko = 0;
    dispers = 0;
    myChart.destroy();
    //console.log(inputFile);
    //inputFile.style.display = 'none';
    listValues = [];
    listNameValues = [];
    data = data.split('\n');
    //console.log(data);
    data.splice(data.length-1,1);
    //console.log(data);
    for(let i = 0; i < data.length; i++) {
      str = data[i].split('|');
      str[0] = Number(str[0]);
      str[1] = Number(str[1]);
      listValues.push(str[0]);
      listNameValues.push(str[1]);
      arrBackgroundColor.push('rgb(255, 99, 132)')
      arrBorderColor.push('rgb(255, 99, 132)')
    }
    MinGraph(data);
    AverageValue(data);
    VarianceValues(data);
    CKO(data);
    //console.log(listValues);
    //console.log(listNameValues);
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: listValues,
            datasets: [{
                label: 'Lab',
                data: listNameValues,
                backgroundColor: arrBackgroundColor,
                borderColor: arrBorderColor,
                borderWidth: 1
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
    averageValueGraph.textContent = 'Среднее значение графика: ' + averageValue;
    varianceValuesGraph.textContent = 'Дисперисия графика: ' + varianceValues;
    ckoGraph.textContent = 'СКО графика: ' + cko;
};

function MinGraph(data){
    for (let i = 1; i < data.length - 1; i++) {
        str1 = data[i-1].split('|');
        str1[0] = Number(str1[0]);
        str1[1] = Number(str1[1]);
        str2 = data[i+1].split('|');
        str2[0] = Number(str2[0]);
        str2[1] = Number(str2[1]);
        str = data[i].split('|');
        str[0] = Number(str[0]);
        str[1] = Number(str[1]);
        if ((str1[1] > str[1] && str2[1] > str[1]) || (str1[1] < str[1] && str2[1] < str[1])) {
            arrBackgroundColor[i] = 'rgb(23, 30, 229)';
            arrBorderColor[i] = 'rgb(23, 30, 229)';
        }
    }
}

function AverageValue(data) {
    for(let i = 0; i < data.length; i++) {
        str = data[i].split('|');
        str[1] = Number(str[1]);
        sum += str[1];
    }
    averageValue = (sum/data.length).toFixed(6);
    average = sum/data.length;
}

function VarianceValues(data) {
    let dispSum = 0;
    for(let i = 0; i < data.length; i++) {
        str = data[i].split('|');
        str[1] = Number(str[1]);
        dispSum += (str[1]-average)*(str[1]-average);
    }
    varianceValues = (dispSum/data.length).toFixed(6);
    dispers = dispSum/data.length;
}

function CKO(data) {
    cko = (Math.sqrt(dispers)).toFixed(6);
}