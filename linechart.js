fetch('vending_machine_sales.json')
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
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          const date = new Date(year, month - 1, day); 
          const monthName = date.toLocaleString('en-us', { month: 'long' });
          monthlyRevenue[monthName] += parseFloat(entry.Revenue);
        }
      }
    });


    const ctx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(monthlyRevenue),
        datasets: [{
          label: 'Monthly Revenue',
          data: Object.values(monthlyRevenue),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });