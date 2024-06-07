import data from '/Assets/Data/full_Data.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const itemsPerPage = 10;
    let transDateSortOrder = 'default';
    let revenueSortOrder = 'default';
    let totalSalesSortOrder = 'default';
    const tableBody = document.querySelector('#Data-table tbody');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const transDateHeader = document.getElementById('transDateHeader');
    const revenueHeader = document.getElementById('revenueHeader');
    const totalSalesHeader = document.getElementById('totalSalesHeader');
    const firstButton = document.getElementById('firstButton');
    const lastButton = document.getElementById('lastButton');
    const searchInput = document.getElementById('searchInput');
    const filterButton = document.getElementById('filterButton');
    const filterPopup = document.getElementById('filterPopup');
    const closeFilterPopup = document.getElementById('closeFilterPopup');
    const applyFilterButton = document.getElementById('applyFilterButton');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const machineFilter = document.getElementById('machineFilter');

    let filteredData = [...data];
    let displayedData = [...data];

    const displayPage = (page, dataToDisplay) => {
        tableBody.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        const paginatedItems = dataToDisplay.slice(start, end);
    
        paginatedItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.Location}</td>
                <td>${item.Machine}</td>
                <td>${item.Product}</td>
                <td>${item.Category}</td>
                <td>${item.TransDate}</td>
                <td>${item.Type}</td>
                <td>${item.Total_Sales}</td>
                <td>${item.Revenue}</td>
            `;
            tableBody.appendChild(row);
        });
    
        prevButton.disabled = page === 1;
        nextButton.disabled = end >= dataToDisplay.length;
    
        const totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);
        const pageIndicator = document.getElementById('pageIndicator');
        pageIndicator.textContent = `Page ${page} of ${totalPages}`;
    };

    const sortData = (order, field, dataToSort) => {
        if (order === 'default') {
            dataToSort.sort((a, b) => {
                if (field === 'TransDate' || field === 'Total_Sales') {
                    return a[field].localeCompare(b[field]);
                } else if (field === 'Revenue') {
                    return parseFloat(a.Revenue) - parseFloat(b.Revenue);
                }
            });
        } else {
            dataToSort.sort((a, b) => {
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

    const filterData = () => {
        filteredData = data.filter(item => {
            return (categoryFilter.value === '' || item.Category === categoryFilter.value) &&
                   (locationFilter.value === '' || item.Location === locationFilter.value) &&
                   (machineFilter.value === '' || item.Machine === machineFilter.value);
        });
        searchTable();
    };

    const searchTable = () => {
        const query = searchInput.value.toLowerCase();
        displayedData = filteredData.filter(item => {
            return Object.values(item).some(value =>
                value.toString().toLowerCase().includes(query)
            );
        });
        displayPage(1, displayedData);
    };

    transDateHeader.addEventListener('click', () => {
        transDateSortOrder = transDateSortOrder === 'default' ? 'asc' : transDateSortOrder === 'asc' ? 'desc' : 'default';
        sortData(transDateSortOrder, 'TransDate', displayedData);
        displayPage(currentPage, displayedData);
        updateHeaderStyle(transDateHeader, transDateSortOrder);
    });

    revenueHeader.addEventListener('click', () => {
        revenueSortOrder = revenueSortOrder === 'default' ? 'asc' : revenueSortOrder === 'asc' ? 'desc' : 'default';
        sortData(revenueSortOrder, 'Revenue', displayedData);
        displayPage(currentPage, displayedData);
        updateHeaderStyle(revenueHeader, revenueSortOrder);
    });

    totalSalesHeader.addEventListener('click', () => {
        totalSalesSortOrder = totalSalesSortOrder === 'default' ? 'asc' : totalSalesSortOrder === 'asc' ? 'desc' : 'default';
        sortData(totalSalesSortOrder, 'Total_Sales', displayedData);
        displayPage(currentPage, displayedData);
        updateHeaderStyle(totalSalesHeader, totalSalesSortOrder);
    });

    const updateHeaderStyle = (header, order) => {
        header.classList.remove('sort-default', 'sort-asc', 'sort-desc');
        header.classList.add(order === 'default' ? 'sort-default' : order === 'asc' ? 'sort-asc' : 'sort-desc');
    };

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage, displayedData);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage * itemsPerPage < displayedData.length) {
            currentPage++;
            displayPage(currentPage, displayedData);
        }
    });

    firstButton.addEventListener('click', () => {
        currentPage = 1;
        displayPage(currentPage, displayedData);
    });
    
    lastButton.addEventListener('click', () => {
        currentPage = Math.ceil(displayedData.length / itemsPerPage);
        displayPage(currentPage, displayedData);
    });

    searchInput.addEventListener('input', searchTable);

    filterButton.addEventListener('click', () => {
        filterPopup.style.display = 'block';
    });

    closeFilterPopup.addEventListener('click', () => {
        filterPopup.style.display = 'none';
    });

    applyFilterButton.addEventListener('click', () => {
        filterData();
        filterPopup.style.display = 'none';
    });

    // Populate filter dropdowns
    const populateFilterOptions = () => {
        const categories = [...new Set(data.map(item => item.Category))];
        const locations = [...new Set(data.map(item => item.Location))];
        const machines = [...new Set(data.map(item => item.Machine))];
        
        categoryFilter.innerHTML = '<option value="">All</option>';
        locationFilter.innerHTML = '<option value="">All</option>';
        machineFilter.innerHTML = '<option value="">All</option>';
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
        
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
        
        machines.forEach(machine => {
            const option = document.createElement('option');
            option.value = machine;
            option.textContent = machine;
            machineFilter.appendChild(option);
        });
    };

    populateFilterOptions();

    transDateHeader.classList.add('sort-default');
    revenueHeader.classList.add('sort-default');
    totalSalesHeader.classList.add('sort-default');
    sortData(transDateSortOrder, 'TransDate', filteredData);
    displayPage(currentPage, filteredData);
});
