import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../models/investment.model';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class CrowdfundingService {
  public apiUrl = 'http://localhost:8081/crowdfunding/api';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`);
  }

  createProject(projectData: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, projectData);
  }

  updateProject(projectId: string, projectData: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${projectId}`, projectData);
  }

  deleteProject(projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${projectId}`);
  }

  getAllInvestmentsForProject(projectId: string): Observable<Investment[]> {
    return this.http.get<Investment[]>(`${this.apiUrl}/investments/project/${projectId}`);
  }

  getInvestmentById(investmentId: string): Observable<Investment> {
    return this.http.get<Investment>(`${this.apiUrl}/investments/${investmentId}`);
  }

  createInvestment(investmentData: Investment): Observable<Investment> {
    return this.http.post<Investment>(`${this.apiUrl}/investments`, investmentData);
  }

  updateInvestment(investmentId: string, investmentData: Investment): Observable<Investment> {
    return this.http.put<Investment>(`${this.apiUrl}/investments/${investmentId}`, investmentData);
  }

  deleteInvestment(investmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/investments/${investmentId}`);
  }

  getInvestmentsByProjectId(projectId: string): Observable<Investment[]> {
    return this.http.get<Investment[]>(`${this.apiUrl}/investments/project/${projectId}`);
  }

  getInvestmentsByInvestorName(investorName: string): Observable<Investment[]> {
    return this.http.get<Investment[]>(`${this.apiUrl}/investments/investor/${investorName}`);
  }
}
