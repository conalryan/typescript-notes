# HttpClient example

https://angular.io/guide/http

- HTTP protocol:
  - Most front-end applications communicate with backend services over the HTTP protocol.
  - Modern browsers support two different APIs for making HTTP requests:
    1. XMLHttpRequest interface.
    2. fetch() API.

- HttpClient:
  - @angular/common/http
  - Offers a simplified client HTTP API for Angular applications that rests on the XMLHttpRequest interface exposed by browsers.
  - Inject the HttpClient into an application class 
  - Benefits:
    - Testability features
    - Typed request and response objects
    - Request and response interception
    - Observable apis
    - Streamlined error handling
    
- HttpClientModule:
  - Import the Angular HttpClientModule
  - Most apps do so in the root AppModule
 
