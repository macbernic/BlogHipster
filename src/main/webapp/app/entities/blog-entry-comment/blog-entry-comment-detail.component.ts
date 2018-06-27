import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IBlogEntryComment } from 'app/shared/model/blog-entry-comment.model';

@Component({
    selector: 'jhi-blog-entry-comment-detail',
    templateUrl: './blog-entry-comment-detail.component.html'
})
export class BlogEntryCommentDetailComponent implements OnInit {
    blogEntryComment: IBlogEntryComment;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blogEntryComment }) => {
            this.blogEntryComment = blogEntryComment;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
