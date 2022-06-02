document.addEventListener('DOMContentLoaded', () => {
    let registrationButton = document.querySelector('.registration-form__button');

    registrationButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!registrationButton.classList.contains('registration-form__button_disabled')) {
            formValidation();
        }
    });

    let allInputs = document.querySelectorAll('._req');
    let countError = allInputs.length;

    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].oninput = () => {
            errorCounter(allInputs[i]);
        }
    }

    function errorCounter(input) {
        if (input.value === '') {
            countError++;
            input.classList.remove('not-empty');
            formAddError(input,'Поле должно быть заполнено');
        } else if (countError !== 0 && !input.classList.contains('not-empty')) {
            countError--;
            input.classList.add('not-empty');
            formRemoveError(input);
        }
        enableButton(countError);
    }

    function enableButton(countError) {
        if (countError === 0) {
            registrationButton.classList.remove('registration-form__button_disabled');
        } else {
            registrationButton.classList.add('registration-form__button_disabled');
        }
    }

    function formValidation() {
        let formReq = document.querySelectorAll('._req');
        let phone = document.querySelector('.registration-form__phone');
        if (phone.value !== '') {
            if (!phoneTest(phone)) {
                formAddError(phone, 'Поле заполнено некорректно');
            } else {
                formRemoveError(phone);
            }
        }

        for (let i = 0; i < formReq.length; i++) {
            let input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains('registration-form__email')) {
                if (!emailTest(input)) {
                    formAddError(input, 'Поле заполнено некорректно');
                }
            } else if (input.classList.contains('registration-form__itn')) {
                if (!onlyNumberTest(input)) {
                    formAddError(input, 'Поле должно состоять только из цифр');
                } else {
                    formAddError(input, '' +
                        'Ваша компания уже зарегистрирована, пожалуйста обратитесь' +
                        ' к менеджеру вашего аккаунта или ' +
                        '<a href="mailto:@htmlbook.ru"">напишите нам</a>')
                }
            }
        }
    }

    function formAddError(input, textError) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
        let error = input.parentElement.querySelector('.registration-form__error-text');
        error.style.display = 'block';
        error.innerHTML = textError;
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
        let error = input.parentElement.querySelector('.registration-form__error-text');
        error.style.display = 'none';
        error.innerHTML = '';
    }

    function emailTest(input) {
        return /([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*@([A-zА-я])+([0-9\-_\+\.])*([A-zА-я0-9\-_\+\.])*[\.]([A-zА-я])+/.test(input.value);
    }

    function onlyNumberTest(input) {
        return /^\d+$/.test(input.value);
    }

    function phoneTest(input) {
        return /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,10}$/im.test(input.value);
    }
});

