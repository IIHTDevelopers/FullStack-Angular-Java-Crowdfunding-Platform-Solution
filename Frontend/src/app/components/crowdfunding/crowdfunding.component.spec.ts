import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CrowdfundingComponent } from './crowdfunding.component';
import { CrowdfundingService } from '../../services/crowdfunding.service';
import { Investment } from 'src/app/models/investment.model';
import { Project } from 'src/app/models/project.model';

describe('CrowdfundingComponent', () => {
  let component: CrowdfundingComponent;
  let service: CrowdfundingService;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<CrowdfundingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrowdfundingComponent],
      imports: [HttpClientTestingModule],
      providers: [CrowdfundingService]
    });
    fixture = TestBed.createComponent(CrowdfundingComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CrowdfundingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should create a project', () => {
      const newProject: Project = {
        name: 'New Project',
        description: 'A new crowdfunding project',
        goalAmount: 10000,
        amountRaised: 0
      };

      component.projectForm.setValue({
        name: newProject.name,
        description: newProject.description,
        goalAmount: newProject.goalAmount,
        amountRaised: newProject.amountRaised
      });

      component.onSubmit();

      const req = httpTestingController.expectOne(`${service.apiUrl}/projects`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newProject);
      req.flush(newProject);
    });

    it('should create an investment', () => {
      const newInvestment: Investment = {
        amount: 500,
        investorName: 'John Doe',
        projectId: '1'
      };

      component.investmentForm.setValue({
        amount: newInvestment.amount,
        investorName: newInvestment.investorName,
        projectId: newInvestment.projectId
      });

      component.submitInvestment();

      const req = httpTestingController.expectOne(`${service.apiUrl}/investments`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newInvestment);
      req.flush(newInvestment);
    });

    // it('should load investments for a project', () => {
    //   const projectId = '1';
    //   const mockInvestments: Investment[] = [
    //     {
    //       id: '1',
    //       amount: 500,
    //       investorName: 'Jane Doe',
    //       projectId: projectId
    //     },
    //     {
    //       id: '2',
    //       amount: 1000,
    //       investorName: 'John Smith',
    //       projectId: projectId
    //     }
    //   ];

    //   component.loadInvestmentsForProject(projectId);

    //   const req = httpTestingController.expectOne(`${service.apiUrl}/investments/project/${projectId}`);
    //   expect(req.request.method).toEqual('GET');
    //   req.flush(mockInvestments);

    //   expect(component.projectInvestments[projectId]).toEqual(mockInvestments);
    // });

    it('should display the Create New Project form', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Create New Project');
    });

    it('should have a name input field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[formControlName="name"]')).toBeTruthy();
    });

    it('should have a Description field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('textarea[formControlName="description"]')).toBeTruthy();
    });

    it('should have a goalAmount field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[formControlName="goalAmount"]')).toBeTruthy();
    });

    it('should have an amountRaised field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[formControlName="amountRaised"]')).toBeTruthy();
    });

    it('should have a Create Project button', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('button[type="submit"]').textContent).toContain('Create Project');
    });

    it('should have an investorName field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[formControlName="investorName"]')).toBeTruthy();
    });

    it('should have a Create Investment button', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('button[type="submit"]')[1].textContent).toContain('Create Investment');
    });

    it('should display the Search for Investments by Investor Name heading', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('h3')[0].textContent).toContain('Search for Investments by Investor Name');
    });

    it('should have a Search button for investments', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('button')[2].textContent).toContain('Search');
    });
  });
});
