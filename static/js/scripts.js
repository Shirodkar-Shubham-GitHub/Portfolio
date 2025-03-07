/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

document.addEventListener('DOMContentLoaded', () => {
initNavbarShrink();
initScrollSpy();
initResponsiveNavbar();
initLightbox();
loadExperience();
initContactForm();
initScrollToTopButton();
});

// Function to shrink the navbar on scroll
function navbarShrink() {
const navbarCollapsible = document.body.querySelector('#mainNav');
if (!navbarCollapsible) {
    return;
}
if (document.documentElement.scrollTop === 0) {
    navbarCollapsible.classList.remove('navbar-shrink');
} else {
    navbarCollapsible.classList.add('navbar-shrink');
}
}

// Initialize navbar shrink behavior
function initNavbarShrink() {
navbarShrink();
document.addEventListener('scroll', navbarShrink);
}

// Initialize Bootstrap ScrollSpy
function initScrollSpy() {
    const mainNav = document.body.querySelector('#mainNav');

    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });

        // Function to update navbar appearance on scroll
        function handleNavbarScroll() {
            if (window.scrollY > 50) {
                mainNav.classList.add("navbar-scrolled");
            } else {
                mainNav.classList.remove("navbar-scrolled");
            }
        }

        // Attach scroll event listener
        window.addEventListener("scroll", handleNavbarScroll);

        // Call once to set the initial state
        handleNavbarScroll();
    }
}

// Collapse responsive navbar when a nav item is clicked
function initResponsiveNavbar() {
const navbarToggler = document.body.querySelector('.navbar-toggler');
const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
);

responsiveNavItems.forEach(responsiveNavItem => {
    responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
            navbarToggler.click();
        }
    });
});
}

// Initialize SimpleLightbox for portfolio items
function initLightbox() {
new SimpleLightbox({
    elements: '#portfolio a.portfolio-box'
});
}

// Function to fetch and display Experience
// Function to fetch and display experience data
function loadExperience() {
    fetch('/api/experience/')
        .then(response => response.json())
        .then(data => renderExperienceCards(data))
        .catch(error => console.error('Error fetching experience data:', error));
}

// Function to render experience as cards
function renderExperienceCards(data) {
    const container = document.getElementById('experience-cards');
    container.innerHTML = ''; // Clear existing content

    if (data.length === 0) {
        container.innerHTML = "<p class='text-center text-muted'>No experience data available.</p>";
        return;
    }

    data.forEach(experience => {
        const card = createExperienceCard(experience);
        container.appendChild(card);
    });
}

// Function to create a single experience card
function createExperienceCard(experience) {
    const card = document.createElement('div');
    card.classList.add('col-lg-4', 'col-md-6', 'mb-4');

    card.innerHTML = `
        <div class="card experience-card h-100">
            <div class="card-body">
                <h5 class="card-title fw-bold">${experience.job_title}</h5>
                <p class="card-text text-muted">${experience.company_name} | ${formatDate(experience.start_date)} - ${formatDate(experience.end_date)}</p>
                <p class="card-text">${experience.job_description}</p>
            </div>
        </div>
    `;

    return card;
}

// Function to format date (YYYY-MM-DD to Month YYYY)
function formatDate(dateString) {
if (!dateString) return "Present";
const options = { year: "numeric", month: "short" };
return new Date(dateString).toLocaleDateString("en-US", options);
}

function initContactForm() {
document.getElementById("contact-floating-btn").addEventListener("click", openContactModal);
document.getElementById("contactForm").addEventListener("submit", submitContactForm);
}

function openContactModal() {
let contactModal = new bootstrap.Modal(document.getElementById("contactModal"));
contactModal.show();
}

function submitContactForm(event) {
event.preventDefault();

let formData = getContactFormData();

fetch("/api/contact/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
})
.then(response => response.json())
.then(data => {
    alert(data.message);
    resetContactForm();
    closeContactModal();
})
.catch(error => console.error("Error submitting contact form:", error));
}

function getContactFormData() {
return {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
};
}

function resetContactForm() {
document.getElementById("contactForm").reset();
}

function closeContactModal() {
let contactModal = bootstrap.Modal.getInstance(document.getElementById("contactModal"));
contactModal.hide();
}

function initScrollToTopButton() {
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});

scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
}
