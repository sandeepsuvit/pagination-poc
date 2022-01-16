import { distinctUntilChanged, map, Observable, tap, withLatestFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/user.interface';
import { PagedResponse } from 'src/app/paged-response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-type-one',
  templateUrl: './type-one.component.html',
  styleUrls: ['./type-one.component.scss']
})
export class TypeOneComponent implements OnInit {
  currentPage = 0;
  numberOfElements!: number;
  totalPages!: number;
  totalElements!: number;

  pagedContent$!: Observable<PagedResponse<IUser>>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceService,
  ) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {

    //   if (!isEmpty(params) && has(params, 'page')) {
    //     // this.currentPage = Number(params['page']) - 1;
    //     const page = Number(params['page']) - 1;
    //     // this.loadPage({ page: page });
    //     this.currentPage = page;
    //   }
    //   // console.log(`Current Page: ${this.currentPage}`);
    //   this.loadPage({ page: this.currentPage });
    // });

    // Query parameter issue check
    // Reference: https://github.com/valor-software/ngx-bootstrap/issues/3289

    this.loadPage({ page: this.currentPage });
  }

  /**
   * This loads the data on the page first time and initializes the data points
   *
   * @param {*} params
   * @memberof LayoutComponent
   */
  loadPage(params: any) {
    // this.currentPage = params.page;

    this.pagedContent$ = this.apiService.getUsers(params)
      .pipe(
        tap(({ totalElements, numberOfElements, totalPages }) => {
          this.totalElements = totalElements;
          this.numberOfElements = numberOfElements;
          this.totalPages = totalPages;

          console.log(`totalElements: ${totalElements}`, `numberOfElements: ${numberOfElements}`, `totalPages: ${totalPages}`);

        }),
        map(res => res)
      );
  }

  /**
   * This call is used for any load interations after the 
   * first time `loadPage` call
   *
   * @param {*} params
   * @memberof LayoutComponent
   */
  getPage(params: any) {
    this.pagedContent$ = this.apiService.getUsers(params);
  }

  /**
   * Handle any page changed events
   *
   * @param {PageChangedEvent} event
   * @memberof LayoutComponent
   */
  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page - 1;
    this.getPage({ page: this.currentPage });
  }
}
