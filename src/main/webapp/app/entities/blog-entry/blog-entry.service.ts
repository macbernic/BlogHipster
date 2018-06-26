import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBlogEntry } from 'app/shared/model/blog-entry.model';

type EntityResponseType = HttpResponse<IBlogEntry>;
type EntityArrayResponseType = HttpResponse<IBlogEntry[]>;

@Injectable({ providedIn: 'root' })
export class BlogEntryService {
    private resourceUrl = SERVER_API_URL + 'api/blog-entries';

    constructor(private http: HttpClient) {}

    create(blogEntry: IBlogEntry): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(blogEntry);
        return this.http
            .post<IBlogEntry>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(blogEntry: IBlogEntry): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(blogEntry);
        return this.http
            .put<IBlogEntry>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBlogEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBlogEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(blogEntry: IBlogEntry): IBlogEntry {
        const copy: IBlogEntry = Object.assign({}, blogEntry, {
            date: blogEntry.date != null && blogEntry.date.isValid() ? blogEntry.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((blogEntry: IBlogEntry) => {
            blogEntry.date = blogEntry.date != null ? moment(blogEntry.date) : null;
        });
        return res;
    }
}