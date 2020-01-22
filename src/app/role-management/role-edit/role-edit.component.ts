import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {MessagingService} from 'src/app/services/messaging.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from '../models/role';
import {RoleService} from '../role.service';

@Component({selector: 'app-role-edit', templateUrl: './role-edit.component.html', styleUrls: ['./role-edit.component.scss']})
export class RoleEditComponent implements OnInit {
    isLoadingResults = true;
    add = false;
    pageTitle = 'Edit User';
    role : Role;
    form : FormGroup;
    messageService : MessagingService;


    constructor(private route : ActivatedRoute, private router : Router, private fb : FormBuilder, private service : RoleService, messageService : MessagingService) {
        this.initForm();
        this.messageService = messageService;
    }

    initForm() {
        this.form = this.fb.group({
            id: new FormControl('', []),
            name: new FormControl('', [Validators.required])
        });
    }
    ngOnInit() {
        this.ConfigureMode();
    }

    private loadData(): void {
        this.route.data.subscribe((data : {
            role: Role
        }) => {
            if (data.role) {
                this.role = data.role;
                this.pageTitle = 'Manage Role';
                this.updateModel();
            }

            this.isLoadingResults = false;
        });
    }

    private ConfigureMode() {
        const mode = this.route.snapshot.params.mode;

        if (mode === 'add') {
            this.add = true;
            this.pageTitle = 'Add Role';
            this.role = new Role();
            this.role.id = "";
            this.updateModel();
            this.isLoadingResults = false;
        } else {
            this.add = false;
            this.pageTitle = 'Edit Role';
            this.isLoadingResults = true;
            this.loadData();
        }
    }

    updateModel() {
        this.form.patchValue({name: this.role.name});
    }

    goBack() {
        this.router.navigate(['/roles']);
        return true;
    }

    async onSubmit() {
        try {
            this.isLoadingResults = true;
            this.role.name = this.form.value.name;

            if (this.add) {
                await this.service.addRole(this.role).toPromise();
                this.messageService.displayMessage('Added role ' + this.role.name);
            } else {
                await this.service.updateRole(this.role).toPromise();
                this.messageService.displayMessage('Updated role ' + this.role.name);
            }
            this.isLoadingResults = false;
            this.router.navigate(['/roles']);
        } catch (error) {
            this.isLoadingResults = false;
            if (this.add) {
                this.messageService.displayMessage('Failed to add role ' + this.role.name);
            } else {
                this.messageService.displayMessage('Failed to update role ' + this.role.name);
            }
        }
    }
}
