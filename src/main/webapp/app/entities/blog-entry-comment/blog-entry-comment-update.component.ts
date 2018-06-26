import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBlogEntryComment } from 'app/shared/model/blog-entry-comment.model';
import { BlogEntryCommentService } from './blog-entry-comment.service';
import { IBlogEntry } from 'app/shared/model/blog-entry.model';
import { BlogEntryService } from 'app/entities/blog-entry';
import { IUser, UserService } from 'app/core';

@Component({
    selector: '-blog-entry-comment-update',
    templateUrl: './blog-entry-comment-update.component.html'
})
export class BlogEntryCommentUpdateComponent implements OnInit {
    private _blogEntryComment: IBlogEntryComment;
    isSaving: boolean;

    blogentries: IBlogEntry[];

    blogentrycomments: IBlogEntryComment[];

    users: IUser[];
    date: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private blogEntryCommentService: BlogEntryCommentService,
        private blogEntryService: BlogEntryService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ blogEntryComment }) => {
            this.blogEntryComment = blogEntryComment;
        });
        this.blogEntryService.query().subscribe(
            (res: HttpResponse<IBlogEntry[]>) => {
                this.blogentries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.blogEntryCommentService.query().subscribe(
            (res: HttpResponse<IBlogEntryComment[]>) => {
                this.blogentrycomments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.blogEntryComment.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.blogEntryComment.id !== undefined) {
            this.subscribeToSaveResponse(this.blogEntryCommentService.update(this.blogEntryComment));
        } else {
            this.subscribeToSaveResponse(this.blogEntryCommentService.create(this.blogEntryComment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBlogEntryComment>>) {
        result.subscribe((res: HttpResponse<IBlogEntryComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBlogEntryById(index: number, item: IBlogEntry) {
        return item.id;
    }

    trackBlogEntryCommentById(index: number, item: IBlogEntryComment) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get blogEntryComment() {
        return this._blogEntryComment;
    }

    set blogEntryComment(blogEntryComment: IBlogEntryComment) {
        this._blogEntryComment = blogEntryComment;
        this.date = moment(blogEntryComment.date).format(DATE_TIME_FORMAT);
    }
}
