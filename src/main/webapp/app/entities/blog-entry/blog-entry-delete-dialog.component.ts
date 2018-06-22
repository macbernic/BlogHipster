import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBlogEntry } from 'app/shared/model/blog-entry.model';
import { BlogEntryService } from './blog-entry.service';

@Component({
    selector: '-blog-entry-delete-dialog',
    templateUrl: './blog-entry-delete-dialog.component.html'
})
export class BlogEntryDeleteDialogComponent {
    blogEntry: IBlogEntry;

    constructor(private blogEntryService: BlogEntryService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blogEntryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'blogEntryListModification',
                content: 'Deleted an blogEntry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '-blog-entry-delete-popup',
    template: ''
})
export class BlogEntryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blogEntry }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BlogEntryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.blogEntry = blogEntry;
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
