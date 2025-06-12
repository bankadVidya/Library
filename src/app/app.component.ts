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

    //When i tries to make my model bigger by adding below data, lag is seen on 
    // 1.load as it has to load 5000 applets and 100 categories at once
    // 2. filter logic,
    // 3.Displaying all applets at once without pagination or virtual scroll
    
    
    //  this.addBigData(this.lib, 100, 5000);

    this.addBigData(this.lib,5,20);

    this.filteredCategories = this.lib.categories;
    let applet = 'Performance';
    this.lib.applets.filter((item) => {
      if (item.categories.includes(applet)) {
        this.filteredApplets.push(item.name);
      }
    });
    this.getCategoryCounts();
   
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
  //   selectCategory(applet: any) {
  //   this.selectedCat = applet;
  //   const matched = this.lib.applets.filter((item) =>
  //     item.categories.includes(applet)
  //   );
  //   this.filteredApplets = matched.map((item) => item.name);
  //   this.getCategoryCounts(matched); // 👉 Add this line
  // }
  // selectCategory(applet: any) {
  //   this.selectedCat = applet;
  //   const matched = this.lib.applets.filter((item) =>
  //     item.categories.includes(applet)
  //   );
  //   this.filteredApplets = matched.map((item) => item.name);
  //   this.getCategoryCounts(); // 🔧 Use this
  // }
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

        // Preserve order as per original lib.categories
        this.filteredCategories = this.lib.categories.filter((cat) =>
          foundCategories.includes(cat)
        );

        //count
        this.lib.categories.forEach((cat) => {
          this.categoryCounts[cat] = this.lib.applets.filter((item) =>
            item.name
              .toLocaleLowerCase()
              .includes(this.searchApplet.toLocaleLowerCase())
          ).length;
        });
      }
    }
  }

  getCategoryCounts() {
    this.categoryCounts = {};

    if (this.searchApplet) {
      // Count all applets that include this category on search
      this.lib.categories.forEach((cat) => {
        this.categoryCounts[cat] = this.lib.applets.filter((item) =>
          item.name
            .toLocaleLowerCase()
            .includes(this.searchApplet.toLocaleLowerCase())
        ).length;
      });
    } else {
      this.lib.categories.forEach((cat) => {
        // Count all applets that include this category on load
        this.categoryCounts[cat] = this.lib.applets.filter((item) =>
          item.categories.includes(cat)
        ).length;
      });
    }
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
