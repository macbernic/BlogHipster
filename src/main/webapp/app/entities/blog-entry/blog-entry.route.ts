import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { BlogEntry } from 'app/shared/model/blog-entry.model';
import { BlogEntryService } from './blog-entry.service';
import { BlogEntryComponent } from './blog-entry.component';
import { BlogEntryDetailComponent } from './blog-entry-detail.component';
import { BlogEntryUpdateComponent } from './blog-entry-update.component';
import { BlogEntryDeletePopupComponent } from './blog-entry-delete-dialog.component';
import { IBlogEntry } from 'app/shared/model/blog-entry.model';

@Injectable({ providedIn: 'root' })
export class BlogEntryResolve implements Resolve<IBlogEntry> {
    constructor(private service: BlogEntryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((blogEntry: HttpResponse<BlogEntry>) => blogEntry.body);
        }
        return Observable.of(new BlogEntry());
    }
}

export const blogEntryRoute: Routes = [
    {
        path: 'blog-entry',
        component: BlogEntryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blog-entry/:id/view',
        component: BlogEntryDetailComponent,
        resolve: {
            blogEntry: BlogEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blog-entry/new',
        component: BlogEntryUpdateComponent,
        resolve: {
            blogEntry: BlogEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blog-entry/:id/edit',
        component: BlogEntryUpdateComponent,
        resolve: {
            blogEntry: BlogEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blogEntryPopupRoute: Routes = [
    {
        path: 'blog-entry/:id/delete',
        component: BlogEntryDeletePopupComponent,
        resolve: {
            blogEntry: BlogEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BlogEntries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
