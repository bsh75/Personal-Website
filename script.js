// script.js

// Code to toggle the visibility of vertically expandable sections
const headerButtons = document.querySelectorAll('.header-button');

headerButtons.forEach((header) => {
    header.addEventListener('click', () => {
        const section = header.parentElement;
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
const summaryButtons = document.querySelectorAll('.summary-button');

summaryButtons.forEach((summaryButton) => {
    header.addEventListener('click', () => {
        const contentID = "#".concat(summaryButton.id.split("-").charAt(0), "-summary-content")
        const content = document.querySelector(contentID);

        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            section.classList.add('expanded'); // Add the 'expanded' class
        } else {
            content.style.display = 'none';
            section.classList.remove('expanded'); // Remove the 'expanded' class
        }
    });
});