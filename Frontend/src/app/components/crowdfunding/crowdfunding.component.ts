import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrowdfundingService } from '../../services/crowdfunding.service';
import { Investment } from 'src/app/models/investment.model';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-crowdfunding',
  templateUrl: './crowdfunding.component.html',
  styleUrls: ['./crowdfunding.component.css']
})
export class CrowdfundingComponent implements OnInit {
  projects: Project[] = [];
  projectForm: FormGroup;
  investmentForm: FormGroup;
  projectInvestments: { [key: string]: Investment[] } = {};
  searchedInvestments: Investment[] = [];
  searchInvestorName: string = '';

  constructor(private crowdfundingService: CrowdfundingService, private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      goalAmount: [null, Validators.required],
      amountRaised: [null, Validators.required]
    });

    this.investmentForm = this.fb.group({
      amount: ['', Validators.required],
      investorName: ['', Validators.required],
      projectId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.crowdfundingService.getAllProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.crowdfundingService.createProject(this.projectForm.value).subscribe(() => {
        this.loadProjects();
        this.projectForm.reset();
      });
    }
  }

  loadInvestmentsForProject(projectId: any): void {
    if (typeof projectId === 'number') {
      this.crowdfundingService.getAllInvestmentsForProject(projectId.toString()).subscribe((investments: Investment[]) => {
        this.projectInvestments[projectId] = investments;
      });
    } else {
      console.error('Project ID is undefined');
    }
  }

  submitInvestment(): void {
    if (this.investmentForm.valid) {
      this.crowdfundingService.createInvestment(this.investmentForm.value).subscribe(() => {
        this.investmentForm.reset();
      });
    }
  }

  searchInvestmentsByInvestorName(): void {
    if (this.searchInvestorName.trim()) {
      this.crowdfundingService.getInvestmentsByInvestorName(this.searchInvestorName.trim()).subscribe((investments: Investment[]) => {
        this.searchedInvestments = investments;
      });
    } else {
      this.searchedInvestments = [];
    }
  }
}
