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
import {ApiResourceClaim} from '../models/api-resource.claim';
import {ApiResourceService} from '../api-resource.service';

@Component({selector: 'app-claim-list-add', templateUrl: './claim-list-add.component.html', styleUrls: ['./claim-list-add.component.scss']})
export class ClaimListAddComponent implements OnInit {
    isLoadingResults = false;
    add = false;
    pageTitle = 'Edit Identity Resources';
    claim : ApiResourceClaim;
    form : FormGroup;
    messageService : MessagingService;


    constructor(private route : ActivatedRoute, private router : Router, private fb : FormBuilder, private service : ApiResourceService, messageService : MessagingService) {
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
            this.claim = new ApiResourceClaim();
            this.claim.apiClaimName = this.route.snapshot.params.name;
            this.updateModel();
        } else {
            this.isLoadingResults = true;
            this.add = false;
            this.pageTitle = 'Edit Claim';

            this.route.data.subscribe((data : {
                apiResourceClaim: ApiResourceClaim
            }) => {
                if (data.apiResourceClaim) {
                    this.claim = data.apiResourceClaim;
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
        this.router.navigate(['/api-resources/claims/' + this.route.snapshot.params.name]);
        return true;
    }

    async onSubmit() {
        try {
            this.isLoadingResults = true;
            this.claim.type = this.form.value.type;

            if (this.add) {
                await this.service.addApiResourceClaim(this.claim).toPromise();
                this.messageService.displayMessage('Added api resource claim ' + this.claim.type);
            } else {
                await this.service.updateApiResourceClaim(this.claim).toPromise();
                this.messageService.displayMessage('Updated api resource claim ' + this.claim.type);
            }
            this.isLoadingResults = false;
            this.goBack();
        } catch (error) {
            this.isLoadingResults = false;
            if (this.add) {
                this.messageService.displayMessage('Failed to add api resource claim ' + this.claim.type);
            } else {
                this.messageService.displayMessage('Failed to update api resource claim ' + this.claim.type);
            }
        }
    }
}
