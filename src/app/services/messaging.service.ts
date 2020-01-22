import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) { }

  public displayMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }
}