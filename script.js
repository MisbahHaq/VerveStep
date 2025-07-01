
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});



// Fade in effect
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
});

// Fade out effect on link click
document.querySelectorAll('a[href]').forEach(link => {
    if (
        link.getAttribute('href').startsWith('#') ||
        link.getAttribute('target') === '_blank'
    ) return; // Skip anchor links or new tab links

    link.addEventListener("click", function (e) {
        e.preventDefault();
        const url = this.href;
        document.body.classList.remove("loaded");
        setTimeout(() => {
            window.location.href = url;
        }, 300); // Match transition duration
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in");

    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -20px 0px",
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});


const images = document.querySelectorAll('.hover-img');

images.forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');

    img.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
    });

    img.addEventListener('mouseleave', () => {
        img.src = originalSrc;
    });
});

