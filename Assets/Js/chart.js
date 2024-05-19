// Mengambil data JSON
$.getJSON('vending_machine_sales.json', function(data) {
    const value = data;

    // Menghitung total revenue per bulan
    const monthlyRevenue = new Array(12).fill(0); // Inisialisasi array dengan 12 bulan, setiap bulan dimulai dari nol

    value.Revenue.forEach(revenue => {
        // Mengambil indeks bulan (dikurangi 1 karena bulan dimulai dari 1 sedangkan indeks dimulai dari 0)
        const monthIndex = parseInt(revenue.month) - 1;
        // Menambahkan nilai pendapatan ke total revenue bulan yang sesuai
        monthlyRevenue[monthIndex] += revenue.value;
    });

    // Data untuk line chart
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Sales',
            data: monthlyRevenue,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            fill: false
        }]
    };

    // Konfigurasi untuk line chart
    const lineConfig = {
        type: 'line',
        data: lineData,
        options: {}
    };

    // Inisialisasi line chart
    var lineChart = new Chart(document.getElementById('lineChart'), lineConfig);

});