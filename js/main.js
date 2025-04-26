// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // Toggle sidebar on button click
    mobileNavToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        this.setAttribute('aria-expanded', sidebar.classList.contains('active'));
    });

    // Close sidebar when clicking outside
    mainContent.addEventListener('click', function() {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Accordion Functionality
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('h3');
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all accordion items
        accordionItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Navigation and Section Highlighting
const pageNavLinks = document.querySelectorAll('.page-nav-link');
const contentSections = document.querySelectorAll('.content-section');

const highlightNavigation = () => {
    let currentSection = '';
    
    contentSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    pageNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// Add animation classes to elements
document.querySelectorAll('.content-section').forEach(section => {
    section.classList.add('reveal');
});

document.querySelectorAll('.feature-card, .info-card').forEach(card => {
    card.classList.add('card-hover');
});

// Initialize code blocks with syntax highlighting
document.querySelectorAll('.code-block').forEach(block => {
    block.classList.add('language-bash');
});

// Add scroll animations
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Active Navigation Link Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const highlightNavLink = () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// Typewriter Effect
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Add hover effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.classList.add('hover-glow');
});

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
        const tooltipText = e.target.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('div');
        tooltipElement.classList.add('tooltip');
        tooltipElement.textContent = tooltipText;
        document.body.appendChild(tooltipElement);
        
        const rect = e.target.getBoundingClientRect();
        tooltipElement.style.top = `${rect.bottom + 5}px`;
        tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`;
    });
    
    tooltip.addEventListener('mouseleave', () => {
        const tooltipElement = document.querySelector('.tooltip');
        if (tooltipElement) {
            tooltipElement.remove();
        }
    });
}); 