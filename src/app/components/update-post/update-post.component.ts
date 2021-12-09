import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { DeclarativeCategoryService } from 'src/app/services/DeclarativeCategory.service';
import { DeclarativePostService } from 'src/app/services/DeclarativePost.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePostComponent {
  postId: string = '';
  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(''),
  });
  categories$ = this.categoryService.categories$;

  post$ = this.postService.post$.pipe(
    tap((post: any) => {
      // this.postId = post.id ?? post.id
      this.postId = post?.id + '';
      this.postForm.setValue({
        title: post?.title,
        description: post?.description,
        categoryId: post?.categoryId,
      });
    })
  );

  constructor(
    private categoryService: DeclarativeCategoryService,
    private postService: DeclarativePostService
  ) {}

  onUpdatePost() {
    let postDetails = {
      ...this.postForm.value,
      id: this.postId,
    };
    console.log(' post details ', postDetails);
    this.postService.updatePost(postDetails);
  }
}
