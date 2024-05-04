import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCommitsRepoComponent } from './data-commits-repo.component';

describe('DataCommitsRepoComponent', () => {
  let component: DataCommitsRepoComponent;
  let fixture: ComponentFixture<DataCommitsRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCommitsRepoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCommitsRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
