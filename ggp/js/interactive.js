/* ===================================================================
   INTERACTIVE FEATURES FOR GGP WEBSITE
   Theme Toggle, Smooth Navigation, Analytics
   ================================================================== */

// ===== THEME TOGGLE (BVVG Light/Dark Mode) =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference in localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('ggp-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem('ggp-theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem('ggp-theme', 'light');
    }
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    applyTheme(isDark ? 'light' : 'dark');
});

// Respect system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    if (!localStorage.getItem('ggp-theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);

// ===== SMOOTH SCROLL BEHAVIOR =====
// (Already handled by CSS scroll-behavior: smooth, but JS provides fallback)

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== INTERSECTION OBSERVER FOR ANIMATION (Optional Enhancement) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and elements for animation on scroll
document.querySelectorAll('.card, .marker-card, .tier-card, .phase, .channel').forEach(el => {
    observer.observe(el);
});

// ===== COPY TO CLIPBOARD FUNCTIONALITY (For code snippets if added) =====
function setupCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('code');
    
    codeBlocks.forEach(block => {
        // Only if inside a pre (actual code block, not inline)
        if (block.parentElement.tagName === 'PRE') {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = 'Copy';
            copyBtn.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                padding: 6px 12px;
                background-color: #A46447;
                color: #F3ECE3;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.85rem;
                font-weight: 600;
            `;
            
            block.parentElement.style.position = 'relative';
            block.parentElement.appendChild(copyBtn);
            
            copyBtn.addEventListener('click', () => {
                const text = block.innerText;
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                });
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', setupCodeCopyButtons);

// ===== SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS =====
if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// ===== KEYBOARD ACCESSIBILITY ENHANCEMENTS =====
// Allow tab navigation through all interactive elements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Could be used for closing modals in future versions
        console.log('Escape key pressed');
    }
});

// ===== ANALYTICS EVENT (Optional - can be connected to GA) =====
function trackEvent(eventName, eventData = {}) {
    // This function can be connected to Google Analytics or other analytics provider
    if (window.gtag) {
        gtag('event', eventName, eventData);
    } else {
        console.log(`Event: ${eventName}`, eventData);
    }
}

// Track section views
document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('button_click', {
            button_text: btn.textContent,
            button_href: btn.href || btn.getAttribute('href')
        });
    });
});

// Track theme toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    trackEvent('theme_toggle', { theme: currentTheme });
});

// ===== PAGE LOAD COMPLETE INDICATOR =====
window.addEventListener('load', () => {
    console.log('GGP Website loaded successfully');
    document.body.classList.add('loaded');
});

// ===== UTILITY: Get current active section =====
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'principle';
    
    sections.forEach(section => {
        if (section.offsetTop <= window.scrollY + 300) {
            currentSection = section.getAttribute('id');
        }
    });
    
    return currentSection;
}

// Export for external use if needed
window.GGPWebsite = {
    getCurrentSection,
    trackEvent,
    applyTheme
};
