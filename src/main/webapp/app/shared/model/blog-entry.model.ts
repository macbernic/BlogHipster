import { Moment } from 'moment';
import { IBlog } from 'app/shared/model//blog.model';
import { IUser } from 'app/core/user/user.model';
import { ITag } from 'app/shared/model//tag.model';

export interface IBlogEntry {
    id?: number;
    title?: string;
    content?: any;
    date?: Moment;
    blog?: IBlog;
    writtenBy?: IUser;
    tags?: ITag[];
}

export class BlogEntry implements IBlogEntry {
    constructor(
        public id?: number,
        public title?: string,
        public content?: any,
        public date?: Moment,
        public blog?: IBlog,
        public writtenBy?: IUser,
        public tags?: ITag[]
    ) {}
}