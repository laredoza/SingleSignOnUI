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
import { ClientRedirectUri } from "../models/client-redirect-uri";
import {environment} from 'src/environments/environment';

@Component({
  selector: "app-redirect-url-edit",
  templateUrl: "./redirect-url-edit.component.html",
  styleUrls: ["./redirect-url-edit.component.scss"]
})
export class ClientRedirectUrlComponent implements OnInit {
  isLoadingResults = false;
  add = false;
  pageTitle = "";
  form: FormGroup;
  messageService: MessagingService;
  redirectUri = new ClientRedirectUri();
  clientId: number;
  redirectUrlId: number;
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
      redirectUri: new FormControl("", [Validators.required])
    });
  }

  testRedirectUri()
  {
    if (!this.form.controls.redirectUri.errors)
    {
      return false; 
    }
    else if (this.form.controls.redirectUri.errors.pattern)
    {
      return true;
    }
  }

  async ngOnInit() {
    await this.ConfigureMode();
  }

  private async ConfigureMode() {
    const mode = this.route.snapshot.params.mode;
    this.clientId = this.route.snapshot.params.id;
    this.redirectUrlId = this.route.snapshot.params.redirectUrlId;

    this.initForm();

    if (mode === "add") {
      this.add = true;
      this.redirectUri = new ClientRedirectUri();
      this.pageTitle = "Add Redirect Uri";
      this.configureControls();
    } else {
      this.isLoadingResults = true;
      this.add = false;
      this.pageTitle = "Edit Redirect Uri";
      this.redirectUri = await this.service.returnClientRedirectUri(this.clientId, this.redirectUrlId).toPromise();
      this.updateModel();
      this.isLoadingResults = false;
    }
  }

  private configureControls() {}

  updateModel() {
    this.form.patchValue({
      id: this.redirectUri.id,
      clientId: this.redirectUri.clientId,
      redirectUri: this.redirectUri.redirectUri
    });
  }

  goBack() {
    this.router.navigate([`/clients/redirect-url/${this.clientId}`]);
    return true;
  }

  async onSubmit() {
    try {
      this.isLoadingResults = true;
      this.redirectUri.redirectUri = this.form.value.redirectUri;
      this.redirectUri.clientId = this.clientId;

      if (this.add) {
        await this.service
          .addRedirectUriToClient(this.clientId, this.redirectUri)
          .toPromise();
        this.messageService.displayMessage(
          "Added Redirect Uri " + this.redirectUri.redirectUri
        );
      } else {
        await this.service.updateClientRedirectUri(this.redirectUri).toPromise();
        this.messageService.displayMessage('Updated RedirectUri ' + this.redirectUri.redirectUri);
      }
      this.isLoadingResults = false;
      this.goBack();
    } catch (error) {
      this.isLoadingResults = false;
      if (this.add) {
        this.messageService.displayMessage(
          "Failed to add redirect uri: " + this.redirectUri.redirectUri
        );
      } else {
        this.messageService.displayMessage(
          "Failed to update redirect uri: " + this.redirectUri.redirectUri
        );
      }
    }
  }
}
