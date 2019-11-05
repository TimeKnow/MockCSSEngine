function getFields() {
    const firstNameField = document.getElementById('firstName');
    const lastNameField = document.getElementById('lastName');
    const addressField = document.getElementById('address');
    const birthDateField = document.getElementById('birthDate');
    const emailAddressField = document.getElementById('emailAddress');
    const phoneField = document.getElementById('phone');
    return {firstNameField, lastNameField, addressField, birthDateField, phoneField, emailAddressField};
}

function getFieldsValidators() {
    const firstNameValidatorLength = (value) => {
        return /.{3,}/g.test(value)
    };
    const firstNameValidators = [firstNameValidatorLength];
    const lastNameValidatorLength = (value) => {
        return /.{3,}/g.test(value)
    };
    const lastNameValidators = [lastNameValidatorLength];
    const addressValidatorLength = (value) => {
        return /.{3,}/g.test(value)
    };
    const addressValidatorOneDigit = (value) => {
        return /[0-9]+/g.test(value)
    };
    const addressValidatorInvalidChars = (value) => {
        return !(/(@|#|\$|%|\^|&|\*)+/g.test(value));
    };
    const addressValidators = [addressValidatorLength, addressValidatorOneDigit, addressValidatorInvalidChars];
    const birthDateFormatValidator = (value) => {
        return /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,2}/g.test(value)
    };
    const birthDateValidators = [birthDateFormatValidator];
    const phoneFormatValidator = (value) => {
        return /[0-9]{3}\-[0-9]{9}/g.test(value);
    };
    const phoneValidators = [phoneFormatValidator];
    const validateEmail = (value) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    };
    const emailValidators = [validateEmail];
    return {
        firstNameValidators,
        lastNameValidators,
        addressValidators,
        birthDateValidators,
        phoneValidators,
        emailValidators
    };
}

function getGenericForm() {
    const {firstNameField, lastNameField, addressField, birthDateField, phoneField, emailAddressField} = getFields();
    const {firstNameValidators, lastNameValidators, addressValidators, birthDateValidators, phoneValidators, emailValidators} = getFieldsValidators();
    return [
        {field: firstNameField, validators: firstNameValidators},
        {field: lastNameField, validators: lastNameValidators},
        {field: addressField, validators: addressValidators},
        {field: birthDateField, validators: birthDateValidators},
        {field: phoneField, validators: phoneValidators},
        {field: emailAddressField, validators: emailValidators},
    ];
}

function validateForm() {
    const errors = [];
    const genericFieldValidatorForm = getGenericForm();
    genericFieldValidatorForm.forEach(x => {
        const validatedField = x.validators.reduce((res, func) => {
            return res && func(x.field.value.toLowerCase());
        }, true);
        if (validatedField) {
            if (x.field.className.match(/invalid/))
                x.field.classList.remove('invalid');
        } else {
            if (!x.field.className.match(/invalid/))
                x.field.className += 'invalid';
            errors.push(x.field.name);
        }
    });
    document.getElementById('form-errors').innerText = 'Error on' + errors.reduce((x, y) => x + ' ' + y, '');
    return false;
}
