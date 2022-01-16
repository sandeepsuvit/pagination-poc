import { map, Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { IUser } from 'src/app/user.interface';
import { PagedResponse } from 'src/app/paged-response.interface';
import { has, isEmpty } from 'lodash';

@Component({
  selector: 'app-type-two',
  templateUrl: './type-two.component.html',
  styleUrls: ['./type-two.component.scss']
})
export class TypeTwoComponent implements OnInit {
  users$!: Observable<IUser[]>;
  p!: number;
  total!: number;
  size!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (!isEmpty(params) && has(params, 'page')) {
        const page = Number(params['page']) - 1;
        
        this.loadPage(page);
      } else {
        this.loadPage(0);
      }
    });

    // this.loadPage(0);
  }

  loadPage(page: number) {
    this.users$ = this.apiService.getUsers({ page }).pipe(
      tap(res => {
        console.log(res);
        
        this.total = res.totalElements;
        this.size = res.size;
        
        // For displaying the page number
        this.p = res.number + 1;
      }),
      map(res => res.content)
    );
  }

  getPage(page: number) {
    // this.loadPage(page - 1);
    this.router.navigate(['/two'], { queryParams: { page } });
  }

}
