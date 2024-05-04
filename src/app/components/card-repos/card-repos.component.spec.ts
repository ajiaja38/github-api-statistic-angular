import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReposComponent } from './card-repos.component';

describe('CardReposComponent', () => {
  let component: CardReposComponent;
  let fixture: ComponentFixture<CardReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
