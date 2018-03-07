import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    Ng2Webstorage,
    LocalStorageService,
    SessionStorageService,
} from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { MultisicSharedModule, UserRouteAccessService } from './shared';
import { MultisicAppRoutingModule } from './app-routing.module';
import { MultisicHomeModule } from './home/home.module';
import { MultisicAdminModule } from './admin/admin.module';
import { MultisicAccountModule } from './account/account.module';
import { MultisicMusicViewModule } from './musicView/musicView.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent,
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        MultisicAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        MultisicSharedModule,
        MultisicHomeModule,
        MultisicAdminModule,
        MultisicAccountModule,
        MultisicMusicViewModule,
        VgCoreModule,
        VgControlsModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector],
        },
    ],
    bootstrap: [JhiMainComponent],
})
export class MultisicAppModule {}
