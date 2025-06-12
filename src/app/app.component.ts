import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'investCloud-Library';
  filteredApplets: any = [];
  categoryCount: number = 0;
  searchApplet: any;
  selectedCat: string = 'Performance';
  filteredCategories: any = [];
  categoryCounts: any = {};

  lib = {
    categories: ['Performance', 'Investments', 'Operations'],
    applets: [
      {
        name: 'Performance Snapshot',
        categories: ['Performance'],
      },
      {
        name: 'Commitment Widget',
        categories: ['Investments'],
      },
      {
        name: 'CMS',
        categories: ['Investments', 'Performance'],
      },
    ],
  };
  ngOnInit(): void {

    //When i tried to make my model bigger by adding below data, lag is seen on
    // 1.load as it has to load 5000 applets and 100 categories at once
    // 2. filter logic,
    // 3.Displaying all applets at once without pagination or virtual scroll
    //     below solutions can be incorportaed to imporve Performance and for better user interaction:-
    // 1.trackBy in *ngFor can be used to Prevent full list re-renders,
    // 2.Pagination can be used to show the applets
    // 3.Debounced Search to optimize the search and to Avoids filtering on every keystroke.
    // 4.ChangeDetectionStrategy.onPush can be used to detect and make changes only in necessary place.
    
    
    //  this.addBigData(this.lib, 100, 5000);

    this.addBigData(this.lib,5,20);
    this.getCategoryCounts();
    this.filteredCategories = this.lib.categories;
    let applet = 'Performance';
    this.lib.applets.filter((item) => {
      if (item.categories.includes(applet)) {
        this.filteredApplets.push(item.name);
      }
    });
    // this.getCategoryCounts();
   
  }
  selectCategory(applet: any) {
    this.selectedCat = applet;
    this.filteredApplets = [];
    this.lib.applets.filter((item) => {
      if (item.categories.includes(applet)) {
        this.filteredApplets.push(item.name);
      }
    });
  }
 
  filterByCategories() {
    this.filteredApplets = [];

    if (this.selectedCat) {
      const appletsInCategory = this.lib.applets.filter((item) =>
        item.categories.includes(this.selectedCat)
      );

      if (!this.searchApplet || this.searchApplet.trim() === '') {
        // If search box is empty, show all applets of selected category
        this.filteredApplets = appletsInCategory.map((item) => item.name);
        this.filteredCategories = this.lib.categories;
        this.getCategoryCounts();
      } else {
        this.filteredCategories = [];

        const matchedApplets = appletsInCategory.filter((item) =>
          item.name.toLowerCase().includes(this.searchApplet.toLowerCase())
        );

        this.filteredApplets = matchedApplets.map((item) => item.name);
        this.getCategoryCounts();

        let foundCategories: string[] = [];

        matchedApplets.forEach((item) => {
          item.categories.forEach((cat) => {
            if (!foundCategories.includes(cat)) {
              foundCategories.push(cat);
            }
          });
        });
        this.filteredCategories = this.lib.categories.filter((cat) =>
          foundCategories.includes(cat)
        );

      }
    }
  }


getCategoryCounts() {
  this.categoryCounts = {};

  this.lib.categories.forEach((cat) => {
    const appletsInCategory = this.lib.applets.filter((item) =>
      item.categories.includes(cat)
    );

    if (this.searchApplet && this.searchApplet.trim() !== '') {
      this.categoryCounts[cat] = appletsInCategory.filter((item) =>
        item.name.toLowerCase().includes(this.searchApplet.toLowerCase())
      ).length;
    } else {
      this.categoryCounts[cat] = appletsInCategory.length;
    }
  });
}

   addBigData(lib: any, ncategs: any, napplets: any) {
    console.log('inside lib ', lib);
    for (var i = 0; i < ncategs; i++) {
      lib.categories.push('Sample Category ' + i);
    }
    var n = lib.categories.length;
    for (var i = 0; i < napplets; i++) {
      var a = {
        name: 'CMS' + i,
        categories: [] as string[],
      };
      for (var j = 0; j < Math.floor(Math.random() * 10); ++j) {
        var idx = Math.floor(Math.random() * n) % n;
        a.categories.push(lib.categories[idx]);
      }
      lib.applets.push(a);
    }
  }
}
