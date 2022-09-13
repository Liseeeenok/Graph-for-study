const ctx = document.getElementById('myChart').getContext('2d');

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
    data = data.split('\n');
    //console.log(data);
    //data.splice(data.length-1,1);
    console.log(data);
    for(let i = 0; i < data.length; i++) {
      str = data[i].split('|');
      str[0] = Number(str[0]);
      str[1] = Number(str[1]);
      listValues.push(str[0]);
      listNameValues.push(str[1]);
    }
    console.log(listValues);
    console.log(listNameValues);
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: listValues,
            datasets: [{
                label: '# of Votes',
                data: listNameValues,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
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
};