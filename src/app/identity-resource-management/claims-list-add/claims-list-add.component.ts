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
import {MessagingService} from 'src/app/services/messaging.service';
import {IdentityResourceService} from '../identity-resource-.service';
import {IdentityResourceClaim} from '../models/identity-resource.claim';


@Component({selector: 'app-claims-list-add', templateUrl: './claims-list-add.component.html', styleUrls: ['./claims-list-add.component.scss']})
export class ClaimsListAddComponent implements OnInit {
    isLoadingResults = false;
    add = false;
    pageTitle = 'Edit Identity Resources';
    claim : IdentityResourceClaim;
    form : FormGroup;
    messageService : MessagingService;


    constructor(private route : ActivatedRoute, private router : Router, private fb : FormBuilder, private service : IdentityResourceService, messageService : MessagingService) {
        this.initForm();
        this.messageService = messageService;
    }

    initForm() {
        this.form = this.fb.group({
            type: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        this.ConfigureMode();
    }

    private ConfigureMode() {
        let mode = 'add';

        if (this.route.snapshot.params.id) {
            mode = 'edit';
        }

        if (mode === 'add') {
            this.add = true;
            this.pageTitle = 'Add Claim';
            this.claim = new IdentityResourceClaim();
            this.claim.identityClaimName = this.route.snapshot.params.name;
            this.updateModel();
        } else {
            this.isLoadingResults = true;
            this.add = false;
            this.pageTitle = 'Edit Claim';

            this.route.data.subscribe((data : {
                identityResourceClaim: IdentityResourceClaim
            }) => {
                if (data.identityResourceClaim) {
                    this.claim = data.identityResourceClaim;
                    this.updateModel();
                }

                this.isLoadingResults = false;
            });
        }
    }

    updateModel() {
        this.form.patchValue({type: this.claim.type});
    }

    goBack() {
        this.router.navigate(['/identity-resources/claims/' + this.route.snapshot.params.name]);
        return true;
    }

    async onSubmit() {
        try {
            this.isLoadingResults = true;
            this.claim.type = this.form.value.type;

            if (this.add) {
                await this.service.addIdentityResourceClaim(this.claim).toPromise();
                this.messageService.displayMessage('Added identity resource claim ' + this.claim.type);
            } else {
                await this.service.updateIdentityResourceClaim(this.claim).toPromise();
                this.messageService.displayMessage('Updated identity resource claim ' + this.claim.type);
            }
            this.isLoadingResults = false;
            this.goBack();
        } catch (error) {
            this.isLoadingResults = false;
            if (this.add) {
                this.messageService.displayMessage('Failed to add identity resource claim ' + this.claim.type);
            } else {
                this.messageService.displayMessage('Failed to update identity resource claim ' + this.claim.type);
            }
        }
    }
}
