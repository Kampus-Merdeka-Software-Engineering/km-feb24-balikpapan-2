import data from '/Assets/Data/datalengkap.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const itemsPerPage = 8;
    let transDateSortOrder = 'default';
    let revenueSortOrder = 'default';
    let totalSalesSortOrder = 'default';
    const tableBody = document.querySelector('#dashboard-table tbody');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const transDateHeader = document.getElementById('transDateHeader');
    const revenueHeader = document.getElementById('revenueHeader');
    const totalSalesHeader = document.getElementById('totalSalesHeader');
    const firstButton = document.getElementById('firstButton');
    const lastButton = document.getElementById('lastButton');
    
    const locationFilter = document.getElementById('locationFilter');
    const machineFilter = document.getElementById('machineFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const productFilter = document.getElementById('productFilter');

    const applyFilters = (data) => {
        const location = locationFilter.value.toLowerCase();
        const machine = machineFilter.value.toLowerCase();
        const category = categoryFilter.value.toLowerCase();
        const product = productFilter.value.toLowerCase();

        return data.filter(item => 
            item.Location.toLowerCase().includes(location) &&
            item.Machine.toLowerCase().includes(machine) &&
            item.Product.toLowerCase().includes(product) &&
            (category === '' || item.Category.toLowerCase() === category)
        );
    };

    const displayPage = (page) => {
        tableBody.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        
        const filteredData = applyFilters(data);
        const paginatedItems = filteredData.slice(start, end);
    
        paginatedItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.Location}</td>
                <td>${item.Machine}</td>
                <td>${item.Category}</td>
                <td>${item.Product}</td>
                <td>${item.TransDate}</td>
                <td>${item.Type}</td>
                <td>${item.Total_Sales}</td>
                <td>${item.Revenue}</td>
            `;
            tableBody.appendChild(row);
        });
    
        prevButton.disabled = page === 1;
        nextButton.disabled = end >= filteredData.length;

        firstButton.style.display = page === 1 ? 'none' : 'inline-block';
        lastButton.style.display = end >= filteredData.length ? 'none' : 'inline-block';
    
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        const pageIndicator = document.getElementById('pageIndicator');
        pageIndicator.textContent = `Page ${page} of ${totalPages}`;
    };

    const sortData = (order, field) => {
        if (order === 'default') {
            data.sort((a, b) => {
                if (field === 'TransDate' || field === 'Total_Sales') {
                    return a[field].localeCompare(b[field]);
                } else if (field === 'Revenue') {
                    return parseFloat(a.Revenue) - parseFloat(b.Revenue);
                }
            });
        } else {
            data.sort((a, b) => {
                if (field === 'TransDate') {
                    const dateA = new Date(a.TransDate);
                    const dateB = new Date(b.TransDate);
                    return order === 'asc' ? dateA - dateB : dateB - dateA;
                } else if (field === 'Revenue') {
                    return order === 'asc' ? parseFloat(a.Revenue) - parseFloat(b.Revenue) : parseFloat(b.Revenue) - parseFloat(a.Revenue);
                } else if (field === 'Total_Sales') {
                    return order === 'asc' ? parseFloat(a.Total_Sales) - parseFloat(b.Total_Sales) : parseFloat(b.Total_Sales) - parseFloat(a.Total_Sales);
                }
            });
        }
    };

    transDateHeader.addEventListener('click', () => {
        transDateSortOrder = transDateSortOrder === 'default' ? 'asc' : transDateSortOrder === 'asc' ? 'desc' : 'default';
        sortData(transDateSortOrder, 'TransDate');
        displayPage(currentPage);
        updateHeaderStyle(transDateHeader, transDateSortOrder);
    });

    revenueHeader.addEventListener('click', () => {
        revenueSortOrder = revenueSortOrder === 'default' ? 'asc' : revenueSortOrder === 'asc' ? 'desc' : 'default';
        sortData(revenueSortOrder, 'Revenue');
        displayPage(currentPage);
        updateHeaderStyle(revenueHeader, revenueSortOrder);
    });

    totalSalesHeader.addEventListener('click', () => {
        totalSalesSortOrder = totalSalesSortOrder === 'default' ? 'asc' : totalSalesSortOrder === 'asc' ? 'desc' : 'default';
        sortData(totalSalesSortOrder, 'Total_Sales');
        displayPage(currentPage);
        updateHeaderStyle(totalSalesHeader, totalSalesSortOrder);
    });

    const updateHeaderStyle = (header, order) => {
        header.classList.remove('sort-default', 'sort-asc', 'sort-desc');
        header.classList.add(order === 'default' ? 'sort-default' : order === 'asc' ? 'sort-asc' : 'sort-desc');
    };

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage * itemsPerPage < applyFilters(data).length) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    firstButton.addEventListener('click', () => {
        currentPage = 1;
        displayPage(currentPage);
    });
    
    lastButton.addEventListener('click', () => {
        currentPage = Math.ceil(applyFilters(data).length / itemsPerPage);
        displayPage(currentPage);
    });

    locationFilter.addEventListener('input', () => displayPage(currentPage));
    machineFilter.addEventListener('input', () => displayPage(currentPage));
    categoryFilter.addEventListener('input', () => displayPage(currentPage));
    productFilter.addEventListener('input', () => displayPage(currentPage));

    transDateHeader.classList.add('sort-default');
    revenueHeader.classList.add('sort-default');
    totalSalesHeader.classList.add('sort-default');
    sortData(transDateSortOrder, 'TransDate');
    displayPage(currentPage);
});
