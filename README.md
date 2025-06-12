# InvestCloudLibrary
 <!-- Performance Considerations -->
 When i tried to make my model bigger by adding below data, lag is seen on
    1.load as it has to load 5000 applets and 100 categories at once
    2. filter logic,
    3.Displaying all applets at once without pagination or virtual scroll
below solutions can be incorportaed to imporve Performance and for better user interaction:-
    1.trackBy in *ngFor can be used to Prevent full list re-renders,
    2.Pagination can be used to show the applets
    3.Debounced Search to optimize the search and to Avoids filtering on every keystroke.
    4.ChangeDetectionStrategy.onPush can be used to detect and make changes only in necessary place.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
