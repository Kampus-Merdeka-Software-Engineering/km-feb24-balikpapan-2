// Import data from JSON file
import data from '/Assets/Data/category.json' assert { type: 'json' };

// Function to calculate total sales and revenue
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

// Calculate total sales and revenue
const categoryTotals = calculateTotals(data);

// Format data for barchart
const categories = Object.keys(categoryTotals);
const totalSales = categories.map(category => categoryTotals[category].Total_Sales);
const revenue = categories.map(category => categoryTotals[category].Revenue);

// Draw barchart
// You can use a library like Chart.js to draw the barchart
// Here is a simple usage example with Chart.js
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
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
