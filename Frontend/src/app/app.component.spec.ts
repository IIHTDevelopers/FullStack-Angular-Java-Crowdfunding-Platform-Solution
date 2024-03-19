import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrowdfundingComponent } from './components/crowdfunding/crowdfunding.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, CrowdfundingComponent],
            imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should have Crowdfunding Platform heading in h1', () => {
            const headingElement = fixture.nativeElement.querySelector('h1');
            expect(headingElement.textContent).toContain('Crowdfunding Platform');
        });
    });
});
