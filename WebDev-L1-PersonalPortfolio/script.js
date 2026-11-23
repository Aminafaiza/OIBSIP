
/* =====================================
   1. MOBILE NAVIGATION MENU
===================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


/* =====================================
   2. CLOSE MENU AFTER CLICKING A LINK
===================================== */

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.textContent = "☰";

    });

});


/* =====================================
   3. CURRENT YEAR IN FOOTER
===================================== */

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();


/* =====================================
   4. SCROLL REVEAL ANIMATIONS
===================================== */

const revealElements = document.querySelectorAll(
    ".section-padding, .project-card, .education-card, .contact-card"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


/* =====================================
   5. ACTIVE NAVIGATION HIGHLIGHT
===================================== */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                navigationLinks.forEach(function (link) {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + currentId
                    );

                });

            }

        });

    }, {
        threshold: 0.3
    });

    sections.forEach(function (section) {

        sectionObserver.observe(section);

    });

}
