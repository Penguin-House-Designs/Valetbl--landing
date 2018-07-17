import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  opened = false;

  client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    travel: ''
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  submitApp() {
    console.log('client', this.client);
  }

}
