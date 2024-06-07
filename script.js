//menu-toggle

document.querySelector('.menu-toggle').addEventListener('click', function() {
    var nav = document.querySelector('header nav');
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
    }
});

// scroll effect on the navbar

var navbar = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

//code about making linecharts

fetch('/Assets/Data/transTotal_Data.json')
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

//code about making Horizontal Bar Chart

async function fetchData2() {
    try {
        const response2 = await fetch('/Assets/Data/location_Data.json');
        const data2 = await response2.json();
        return data2;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

fetchData2().then(data2 => {
    function calculateTotals(data2) {
        let totals = {};
        data2.forEach(item => {
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

    const locationTotals = calculateTotals(data2);

    const locations = Object.keys(locationTotals);
    const totalSales = locations.map(location => locationTotals[location].Total_Sales);
    const revenue = locations.map(location => locationTotals[location].Revenue);

    let ctx = document.getElementById('barchart3').getContext('2d');
    let barchart3;

    function createChart() {
        barchart3 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: locations,
                datasets: [
                    {
                        label: 'Total Sales',
                        data: totalSales,
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
                responsive: true,
                maintainAspectRatio: false,
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
});
//code about making Bar Chart

async function fetchdata3() {
    const response3 = await fetch('/Assets/Data/category_Data.json');
    const data3 = await response3.json();
    return data3;
}

function calculateTotals(data3) {
    let totals = {};
    data3.forEach(item => {
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

function createChart(categories, totalSales, revenue) {
    let ctx = document.getElementById('chart2').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Total Sales',
                    data: totalSales,
                    backgroundColor: 'rgba(255, 183, 3, 1)',
                    borderColor: 'rgba(255, 183, 3, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Revenue',
                    data: revenue,
                    backgroundColor: 'rgba(251,133,0, 1)',
                    borderColor: 'rgba(251,133,0, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales & Revenue by Categories',
                    color: 'black',
                    font: {
                        size: 14
                    }
                },
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'black'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black'
                    }
                }
            }
        }
    });

    // Handle resizing
    window.addEventListener('resize', () => {
        if (myChart) {
            myChart.destroy(); // Destroy previous chart
        }
        ctx = document.getElementById('chart2').getContext('2d');
        createChart(categories, totalSales, revenue); // Create new chart with updated canvas size
    });
}

fetchdata3().then(data3 => {
    const categoryTotals = calculateTotals(data3);
    const categories = Object.keys(categoryTotals);
    const totalSales = categories.map(category => categoryTotals[category].Total_Sales);
    const revenue = categories.map(category => categoryTotals[category].Revenue);

    createChart(categories, totalSales, revenue);
});

//code about making Pie Chart

async function fetchdata4() {
    const response4 = await fetch('/Assets/Data/machine_Data.json');
    const data4 = await response4.json();
    return data4;
}

function calculateTotalSales(data4) {
    let totalSales = {};
    data4.forEach(machine => {
        const machineName = machine.Machine;
        const sales = parseInt(machine.Total_Sales);
        totalSales[machineName] = (totalSales[machineName] || 0) + sales;
    });
    return totalSales;
}

function createChartPie(labels, data4Values) {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data4Values,
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
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Machine Profitability',
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

    // Handle resizing
    window.addEventListener('resize', () => {
        if (myChart) {
            myChart.destroy(); // Destroy previous chart
        }
        ctx = document.getElementById('myChart').getContext('2d');
        createChartPie(labels, data4Values); // Create new chart with updated canvas size
    });
}

fetchdata4().then(data4 => {
    const totalSalesdata4 = calculateTotalSales(data4);
    const labels = Object.keys(totalSalesdata4);
    const data4Values = Object.values(totalSalesdata4);

    createChartPie(labels, data4Values);
});

// Menambahkan media queries untuk responsif pada layar mobile
if (window.matchMedia("(max-width: 768px)").matches) {
    myChart.options.responsive = true;
}


//code about making Table


// code about making OurTeam

document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.col-4');
    const infoBox = document.getElementById('info-box');
    const infoText1 = document.getElementById('info-text-1');
    const infoText2 = document.getElementById('info-text-2');
    const infoText3 = document.getElementById('info-text-3');
    const infoText4 = document.getElementById('info-text-4');
    const closeBtn = document.getElementById('close-btn');

    const memberInfo = {
        1: ['Haikal Muhammad Akbar', 'Universitas Indonesia', 'Team Leader', '@bay_haikal'],
        2: ['Cindi Karolin', 'Universitas Sriwijaya', 'Quality Assurance', '@cindikrlinn'],
        3: ['Kholid Fauzy', 'Universitas Amikom Yogyakarta', 'Chart Development', '@kholid_fauzy'],
        4: ['Rini Kurniasih', 'Universitas Islam Bandung', 'Pitch Deck', '@k.rrin_'],
        5: ['Hikma Abdia', 'Universitas Hasanudin', 'Pitch Deck' , '@_abdiaaa'],
        6: ['Irgy Dwi V', 'Universitas Tanjungpura', 'Deployment', '@irgy_dr'],
        7: ['Made Shanta Raima W', 'Universitas Udayana', 'Form Validation', '@shanta.raima14'],
        8: ['Mufidatul Izza', '', '', ''],
        9: ['Kevin Kurnia', '', '', ''],
        10: ['Nova Enjelina P', 'Universitas Pembangunan Nasional Veteran Jakarta', 'Front End', '@novanjln'],
        11: ['Amelia Putri Rosalina', '', '', ''],
        12: ['Eolia Gita Afriyani', 'Universitas Jember', 'Pitch Deck', '@eo_gita'],
        13: ['Ainur Rokhimah', '', '', '']
    };

    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberId = this.getAttribute('data-team');
            infoText1.textContent = memberInfo[memberId][0];
            infoText2.textContent = memberInfo[memberId][1];
            infoText3.textContent = memberInfo[memberId][2];
            infoText4.textContent = memberInfo[memberId][3]
            infoBox.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        infoBox.style.display = 'none';
    });
});

// code about making function form
function validateForm() {
    const name = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const message = document.getElementById('Message').value;

    if (name === '' || email === '' || message === '') {
        document.getElementById('errorModalall').style.display = 'block';
        return false;
    }

    if (!validateEmail(email)) {
        document.getElementById('errorModalemail').style.display = 'block';
        return false;
    }

    if (name.length < 5) {
        document.getElementById('errorModalname').style.display = 'block';
        return false;
    }

    document.getElementById('confirmModal').style.display = 'block';
    return false;  
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

function closeErrorModal1() {
    document.getElementById('errorModalall').style.display = 'none';
}

function closeErrorModal2() {
    document.getElementById('errorModalemail').style.display = 'none';
}

function closeErrorModal4() {
    document.getElementById('errorModalname').style.display = 'none';
}

function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

function submitForm() {

    document.getElementById('confirmModal').style.display = 'none';
    document.getElementById('successModal').style.display = 'block';

    setTimeout(() => {
        location.reload();
    }, 2000);
}
