// Amplify Labs AI - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
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
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.card, .service-card, .blog-post').forEach(el => {
        observer.observe(el);
    });
    
    // Contact form handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Reading time calculator for blog posts
    function calculateReadingTime(text) {
        const wordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
    }
    
    // Update reading times on blog pages
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
        const readingTime = calculateReadingTime(articleContent.textContent);
        const readTimeElements = document.querySelectorAll('.read-time');
        readTimeElements.forEach(element => {
            element.textContent = `${readingTime} min read`;
        });
    }
    
    // Add copy-to-clipboard functionality for code blocks
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        button.style.cssText = 'position: absolute; top: 10px; right: 10px; background: var(--accent-blue); color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;';
        
        const pre = block.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
    
    // Add table of contents for long blog posts
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');
    if (headings.length > 3) {
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents';
        tocContainer.innerHTML = '<h4>Table of Contents</h4><ul></ul>';
        tocContainer.style.cssText = 'background: var(--secondary-bg); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; border: 1px solid var(--border-color);';
        
        const tocList = tocContainer.querySelector('ul');
        tocList.style.cssText = 'list-style: none; padding-left: 0;';
        
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            const li = document.createElement('li');
            li.style.cssText = 'margin-bottom: 0.5rem; padding-left: ' + (heading.tagName === 'H3' ? '1rem' : '0');
            
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            link.style.cssText = 'color: var(--text-secondary); text-decoration: none; transition: color 0.3s;';
            link.addEventListener('mouseenter', () => link.style.color = 'var(--accent-blue)');
            link.addEventListener('mouseleave', () => link.style.color = 'var(--text-secondary)');
            
            li.appendChild(link);
            tocList.appendChild(li);
        });
        
        const firstParagraph = document.querySelector('.article-content p');
        if (firstParagraph) {
            firstParagraph.parentNode.insertBefore(tocContainer, firstParagraph);
        }
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}