import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DeclarativeCategoryService } from 'src/app/services/DeclarativeCategory.service';
import { DeclarativePostService } from 'src/app/services/DeclarativePost.service';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarativePostsComponent implements OnInit {
  selectedCategoryId = '';
  // posts$ = this.postService.postsWithCategory$;
  posts$ = this.postService.allPosts$;
  categories$ = this.categoryService.categories$;

  selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();

  filteredPosts$ = combineLatest([
    this.posts$,
    this.selectedCategoryAction$,
  ]).pipe(
    tap((data) => {
      this.loaderService.hideLoader();
    }),
    map(([posts, selectedCategory]) => {
      return posts.filter((post: any) =>
        selectedCategory ? post.categoryId === selectedCategory : true
      );
    })
  );

  // filteredPosts$ = this.posts$.pipe(
  //   map((posts) => {
  //     return posts.filter((post) =>
  //       this.selectedCategoryId
  //         ? post.categoryId === this.selectedCategoryId
  //         : true
  //     );
  //   })
  // );

  constructor(
    private loaderService: LoaderService,
    private postService: DeclarativePostService,
    private categoryService: DeclarativeCategoryService
  ) {}

  ngOnInit(): void {
    this.loaderService.showLoader();
  }
  onCategoryChange(event: Event) {
    let selectedCategoryId = (event.target as HTMLSelectElement).value;
    this.selectedCategoryId = selectedCategoryId;
    console.log(' Category', selectedCategoryId);
  }
}
