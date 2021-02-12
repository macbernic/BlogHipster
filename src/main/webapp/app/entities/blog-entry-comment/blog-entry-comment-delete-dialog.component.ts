import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBlogEntryComment } from 'app/shared/model/blog-entry-comment.model';
import { BlogEntryCommentService } from './blog-entry-comment.service';

@Component({
    selector: 'jhi-blog-entry-comment-delete-dialog',
    templateUrl: './blog-entry-comment-delete-dialog.component.html'
})
export class BlogEntryCommentDeleteDialogComponent {
    blogEntryComment: IBlogEntryComment;

    constructor(
        private blogEntryCommentService: BlogEntryCommentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blogEntryCommentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'blogEntryCommentListModification',
                content: 'Deleted an blogEntryComment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-blog-entry-comment-delete-popup',
    template: ''
})
export class BlogEntryCommentDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blogEntryComment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BlogEntryCommentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.blogEntryComment = blogEntryComment;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
