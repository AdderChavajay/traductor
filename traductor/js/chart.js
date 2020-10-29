document.addEventListener("DOMContentLoaded", () => {
    console.log("in chart");
    var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Español', 'Kiche', 'Otros'],
                datasets: [{
                    label: 'Gráfica de Idiomas mas hablados',
                    data: [12, 19, 3],
                    backgroundColor: [
                        'rgba(30, 132, 73, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        
                    ],
                    borderColor: [
                        'rgba(30, 132, 73)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

})

console.log("here");