import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoFocusDirective } from './autofocus/auto-focus.directive';
import { CardHoverComponent } from './card-hover/card-hover.component';
import { CardHoverDirective } from './card-hover/card-hover.directive';
import { ClassDirectiveComponent } from './class-directive/class-directive.component';
import { ClassDirective } from './class-directive/class.directive';
import { TestClickDirective } from './testing-directives/test-click.directive';
import { CustomMaxDirective } from './custom-max/custom-max.directive';
import { CustomMinDirective } from './custom-min/custom-min.directive';
import { DirectivesRoutingModule } from './directives-routing.module';
import { ElementDirectiveWrapperComponent } from './element-directive/element-directive-wrapper.component';
import { ElementDirectiveComponent } from './element-directive/element-directive.component';
import { ElementDirective } from './element-directive/element.directive';
import { ParagraphElementDirective } from './element-directive/paragraph-element.directive';
import { HostBindingComponent } from './host-binding/host-binding.component';
import { HostBindingExDirective, NgModelEx } from './host-binding/host-binding.directive';
import { HostListenerComponent } from './host-listener/host-listener.component';
import { CountingDirective, HostListenerExDirective } from './host-listener/host-listener.directive';
import { IfComponent } from './if/if.component';
import { IfDirective } from './if/if.directive';
import { SpyDirective } from './spy-directive/spy.directive';

@NgModule({
  imports: [CommonModule, FormsModule, DirectivesRoutingModule],
  declarations: [
    CardHoverDirective,
    CardHoverComponent,
    ClassDirective,
    ClassDirectiveComponent,
    HostListenerComponent,
    HostListenerExDirective,
    CountingDirective,
    HostBindingComponent,
    HostBindingExDirective,
    NgModelEx,
    CustomMinDirective,
    CustomMaxDirective,
    SpyDirective,
    AutoFocusDirective,
    IfDirective,
    IfComponent,
    ElementDirective,
    ElementDirectiveComponent,
    ElementDirectiveWrapperComponent,
    ParagraphElementDirective,
    TestClickDirective
  ],
  exports: [
    CustomMinDirective,
    CustomMaxDirective,
    SpyDirective,
    AutoFocusDirective
  ]
})
export class DirectivesModule {}
