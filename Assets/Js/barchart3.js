import data from '/Assets/Data/vending_machine_sales.json' assert { type: 'json' };

const aggregatedData = data.reduce((acc, item) => {
    if (!acc[item.Location]) {
        acc[item.Location] = { "Total Sales": 0, "Revenue": 0 };
    }
    acc[item.Location]["Total Sales"] += item["Total Sales"];
    acc[item.Location]["Revenue"] += item.Revenue;
    return acc;
}, {});

const categories = Object.keys(aggregatedData);
const totalSales = categories.map(Location => aggregatedData[Location]["Total Sales"]);
const revenues = categories.map(Location => aggregatedData[Location]["Revenue"]);

console.log('Aggregated Data:', aggregatedData); // Debugging line

const ctx = document.getElementById('barchart3').getContext('2d');
if (window.barchart3 instanceof Chart) {
    window.barchart3.destroy();
}
window.barchart3 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categories,
        datasets: [
            {
                label: 'Total Sales',
                data: totalSales,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Revenue',
                data: revenues,
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
