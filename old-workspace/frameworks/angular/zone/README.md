# AngularZone
https://blog.angularindepth.com/do-you-still-think-that-ngzone-zone-js-is-required-for-change-detection-in-angular-16f7a575afef

 Zone and NgZone is used to automatically trigger change detection as a result of async operations. But since change detection is a separate mechanism it can successfully work without Zone and NgZone.
 
 version 5 of Angular simplified things for me. It now provides a way to use a noop Zone that doesn’t do anything through configuration.
 
 To do that let’s first remove dependency on zone.js. I’ll use stackblitz to demo the application and since it uses Angular-CLI I will remove the following import from polyfils.ts file:
 
 * Zone JS is required by Angular itself. */
 import 'zone.js/dist/zone';  // Included with Angular CLI.
 After that I’ll configure Angular to use the noop Zone implementation like this:
 
 platformBrowserDynamic()
     .bootstrapModule(AppModule, {
         ngZone: 'noop'
     });
 If you now run the application you will see that change detection is fully operational and renders name component property in the DOM.
 
 Now if we update this property using setTimeout:
 
 export class AppComponent  {
     name = 'Angular 4';
 
     constructor() {
         setTimeout(() => {
             this.name = 'updated';
         }, 1000);
     }
     
You can see that the change is not updated. And it’s expected since NgZone is not used and hence change detection is not triggered automatically. Yet it still works fine if we trigger it manually. This can be done by injecting ApplicationRef and triggering tick method to start change detection:

export class AppComponent  {
    name = 'Angular 4';

    constructor(app: ApplicationRef) {
        setTimeout(()=>{
            this.name = 'updated';
            app.tick();
        }, 1000);
    }
    

