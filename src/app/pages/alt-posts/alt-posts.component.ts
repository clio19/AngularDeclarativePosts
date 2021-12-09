import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, map, tap } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { DeclarativePostService } from 'src/app/services/DeclarativePost.service';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AltPostsComponent {
  showAddPost = false;
  // posts$ = this.postService.postsWithCategory$.pipe(
  posts$ = this.postService.allPosts$.pipe(
    tap((posts) => {
      posts[0].id && this.postService.selectedPost(posts[0].id);
    })
  );
  selectedPost$ = this.postService.post$.pipe(
    tap((data) => {
      console.log(' Firing data  ');
    })
  );

  vm$ = combineLatest([this.posts$, this.selectedPost$]).pipe(
    map(([posts, selectedPost]) => {
      return { posts, selectedPost };
    })
  ); // Avoid multiple request on Observable

  constructor(private postService: DeclarativePostService) {}

  onSelectPost(post: IPost, event: Event) {
    event.preventDefault();
    // console.log(post);
    this.showAddPost = false;
    post.id && this.postService.selectedPost(post.id);
  }

  onAddPost() {
    this.showAddPost = true;
  }
}
