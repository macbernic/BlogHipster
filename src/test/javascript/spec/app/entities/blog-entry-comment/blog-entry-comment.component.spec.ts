/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogHipsterTestModule } from '../../../test.module';
import { BlogEntryCommentComponent } from 'app/entities/blog-entry-comment/blog-entry-comment.component';
import { BlogEntryCommentService } from 'app/entities/blog-entry-comment/blog-entry-comment.service';
import { BlogEntryComment } from 'app/shared/model/blog-entry-comment.model';

describe('Component Tests', () => {
    describe('BlogEntryComment Management Component', () => {
        let comp: BlogEntryCommentComponent;
        let fixture: ComponentFixture<BlogEntryCommentComponent>;
        let service: BlogEntryCommentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlogHipsterTestModule],
                declarations: [BlogEntryCommentComponent],
                providers: []
            })
                .overrideTemplate(BlogEntryCommentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BlogEntryCommentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlogEntryCommentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BlogEntryComment(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.blogEntryComments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
