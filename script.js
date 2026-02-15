document.addEventListener("DOMContentLoaded", function () {
    /* ================= BUTTON REDIRECT (WORKS EVERYWHERE) ================= */
    document.addEventListener('click', function (e) {
        if (e.target.closest('.reqstbtn')) {
            window.location.href = "contact.html";
        }
    });

    /* ================= PAGINATION ================= */
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

        window.goToPage = function (page) {
            currentPage = page;
            showPage(currentPage);
        }

        showPage(1);
    }
    emailjs.init("hWJDh3Bed7wbgRnoT");
    /* ================= CONTACT FORM (ONLY ON CONTACT PAGE) ================= */
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let isValid = true;

            let name = document.getElementById("name");
            let emailInput = document.getElementById("email"); // renamed
            let country = document.getElementById("country");
            let state = document.getElementById("state");
            let city = document.getElementById("city");
            let product = document.getElementById("product");
            let message = document.getElementById("message");

            document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");
            document.querySelectorAll(".form-control").forEach(el => el.classList.remove("input-error"));
            document.getElementById("successMessage").style.display = "none";

            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

            if (name.value.trim() === "") { document.getElementById("nameError").style.display = "block"; name.classList.add("input-error"); isValid = false; }
            if (emailInput.value.trim() === "" || !emailPattern.test(emailInput.value)) { document.getElementById("emailError").style.display = "block"; emailInput.classList.add("input-error"); isValid = false; }
            if (country.value.trim() === "") { document.getElementById("countryError").style.display = "block"; country.classList.add("input-error"); isValid = false; }
            if (product.value.trim() === "") { document.getElementById("productError").style.display = "block"; product.classList.add("input-error"); isValid = false; }
            if (message.value.trim() === "") { document.getElementById("messageError").style.display = "block"; message.classList.add("input-error"); isValid = false; }

            if (isValid) {
                // Show spinner and disable button
                const spinner = document.getElementById("spinner");
                const sendBtn = document.getElementById("sendBtn");
                spinner.style.display = "inline-block";
                sendBtn.disabled = true;

                let templateParams = {
                    user_name: name.value,
                    user_email: emailInput.value,
                    user_country: country.value,
                    user_state: state.value,
                    user_city: city.value,
                    user_product: product.value,
                    user_message: message.value,
                    time: new Date().toLocaleString()
                };

                emailjs.send("service_afqktgw", "template_5kdvvwo", templateParams)
                    .then(function (response) {
                        // Hide spinner and enable button
                        spinner.style.display = "none";
                        sendBtn.disabled = false;

                        form.reset();
                        document.getElementById("successMessage").style.display = "block";
                        setTimeout(() => {
                            document.getElementById("successMessage").style.display = "none";
                        }, 6000);
                        console.log("SUCCESS!", response.status, response.text);
                    }, function (error) {
                        spinner.style.display = "none"; // Hide spinner even if failed
                        sendBtn.disabled = false;
                        console.log("FAILED...", error);
                        alert("Email sending failed!");
                    });
            }


        });
    }



});
