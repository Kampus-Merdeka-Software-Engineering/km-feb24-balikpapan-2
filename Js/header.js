document.querySelector('.menu-toggle').addEventListener('click', function() {
    var nav = document.querySelector('header nav');
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
    }
});
