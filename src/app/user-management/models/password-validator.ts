import { FormGroup } from '@angular/forms';

export class PasswordValidator {
    static passwordValidator(form : FormGroup) {
        const condition = form.get('password').value !== form.get('verifyPassword').value;

        return condition ? {
            passwordsDoNotMatch: true
        } : null;
    }
}
