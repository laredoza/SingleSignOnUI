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
import { ClientCorsUri } from '../models/client-cors-uri';

@Component({
  selector: "app-allowed-cors-url-edit",
  templateUrl: "./allowed-cors-url-edit.component.html",
  styleUrls: ["./allowed-cors-url-edit.component.scss"]
})
export class ClientCorsOriginEditUrlComponent implements OnInit {
  isLoadingResults = false;
  add = false;
  pageTitle = "";
  form: FormGroup;
  messageService: MessagingService;
  corsOriginUri = new ClientCorsUri();
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
      origin: new FormControl("", [Validators.required])
    });
  }

  testUri()
  {
    if (!this.form.controls.origin.errors)
    {
      return false; 
    }
    else if (this.form.controls.origin.errors.pattern)
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
    this.allowedCorsUrlId = this.route.snapshot.params.allowedCorsUrlId;

    this.initForm();

    if (mode === "add") {
      this.add = true;
      this.corsOriginUri = new ClientCorsUri();
      this.pageTitle = "Add Cors Origin Uri";
      this.configureControls();
    } else {
      this.isLoadingResults = true;
      this.add = false;
      this.pageTitle = "Edit Cors Origin Uri";
      this.corsOriginUri = await this.service.returnCorsUri(this.clientId, this.allowedCorsUrlId).toPromise();
      this.updateModel();
      this.isLoadingResults = false;
    }
  }

  private configureControls() {}

  updateModel() {
    this.form.patchValue({
      id: this.corsOriginUri.id,
      clientId: this.corsOriginUri.clientId,
      origin: this.corsOriginUri.origin
    });
  }

  goBack() {
    this.router.navigate([`/clients/allowed-cors-url/${this.clientId}`]);
    return true;
  }

  async onSubmit() {
    try {
      this.isLoadingResults = true;
      this.corsOriginUri.origin = this.form.value.origin;
      this.corsOriginUri.clientId = this.clientId;

      if (this.add) {
        await this.service
          .addCorsOriginToClient(this.clientId, this.corsOriginUri)
          .toPromise();
        this.messageService.displayMessage(
          "Added Cors Origin Uri " + this.corsOriginUri.origin
        );
      } else {
        await this.service.updateClientCorsOriginUri(this.corsOriginUri).toPromise();
        this.messageService.displayMessage('Updated Cors Origin Uri ' + this.corsOriginUri.origin);
      }
      this.isLoadingResults = false;
      this.goBack();
    } catch (error) {
      this.isLoadingResults = false;
      if (this.add) {
        this.messageService.displayMessage(
          "Failed to add Cors Origin Uri: " + this.corsOriginUri.origin
        );
      } else {
        this.messageService.displayMessage(
          "Failed to update Cors Origin Uri: " + this.corsOriginUri.origin
        );
      }
    }
  }
}
