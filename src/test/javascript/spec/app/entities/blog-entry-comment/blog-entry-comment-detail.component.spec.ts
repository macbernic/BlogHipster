/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogHipsterTestModule } from '../../../test.module';
import { BlogEntryCommentDetailComponent } from 'app/entities/blog-entry-comment/blog-entry-comment-detail.component';
import { BlogEntryComment } from 'app/shared/model/blog-entry-comment.model';

describe('Component Tests', () => {
    describe('BlogEntryComment Management Detail Component', () => {
        let comp: BlogEntryCommentDetailComponent;
        let fixture: ComponentFixture<BlogEntryCommentDetailComponent>;
        const route = ({ data: of({ blogEntryComment: new BlogEntryComment(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlogHipsterTestModule],
                declarations: [BlogEntryCommentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BlogEntryCommentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BlogEntryCommentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.blogEntryComment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
