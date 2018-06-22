import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlogHipsterBlogModule } from './blog/blog.module';
import { BlogHipsterBlogEntryModule } from './blog-entry/blog-entry.module';
import { BlogHipsterTagModule } from './tag/tag.module';
import { BlogHipsterBlogEntryCommentModule } from './blog-entry-comment/blog-entry-comment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        BlogHipsterBlogModule,
        BlogHipsterBlogEntryModule,
        BlogHipsterTagModule,
        BlogHipsterBlogEntryCommentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogHipsterEntityModule {}
