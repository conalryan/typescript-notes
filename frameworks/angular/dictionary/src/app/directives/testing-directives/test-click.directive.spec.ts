import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestClickDirective } from './test-click.directive';

@Component({
  selector: 'test-cmp',
  template: `
    <button type="button" id="btn" hccTestClick>Click me!</button>
  `
})
class TestComponent {

}
describe('TestClickDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TestComponent, TestClickDirective]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  it('should toggle background', () => {
    const btn = fixture.debugElement.query(By.css('#btn'));
    console.log(btn);

    btn.nativeElement.dispatchEvent(new Event('click'));
    console.log(btn);
    expect(btn.nativeElement.style.backgroundColor).toEqual('yellow');
  });
});
