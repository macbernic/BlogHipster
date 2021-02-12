import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogHipsterSharedModule } from 'app/shared';
import { BlogHipsterAdminModule } from 'app/admin/admin.module';
import {
    BlogEntryCommentComponent,
    BlogEntryCommentDetailComponent,
    BlogEntryCommentUpdateComponent,
    BlogEntryCommentDeletePopupComponent,
    BlogEntryCommentDeleteDialogComponent,
    blogEntryCommentRoute,
    blogEntryCommentPopupRoute
} from './';

const ENTITY_STATES = [...blogEntryCommentRoute, ...blogEntryCommentPopupRoute];

@NgModule({
    imports: [BlogHipsterSharedModule, BlogHipsterAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BlogEntryCommentComponent,
        BlogEntryCommentDetailComponent,
        BlogEntryCommentUpdateComponent,
        BlogEntryCommentDeleteDialogComponent,
        BlogEntryCommentDeletePopupComponent
    ],
    entryComponents: [
        BlogEntryCommentComponent,
        BlogEntryCommentUpdateComponent,
        BlogEntryCommentDeleteDialogComponent,
        BlogEntryCommentDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogHipsterBlogEntryCommentModule {}
