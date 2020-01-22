import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessagingService } from "src/app/services/messaging.service";
import { ClientService } from "../client.service";
import {environment} from 'src/environments/environment';
import { ClientSecret } from '../models/client-secret';
import * as moment from 'moment';

@Component({
  selector: "app-allowed-secret-edit",
  templateUrl: "./secret-edit.component.html",
  styleUrls: ["./secret-edit.component.scss"]
})
export class ClientSecretEditComponent implements OnInit {
  isLoadingResults = false;
  add = false;
  pageTitle = "";
  form: FormGroup;
  messageService: MessagingService;
  clientSecret = new ClientSecret();
  clientId: number;
  allowedCorsUrlId: number;
  public urlRegex: string; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: ClientService,
    messageService: MessagingService
  ) {
    this.urlRegex = environment.urlRegEx;
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.messageService = messageService;
  }

  initForm() {
    this.form = this.fb.group({
      id: new FormControl({ value: "", disabled: true }, [Validators.required]),
      description: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.required]),
      expiration: new FormControl("", []),
      type: new FormControl({ value: "SharedSecret", disabled: true }, [Validators.required])
    });
  }
  
  async ngOnInit() {
    await this.ConfigureMode();
  }

  private async ConfigureMode() {
    const mode = this.route.snapshot.params.mode;
    this.clientId = this.route.snapshot.params.id;
    this.allowedCorsUrlId = this.route.snapshot.params.allowedCorsUrlId;

    this.initForm();

    if (mode === "add") {
      this.add = true;
      this.clientSecret = new ClientSecret();
      this.pageTitle = "Add Client Secret";
      this.configureControls();
    } else {
      this.isLoadingResults = true;
      this.add = false;
      this.pageTitle = "Edit Client Secret";
      // this.clientSecret = await this.service.returnCorsUri(this.clientId, this.allowedCorsUrlId).toPromise();
      this.updateModel();
      this.isLoadingResults = false;
    }
  }

  private configureControls() {}

  updateModel() {
    this.form.patchValue({
      id: this.clientSecret.id,
      description: this.clientSecret.description,
      value: this.clientSecret.value,
      expiration: this.clientSecret.expiration,
      created: moment.utc(this.clientSecret.created).toDate
    });
  }

  goBack() {
    this.router.navigate([`/clients/client-secret/${this.clientId}`]);
    return true;
  }

  async onSubmit() {
    try {
      this.isLoadingResults = true;
      this.clientSecret.clientId = this.clientId;
      this.clientSecret.description = this.form.value.description;
      this.clientSecret.value = this.form.value.value;
      this.clientSecret.expiration = this.form.value.expiration;
      this.clientSecret.type = "SharedSecret";
      this.clientSecret.created = moment().utc().toDate();
      if (this.add) {
        await this.service
          .addClientSecretToClient(this.clientId, this.clientSecret)
          .toPromise();
        this.messageService.displayMessage(
          "Added Secret: " + this.clientSecret.description
        );
      } else {
        // await this.service.updateClientCorsOriginUri(this.clientSecret).toPromise();
        this.messageService.displayMessage('Updated Secret: ' + this.clientSecret.description);
      }
      this.isLoadingResults = false;
      this.goBack();
    } catch (error) {
      this.isLoadingResults = false;
      if (this.add) {
        this.messageService.displayMessage(
          "Failed to add secret: " + this.clientSecret.description
        );
      } else {
        this.messageService.displayMessage(
          "Failed to update secret: " + this.clientSecret.description
        );
      }
    }
  }
}
