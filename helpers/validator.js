const { check } = require('express-validator');

const validator = {
    signupValidation: () => {
        var validation = [
            // checks if `fName` is not empty
            check('firstname', 'First name should not be empty.').notEmpty(),

            // checks if lName is not empty
            check('lastname', 'Last name should not be empty.').notEmpty(),

            // checks if `idNum` contains exactly 8 digits
            check(
                'reg_username',
                'Username should contain 8 characters.'
            ).isLength({
                min: 8,
            }),

            check('email', 'Email name should not be empty.').notEmpty(),

            // checks if `pw` contains at least 8 characters
            check(
                'reg_password',
                'Passwords should contain at least 8 characters.'
            ).isLength({ min: 8 }),
        ];
        return validation;
    },
};

module.exports = validator;
