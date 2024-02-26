function inputHandler(masks, max, event) {
    const c = event.target;
    const v = c.value.replace(/\[a-zA-Z0-9]/g, '');
    const m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
}

function applyMask(op,e) {
    const mask = {
        'tel' : ['(99) 9999-99999', '(99) 99999-9999'],
        'cnpj' : ['99.999.999/9999-99','99.999.999/9999-99'],
        'cpf' : ['999.999.999-99', '999.999.999-99'],
        'cep' : ['99999-999', '99999-999'],
        'data' : ['99/99/9999', '99/99/9999'],
        'mesAno' : ['99/9999', '99/9999'],
        'serial' : ['SSSS-SSSS-SSSS-SSSS-SS', 'SSSS-SSSS-SSSS-SSSS-SS'],
        'horario' : ['99:99:99', '99:99:99']
    }

    e.addEventListener('input', inputHandler.bind(undefined, mask[op], 14), false);
}

function generateErrorMessage(message, element) {
    const div = document.createElement('div');
    div.className = 'error-message';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 20 20');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
    path.setAttribute('d', 'M9.99996 1.66663C5.39163 1.66663 1.66663 5.39163 1.66663 9.99996C1.66663 14.6083 5.39163 18.3333 9.99996 18.3333C14.6083 18.3333 18.3333 14.6083 18.3333 9.99996C18.3333 5.39163 14.6083 1.66663 9.99996 1.66663ZM14.1666 12.9916L12.9916 14.1666L9.99996 11.175L7.00829 14.1666L5.83329 12.9916L8.82496 9.99996L5.83329 7.00829L7.00829 5.83329L9.99996 8.82496L12.9916 5.83329L14.1666 7.00829L11.175 9.99996L14.1666 12.9916Z');

    svg.appendChild(path);

    const span = document.createElement('span');
    span.className = 'error-content';
    span.textContent = message;

    div.appendChild(svg);
    div.appendChild(span);

    element.parentNode.insertBefore(div, element);
}

function generateSuccessMessage(message, element) {
    const div = document.createElement('div');
    div.className = 'success-message';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 20 20');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
    path.setAttribute('d', 'M9.99996 1.66666C5.39996 1.66666 1.66663 5.4 1.66663 10C1.66663 14.6 5.39996 18.3333 9.99996 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66666 9.99996 1.66666ZM8.33329 14.1667L4.16663 10L5.34163 8.825L8.33329 11.8083L14.6583 5.48333L15.8333 6.66666L8.33329 14.1667Z');

    svg.appendChild(path);

    const span = document.createElement('span');
    span.className = 'success-content';
    span.textContent = message;

    div.appendChild(svg);
    div.appendChild(span);

    element.parentNode.insertBefore(div, element);
}

function clearMessages() {
    document.querySelectorAll('.error-message, .success-message').forEach(element => {
        element.parentNode.removeChild(element);
    });
}

function redirectToPage(url) {
    window.location.href = url + '.html';
}

function checkSerial(event, form) {
    event.preventDefault();
    clearMessages();

    const serialInput = form.querySelector('#serial');
    const serialValue = serialInput.value;
    const expectedSerial = "4CV4-6H4F-9K57-8JH8-00";

    const submitButton = form.querySelector('button');
    
    if (serialValue === expectedSerial) {
        submitButton.textContent = 'Próximo >>';
        const message = 'Número de Série validado com sucesso!';
        serialInput.disabled = true;
        form.onsubmit = function(event) {
            event.preventDefault();
            redirectToPage('pages/company-data');
        }
        generateSuccessMessage(message, submitButton);

    } else {
        const message = 'Número de Série inválido! Corrija e tente novamente.';
        const messageTooltip = 'Se o seu número de série não estiver validando corretamente, confira se está digitando corretamente ou entre em contato com o suporte se estiver tudo certo.';
        const tooltipContent = form.querySelector('.tooltip-content');
        tooltipContent.textContent = messageTooltip;

        generateErrorMessage(message, submitButton);
    }
}

function checkCnpj(event, form) {
    event.preventDefault();
    clearMessages();

    const cnpjInput = form.querySelector('#cnpj');
    const cnpjValue = cnpjInput.value;
    const expectedCnpj = "11.111.111/1111-11";
    
    if (cnpjValue === expectedCnpj) {
        redirectToPage('connection');
    } else {
        const message = 'Usuário não cadastrado. O CNPJ deve ser o mesmo cadastrado na compra.';
        const submitButton = form.querySelector('button');

        generateErrorMessage(message, submitButton);
    }
}

function checkConnection(event, form) {
    event.preventDefault();
    clearMessages();
    
    redirectToPage('communication');
}

function checkCommunication(event, form) {
    event.preventDefault();
    clearMessages();
    
    redirectToPage('upload-file');
}

function checkFileUpload(event, form) {
    event.preventDefault();
    clearMessages();

    const fileInput = form.querySelector('#song-file');
    const fileName = fileInput.value;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const expectedExtension = "txt";
    
    if (fileExtension === expectedExtension) {
        redirectToPage('file-definitions');
    } else {
        const message = 'O arquivo deve ser um arquivo de texto (.txt).';
        const submitButton = form.querySelector('.form-button-container');

        generateErrorMessage(message, submitButton);
    }
}

function checkFileDefinitions(event, form) {
    event.preventDefault();
    clearMessages();

    const fileInput = form.querySelector('#song-file');
    const fileName = fileInput.value;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const expectedExtension = "txt";
    
    if (fileExtension === expectedExtension) {
        redirectToPage('admin/company-data');
    } else {
        const message = 'O arquivo deve ser um arquivo de texto (.txt).';
        const submitButton = form.querySelector('.form-button-container');

        generateErrorMessage(message, submitButton);
    }
}

function checkInputLength(input, length) {
    const formControlElement = input.closest('.form-control');
    const formElement = input.closest('form');
    const charCountContainerElement = formControlElement.querySelector('.char-count-container');
    const charCount = charCountContainerElement.querySelector('.char-count');
    const inputLength = input.value.length;

    charCount.textContent = inputLength;
    formControlElement.classList.toggle('input-invalid', inputLength > length);

    const buttons = formElement.querySelectorAll('.next-button');
    buttons.forEach(element => {
        element.disabled = hasInvalidInputs(formElement);
    });
}

function hasInvalidInputs(form) {
    const invalidInputs = form.querySelectorAll('.input-invalid');
    return invalidInputs.length > 0;
}

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

function checkLogin(event, form) {
    event.preventDefault();
    clearMessages();

    const loginElement = form.querySelector('#login');
    const loginValue = loginElement.value;
    const expectedLogin = "teste";
    
    if (loginValue === expectedLogin) {
        redirectToPage('/pages/admin/company-data');
    } else {
        const message = 'Usuário não cadastrado. Utilize os mesmos dados informados no site ao adquirir a plataforma.';
        const submitButton = form.querySelector('button');

        generateErrorMessage(message, submitButton);
    }
}