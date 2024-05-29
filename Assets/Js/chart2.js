import data from '/Assets/Data/machine.json' assert { type: 'json' };

        // Fungsi untuk menjumlahkan total sales dari semua mesin
        function calculateTotalSales(data) {
            let totalSales = {};
            data.forEach(machine => {
                const machineName = machine.Machine;
                const sales = parseInt(machine.Total_Sales);
                totalSales[machineName] = (totalSales[machineName] || 0) + sales;
            });
            return totalSales;
        }

        // Menghitung total sales
        const totalSalesData = calculateTotalSales(data);

        // Menyiapkan data untuk chart
        const labels = Object.keys(totalSalesData);
        const dataValues = Object.values(totalSalesData);

        // Membuat pie chart menggunakan Chart.js
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: dataValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                        // Tambahkan warna tambahan jika diperlukan
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                        // Tambahkan warna tambahan jika diperlukan
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                },
            }
        });