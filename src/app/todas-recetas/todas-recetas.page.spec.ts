import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodasRecetasPage } from './todas-recetas.page';

describe('TodasRecetasPage', () => {
  let component: TodasRecetasPage;
  let fixture: ComponentFixture<TodasRecetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodasRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
