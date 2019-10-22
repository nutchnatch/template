import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardedContentComponent } from './modules/tsp-ui/guarded-content/guarded-content.component';

import { AuthGuardService } from './services/auth-guard.services';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'welcome', pathMatch: 'full' ,
		//component: GuardedContentComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: '**',
		component: GuardedContentComponent,
		canActivate: [AuthGuardService]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
