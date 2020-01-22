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
import { ClientPostLogoutUri } from '../models/client-post-logout-uri';

@Component({
  selector: "app-post-logout-url-edit",
  templateUrl: "./post-logout-url-edit.component.html",
  styleUrls: ["./post-logout-url-edit.component.scss"]
})
export class ClientPostLogoutEditUrlComponent implements OnInit {
  isLoadingResults = false;
  add = false;
  pageTitle = "";
  form: FormGroup;
  messageService: MessagingService;
  postLogoutUri = new ClientPostLogoutUri();
  clientId: number;
  postLogoutUrlId: number;
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
      postLogoutRedirectUri: new FormControl("", [Validators.required])
    });
  }

  testUri()
  {
    if (!this.form.controls.postLogoutRedirectUri.errors)
    {
      return false; 
    }
    else if (this.form.controls.postLogoutRedirectUri.errors.pattern)
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
    this.postLogoutUrlId = this.route.snapshot.params.postLogoutUrlId;

    this.initForm();

    if (mode === "add") {
      this.add = true;
      this.postLogoutUri = new ClientPostLogoutUri();
      this.pageTitle = "Add PostLogout Uri";
      this.configureControls();
    } else {
      this.isLoadingResults = true;
      this.add = false;
      this.pageTitle = "Edit PostLogout Uri";
      this.postLogoutUri = await this.service.returnClientPostLogoutUri(this.clientId, this.postLogoutUrlId).toPromise();
      this.updateModel();
      this.isLoadingResults = false;
    }
  }

  private configureControls() {}

  updateModel() {
    this.form.patchValue({
      id: this.postLogoutUri.id,
      clientId: this.postLogoutUri.clientId,
      postLogoutRedirectUri: this.postLogoutUri.postLogoutRedirectUri
    });
  }

  goBack() {
    this.router.navigate([`/clients/post-logout-url/${this.clientId}`]);
    return true;
  }

  async onSubmit() {
    try {
      this.isLoadingResults = true;
      this.postLogoutUri.postLogoutRedirectUri = this.form.value.postLogoutRedirectUri;
      this.postLogoutUri.clientId = this.clientId;

      if (this.add) {
        await this.service
          .addPostLogoutUriToClient(this.clientId, this.postLogoutUri)
          .toPromise();
        this.messageService.displayMessage(
          "Added PostLogout Uri " + this.postLogoutUri.postLogoutRedirectUri
        );
      } else {
        await this.service.updateClienPostLogoutUri(this.postLogoutUri).toPromise();
        this.messageService.displayMessage('Updated PostLogout Uri ' + this.postLogoutUri.postLogoutRedirectUri);
      }
      this.isLoadingResults = false;
      this.goBack();
    } catch (error) {
      this.isLoadingResults = false;
      if (this.add) {
        this.messageService.displayMessage(
          "Failed to add PostLogout uri: " + this.postLogoutUri.postLogoutRedirectUri
        );
      } else {
        this.messageService.displayMessage(
          "Failed to update PostLogout uri: " + this.postLogoutUri.postLogoutRedirectUri
        );
      }
    }
  }
}
