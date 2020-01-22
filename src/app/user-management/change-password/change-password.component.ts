import {Component, OnInit} from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormGroupDirective,
    NgForm
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';
import {ErrorStateMatcher} from '@angular/material';
import {UserService} from '../user.service';
import {MessagingService} from 'src/app/services/messaging.service';
import {PasswordValidator} from '../models/password-validator';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control : FormControl | null, form : FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({selector: 'app-change-password', templateUrl: './change-password.component.html', styleUrls: ['./change-password.component.scss']})
export class ChangePasswordComponent implements OnInit {
    isLoadingResults = true;
    add = false;
    pageTitle = 'Edit User';
    user : User;
    form : FormGroup;
    errorMatcher = new CrossFieldErrorMatcher();
    messageService : MessagingService;


    constructor(private route : ActivatedRoute, private router : Router, private fb : FormBuilder, private service : UserService, messageService : MessagingService) {
        this.initForm();
        this.messageService = messageService;
    }

    initForm() {
        this.form = this.fb.group({
            password: new FormControl('', [Validators.required]),
            verifyPassword: new FormControl('', [Validators.required])
        }, {validator: PasswordValidator.passwordValidator});
    }

    ngOnInit() {
        this.pageTitle = 'Change Password';
        this.isLoadingResults = false;

        this.route.data.subscribe((data : {
            user: User
        }) => {
            if (data.user) {
                this.user = data.user;
                this.updateModel();
            }

            this.isLoadingResults = false;
        });
    }

    updateModel() {
        this.form.patchValue({password: this.user.password, verifyPassword: ''});
    }

    goBack() {
        this.router.navigate(['/users']);
        return true;
    }

    async onSubmit() {
        try {
            this.isLoadingResults = true;
            this.user.password = this.form.value.password;
            await this.service.changeUserPassword(this.user).toPromise();
            this.messageService.displayMessage('Changed password for user ' + this.user.userName);
            this.isLoadingResults = false;
            this.router.navigate(['/users']);
        } catch (error) {
            this.isLoadingResults = false;
            this.messageService.displayMessage('Failed to change password for user ' + this.user.userName);
        }
    }
}
