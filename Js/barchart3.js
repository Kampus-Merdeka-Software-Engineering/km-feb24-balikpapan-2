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

const ctx = document.getElementById('barchart3').getContext('2d');
const barchart3 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Location,
        datasets: [
            {
                label: 'Total Sales',
                data: total_Sales,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Revenue',
                data: revenue,
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                ticks: {
                    font: {
                        weight: 'bold'
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        weight: 'bold'
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
    }
});
