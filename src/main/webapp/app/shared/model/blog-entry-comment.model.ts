import { Moment } from 'moment';
import { IBlogEntry } from 'app/shared/model//blog-entry.model';
import { IBlogEntryComment } from 'app/shared/model//blog-entry-comment.model';
import { IUser } from 'app/core/user/user.model';

export interface IBlogEntryComment {
    id?: number;
    title?: string;
    content?: any;
    date?: Moment;
    blogEntry?: IBlogEntry;
    parent?: IBlogEntryComment;
    writtenBy?: IUser;
}

export class BlogEntryComment implements IBlogEntryComment {
    constructor(
        public id?: number,
        public title?: string,
        public content?: any,
        public date?: Moment,
        public blogEntry?: IBlogEntry,
        public parent?: IBlogEntryComment,
        public writtenBy?: IUser
    ) {}
}
