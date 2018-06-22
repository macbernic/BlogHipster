import { NgModule } from '@angular/core';

import { BlogHipsterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [BlogHipsterSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [BlogHipsterSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BlogHipsterSharedCommonModule {}
