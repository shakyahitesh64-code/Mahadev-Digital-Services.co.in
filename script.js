document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Loading Animation ---
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingText = document.querySelector('.loading-text');

    let loadProgress = 0;
    const interval = setInterval(() => {
        loadProgress += 2; // Increase progress
        loadingBar.style.width = loadProgress + '%';
        if (loadProgress >= 100) {
            clearInterval(interval);
            loadingText.textContent = 'Welcome!';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }, 500); // Small delay before hiding after 100%
        }
    }, 40); // Update every 40ms for a total of 4 seconds (40ms * 100 = 4000ms)

    // Ensure the body doesn't scroll during loading
    document.body.style.overflow = 'hidden';

    // --- 2. Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.querySelector('.nav-bar');

    menuToggle.addEventListener('click', () => {
        navBar.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times'); // Change icon to 'X'
    });

    // Close mobile nav when a link is clicked
    navBar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navBar.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- 3. Header Sticky on Scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) { // Add sticky class after scrolling 80px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 4. Smooth Scrolling for all internal links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Check if it's not a modal link before preventing default
            if (!this.classList.contains('open-modal-link') && targetId !== '#privacy' && targetId !== '#terms') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = header.offsetHeight; // Get height of sticky header
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20; // -20px for extra spacing

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 5. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150; // Pixels from bottom of viewport

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            } else {
                // Optional: remove 'active' when scrolled away (for repeated animation)
                // el.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run on page load to reveal elements already in view

    // --- 6. Statistics Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the number, the faster the count

    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        let count = 0;
        const increment = target / speed;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        updateCount();
    };

    const counterSection = document.querySelector('.stats-section');
    let countersAnimated = false;

    const observeCounters = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                counters.forEach(animateCounter);
                countersAnimated = true; // Ensure counters animate only once
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    if (counterSection) {
        observeCounters.observe(counterSection);
    }

    // --- 7. Service Detail Modal ---
    const serviceModal = document.getElementById('service-modal');
    const modalServiceTitle = document.getElementById('modal-service-title');
    const modalServiceImage = document.getElementById('modal-service-image');
    const modalServiceDescription = document.getElementById('modal-service-description');
    const modalServiceFeatures = document.getElementById('modal-service-features');
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

    const serviceDetails = {
        apps: {
            title: "Advanced Mobile Apps Development",
            image: "images/service-app-detail.jpg", // Specific image for detail modal
            description: "From concept to launch, we build scalable and secure mobile applications for iOS and Android. Our focus is on user-centric design and robust functionality.",
            features: "Key Features:<br>- Native iOS/Android Development<br>- Cross-Platform Solutions (React Native, Flutter)<br>- API Integration<br>- UI/UX Design<br>- Performance Optimization"
        },
        websites: {
            title: "Cutting-Edge Web Development",
            image: "images/service-web-detail.jpg",
            description: "We create stunning, responsive, and high-performance websites. Whether it's a dynamic e-commerce platform or a sophisticated corporate site, we deliver excellence.",
            features: "Key Features:<br>- Custom Website Design<br>- E-commerce Development (Shopify, WooCommerce)<br>- CMS Development (WordPress, Joomla)<br>- SEO Optimization<br>- Backend & Frontend Development"
        },
        'business-cards': {
            title: "Professional Business Card Design",
            image: "images/service-business-card-detail.jpg",
            description: "First impressions matter. Our custom business card designs are crafted to reflect your brand's professionalism and creativity.",
            features: "Key Features:<br>- Unique & Creative Designs<br>- High-Resolution Print-Ready Files<br>- Branding Consistency<br>- Various Style Options (Minimalist, Corporate, Artistic)"
        },
        resume: {
            title: "ATS-Friendly Professional Resume Writing",
            image: "images/service-resume-detail.jpg",
            description: "Stand out in the job market with a meticulously crafted, ATS-optimized resume that highlights your strengths and achievements.",
            features: "Key Features:<br>- ATS Keyword Optimization<br>- Modern & Clean Layouts<br>- Targeted Content Strategy<br>- Multiple Format Delivery (PDF, Word)"
        },
        'business-ads': {
            title: "Strategic Business Ads Campaign",
            image: "images/service-business-ads-detail.jpg",
            description: "Reach your target audience effectively with our data-driven business ad campaigns across various platforms, designed for maximum ROI.",
            features: "Key Features:<br>- Market Research & Audience Targeting<br>- Compelling Ad Copy & Creatives<br>- A/B Testing & Optimization<br>- Performance Tracking & Reporting"
        },
        'facebook-ads': {
            title: "Targeted Facebook Ad Campaigns",
            image: "images/service-facebook-ads-detail.jpg",
            description: "Leverage the power of Facebook's vast audience with highly targeted ad campaigns that drive engagement, leads, and sales.",
            features: "Key Features:<br>- Audience Segmentation<br>- Campaign Strategy & Setup<br>- Ad Creative Design<br>- Retargeting Campaigns<br>- Detailed Analytics"
        },
        'instagram-ads': {
            title: "Visually Engaging Instagram Ad Campaigns",
            image: "images/service-instagram-ads-detail.jpg",
            description: "Captivate your audience with visually stunning Instagram ads that build brand awareness and convert followers into customers.",
            features: "Key Features:<br>- Visual Content Creation<br>- Story & Reel Ad Optimization<br>- Influencer Marketing Integration<br>- Hashtag Strategy<br>- Engagement Tracking"
        },
        'digital-forms': {
            title: "Streamlined Digital Forms & Surveys",
            image: "images/service-digital-forms-detail.jpg",
            description: "Optimize your data collection process with custom, secure, and user-friendly digital forms for various business needs.",
            features: "Key Features:<br>- Custom Form Design<br>- Data Validation & Security<br>- Integration with CRM/Databases<br>- Survey & Feedback Forms<br>- Lead Generation Forms"
        },
        'logo-design': {
            title: "Unique Business Logo Design",
            image: "images/service-logo-design-detail.jpg",
            description: "Create a strong brand identity with a unique and memorable logo that perfectly represents your business's values and vision.",
            features: "Key Features:<br>- Multiple Concept Designs<br>- Vector & Raster Files<br>- Brand Style Guide<br>- Unlimited Revisions (within scope)"
        },
        'video-editing': {
            title: "High-Impact Video Editing",
            image: "images/service-video-editing-detail.jpg",
            description: "From promotional videos to social media content, we transform raw footage into compelling visual stories that captivate your audience.",
            features: "Key Features:<br>- Corporate Videos<br>- Social Media Content (Reels, Shorts)<br>- Explainer Videos<br>- Motion Graphics & VFX<br>- Color Grading & Sound Design"
        }
    };

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceType = button.dataset.service;
            const details = serviceDetails[serviceType];

            if (details) {
                modalServiceTitle.textContent = details.title;
                modalServiceImage.src = details.image;
                modalServiceImage.alt = details.title;
                modalServiceDescription.innerHTML = details.description; // Use innerHTML for <br> tags
                modalServiceFeatures.innerHTML = details.features;
                openModal(serviceModal);
            }
        });
    });

    // --- 8. Portfolio Detail Modal ---
    const portfolioModal = document.getElementById('portfolio-modal');
    const portfolioModalImage = document.getElementById('portfolio-modal-image');
    const portfolioModalTitle = document.getElementById('portfolio-modal-title');
    const portfolioModalDescription = document.getElementById('portfolio-modal-description');
    const portfolioModalCategory = document.getElementById('portfolio-modal-category');
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');

    const portfolioDetails = {
        p1: {
            title: "E-commerce Redesign for Fashion Nova",
            image: "images/portfolio-web-1.jpg",
            description: "A complete overhaul of an existing e-commerce platform, focusing on modern aesthetics, mobile responsiveness, and a streamlined checkout process. Resulted in a 30% increase in conversion rates.",
            category: "Websites"
        },
        p2: {
            title: "Fitness Tracking App: FitLife Mobile",
            image: "images/portfolio-app-1.jpg",
            description: "Developed a cross-platform mobile application for fitness enthusiasts, featuring personalized workout plans, nutrition tracking, and social sharing capabilities. Integrated with wearable devices.",
            category: "Mobile Apps"
        },
        p3: {
            title: "Brand Identity: 'The Spice Route' Restaurant",
            image: "images/portfolio-logo-1.jpg",
            description: "Crafted a comprehensive brand identity including a distinctive logo, color palette, typography, and applications across menus, signage, and marketing materials for a new fusion restaurant.",
            category: "Design & Branding"
        },
        p4: {
            title: "Digital Ad Campaign: 'SmartHome Solutions'",
            image: "images/portfolio-ads-1.jpg",
            description: "Designed and managed a highly successful Facebook and Instagram ad campaign to generate leads for smart home installation services. Achieved a 25% increase in qualified leads over 3 months.",
            category: "Digital Ads"
        },
        p5: {
            title: "Corporate Website for 'Global Innovations'",
            image: "images/portfolio-web-2.jpg",
            description: "Developed a secure and informative corporate website for a multinational consulting firm, showcasing their services, team, and client testimonials. Optimized for global reach and accessibility.",
            category: "Websites"
        },
        p6: {
            title: "Promotional Video for 'Eco-Friendly Tech'",
            image: "images/portfolio-video-1.jpg",
            description: "Produced a captivating 60-second animated explainer video to introduce a new line of sustainable tech products. Used vibrant motion graphics to convey complex concepts simply.",
            category: "Video Editing"
        }
        // Add more portfolio items as needed
    };

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.id;
            const details = portfolioDetails[projectId];

            if (details) {
                portfolioModalImage.src = details.image;
                portfolioModalImage.alt = details.title;
                portfolioModalTitle.textContent = details.title;
                portfolioModalDescription.textContent = details.description;
                portfolioModalCategory.textContent = `Category: ${details.category}`;
                openModal(portfolioModal);
            }
        });
    });


    // --- 9. Portfolio Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' to clicked button
            button.classList.add('active');

            const filter = button.dataset.filter;

            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block'; // Or 'flex' / 'grid-item' depending on your grid setup
                    item.classList.add('reveal'); // Re-add reveal if needed for re-animation
                    item.classList.add('active'); // Re-animate immediately
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
            // Re-run reveal on filtered items to animate them in smoothly
            revealOnScroll();
        });
    });

    // --- 10. Testimonials Slider ---
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonialIndex = 0;
    let testimonialInterval;

    function createTestimonialDots() {
        testimonialItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = index;
            dot.addEventListener('click', () => {
                goToTestimonialSlide(index);
                resetTestimonialAutoSlide();
            });
            testimonialDotsContainer.appendChild(dot);
        });
    }

    function updateTestimonialSlider() {
        const offset = -currentTestimonialIndex * 100;
        testimonialSlider.style.transform = `translateX(${offset}%)`;

        document.querySelectorAll('.testimonial-dots .dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonialIndex);
        });
    }

    function goToTestimonialSlide(index) {
        currentTestimonialIndex = index;
        updateTestimonialSlider();
    }

    function nextTestimonialSlide() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        updateTestimonialSlider();
    }

    function startTestimonialAutoSlide() {
        testimonialInterval = setInterval(nextTestimonialSlide, 7000); // Auto slide every 7 seconds
    }

    function resetTestimonialAutoSlide() {
        clearInterval(testimonialInterval);
        startTestimonialAutoSlide();
    }

    if (testimonialItems.length > 0) {
        createTestimonialDots();
        updateTestimonialSlider();
        startTestimonialAutoSlide();
    }

    // --- 11. Generic Modal Handling (for Privacy, Terms, Service Detail, Portfolio Detail) ---
    const allModals = document.querySelectorAll('.modal-section');
    const allCloseButtons = document.querySelectorAll('.modal-section .close-button');
    const openModalLinks = document.querySelectorAll('.open-modal-link'); // For Privacy/Terms in footer

    function openModal(modalElement) {
        modalElement.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling body when modal is open
    }

    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners for opening modals via data-modal attribute
    openModalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = e.target.dataset.modal + '-modal'; // e.g., 'privacy-modal'
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                openModal(targetModal);
            }
        });
    });

    // Event listeners for closing modals
    allCloseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modalToClose = e.target.closest('.modal-section');
            if (modalToClose) {
                closeModal(modalToClose);
            }
        });
    });

    // Close modal when clicking outside of the content
    allModals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Check if the click was on the modal background itself
                closeModal(modal);
            }
        });
    });

    // --- 12. Contact Form Client-Side Validation (Basic Example) ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                displayFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                displayFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // If validation passes, you would typically send data to a server here.
            // For this client-side only example, we'll simulate success.
            displayFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset(); // Clear the form
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function displayFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = 'form-message ' + type;
        formMessage.style.opacity = 1;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.opacity = 0;
        }, 5000);
    }
});