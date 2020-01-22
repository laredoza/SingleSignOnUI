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
import { PasswordValidator } from '../models/password-validator';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}
@Component({selector: 'app-user-edit', templateUrl: './user-edit.component.html', styleUrls: ['./user-edit.component.scss']})
export class UserEditComponent implements OnInit {
    isLoadingResults = true;
    add = false;
    pageTitle = 'Edit User';
    user: User;
    form: FormGroup;
    errorMatcher = new CrossFieldErrorMatcher();
    messageService: MessagingService;


    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private service: UserService, messageService: MessagingService) {
        this.initForm();
        this.messageService = messageService;
    }

    initForm() {
        this.form = this.fb.group({
            userName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            emailConfirmed: new FormControl(''),
            phoneNumber: new FormControl('', Validators.required),
            phoneNumberConfirmed: new FormControl(''),
            twoFactorEnabled: new FormControl(''),
            lockoutEnd: new FormControl(''),
            lockoutEnabled: new FormControl(''),
            accessFailedCount: new FormControl(''),
        });
    }
    ngOnInit() {
        this.ConfigureMode();
        this.isLoadingResults = false;

        this.route.data.subscribe((data: {
            user: User
        }) => {
            if (data.user) {
                this.user = data.user;
                this.pageTitle = 'Manage User';
                this.updateModel();
            }

            this.isLoadingResults = false;
        });
    }

    private ConfigureMode() {
        const mode = this.route.snapshot.params.mode;

        if (mode === 'add') {
            this.add = true;
            this.pageTitle = 'Add User';
            this.user = new User();
            this.user.lockoutEnabled = true;
            this.form.addControl('password', new FormControl('', [Validators.required]));
            this.form.addControl('verifyPassword', new FormControl('', [Validators.required]));
            this.form.validator = PasswordValidator.passwordValidator;
            this.updateModel();
        } else {
            this.add = false;
            this.pageTitle = 'Edit User';
            // this.form.validator = null;
        }
    }

    updateModel() {
        this.form.patchValue({
            userName: this.user.userName,
            email: this.user.email,
            emailConfirmed: this.user.emailConfirmed,
            phoneNumber: this.user.phoneNumber,
            phoneNumberConfirmed: this.user.phoneNumberConfirmed,
            twoFactorEnabled: this.user.twoFactorEnabled,
            lockoutEnd: this.user.lockoutEnabled,
            lockoutEnabled: this.user.lockoutEnabled,
            accessFailedCount: this.user.accessFailedCount,
            password: this.user.password,
            verifyPassword: ''
        });
    }

    goBack() {
        this.router.navigate(['/users']);
        return true;
    }

    async onSubmit() {
        try {
            this.isLoadingResults = true;
            this.user.userName = this.form.value.userName;
            this.user.email = this.form.value.email;
            this.user.emailConfirmed = this.form.value.emailConfirmed ? this.form.value.emailConfirmed : false;
            this.user.phoneNumber = this.form.value.phoneNumber;
            this.user.phoneNumberConfirmed = this.form.value.phoneNumberConfirmed ? this.form.value.phoneNumberConfirmed : false;
            this.user.twoFactorEnabled = this.form.value.twoFactorEnabled ? this.form.value.twoFactorEnabled : false;
            this.user.lockOutEnd = this.form.value.lockOutEnd;
            this.user.lockoutEnabled = this.form.value.lockoutEnabled ? this.form.value.lockoutEnabled : false;
            this.user.accessFailedCount = this.form.value.accessFailedCount ? this.form.value.accessFailedCount : 0;
            this.user.password = this.form.value.password;
            if (this.add) {
                await this.service.addUser(this.user).toPromise();
                this.messageService.displayMessage('Added user ' + this.user.userName);
            } else {
                await this.service.updateUser(this.user).toPromise();
                this.messageService.displayMessage('Updated user ' + this.user.userName);
            }
            this.isLoadingResults = false;
            this.router.navigate(['/users']);
        } catch (error) {
            this.isLoadingResults = false;
            if (this.add) {
                this.messageService.displayMessage('Failed to add user ' + this.user.userName);
            } else {
                this.messageService.displayMessage('Failed to update user ' + this.user.userName);
            }
        }
    }
    getEmailErrorMessage() {
        return this.form.controls.email.hasError('required') ? 'You must enter a value' : this.form.controls.email.hasError('email') ? 'Not a valid email' : '';
    }
}
