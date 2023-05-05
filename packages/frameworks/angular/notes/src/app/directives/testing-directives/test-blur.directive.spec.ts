import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestBlurDirective } from './test-blur.directive';

@Component({
  selector: 'test-cmp',
  template: `
    <button type="button" id="btn" hccTestBlur>Blur me!</button>
  `
})
class TestComponent {

}
describe('TestBlurDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let comp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TestComponent, TestBlurDirective]
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

    btn.nativeElement.dispatchEvent(new Event('blur'));
    console.log(btn);
    expect(btn.nativeElement.style.backgroundColor).toEqual('yellow');
  });
});
