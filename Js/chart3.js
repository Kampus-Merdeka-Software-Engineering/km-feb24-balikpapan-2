import data from '/Assets/Data/category.json' assert { type: 'json' };

function calculateTotals(data) {
    let totals = {};
    data.forEach(item => {
        if (totals[item.Category]) {
            totals[item.Category].Total_Sales += parseFloat(item.Total_Sales);
            totals[item.Category].Revenue += parseFloat(item.Revenue);
        } else {
            totals[item.Category] = {
                Total_Sales: parseFloat(item.Total_Sales),
                Revenue: parseFloat(item.Revenue)
            };
        }
    });
    return totals;
}

const categoryTotals = calculateTotals(data);

const categories = Object.keys(categoryTotals);
const totalSales = categories.map(category => categoryTotals[category].Total_Sales);
const revenue = categories.map(category => categoryTotals[category].Revenue);

let ctx = document.getElementById('chart2').getContext('2d');
let myChart;

function createChart() {
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Total Sales',
                    data: totalSales,
                    backgroundColor: 'rgba(255, 183, 3, 1)',
                    borderColor: 'rgba(255, 183, 3, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Revenue',
                    data: revenue,
                    backgroundColor: 'rgba(251,133,0, 1)',
                    borderColor: 'rgba(251,133,0, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales & Revenue by Categories',
                    color: 'black',
                    font: {
                        size: 14
                    }
                },
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'black'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black'
                    }
                }
            }
        }
    });
}

createChart(); // Pertama kali membuat chart

window.addEventListener('resize', () => {
    if (myChart) {
        myChart.destroy(); // Hancurkan chart sebelumnya
    }
    ctx = document.getElementById('chart2').getContext('2d');
    createChart(); // Buat chart baru dengan ukuran canvas yang diperbarui
});

// Menambahkan media queries untuk responsif pada layar mobile
if (window.matchMedia("(max-width: 768px)").matches) {
    myChart.options.responsive = true;
}
