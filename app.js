// Start Js Code
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector('.nav-menu');


/*
This method checks the selected elements for visibility. show() is run 
if an element is hidden. hide() is run if an element is visible - This creates a toggle effect. 
*/


menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle("active");
})

/* NEW SECTION
===========================================================================
*/

// JAVASCRIPT MODEL SECTION (inputs)

// Modal Items
const modal = document.getElementById("email-modal");
const openBtn = document.querySelector('.main-btn'); //main-btn
const closeBtn = document.querySelector('.close-btn'); //span

// when click on the BTN
openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// if click at the close BTN
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// if click any where away of close BTN to close it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

/* NEW SECTION
====================================================================================
*/

// Form Validation {error and valid}


//verabiles that we need : 
const form = document.getElementById('form');
const name = document.getElementById('name');
const emali = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');


//Show Error Messege
function showError(input, messege) {
    const formValdiation = input.parentElement;
    formValdiation.className = 'form-validation error';
    //target the p tag
    const errorMessge = formValdiation.querySelector('p');
    errorMessge.innerText = messege;
}


//show vield messege
function showValid(input) {
    const formValdiation = input.parentElement;
    formValdiation.className = 'form-validation valid';
}


//check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showValid(input);
        }
    });
}


//check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} Must be at least ${min}`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} Must be less than  ${max}`)
    } else {
        showValid(input);
    }
}


//check passwords match
function passwordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'passwords do not match');
    }
}


//Get fieldname
function getFieldName(input) {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}


//Event Listeners 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([name, email, password, passwordConfirm]);
    checkLength(name, 3, 30);
    checkLength(password, 8, 25);
    checkLength(passwordConfirm, 8, 25);
    passwordMatch(password, passwordConfirm);
})


/* NEW SECTION
====================================================================================
*/



// start Img Gallery:
let galleryImages = document.querySelectorAll('.services-cell');
let getLastesOpenedImg;
let WindowWidth = window.innerWidth;

galleryImages.forEach(function (image, index) {
    image.onclick = function () {
        getLastesOpenedImg = index + 1;
    
        let container = document.body;
        let newImgWindow = document.createElement('div');
        container.appendChild(newImgWindow);
        newImgWindow.setAttribute('class', 'img-window');
        newImgWindow.setAttribute('onclick', 'closeImg()');

        let newImg = image.firstElementChild.cloneNode();
        newImgWindow.appendChild(newImg);
        newImg.classList.remove('services-cell-img');
        newImg.classList.add('popup-img');
        newImg.setAttribute('id', 'current-img');

        newImg.onload = function () {
            
            let newNextBtn = document.createElement('a');
            newNextBtn.innerHTML = '<i class="fas fa-chevron-right next"></i>';
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute('class', 'img-btn-next');
            newNextBtn.setAttribute('onclick', 'changeImg(1)');

            let newPrevBtn = document.createElement('a');
            newPrevBtn.innerHTML = '<i class="fas fa-chevron-left next"></i>';
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute('class', 'img-btn-prev');
            newPrevBtn.setAttribute('onclick', 'changeImg(0)');

        }
    }
})

function closeImg() {
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-next').remove();
    document.querySelector('.img-btn-prev').remove();
}

function changeImg(change) {
    document.querySelector('#current-img').remove();

    let getImgWindow = document.querySelector('.img-window');
    let newImg = document.createElement('img');
    getImgWindow.appendChild(newImg);


    let calcNewImg;
    if (change === 1) {
        calcNewImg = getLastesOpenedImg + 1;
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    }
    else if (change === 0) {
        calcNewImg = getLastesOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute('src', 'images/img-' + calcNewImg + '.jpg');
    newImg.setAttribute('class', 'popup-img');
    newImg.setAttribute('id', 'current-img');

    getLastesOpenedImg = calcNewImg;
}