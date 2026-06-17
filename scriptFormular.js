const form = document.querySelector('form');
const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');

// Objekty pro požadavky hesla
const requirementIds = {
    length: document.getElementById('req-length'),
    uppercase: document.getElementById('req-uppercase'),
    number: document.getElementById('req-number')
};

// Funkce pro zobrazení/skrytí hesla
if (showPasswordCheckbox) {
    showPasswordCheckbox.addEventListener('change', () => {
        passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
    });
}

// Funkce pro validaci hesla
const validatePassword = (value) => {
    const hasLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    
    // Aktualizace vizuálního feedbacku
    updateRequirement('length', hasLength);
    updateRequirement('uppercase', hasUppercase);
    updateRequirement('number', hasNumber);
    
    return hasLength && hasUppercase && hasNumber;
};

// Funkce pro aktualizaci požadavků
const updateRequirement = (type, isValid) => {
    const element = requirementIds[type];
    if (isValid) {
        element.classList.add('valid');
        element.classList.remove('invalid');
    } else {
        element.classList.add('invalid');
        element.classList.remove('valid');
    }
};

// Funkce pro vizuální kontrolu pole
const checkField = (field) => {
    const isEmpty = field.value === '';
    
    // Pokud je pole prázdné → odstranit obě třídy (bílá)
    if (isEmpty) {
        field.classList.remove('valid', 'invalid');
        return;
    }
    
    // Pokud pole není prázdné → ověřit validitu
    if (field.checkValidity()) {
        field.classList.add('valid');
        field.classList.remove('invalid');
    } else {
        field.classList.add('invalid');
        field.classList.remove('valid');
    }
};

// Validace při interakci
inputs.forEach(field => {
    field.addEventListener('input', () => checkField(field));
    field.addEventListener('change', () => checkField(field));
});

// Validace selectu (Důvod návštěvy) - bez vybrané hodnoty = bílá
const roomSelect = document.getElementById('room');
if (roomSelect) {
    const updateRoomSelect = () => {
        if (roomSelect.value === '') {
            roomSelect.classList.remove('valid', 'invalid');
        } else {
            roomSelect.classList.add('valid');
            roomSelect.classList.remove('invalid');
        }
    };
    
    roomSelect.addEventListener('change', updateRoomSelect);
    // Inicializace
    updateRoomSelect();
}

// Validace radio buttons (Hodnocení) - bez výběru = bílá
const radioInputs = document.querySelectorAll('input[name="priorita"]');
if (radioInputs.length > 0) {
    const radioGroup = radioInputs[0].closest('.form-group').querySelector('.radio-group');
    
    const updateRadioState = () => {
        const isAnyChecked = Array.from(radioInputs).some(r => r.checked);
        if (isAnyChecked) {
            radioGroup.classList.add('valid');
            radioGroup.classList.remove('invalid');
        } else {
            radioGroup.classList.remove('valid', 'invalid');
        }
    };
    
    radioInputs.forEach(radio => radio.addEventListener('change', updateRadioState));
    // Inicializace
    updateRadioState();
}

// Validace hesla při psaní
if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        const isEmpty = passwordInput.value === '';
        
        if (isEmpty) {
            // Prázdné pole → bez barev
            passwordInput.classList.remove('valid', 'invalid');
            // Vymazat vizuální feedback v požadavcích
            Object.values(requirementIds).forEach(req => req.classList.remove('valid', 'invalid'));
        } else {
            // Pole obsahuje text → ověřit validitu hesla
            const isValid = validatePassword(passwordInput.value);
            if (isValid) {
                passwordInput.classList.add('valid');
                passwordInput.classList.remove('invalid');
            } else {
                passwordInput.classList.add('invalid');
                passwordInput.classList.remove('valid');
            }
        }
    });
}

// Validace při odeslání
form.addEventListener('submit', (e) => {
    inputs.forEach(field => checkField(field));
    const passwordValid = passwordInput.value.length > 0 ? validatePassword(passwordInput.value) : false;
    
    if (!form.checkValidity() || !passwordValid) {
        e.preventDefault();
        if (!passwordValid) {
            alert('Heslo musí obsahovat minimálně 8 znaků, jedno velké písmeno a jednu číslici.');
        } else {
            alert('Prosím vyplňte všechna povinná pole označená hvězdičkou.');
        }
    } else {
        // Když je vše OK - přesměrovat na úvodní stránku
        e.preventDefault();
        // Smazat obsah formuláře
        form.reset();
        // Přesměrovat na úvodní stránku po 500ms (aby se zviditelnilo vymazání)
        setTimeout(() => {
            window.location.href = '../uvod.html';
        }, 500);
    }
});

// Vyčištění barev při resetu
form.addEventListener('reset', () => {
    inputs.forEach(field => {
        field.classList.remove('valid', 'invalid');
    });
    if (passwordInput) {
        passwordInput.classList.remove('valid', 'invalid');
        Object.values(requirementIds).forEach(req => req.classList.remove('valid', 'invalid'));
    }
    if (roomSelect) {
        roomSelect.classList.remove('valid', 'invalid');
    }
    if (radioInputs.length > 0) {
        const radioGroup = radioInputs[0].closest('.form-group').querySelector('.radio-group');
        if (radioGroup) {
            radioGroup.classList.remove('valid', 'invalid');
        }
    }
    if (showPasswordCheckbox) {
        showPasswordCheckbox.checked = false;
        passwordInput.type = 'password';
    }
});
