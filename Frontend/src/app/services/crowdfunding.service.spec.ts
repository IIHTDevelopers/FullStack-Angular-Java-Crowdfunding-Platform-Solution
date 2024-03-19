import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrowdfundingService } from './crowdfunding.service';
import { Investment } from '../models/investment.model';
import { Project } from '../models/project.model';

describe('CrowdfundingService', () => {
  let service: CrowdfundingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrowdfundingService]
    });
    service = TestBed.inject(CrowdfundingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch all projects', () => {
      const expectedProjects: Project[] = [
        { id: '1', name: 'Project 1', description: 'Description 1', goalAmount: 10000, amountRaised: 5000 },
        { id: '2', name: 'Project 2', description: 'Description 2', goalAmount: 20000, amountRaised: 15000 }
      ];
      service.getAllProjects().subscribe(projects => {
        expect(projects).toEqual(expectedProjects);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/projects`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedProjects);
    });

    it('should get project by ID', () => {
      const expectedProject: Project = { id: '1', name: 'Project 1', description: 'Description 1', goalAmount: 10000, amountRaised: 5000 };
      service.getProjectById('1').subscribe(project => {
        expect(project).toEqual(expectedProject);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/projects/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedProject);
    });

    it('should create a new project', () => {
      const newProject: Project = { name: 'New Project', description: 'New Description', goalAmount: 30000, amountRaised: 0 };
      service.createProject(newProject).subscribe(project => {
        expect(project).toEqual(newProject);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/projects`);
      expect(req.request.method).toEqual('POST');
      req.flush(newProject);
    });

    it('should update project', () => {
      const updatedProject: Project = { id: '1', name: 'Updated Project', description: 'Updated Description', goalAmount: 40000, amountRaised: 20000 };
      service.updateProject('1', updatedProject).subscribe(project => {
        expect(project).toEqual(updatedProject);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/projects/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedProject);
    });

    it('should delete project', () => {
      service.deleteProject('1').subscribe(response => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/projects/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });

    it('should fetch all investments for a project', () => {
      const expectedInvestments: Investment[] = [
        { id: '1', amount: 1000, investorName: 'Investor 1', projectId: '1' },
        { id: '2', amount: 2000, investorName: 'Investor 2', projectId: '1' }
      ];
      service.getAllInvestmentsForProject('1').subscribe(investments => {
        expect(investments).toEqual(expectedInvestments);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/investments/project/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedInvestments);
    });

    it('should get investment by ID', () => {
      const expectedInvestment: Investment = { id: '1', amount: 1000, investorName: 'Investor 1', projectId: '1' };
      service.getInvestmentById('1').subscribe(investment => {
        expect(investment).toEqual(expectedInvestment);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/investments/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedInvestment);
    });

    it('should create an investment', () => {
      const newInvestment: Investment = { amount: 3000, investorName: 'New Investor', projectId: '2' };
      service.createInvestment(newInvestment).subscribe(investment => {
        expect(investment).toEqual(newInvestment);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/investments`);
      expect(req.request.method).toEqual('POST');
      req.flush(newInvestment);
    });

    it('should update an investment', () => {
      const updatedInvestment: Investment = { id: '1', amount: 5000, investorName: 'Updated Investor', projectId: '1' };
      service.updateInvestment('1', updatedInvestment).subscribe(investment => {
        expect(investment).toEqual(updatedInvestment);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/investments/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedInvestment);
    });

    it('should delete an investment', () => {
      service.deleteInvestment('1').subscribe(response => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/investments/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });

    it('should fetch investments by investor name', () => {
      const expectedInvestments: Investment[] = [
        { id: '1', amount: 1000, investorName: 'Investor 1', projectId: '1' },
        { id: '2', amount: 2000, investorName: 'Investor 1', projectId: '2' }
      ];
      service.getInvestmentsByInvestorName('Investor 1').subscribe(investments => {
        expect(investments).toEqual(expectedInvestments);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/investments/investor/Investor 1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedInvestments);
    });
  });
});