import data from '/Assets/Data/machine.json' assert { type: 'json' };

        function calculateTotalSales(data) {
            let totalSales = {};
            data.forEach(machine => {
                const machineName = machine.Machine;
                const sales = parseInt(machine.Total_Sales);
                totalSales[machineName] = (totalSales[machineName] || 0) + sales;
            });
            return totalSales;
        }

        const totalSalesData = calculateTotalSales(data);

        
        const labels = Object.keys(totalSalesData);
        const dataValues = Object.values(totalSalesData);

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: dataValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                       
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                       
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Chart Title',
                        color: 'black',
                        font: {
                            size: 14
                        }
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'black' 
                        }
                    }
                }
            }
        });