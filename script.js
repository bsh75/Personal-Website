// script.js

// Code to toggle the visibility of vertically expandable sections
const headerButtons = document.querySelectorAll('.header-button');

headerButtons.forEach((headerbutton) => {
    headerbutton.addEventListener('click', () => {
        const section = headerbutton.parentElement;
        const content = section.querySelector('.content');

        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            section.classList.add('expanded'); // Add the 'expanded' class
        } else {
            content.style.display = 'none';
            section.classList.remove('expanded'); // Remove the 'expanded' class
        }
    });
});

// Code to toggle the visibility of the horiontal dashboard sections (IN PROGRESS......)
const sliderTabs = document.querySelectorAll('.slider-tab')
const allSliderContents = document.querySelectorAll('.slider-content')

function selectSection(targetSection) {
    console.log("SHould be viewing: ", targetSection)
    // Hide all related sections
    for (var i = 0; i < allSliderContents.length; i++) {
        allSliderContents[i].style.display = "none";
    }
    // Show the selected section
    document.getElementById(targetSection).style.display = "flex";
}

sliderTabs.forEach(function (sliderButton) {
    let targetID = sliderButton.getAttribute('data-target')
    sliderButton.addEventListener('click', function() {
        selectSection(targetID)
    })
})


// Handle the weather
