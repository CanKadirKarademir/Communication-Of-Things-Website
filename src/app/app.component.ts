import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './utils';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(
    private _translateService: TranslateService,
    private _languageService: LanguageService,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    _translateService.addLangs(['tr', 'en']);
    _translateService.setDefaultLang('tr');

    if (_languageService.getLanguage()) {
      _translateService.use(localStorage.getItem('language'));
    }
  }

  ngOnInit() {
    this.router.events
      .pipe(
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
        })
      )
      .subscribe((title) => {
        this._translateService.get('ProjectName').subscribe((projectName) => {
          title != null
            ? this._translateService.get(title).subscribe((value) => {
                this.titleService.setTitle(`${value} - ${projectName}`);
              })
            : this.titleService.setTitle(`${projectName}`);
        });
      });
  }
}
