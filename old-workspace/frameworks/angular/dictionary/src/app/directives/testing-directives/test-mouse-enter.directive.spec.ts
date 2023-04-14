import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestMouseEnterDirective } from './test-mouse-enter.directive';

@Component({
  selector: 'test-cmp',
  template: `
    <button type="button" id="btn" hccTestMouseEnter>Mouse over me!</button>
  `
})
class TestComponent {

}
describe('TestMouseEnterDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TestComponent, TestMouseEnterDirective]
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
    expect(btn.nativeElement.style.backgroundColor).toEqual('');

    btn.nativeElement.dispatchEvent(new Event('mouseenter'));
    console.log(btn);
    expect(btn.nativeElement.style.backgroundColor).toEqual('yellow');
  });
});
