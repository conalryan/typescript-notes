import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { SharedService } from "../service/shared.service";
import { ExpressionChangedAfterCheckComponent } from "../container/expression-changed-after-check.component";
import { HttpExService } from "../../http-ex/http-ex.service";

@Component({
  selector: "app-child",
  template: `
    <h1>Child component</h1>
    <p>{{childInputBindingUsedInTemplate}}</p>
    <button type="button"
            class="btn btn-primary"
            id="emit"
            (click)="onEmitChildProp()">
      Emit childPropToParent
    </button>
    <h3>Shared service</h3>
    <p>{{sharedServiceProp}}</p>
    <p>{{sharedParentToChildProp}}</p>
    <p>{{sharedChildToParentProp}}</p>
  `,
  styles: []
})
export class ChildComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  @Input()
  childInputBindingUsedInTemplate;
  @Input()
  childInputBindingNotUsedInTemplate;
  @Output()
  childOutputEmitter = new EventEmitter<string>();

  sharedServiceProp;
  sharedParentToChildProp;
  sharedChildToParentProp = "sharedChildToParentProp";

  /**
   * @Input() bindings are undefined at this point.
   *
   * Injecting a shared service with the parent.
   * Modifying a shared proeprty can throw ExpressionChangedAfterCheck Error.
   *
   * @param {ExpressionChangedAfterCheckComponent} _parent
   * @param {SharedService} _sharedService
   */
  constructor(
    private _parent: ExpressionChangedAfterCheckComponent,
    private _sharedService: SharedService,
    private httpExService: HttpExService
  ) {
    console.warn("(2) Child constructor");

    // Parent
    console.log("- Parent:");
    console.log(this._parent);
    this._parent.parentPropInTemplate =
      this._parent.parentPropInTemplate + "-cC";
    this._parent._parentPropNotInTemplate =
      this._parent._parentPropNotInTemplate + "-cC";
    console.log(this._parent.parentPropInTemplate);
    console.log(this._parent._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    console.log(this.childInputBindingUsedInTemplate); // undefined
    console.log(this.childInputBindingNotUsedInTemplate); // undefined

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-cC";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedChildToParentProp = this.sharedChildToParentProp + "-cC";
    this._sharedService.childToParentProp = this.sharedChildToParentProp;
    console.log(this.sharedServiceProp); // undefined-cC
    console.log(this.sharedParentToChildProp); // undefined
    console.log(this.sharedChildToParentProp);
    console.log("\n");
  }

  /**
   * THIS IS ONLY CALLED FOR COMPONENTS THAT HAVE INPUTS
   *
   * WARNING: Do not change shared property with parent here. It will throw:
   * Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
   *   Previous value: 'updated in child constructor2345'. Current value: 'updated in child OnChanges'.
   *
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.warn("(8) Child ngOnChanges(simpleChanges: SimpleChanges)");

    // Parent
    console.log("- Parent:");
    this._parent.parentPropInTemplate =
      this._parent.parentPropInTemplate + "-cOC";
    this._parent._parentPropNotInTemplate =
      this._parent._parentPropNotInTemplate + "-cOC";
    console.log(this._parent.parentPropInTemplate);
    console.log(this._parent._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-cOC";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedChildToParentProp = this.sharedChildToParentProp + "-cOC";
    this._sharedService.childToParentProp = this.sharedChildToParentProp;
    console.log(this.sharedServiceProp); // undefined-cC-cOC
    console.log(this.sharedParentToChildProp); // undefined
    console.log(this.sharedChildToParentProp);
    console.log("\n");
  }

  ngOnInit(): void {
    console.warn("(9) Child ngOnInit");

    // Parent
    console.log("- Parent:");
    this._parent.parentPropInTemplate =
      this._parent.parentPropInTemplate + "-cOI";
    this._parent._parentPropNotInTemplate =
      this._parent._parentPropNotInTemplate + "-cOI";
    console.log(this._parent.parentPropInTemplate);
    console.log(this._parent._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared prop listener
    console.log("\n- Shared service:");
    this._sharedService.onSharedPropChange(value => {
      // this.childInputBindingUsedInTemplate = value;
      this.sharedServiceProp = value;
    });

    // Parent to child listener
    this._sharedService.onParentToChildPropChange(value => {
      this.sharedParentToChildProp = value;
    });

    this.sharedServiceProp = this.sharedServiceProp + "-cOI";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedChildToParentProp = this.sharedChildToParentProp + "-cOI";
    this._sharedService.childToParentProp = this.sharedChildToParentProp;
    console.log(this.sharedServiceProp); // undefined-cC-cOC-cOI
    console.log(this.sharedParentToChildProp); // undefined
    console.log(this.sharedChildToParentProp);

    // Http
    this.httpExService.getUsers().subscribe(res => {
      console.warn(res);
      console.log(res["data"][0]["first_name"]);
      this._sharedService.sharedProp = res["data"][0]["first_name"];
    });

    this.httpExService.getUsers().subscribe(res => {
      console.warn(res);
      console.log(res["data"][1]["first_name"]);
      this._sharedService.sharedProp = res["data"][1]["first_name"];
    });

    console.log("\n");
  }

  ngDoCheck(): void {
    console.warn("(10) Child ngDoCheck");

    // Parent
    console.log("- Parent:");
    this._parent.parentPropInTemplate =
      this._parent.parentPropInTemplate + "-cDC";
    this._parent._parentPropNotInTemplate =
      this._parent._parentPropNotInTemplate + "-cDC";
    console.log(this._parent.parentPropInTemplate);
    console.log(this._parent._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-cDC";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedChildToParentProp = this.sharedChildToParentProp + "-cDC";
    this._sharedService.childToParentProp = this.sharedChildToParentProp;
    console.log(this.sharedServiceProp); // undefined-cC-cOC-cOI-cDC
    console.log(this.sharedParentToChildProp); // undefined
    console.log(this.sharedChildToParentProp);
    console.log("\n");
  }

  ngAfterContentInit(): void {
    console.warn("(11) Child ngAfterContentInit");

    // Parent
    console.log("- Parent:");
    this._parent.parentPropInTemplate =
      this._parent.parentPropInTemplate + "-cACI";
    this._parent._parentPropNotInTemplate =
      this._parent._parentPropNotInTemplate + "-cACI";
    console.log(this._parent.parentPropInTemplate);
    console.log(this._parent._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-cACI";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedChildToParentProp = this.sharedChildToParentProp + "-cACI";
    this._sharedService.childToParentProp = this.sharedChildToParentProp;
    console.log(this.sharedServiceProp); // undefined-cC-cOC-cOI-cDC-cACI
    console.log(this.sharedParentToChildProp); // undefined
    console.log(this.sharedChildToParentProp);
    console.log("\n");
  }

  ngAfterContentChecked(): void {
    console.warn("(12) Child ngAfterContentChecked");

    // Parent
    console.log("- Parent:");
    this._parent.parentPropInTemplate =
      this._parent.parentPropInTemplate + "-cACC";
    this._parent._parentPropNotInTemplate =
      this._parent._parentPropNotInTemplate + "-cACC";
    console.log(this._parent.parentPropInTemplate);
    console.log(this._parent._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-cACC";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedChildToParentProp = this.sharedChildToParentProp + "-cACC";
    this._sharedService.childToParentProp = this.sharedChildToParentProp;
    console.log(this.sharedServiceProp); // undefined-cC-cOC-cOI-cDC-cACI-cACC
    console.log(this.sharedParentToChildProp); // undefined
    console.log(this.sharedChildToParentProp);
    console.log("\n");
  }

  ngAfterViewInit(): void {
    console.warn("(13) Child ngAfterViewInit");

    // Parent
    console.log("- Parent:");
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines: this._parent.parentPropInTemplate + '-cAVI';`
    );
    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'null: parentPropInTemplate-pC-cC-pOI-pDC-pACI-pACC-cOC-cOI-cDC-cACI-cACC'. Current value: 'null: parentPropInTemplate-pC-cC-pOI-pDC-pACI-pACC-cOC-cOI-cDC-cACI-cACC-cAVI'.
    // this._parent.parentPropInTemplate = this._parent.parentPropInTemplate + '-cAVI';
    console.log(this._parent.parentPropInTemplate); // parentPropInTemplate-pC-cC-pOI-pDC-pACI-pACC-cOC-cOI-cDC-cACI-cACC

    this._parent._parentPropNotInTemplate =
      this._parent._parentPropNotInTemplate + "-cAVI";
    console.log(this._parent._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines: this.sharedServiceProp + '-cAVI';`
    );
    // ExpressionChangedAfterCheckComponent.html:5 ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'null: undefined-cC-cOC-cOI-cDC-cACI-cACC'. Current value: 'null: undefined-cC-cOC-cOI-cDC-cACI-cACC-cAVI'.
    // this.sharedServiceProp = this.sharedServiceProp + '-cAVI';
    // this._sharedService.sharedProp = this.sharedServiceProp;
    console.log(this.sharedServiceProp); // undefined-cC-cOC-cOI-cDC-cACI-cACC

    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'null: sharedChildToParentProp-cC-cOC-cOI-cDC-cACI-cACC'. Current value: 'null: sharedChildToParentProp-cC-cOC-cOI-cDC-cACI-cACC-cAVI'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines: this.sharedChildToParentProp + '-cAVI'`
    );
    // this.sharedChildToParentProp = this.sharedChildToParentProp + '-cAVI';
    // this._sharedService.childToParentProp = this.sharedChildToParentProp;
    console.log(this.sharedChildToParentProp); // sharedChildToParentProp-cC-cOC-cOI-cDC-cACI-cACC

    console.log(this.sharedParentToChildProp); // undefined
    console.log("\n");
  }

  ngAfterViewChecked(): void {
    console.warn("(14) Child ngAfterViewChecked");

    // Parent
    console.log("- Parent:");
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines: this._parent.parentPropInTemplate + '-cAVC';`
    );
    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'null: parentPropInTemplate-pC-cC-pOI-pDC-pACI-pACC-cOC-cOI-cDC-cACI-cACC'. Current value: 'null: parentPropInTemplate-pC-cC-pOI-pDC-pACI-pACC-cOC-cOI-cDC-cACI-cACC-cAVC'.
    // this._parent.parentPropInTemplate = this._parent.parentPropInTemplate + '-cAVC';
    console.log(this._parent.parentPropInTemplate); // parentPropInTemplate-pC-cC-pOI-pDC-pACI-pACC-cOC-cOI-cDC-cACI-cACC

    this._parent._parentPropNotInTemplate =
      this._parent._parentPropNotInTemplate + "-cAVC";
    console.log(this._parent._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines: this.sharedServiceProp + '-cAVC';`
    );
    // ExpressionChangedAfterCheckComponent.html:5 ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'null: undefined-cC-cOC-cOI-cDC-cACI-cACC'. Current value: 'null: undefined-cC-cOC-cOI-cDC-cACI-cACC-cAVC'.
    // this.sharedServiceProp = this.sharedServiceProp + '-cAVC';
    // this._sharedService.sharedProp = this.sharedServiceProp;
    console.log(this.sharedServiceProp); // undefined-cC-cOC-cOI-cDC-cACI-cACC

    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'null: sharedChildToParentProp-cC-cOC-cOI-cDC-cACI-cACC'. Current value: 'null: sharedChildToParentProp-cC-cOC-cOI-cDC-cACI-cACC-cAVC'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines: this.sharedChildToParentProp + '-cAVC'`
    );
    // this.sharedChildToParentProp = this.sharedChildToParentProp + '-cAVC';
    // this._sharedService.childToParentProp = this.sharedChildToParentProp;
    console.log(this.sharedChildToParentProp); // sharedChildToParentProp-cC-cOC-cOI-cDC-cACI-cACC

    console.log(this.sharedParentToChildProp); // undefined
    console.log("\n");
  }

  /**
   * When this is called:
   * 1. Parent DoCheck
   * 2. Parent AfterContentChecked
   * 3.   Child DoCheck
   * 4.   Child AfterContentChecked
   * 5.   Child AfterViewChecked
   * 6. Parent AfterViewChecked.
   */
  onEmitChildProp() {
    console.warn("Child onEmitChildProp");
    this.childOutputEmitter.emit("Child output value");
  }
}
