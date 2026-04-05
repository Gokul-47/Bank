// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// jQuery Ready
$(document).ready(function() {
    
    // Hero Slider - Owl Carousel
    $('.hero-slider').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        nav: true,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>']
    });

    // Offers Carousel - Owl Carousel
    $('.offers-carousel').owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // Testimonials Slider - Slick
    $('.testimonials-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: '<button class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Counter Animation
    $('.counter').each(function() {
        $(this).appear(function() {
            var $this = $(this);
            var countTo = $this.attr('data-target');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum).toLocaleString());
                },
                complete: function() {
                    $this.text(this.countNum.toLocaleString());
                }
            });
        });
    });

    // Loan Amount Slider - noUiSlider
    var loanAmountSlider = document.getElementById('loan-amount-slider');
    if (loanAmountSlider) {
        noUiSlider.create(loanAmountSlider, {
            start: 500000,
            connect: [true, false],
            range: {
                'min': 100000,
                'max': 5000000
            },
            format: wNumb({
                decimals: 0,
                prefix: '₹'
            })
        });

        loanAmountSlider.noUiSlider.on('update', function(values) {
            document.getElementById('loan-amount-value').innerHTML = values[0];
            calculateEMI();
        });
    }

    // Tenure Slider - noUiSlider
    var tenureSlider = document.getElementById('tenure-slider');
    if (tenureSlider) {
        noUiSlider.create(tenureSlider, {
            start: 5,
            connect: [true, false],
            range: {
                'min': 1,
                'max': 30
            },
            step: 1,
            format: wNumb({
                decimals: 0,
                suffix: ' Years'
            })
        });

        tenureSlider.noUiSlider.on('update', function(values) {
            document.getElementById('tenure-value').innerHTML = values[0];
            calculateEMI();
        });
    }

    // Calculate EMI
    function calculateEMI() {
        if (loanAmountSlider && tenureSlider) {
            var amount = loanAmountSlider.noUiSlider.get();
            var tenure = tenureSlider.noUiSlider.get();
            
            // Remove currency symbols and parse
            amount = parseFloat(amount.replace('₹', '').replace(/,/g, ''));
            tenure = parseFloat(tenure.replace(' Years', ''));
            
            var rate = 8.5 / 12 / 100; // 8.5% annual rate
            var months = tenure * 12;
            
            var emi = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
            
            document.getElementById('emi-result').innerHTML = '₹' + Math.round(emi).toLocaleString();
        }
    }

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Section Animations with ScrollTrigger
    gsap.utils.toArray('.service-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.feature-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
    });

    // Stats Counter Animation with GSAP
    gsap.utils.toArray('.stat-item').forEach(stat => {
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            scale: 0,
            rotation: 360,
            opacity: 0
        });
    });

    // Footer Animation
    gsap.from('.footer', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 100,
        opacity: 0
    });

    // Parallax Effect with Jarallax
    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.5
    });

    // Magnific Popup for Images
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });

    // Form Validation
    $('.contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Name must be at least 2 characters"
            },
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email"
            },
            phone: {
                required: "Please enter your phone number",
                digits: "Please enter only digits",
                minlength: "Phone number must be 10 digits",
                maxlength: "Phone number must be 10 digits"
            },
            message: {
                required: "Please enter a message",
                minlength: "Message must be at least 10 characters"
            }
        },
        submitHandler: function(form) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });

    // Bootstrap Select
    $('.selectpicker').selectpicker();

    // Smooth Scroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 1000);
        }
    });

    // Sticky Header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('sticky');
        } else {
            $('.header').removeClass('sticky');
        }
    });

    // Circular Text Animation
    if (typeof CircleType !== 'undefined') {
        const circleType = new CircleType(document.getElementById('curved-text'));
        circleType.radius(200);
    }

    // Lettering Animation
    if ($.fn.lettering) {
        $('.fancy-text').lettering();
    }

    // Image Loaded - Isotope
    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
        var $grid = $('.grid').imagesLoaded(function() {
            $grid.isotope({
                itemSelector: '.grid-item',
                layoutMode: 'masonry'
            });
        });

        // Filter items on button click
        $('.filter-button-group').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
            $('.filter-button-group button').removeClass('active');
            $(this).addClass('active');
        });
    }

    // Preloader
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    // Mobile Menu Close on Click
    $('.navbar-nav a').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Add to Cart Animation
    $('.btn-add-cart').on('click', function() {
        $(this).addClass('animate__animated animate__tada');
        setTimeout(() => {
            $(this).removeClass('animate__animated animate__tada');
        }, 1000);
    });

    // Tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Popover
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Back to Top Button
    var backToTop = $('<button class="back-to-top"><i class="fas fa-arrow-up"></i></button>');
    $('body').append(backToTop);

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // Add custom styles for back to top button
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: none;
                z-index: 999;
                box-shadow: 0 4px 15px rgba(255,107,53,0.4);
                transition: all 0.3s;
            }
            .back-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(255,107,53,0.6);
            }
        `)
        .appendTo('head');

});

// Page Load Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Store previous page for 404 back button
if (document.referrer && !document.referrer.includes('404.html')) {
    sessionStorage.setItem('previousPage', document.referrer);
}