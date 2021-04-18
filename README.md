# Accessible Bootstrap Dropdown Navigation
==========================

## The Focus
Focus refers to what element in your application (such as a field, checkbox, button, or link) currently receives input from the keyboard

## The Focusable elements in HTML

1. HTMLAnchorElement/HTMLAreaElement with an href
2. HTMLInputElement/HTMLSelectElement/HTMLTextAreaElement/HTMLButtonElement but not with disabled (IE actually gives you an error if you try), and file uploads have unusual behaviour for security reasons
3. HTMLIFrameElement (though focusing it doesn't do anything useful). Other embedding elements also, maybe, I haven't tested them all.
4. Any element with a tabindex

### Note 
1. You can make it focusable by adding a tabindex=0 attribute value to it
2. If you can't figure out where the focus on your page is as you're tabbing, open the console and type: document.activeElement. This property will return the element that currently has focus.


## Here is the HTML code for making accessible navigation menu. I have used bootstrap navigation menu for implementing the accessibility using JavaScript.

```
<div class="container">

            <!-- Static navbar -->
            <nav class="navbar navbar-expand-md navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="priceDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Pricing
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="priceDropdownMenuLink">
                                <li><a class="dropdown-item" href="#">Price Submenu 1</a></li>
                                <li><a class="dropdown-item" href="#">Price Submenu 2</a></li>
                            </ul>   
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Main component for a primary marketing message or call to action -->
            <div class="jumbotron">
                <h1>Bootstrap 4 multi dropdown navbar</h1>
                <p>This example of bootstrap 4 navigation with <a href="#">multi dropdown menu</a>.</p>
                <p>
                    <a class="btn btn-lg btn-danger" href="https://bootstrapthemes.co/demo/resource/bootstrap-4-multi-dropdown-navbar/" target="_blank" role="button">Live Demo</a>
                    <a class="btn btn-lg btn-primary" href="https://github.com/bootstrapthemesco/bootstrap-4-multi-dropdown-navbar"  target="_blank" role="button">Download from Github</a>
                    <a class="btn btn-lg btn-info" href="https://bootstrapthemes.co/demo/resource/bootstrap-4-multi-dropdown-hover-navbar/"  target="_blank" role="button">hover version</a>
                </p>
            </div>
        </div>
```

### Note
I have used the visibility: hidden styling instead of display: none. This is important for accessibility, and you can read more in the link above.

## The Hover Event by Mouse
This script is used to show dropdown menu on mouse hover

```
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
```

## The Keyboard Focus 
To move the focus on a page, use TAB to navigate "forward" and SHIFT + TAB to navigate "backward." The currently focused element is often indicated by a focus border, and various browsers style their focus rings differently. Implementing a logical tab order is an important part of providing your users with a smooth keyboard navigation experience. 

By default, focus will move as per DOM order. 

## All A Href tag Focus using Custom Style
I am adding one class to give custom focus style by adding focusBorder class.

```
var links = document.querySelectorAll('a');


links.forEach(link => {
    link.addEventListener('focus', function(e) {
        link.classList.add('activeFocus');
    });
    link.addEventListener('blur', function(e) {
        link.classList.remove('activeFocus');
    });

});
```

## The Menu Focus using Keyboard
Press TAB to move from one menu to another

```
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
```

hideAllDropdowns function is being used to hide all already opened dropdowns.