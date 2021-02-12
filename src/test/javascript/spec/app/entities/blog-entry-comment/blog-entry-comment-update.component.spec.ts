/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BlogHipsterTestModule } from '../../../test.module';
import { BlogEntryCommentUpdateComponent } from 'app/entities/blog-entry-comment/blog-entry-comment-update.component';
import { BlogEntryCommentService } from 'app/entities/blog-entry-comment/blog-entry-comment.service';
import { BlogEntryComment } from 'app/shared/model/blog-entry-comment.model';

describe('Component Tests', () => {
    describe('BlogEntryComment Management Update Component', () => {
        let comp: BlogEntryCommentUpdateComponent;
        let fixture: ComponentFixture<BlogEntryCommentUpdateComponent>;
        let service: BlogEntryCommentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlogHipsterTestModule],
                declarations: [BlogEntryCommentUpdateComponent]
            })
                .overrideTemplate(BlogEntryCommentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BlogEntryCommentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlogEntryCommentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BlogEntryComment(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.blogEntryComment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BlogEntryComment();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.blogEntryComment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
