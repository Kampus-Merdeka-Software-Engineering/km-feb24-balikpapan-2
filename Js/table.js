import data from '/Assets/Data/datalengkap.json' assert { type: 'json' };

        document.addEventListener('DOMContentLoaded', () => {
            let currentPage = 1;
            const itemsPerPage = 10;
            let sortOrder = 'asc';
            const tableBody = document.querySelector('#dashboard-table tbody');
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');
            const transDateHeader = document.getElementById('transDateHeader');

            const displayPage = (page) => {
                tableBody.innerHTML = '';
                const start = (page - 1) * itemsPerPage;
                const end = page * itemsPerPage;
                const paginatedItems = data.slice(start, end);

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
                nextButton.disabled = end >= data.length;
            };

            const sortData = (order) => {
                data.sort((a, b) => {
                    const dateA = new Date(a.TransDate);
                    const dateB = new Date(b.TransDate);
                    return order === 'asc' ? dateA - dateB : dateB - dateA;
                });
            };

            transDateHeader.addEventListener('click', () => {
                sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                sortData(sortOrder);
                displayPage(currentPage);

                // Update header style to indicate sort direction
                transDateHeader.classList.toggle('sort-asc', sortOrder === 'asc');
                transDateHeader.classList.toggle('sort-desc', sortOrder === 'desc');
            });

            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayPage(currentPage);
                }
            });

            nextButton.addEventListener('click', () => {
                if (currentPage * itemsPerPage < data.length) {
                    currentPage++;
                    displayPage(currentPage);
                }
            });

            sortData(sortOrder); // Initial sort
            displayPage(currentPage);
        });