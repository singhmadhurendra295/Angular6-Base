import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
  <div class="jumbotron">
      <div class="container">
          <div class="row">
              <div class="col-sm-6 offset-sm-3">
                  <app-header ></app-header>
                  <router-outlet></router-outlet>
              </div>
          </div>
      </div>
    </div>
    `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}
