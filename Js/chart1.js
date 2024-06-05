import data from '/Assets/Data/location.json' assert { type: 'json' };

function calculateTotals(data) {
    let totals = {};
    data.forEach(item => {
        if (totals[item.Location]) {
            totals[item.Location].Total_Sales += parseFloat(item.Total_Sales);
            totals[item.Location].Revenue += parseFloat(item.Revenue);
        } else {
            totals[item.Location] = {
                Total_Sales: parseFloat(item.Total_Sales),
                Revenue: parseFloat(item.Revenue)
            };
        }
    });
    return totals;
}

const LocationTotals = calculateTotals(data);

const Location = Object.keys(LocationTotals);
const total_Sales = Location.map(Location => LocationTotals[Location].Total_Sales);
const revenue = Location.map(Location => LocationTotals[Location].Revenue);

let ctx = document.getElementById('barchart3').getContext('2d');
let barchart3;

function createChart() {
    barchart3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Location,
            datasets: [
                {
                    label: 'Total Sales',
                    data: total_Sales,
                    backgroundColor: 'rgba(230, 173, 188, 1)',
                    borderColor: 'rgba(230, 173, 188, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Revenue',
                    data: revenue,
                    backgroundColor: 'rgba(230, 216, 173, 1)',
                    borderColor: 'rgba(230, 216, 173, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    ticks: {
                        color: 'black' // Warna tulisan hitam
                    }
                },
                y: {
                    ticks: {
                        color: 'black' // Warna tulisan hitam
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Sales & Revenue by Location',
                    color: 'black',
                    font: {
                        size: 14
                    }
                },
                legend: {
                    labels: {
                        color: 'black' // Warna tulisan hitam
                    }
                }
            }
        }
    });
}

createChart(); // Pertama kali membuat chart

window.addEventListener('resize', () => {
    if (barchart3) {
        barchart3.destroy(); // Hancurkan chart sebelumnya
    }
    ctx = document.getElementById('barchart3').getContext('2d');
    createChart(); // Buat chart baru dengan ukuran canvas yang diperbarui
});

// Menambahkan media queries untuk responsif pada layar mobile
if (window.matchMedia("(max-width: 768px)").matches) {
    barchart3.options.responsive = true;
}
