import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBlogEntry } from 'app/shared/model/blog-entry.model';
import { BlogEntryService } from './blog-entry.service';
import { IBlog } from 'app/shared/model/blog.model';
import { BlogService } from 'app/entities/blog';
import { IUser, UserService } from 'app/core';
import { ITag } from 'app/shared/model/tag.model';
import { TagService } from 'app/entities/tag';

@Component({
    selector: 'jhi-blog-entry-update',
    templateUrl: './blog-entry-update.component.html'
})
export class BlogEntryUpdateComponent implements OnInit {
    private _blogEntry: IBlogEntry;
    isSaving: boolean;

    blogs: IBlog[];

    users: IUser[];

    tags: ITag[];
    date: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private blogEntryService: BlogEntryService,
        private blogService: BlogService,
        private userService: UserService,
        private tagService: TagService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ blogEntry }) => {
            this.blogEntry = blogEntry;
        });
        this.blogService.query().subscribe(
            (res: HttpResponse<IBlog[]>) => {
                this.blogs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tagService.query().subscribe(
            (res: HttpResponse<ITag[]>) => {
                this.tags = res.body;
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
        this.blogEntry.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.blogEntry.id !== undefined) {
            this.subscribeToSaveResponse(this.blogEntryService.update(this.blogEntry));
        } else {
            this.subscribeToSaveResponse(this.blogEntryService.create(this.blogEntry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBlogEntry>>) {
        result.subscribe((res: HttpResponse<IBlogEntry>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBlogById(index: number, item: IBlog) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackTagById(index: number, item: ITag) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get blogEntry() {
        return this._blogEntry;
    }

    set blogEntry(blogEntry: IBlogEntry) {
        this._blogEntry = blogEntry;
        this.date = moment(blogEntry.date).format(DATE_TIME_FORMAT);
    }
}
