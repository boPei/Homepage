(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
        } else {
            navbar.classList.remove("shrink");
        }
    });

    //Top Filter for projects page
    document.querySelectorAll('#categoryFilters button').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on buttons
            document.querySelectorAll('#categoryFilters button').forEach(b => b.classList.remove('btn-danger', 'active'));
            btn.classList.add('btn-danger', 'active');

            const category = btn.getAttribute('data-category');
            const allTabs = document.querySelectorAll('#projectTabs button');

            allTabs.forEach(tab => {
                const tabCat = tab.getAttribute('data-category');
                if (category === 'all' || tabCat === category) {
                    tab.style.display = 'block';
                } else {
                    tab.style.display = 'none';
                }
            });

            // Auto-click the first visible tab after filtering
            const firstVisible = Array.from(allTabs).find(tab => tab.style.display !== 'none');
            if (firstVisible) firstVisible.click();
        });
    });

    //Publications Filter
    document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('searchInput');
            const yearFilter = document.getElementById('yearFilter');
            const typeFilter = document.getElementById('typeFilter');
            const publicationsList = document.getElementById('publications-list');
            const noResults = document.getElementById('no-results');

            function filterPublications() {
                const searchValue = searchInput.value.toLowerCase();
                const yearValue = yearFilter.value;
                const typeValue = typeFilter.value;
                let hasVisiblePublications = false;

                const yearSections = publicationsList.getElementsByClassName('publication-year');
                for (const yearSection of yearSections) {
                    let yearVisible = false;
                    const publications = yearSection.getElementsByClassName('publication-card');
                    
                    for (const pub of publications) {
                        const title = pub.querySelector('.publication-title').textContent.toLowerCase();
                        const authors = pub.querySelector('.authors').textContent.toLowerCase();
                        const venue = pub.querySelector('.venue').textContent.toLowerCase();
                        const pubType = pub.dataset.type;
                        const pubYear = yearSection.id.split('-')[1];

                        const searchMatch = title.includes(searchValue) || authors.includes(searchValue) || venue.includes(searchValue);
                        const yearMatch = yearValue === 'all' || yearValue === pubYear;
                        const typeMatch = typeValue === 'all' || typeValue === pubType;

                        if (searchMatch && yearMatch && typeMatch) {
                            pub.style.display = 'block';
                            yearVisible = true;
                        } else {
                            pub.style.display = 'none';
                        }
                    }

                    yearSection.style.display = yearVisible ? 'block' : 'none';
                    if(yearVisible) hasVisiblePublications = true;
                }
                 noResults.style.display = hasVisiblePublications ? 'none' : 'block';
            }

            // --- Event Listeners ---
            searchInput.addEventListener('keyup', filterPublications);
            yearFilter.addEventListener('change', filterPublications);
            typeFilter.addEventListener('change', filterPublications);
        });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });

    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });


    // Brand Slider
    $('.brand-slider').slick({
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 1000,
        infinite: true,
        arrows: false,
        dots: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    //Project Card
document.addEventListener('DOMContentLoaded', function() {
            // Get all filter buttons and project cards
            const filterContainer = document.getElementById('categoryFilters');
            const projectCards = document.querySelectorAll('.project-card');

            // Add click event listener to the button container (using event delegation)
            filterContainer.addEventListener('click', function(e) {
                // Ensure a button was clicked
                if (e.target.tagName !== 'BUTTON') {
                    return;
                }

                // Get the category from the clicked button's data attribute
                const selectedCategory = e.target.getAttribute('data-category');

                // --- Update Active State for Buttons ---
                // Remove 'active' class from all buttons
                filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add 'active' class to the clicked button
                e.target.classList.add('active');


                // --- Filter the Project Cards ---
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    // Check if the card should be visible
                    const shouldShow = selectedCategory === 'all' || cardCategory === selectedCategory;

                    if (shouldShow) {
                        // Show the card by removing the 'hidden-card' class
                        card.classList.remove('hidden-card');
                    } else {
                        // Hide the card by adding the 'hidden-card' class
                        card.classList.add('hidden-card');
                    }
                });
            });
        });


        



})(jQuery);

