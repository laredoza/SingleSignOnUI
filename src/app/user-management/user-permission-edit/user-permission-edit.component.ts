import {Component, OnInit} from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {MessagingService} from 'src/app/services/messaging.service';
import { Claim } from '../models/claim';

@Component({
    selector: 'app-user-permission-edit', 
    templateUrl: './user-permission-edit.component.html', 
    styleUrls: ['./user-permission-edit.component.scss']})
export class UserPermissionEditComponent implements OnInit {
    isLoadingResults = true;
    add = false;
    pageTitle = 'Edit User Claim';
    claim: Claim;
    form: FormGroup;
    messageService: MessagingService;
    id: string;
    type: string;


    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private service: UserService, messageService: MessagingService) {
        this.initForm();
        this.messageService = messageService;
    }

    initForm() {
        this.form = this.fb.group({
            type: new FormControl('', [Validators.required]),
            value: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get("id");
        this.type = this.route.snapshot.paramMap.get('type');
        this.ConfigureMode();
        this.isLoadingResults = false;

        this.route.data.subscribe((data: {
            claim: Claim
        }) => {
            if (data.claim) {
                this.claim = data.claim;
                this.updateModel();
            }

            this.isLoadingResults = false;
        });
    }

    private ConfigureMode() {
        const mode = this.route.snapshot.params.mode;

        if (mode === 'add') {
            this.add = true;
            this.pageTitle = 'Add User Claim';
            this.claim = new Claim();
        } else {
            this.add = false;
            this.pageTitle = 'Edit User Claim';
        }
    }

    updateModel() {
        this.form.patchValue({
            type: this.claim.claimType,
            value: this.claim.claimValue
        });
    }

    goBack() {
        this.router.navigate([`/users/permissions/${this.id}`]);
        return true;
    }

    async onSubmit() {
        try {
            this.isLoadingResults = true;
            this.claim.claimType = this.form.value.type;
            this.claim.claimValue = this.form.value.value;
            if (this.add) {
                await this.service.addClaimToUser(this.claim, this.id).toPromise();
                this.messageService.displayMessage(`Added claim ${this.claim.claimType} to value ${this.claim.claimValue}`);
            } else {
                await this.service.updateUserClaim(this.claim, this.id, this.type).toPromise();
                this.messageService.displayMessage(`Updated claim ${this.claim.claimType} to value ${this.claim.claimValue}`);
            }
            this.isLoadingResults = false;
            this.goBack();
        } catch (error) {
            this.isLoadingResults = false;
            if (this.add) {
                this.messageService.displayMessage(`Failed adding claim ${this.claim.claimType} to value ${this.claim.claimValue}`);
            } else {
                this.messageService.displayMessage(`Failed updating claim ${this.claim.claimType} to value ${this.claim.claimValue}`);
            }
        }
    }
}
