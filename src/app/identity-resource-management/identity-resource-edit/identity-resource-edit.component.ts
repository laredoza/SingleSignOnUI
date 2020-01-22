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
import {ErrorStateMatcher} from '@angular/material';
import {MessagingService} from 'src/app/services/messaging.service';
import {IdentityResource} from '../models/identity-resource';
import {IdentityResourceService} from '../identity-resource-.service';

@Component({selector: 'app-identity-resource-edit', templateUrl: './identity-resource-edit.component.html', styleUrls: ['./identity-resource-edit.component.scss']})
export class IdentityResourceEditComponent implements OnInit {
    isLoadingResults = false;
    add = false;
    pageTitle = 'Edit Identity Resources';
    identityResource : IdentityResource;
    form : FormGroup;
    messageService : MessagingService;


    constructor(private route : ActivatedRoute, private router : Router, private fb : FormBuilder, private service : IdentityResourceService, messageService : MessagingService) {
        this.initForm();
        this.messageService = messageService;
    }

    initForm() {
        this.form = this.fb.group({
            name: new FormControl('', [Validators.required]),
            displayName: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),

            nonEditable: new FormControl(''),
            showInDiscoveryDocument: new FormControl(''),
            emphasize: new FormControl(''),
            required: new FormControl(''),
            enabled: new FormControl('')
        });
    }

    ngOnInit() {
        this.ConfigureMode();
    }

    private ConfigureMode() {
        const mode = this.route.snapshot.params.mode;

        if (mode === 'add') {
            this.add = true;
            this.pageTitle = 'Add Identity Resource';
            this.identityResource = new IdentityResource();
            this.identityResource.enabled = true;
            this.identityResource.showInDiscoveryDocument = true;
            this.updateModel();
        } else {
            this.isLoadingResults = true;
            this.add = false;
            this.pageTitle = 'Edit Identity Resource';

            this.route.data.subscribe((data : {
                identityResource: IdentityResource
            }) => {
                if (data.identityResource) {
                    this.identityResource = data.identityResource;
                    this.identityResource.originalName = this.identityResource.name;
                    this.updateModel();
                }

                this.isLoadingResults = false;
            });
        }
    }

    updateModel() {
        this.form.patchValue({
            name: this.identityResource.name,
            displayName: this.identityResource.displayName,
            description: this.identityResource.description,
            nonEditable: this.identityResource.nonEditable,
            showInDiscoveryDocument: this.identityResource.showInDiscoveryDocument,
            emphasize: this.identityResource.emphasize,
            required: this.identityResource.required,
            enabled: this.identityResource.enabled
        });
    }

    goBack() {
        this.router.navigate(['/identity-resources']);
        return true;
    }

    async onSubmit() {
        try {
            this.isLoadingResults = true;
            this.identityResource.name = this.form.value.name;
            this.identityResource.displayName = this.form.value.displayName,
            this.identityResource.description = this.form.value.description,
            this.identityResource.nonEditable = this.form.value.nonEditable,
            this.identityResource.showInDiscoveryDocument = this.form.value.showInDiscoveryDocument,
            this.identityResource.emphasize = this.form.value.emphasize,
            this.identityResource.required = this.form.value.required,
            this.identityResource.enabled = this.form.value.enabled;
            if (this.add) {
                await this.service.addIdentityResource(this.identityResource).toPromise();
                this.messageService.displayMessage('Added identity resource ' + this.identityResource.name);
            } else {
                await this.service.updateIdentityResource(this.identityResource).toPromise();
                this.messageService.displayMessage('Updated identity resource ' + this.identityResource.name);
            }
            this.isLoadingResults = false;
            this.router.navigate(['/identity-resources']);
        } catch (error) {
            this.isLoadingResults = false;
            if (this.add) {
                this.messageService.displayMessage('Failed to add identity resource ' + this.identityResource.name);
            } else {
                this.messageService.displayMessage('Failed to update identity resource ' + this.identityResource.name);
            }
        }
    }
}
