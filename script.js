// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Contact form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    let text = `Hello Shokat Ali Motors!\n\n`;
    text += `Name: ${name}\n`;
    text += `Phone: ${phone}\n`;
    if (interest) text += `Interest: ${interest}\n`;
    if (message) text += `Message: ${message}`;
    
    const whatsappUrl = `https://wa.me/923063178718?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
    alert('Thank you! You will be redirected to WhatsApp.');
});
