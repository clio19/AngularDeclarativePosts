import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { DeclarativeCategoryService } from 'src/app/services/DeclarativeCategory.service';
import { DeclarativePostService } from 'src/app/services/DeclarativePost.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(''),
  });

  categories$ = this.categoryService.categories$;
  constructor(
    private categoryService: DeclarativeCategoryService,
    private postService: DeclarativePostService
  ) {}

  ngOnInit(): void {}

  onAddPost() {
    console.log(this.postForm.value);
    this.postService.addPost(this.postForm.value);
  }
}
