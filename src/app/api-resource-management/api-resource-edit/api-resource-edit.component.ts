import {Component, OnInit} from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagingService} from 'src/app/services/messaging.service';
import {ApiResource} from '../models/api-resource';
import { ApiResourceService } from '../api-resource.service';

@Component({
  selector: 'app-api-resource-edit',
  templateUrl: './api-resource-edit.component.html',
  styleUrls: ['./api-resource-edit.component.scss']
})
export class ApiResourceEditComponent implements OnInit {
  isLoadingResults = false;
  add = false;
  pageTitle = 'Edit Identity Resources';
  apiResource: ApiResource;
  form: FormGroup;
  messageService: MessagingService;


  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private service: ApiResourceService, messageService: MessagingService) {
      this.initForm();
      this.messageService = messageService;
  }

  initForm() {
      this.form = this.fb.group({
          name: new FormControl('', [Validators.required]),
          displayName: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),

          additionalProp1: new FormControl('', []),
          additionalProp2: new FormControl('', []),
          additionalProp3: new FormControl('', []),

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
          this.pageTitle = 'Add Api Resource';
          this.apiResource = new ApiResource();
          this.apiResource.enabled = true;
          this.updateModel();
      } else {
          this.isLoadingResults = true;
          this.add = false;
          this.pageTitle = 'Edit Api Resource';

          this.route.data.subscribe((data: {
              apiResource: ApiResource
          }) => {
              if (data.apiResource) {
                  this.apiResource = data.apiResource;
                  data.apiResource.originalName = data.apiResource.name;
                  this.updateModel();
              }

              this.isLoadingResults = false;
          });
      }
  }

  updateModel() {
      this.form.patchValue({
          name: this.apiResource.name,
          displayName: this.apiResource.displayName,
          description: this.apiResource.description,
          additionalProp1: this.apiResource.properties ? this.apiResource.properties.additionalProp1 : '',
          additionalProp2: this.apiResource.properties ? this.apiResource.properties.additionalProp2 : '',
          additionalProp3: this.apiResource.properties ? this.apiResource.properties.additionalProp3 : '',
          enabled: this.apiResource.enabled
      });
  }

  goBack() {
      this.router.navigate(['/api-resources']);
      return true;
  }

  async onSubmit() {
      try {
          this.isLoadingResults = true;
          this.apiResource.name = this.form.value.name;
          this.apiResource.displayName = this.form.value.displayName,
          this.apiResource.description = this.form.value.description,
          this.apiResource.properties.additionalProp1 = this.form.value.additionalProp1,
          this.apiResource.properties.additionalProp2 = this.form.value.additionalProp2,
          this.apiResource.properties.additionalProp3 = this.form.value.additionalProp3,
          this.apiResource.enabled = this.form.value.enabled;
          if (this.add) {
              await this.service.addApiResource(this.apiResource).toPromise();
              this.messageService.displayMessage('Added api resource ' + this.apiResource.name);
          } else {
              await this.service.updateApiResource(this.apiResource).toPromise();
              this.messageService.displayMessage('Updated api resource ' + this.apiResource.name);
          }
          this.isLoadingResults = false;
          this.goBack();
      } catch (error) {
          this.isLoadingResults = false;
          if (this.add) {
              this.messageService.displayMessage('Failed to add api resource ' + this.apiResource.name);
          } else {
              this.messageService.displayMessage('Failed to update api resource ' + this.apiResource.name);
          }
      }
  }
}
