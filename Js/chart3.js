
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

const ctx = document.getElementById('chart2').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categories,
        datasets: [
            {
                label: 'Total Sales',
                data: totalSales,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Revenue',
                data: revenue,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        plugins: {
            title: {
              display: true,
              text: 'Chart Title',
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}
    }
});
