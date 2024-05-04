import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSizeRepoComponent } from './data-size-repo.component';

describe('DataSizeRepoComponent', () => {
  let component: DataSizeRepoComponent;
  let fixture: ComponentFixture<DataSizeRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSizeRepoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSizeRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
