// ===== HAMBURGER MENU FUNKCIONALITA =====
// Rozbalování a sbalování mobilního menu - toggle active class
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

// Zavření menu po kliknutí na konkrétní odkaz v navigaci
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById("navLinks").classList.remove("active");
        });
    });

    // Zavření menu po kliknutí mimo (na libovolné místo na stránce mimo menu)
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.top-bar');
        if (!nav.contains(e.target)) {
            document.getElementById("navLinks").classList.remove("active");
        }
    });
});