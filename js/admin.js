function openMenuMobile() {
    const menu = document.getElementById('menu-admin');
    menu.setAttribute('data-mobile', 'show');
    const backdrop = document.getElementById('backdrop-overlay');
    backdrop.classList.add('active');
    const main = document.querySelector('main');
    main.classList.add('open');
    const footer = document.querySelector('footer');
    footer.classList.add('open');
}

function closeMenuMobile() {
    const menu = document.getElementById('menu-admin');
    menu.setAttribute('data-mobile', 'hidden');
    const backdrop = document.getElementById('backdrop-overlay');
    backdrop.classList.remove('active');
    const main = document.querySelector('main');
    main.classList.remove('open');
    const footer = document.querySelector('footer');
    footer.classList.remove('open');
}

function checkCnpjAdmin(event, form) {
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

function checkConnectionAdmin(event, form) {
    event.preventDefault();
    clearMessages();
    
    redirectToPage('communication');
}

function checkCommunicationAdmin(event, form) {
    event.preventDefault();
    clearMessages();
    
    redirectToPage('file-definitions');
}