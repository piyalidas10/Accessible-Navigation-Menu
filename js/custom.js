
/*!
 * Main
 */
var menus = document.querySelectorAll('.nav-item');
console.log('menus => ', menus);
menus.forEach(menu => {
    menu.addEventListener( 'mouseover', function(e) {
        this.querySelector('.nav-link').classList.add('show');
        this.lastElementChild.classList.add('show');
    });
    menu.addEventListener( 'mouseout', function(e) {
        this.querySelector('.nav-link').classList.remove('show');
        this.lastElementChild.classList.remove('show');
    });
});

/*!
 * Accessibility
 */

var links = document.querySelectorAll('a');

links.forEach(link => {
    link.addEventListener('focus', function(e) {
        link.classList.add('activeFocus');
    });
    link.addEventListener('blur', function(e) {
        link.classList.remove('activeFocus');
    });
});

var navMenus = document.querySelectorAll('.nav-link');
var dropdownLinks = document.querySelectorAll('.nav-item.dropdown');
function hideAllDropsdowns() {
    dropdownLinks.forEach(droplink => {
        droplink.querySelector('.dropdown-toggle').classList.remove('show');
        droplink.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        droplink.lastElementChild.classList.remove('show');
    });
}

navMenus.forEach(menu => {
    menu.addEventListener('focus', function() {
        hideAllDropsdowns();
        this.classList.add('activeFocus');
        this.classList.add('show');
        this.parentElement.lastElementChild.classList.add('show');
        this.setAttribute('aria-expanded', 'true');
    });
    if (menu.nextElementSibling) {
        const subMenu = menu.nextElementSibling;
        const subMenuLinks = subMenu.querySelectorAll('a');
        const lastLinkIndex = subMenuLinks.length - 1;
        const lastLink = subMenuLinks[lastLinkIndex];

        lastLink.addEventListener('blur', function() {
            this.classList.remove('activeFocus');
            this.parentElement.parentElement.classList.remove('show');
            this.parentElement.parentElement.parentElement.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        })
    }
});

window.addEventListener('keyup', function(e) { 
    /*
    ***** ESC Key
    ***** Remove focus and hide dropdown menus
    */
   if (e.keyCode === 27) {
        hideAllDropsdowns();
        document.activeElement.classList.remove('activeFocus');
    }
});

