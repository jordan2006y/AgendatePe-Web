import { ComponentFixture, TestBed } from '@angular/core/testing';

import { perfil } from './perfil';

describe('perfil, () => {
  let component: perfil;
  let fixture: ComponentFixture<perfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [perfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(perfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
