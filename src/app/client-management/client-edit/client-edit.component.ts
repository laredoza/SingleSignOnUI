import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessagingService } from "src/app/services/messaging.service";
import { Client } from "../models/client";
import { ClientService } from "../client.service";
import { Option } from "../models/option";
import { AllowedGrantTypes } from "../models/allowed-grant-type";

@Component({
  selector: "app-client-edit",
  templateUrl: "./client-edit.component.html",
  styleUrls: ["./client-edit.component.scss"]
})
export class ClientEditComponent implements OnInit {
  isLoadingResults = false;
  add = false;
  pageTitle = "Edit Identity Resources";
  client: Client;
  form: FormGroup;
  messageService: MessagingService;
  public grantTypes: Option[];
  selectedGrant = "";
  displayAllowOfflineAccess = false;
  displayRequirePkce = false;
  displayRequireClientSecret = false;
  displayAllowAccessTokensViaBrowser = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: ClientService,
    messageService: MessagingService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.initForm();
    this.messageService = messageService;
  }

  initForm() {
    this.loadGrantTypes();

    this.form = this.fb.group({
      id: new FormControl({value: "" , disabled: true}, [Validators.required]),
      clientId: new FormControl(
        {
          value: "",
          disabled: false 
        },
        [Validators.required]
      ),
      clientName: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      identityTokenLifetime: new FormControl(300, [Validators.required]),
      accessTokenLifetime: new FormControl(3600, [Validators.required]),
      enabled: new FormControl(true)
    });
  }

  ngOnInit() {
    this.ConfigureMode();
  }

  private loadGrantTypes() {
    this.grantTypes = new Array<Option>();
    this.grantTypes.push(new Option("", "Please Select", true));
    this.grantTypes.push(
      new Option("clientCredentials", "Client Credentials", false)
    );
    this.grantTypes.push(new Option("code", "Code", false));
    this.grantTypes.push(
      new Option(
        "codeAndClientCredentials",
        "Code and Client Credentials",
        false
      )
    );
    this.grantTypes.push(new Option("deviceFlow", "Device Flow", false));
    this.grantTypes.push(new Option("hybrid", "Hybrid", false));
    this.grantTypes.push(
      new Option(
        "hybridAndClientCredentials",
        "Hybrid and Client Credentials",
        false
      )
    );
    this.grantTypes.push(new Option("implicit", "Implicit", false));
    this.grantTypes.push(
      new Option(
        "implicitAndClientCredentials",
        "Implicit and Client Credentials",
        false
      )
    );
    this.grantTypes.push(
      new Option("resourceOwnerPassword", "Resource Owner Password", false)
    );
    this.grantTypes.push(
      new Option(
        "resourceOwnerPasswordAndClientCredentials",
        "Resource Owner Password and Client Credentials",
        false
      )
    );
  }

  private updateGrantControl(grantText: string, mode: string) {
    this.grantTypes.forEach(grantType => {
      if (grantType.value.toLowerCase() !== grantText.toLowerCase()) {
        grantType.selected = false;
      } else {
        grantType.selected = true;
        this.selectedGrant = grantType.value;
      }

      return grantType;
    });
  }

  private returnSelectedGrantType(): Option {
    const result = this.grantTypes.filter(grantType => {
      if (grantType.selected) {
        return grantType;
      }
    });

    return result[0];
  }

  private ConfigureMode() {
    const mode = this.route.snapshot.params.mode;

    if (
      mode === "add-service" ||
      mode === "add-resource" ||
      mode === "add-mvc" ||
      mode === "add-javascript" ||
      mode === "add-angular"
    ) {
      this.add = true;
      this.client = new Client();
      this.client.enabled = true;
      // this.client.showInDiscoveryDocument = true;
      if (mode === "add-service") {
        this.pageTitle = "Add Service";
        this.updateGrantControl("clientCredentials", mode);
      } else if (mode === "add-resource") {
        this.pageTitle = "Add Resource Owner Password";
        this.updateGrantControl("resourceOwnerPassword", mode);
      } else if (mode === "add-mvc") {
        this.pageTitle = "Add Mvc";
        this.updateGrantControl("hybrid", mode);
      } else if (mode === "add-javascript") {
        this.pageTitle = "Add Javascript";
        this.updateGrantControl("code", mode);
      } else if (mode === "add-angular") {
        this.pageTitle = "Add Angular / React application";
        this.updateGrantControl("implicit", mode);
      }

      this.configureControls();
    } else {
      // this.isLoadingResults = true;
      this.add = false;
      this.pageTitle = "Edit Client";
      this.form.addControl(
        "allowedGrantTypes",
        new FormControl(
          {
            value: true,
            disabled: true
          },
          [Validators.required]
        )
      );

      this.route.data.subscribe((data: { client: Client }) => {
        if (data.client) {
          this.client = data.client;
          this.updateGrantControl(
            data.client.allowedGrantTypes[0].grantType,
            mode
          );
          this.updateModel();
          this.configureControls();
        }

        this.isLoadingResults = false;
      });
    }
  }

  private configureControls() {
    const grantType = this.returnSelectedGrantType();

    if (grantType.value === "hybrid") {
      this.form.addControl(
        "allowOfflineAccess",
        new FormControl({
          value: !this.add ? this.client.allowOfflineAccess : true,
          disabled: false
        })
      );
      this.displayAllowOfflineAccess = true;
    } else if (grantType.value === "code") {
      this.displayRequirePkce = true;
      this.displayRequireClientSecret = true;
      this.form.addControl(
        "requirePkce",
        new FormControl({
          value: !this.add ? this.client.requirePkce : true,
          disabled: false
        })
      );
      this.form.addControl(
        "requireClientSecret",
        new FormControl({
          value: !this.add ? this.client.requireClientSecret : false,
          disabled: false
        })
      );
    } else if (grantType.value === "implicit") {
      this.displayAllowAccessTokensViaBrowser = true;
      this.form.addControl(
        "allowAccessTokensViaBrowser",
        new FormControl({
          value: !this.add ? this.client.allowAccessTokensViaBrowser : true,
          disabled: false
        })
      );
    }

    this.form.addControl(
      "allowedGrantTypes",
      new FormControl(
        {
          value: true,
          disabled: true
        },
        [Validators.required]
      )
    );

    this.updateGrantControl(
      this.client.allowedGrantTypes[0].grantType,
      "update"
    );
  }

  updateModel() {
    this.form.patchValue({
      id: this.client.id,
      clientId: this.client.clientId,
      clientName: this.client.clientName,
      description: this.client.description,
      identityTokenLifetime: this.client.identityTokenLifetime,
      accessTokenLifetime: this.client.accessTokenLifetime,
      enabled: this.client.enabled
    });
  }

  goBack() {
    this.router.navigate(["/clients"]);
    return true;
  }

  async onSubmit() {
    try {
      this.isLoadingResults = true;

      if (!this.add) {
        this.client.allowedGrantTypes[0].grantType = this.selectedGrant;
      } else {
        this.client.allowedGrantTypes.push(
          new AllowedGrantTypes(0, this.selectedGrant)
        );
      }
      //this.client.id = this.form.value.id;
      this.client.clientId = this.form.value.clientId;
      this.client.clientName = this.form.value.clientName;
      this.client.description = this.form.value.description;
      this.client.identityTokenLifetime = this.form.value.identityTokenLifetime;
      this.client.accessTokenLifetime = this.form.value.accessTokenLifetime;
      this.client.enabled = this.form.value.enabled;

      const grantType = this.returnSelectedGrantType();

      if (grantType.value === "hybrid") {
        this.client.allowOfflineAccess = this.form.value.allowOfflineAccess;
      } else if (grantType.value === "code") {
        this.client.requirePkce = this.form.value.requirePkce;
        this.client.requireClientSecret = this.form.value.requireClientSecret;
      } else if (grantType.value === "implicit") {
        this.client.allowAccessTokensViaBrowser = this.form.value.allowAccessTokensViaBrowser;
      }

      if (this. add) {
          await this.service.addClient(this.client).toPromise();
          this.messageService.displayMessage('Added Client ' + this.client.clientName);
      } else {
          await this.service.updateClient(this.client).toPromise();
          this.messageService.displayMessage('Updated Client' + this.client.clientName);
      }
      this.isLoadingResults = false;
      this.goBack();
    } catch (error) {
      this.isLoadingResults = false;
      if (this.add) {
        this.messageService.displayMessage(
          "Failed to add client name: " + this.client.clientName
        );
      } else {
        this.messageService.displayMessage(
          "Failed to update client name: " + this.client.clientName
        );
      }
    }
  }
}
