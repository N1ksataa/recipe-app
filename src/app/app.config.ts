import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { appInterceptor } from './app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
  provideHttpClient(withInterceptors([appInterceptor]), withFetch()),
  provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes), 
  provideClientHydration(withEventReplay())]
};
