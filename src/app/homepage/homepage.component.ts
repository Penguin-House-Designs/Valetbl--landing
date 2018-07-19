import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../app.component.scss']
})
export class HomepageComponent implements OnInit {

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

  constructor(private http: Http, public snackBar: MatSnackBar) { }

  toggleSidebar() {
    this.opened == false ? this.opened = true : this.opened = false
  }

  submitApp() {
    console.log('client', this.client);
    this.addNew(this.client);
    this.opened = false;
  }

  openSnackBar() {
    this.snackBar.open("Thank you! We'll get back to you shortly.", '', {
      duration: 3000
    });
  }

  addNew(usercreds) {
    console.log('inside addnew')
    let headers = new Headers();
    let eObject = {
      firstName: usercreds.firstName,
      lastName: usercreds.lastName,
      email: usercreds.email,
      phone: usercreds.phone,
      address: {
        street: usercreds.address.street,
        city: usercreds.address.city,
        state: usercreds.address.state,
        zip: usercreds.address.zip
      },
      travel: usercreds.travel,
      headers: headers
    };
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    console.log('before sendmail')
    return this.http.post('/sendmail', eObject).subscribe((data) => {
      if (data.json().success) {
        console.log('Sent successfully');
        this.client = {
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
        this.openSnackBar();

      }
    })
  }

  ngOnInit(){}

}
