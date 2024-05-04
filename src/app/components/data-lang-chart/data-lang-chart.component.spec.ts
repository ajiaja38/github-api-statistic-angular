import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLangChartComponent } from './data-lang-chart.component';

describe('DataLangChartComponent', () => {
  let component: DataLangChartComponent;
  let fixture: ComponentFixture<DataLangChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLangChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataLangChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
