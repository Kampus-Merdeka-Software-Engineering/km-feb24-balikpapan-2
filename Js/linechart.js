fetch('/Assets/Data/linechart.json')
  .then(response => response.json())
  .then(data => {
    const monthlyRevenue = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0
    };

    data.forEach(entry => {
      const parts = entry.TransDate.split('/');
      if (parts.length === 3) {
        const month = parseInt(parts[0], 10);  // Updated to parse month first
        const day = parseInt(parts[1], 10);    // Then parse day
        const year = parseInt(parts[2], 10);   // Finally parse year
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          const date = new Date(year, month - 1, day);
          const monthName = date.toLocaleString('en-us', { month: 'long' });
          monthlyRevenue[monthName] += parseFloat(entry.TransTotal);
        }
      }
    });

    let ctx = document.getElementById('lineChart').getContext('2d');
    let lineChart;

    function createChart() {
      lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(monthlyRevenue),
          datasets: [{
            label: 'Monthly Revenue',
            data: Object.values(monthlyRevenue),
            fill: false,
            borderColor: 'rgba(255, 183, 3, 1)',
            tension: 0.2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: 'black' // Set x-axis text color to black
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black' // Set y-axis text color to black
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'black' // Set legend text color to black
              }
            }
          }
        }
      });
    }

    createChart(); // Pertama kali membuat chart

    window.addEventListener('resize', () => {
      if (lineChart) {
        lineChart.destroy(); // Hancurkan chart sebelumnya
      }
      ctx = document.getElementById('lineChart').getContext('2d');
      createChart(); // Buat chart baru dengan ukuran canvas yang diperbarui
    });

    // Menambahkan media queries untuk responsif pada layar mobile
    if (window.matchMedia("(max-width: 768px)").matches) {
      lineChart.options.responsive = true;
    }
  });
