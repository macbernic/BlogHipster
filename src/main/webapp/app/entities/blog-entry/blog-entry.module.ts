import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogHipsterSharedModule } from 'app/shared';
import { BlogHipsterAdminModule } from 'app/admin/admin.module';
import {
    BlogEntryComponent,
    BlogEntryDetailComponent,
    BlogEntryUpdateComponent,
    BlogEntryDeletePopupComponent,
    BlogEntryDeleteDialogComponent,
    blogEntryRoute,
    blogEntryPopupRoute
} from './';

const ENTITY_STATES = [...blogEntryRoute, ...blogEntryPopupRoute];

@NgModule({
    imports: [BlogHipsterSharedModule, BlogHipsterAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BlogEntryComponent,
        BlogEntryDetailComponent,
        BlogEntryUpdateComponent,
        BlogEntryDeleteDialogComponent,
        BlogEntryDeletePopupComponent
    ],
    entryComponents: [BlogEntryComponent, BlogEntryUpdateComponent, BlogEntryDeleteDialogComponent, BlogEntryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogHipsterBlogEntryModule {}
