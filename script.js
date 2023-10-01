// script.js
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