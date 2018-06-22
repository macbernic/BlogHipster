import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { BlogEntryComment } from 'app/shared/model/blog-entry-comment.model';
import { BlogEntryCommentService } from './blog-entry-comment.service';
import { BlogEntryCommentComponent } from './blog-entry-comment.component';
import { BlogEntryCommentDetailComponent } from './blog-entry-comment-detail.component';
import { BlogEntryCommentUpdateComponent } from './blog-entry-comment-update.component';
import { BlogEntryCommentDeletePopupComponent } from './blog-entry-comment-delete-dialog.component';
import { IBlogEntryComment } from 'app/shared/model/blog-entry-comment.model';

@Injectable({ providedIn: 'root' })
export class BlogEntryCommentResolve implements Resolve<IBlogEntryComment> {
    constructor(private service: BlogEntryCommentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((blogEntryComment: HttpResponse<BlogEntryComment>) => blogEntryComment.body);
        }
        return Observable.of(new BlogEntryComment());
    }
}

export const blogEntryCommentRoute: Routes = [
    {
        path: 'blog-entry-comment',
        component: BlogEntryCommentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntryComments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blog-entry-comment/:id/view',
        component: BlogEntryCommentDetailComponent,
        resolve: {
            blogEntryComment: BlogEntryCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntryComments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blog-entry-comment/new',
        component: BlogEntryCommentUpdateComponent,
        resolve: {
            blogEntryComment: BlogEntryCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntryComments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blog-entry-comment/:id/edit',
        component: BlogEntryCommentUpdateComponent,
        resolve: {
            blogEntryComment: BlogEntryCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntryComments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blogEntryCommentPopupRoute: Routes = [
    {
        path: 'blog-entry-comment/:id/delete',
        component: BlogEntryCommentDeletePopupComponent,
        resolve: {
            blogEntryComment: BlogEntryCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntryComments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
