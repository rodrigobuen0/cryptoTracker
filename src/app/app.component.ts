import { Component } from '@angular/core';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;
    status = false;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.authenticationService.logout(this.authenticationService.userValue?.username || "");
    }
addToggle()
{
  this.status = !this.status;       
}
}