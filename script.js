document.addEventListener("DOMContentLoaded", function () {

    // PAGINATION (only if #pagination exists)
    const pagination = document.getElementById('pagination');
    if (pagination) {
        const productsPerPage = 6;
        const products = document.querySelectorAll('.product-card');
        const totalPages = Math.ceil(products.length / productsPerPage);
        let currentPage = 1;

        function showPage(page) {
            const start = (page - 1) * productsPerPage;
            const end = start + productsPerPage;
            products.forEach((product, index) => {
                product.style.display = (index >= start && index < end) ? 'block' : 'none';
            });
            renderPagination();
            addButtonListeners(); // Attach listeners to visible buttons
        }

        function renderPagination() {
            let html = '';
            for (let i = 1; i <= totalPages; i++) {
                html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                            <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
                         </li>`;
            }
            pagination.innerHTML = html;
        }

        window.goToPage = function(page) {
            currentPage = page;
            showPage(currentPage);
        }

        showPage(1);
    }

    // BUTTON CLICK (for both index and products page)
    function addButtonListeners() {
        const btnar = document.querySelectorAll('.reqstbtn');
        btnar.forEach((bt) => {
            bt.addEventListener('click', () => {
                window.location.href = 'contact.html'; // Redirect to contact page
            });
        });
    }

    // Always call this so buttons on index page also work
    addButtonListeners();

});
