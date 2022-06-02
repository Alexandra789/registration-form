let togglePassword = document.querySelector('.toggle-password');
let inputPassword = document.querySelector('.registration-form__password');

togglePassword.addEventListener('click', () => {
    if (togglePassword.classList.contains('hidden-password')) {
        togglePassword.classList.remove('hidden-password');
        togglePassword.classList.add('show-password');
        inputPassword.setAttribute('type', 'text');
    } else {
        togglePassword.classList.add('hidden-password');
        togglePassword.classList.remove('show-password');
        inputPassword.setAttribute('type', 'password');
    }
})