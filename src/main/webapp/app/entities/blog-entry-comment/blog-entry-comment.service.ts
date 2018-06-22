import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBlogEntryComment } from 'app/shared/model/blog-entry-comment.model';

type EntityResponseType = HttpResponse<IBlogEntryComment>;
type EntityArrayResponseType = HttpResponse<IBlogEntryComment[]>;

@Injectable({ providedIn: 'root' })
export class BlogEntryCommentService {
    private resourceUrl = SERVER_API_URL + 'api/blog-entry-comments';

    constructor(private http: HttpClient) {}

    create(blogEntryComment: IBlogEntryComment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(blogEntryComment);
        return this.http
            .post<IBlogEntryComment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(blogEntryComment: IBlogEntryComment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(blogEntryComment);
        return this.http
            .put<IBlogEntryComment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBlogEntryComment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBlogEntryComment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(blogEntryComment: IBlogEntryComment): IBlogEntryComment {
        const copy: IBlogEntryComment = Object.assign({}, blogEntryComment, {
            date: blogEntryComment.date != null && blogEntryComment.date.isValid() ? blogEntryComment.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((blogEntryComment: IBlogEntryComment) => {
            blogEntryComment.date = blogEntryComment.date != null ? moment(blogEntryComment.date) : null;
        });
        return res;
    }
}
