import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post login credentials to server', () => {
    component.username = 'demo';
    component.password = 'pass123';

    component.submitLogin();

    const req = httpMock.expectOne('/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username: 'demo', password: 'pass123' });
  });

  it('should navigate to dashboard after successful login', () => {
    spyOn(router, 'navigate');
    component.username = 'demo';
    component.password = 'pass123';

    component.submitLogin();

    const req = httpMock.expectOne('/login');
    req.flush({ success: true, message: 'Welcome, demo.' });

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard'], {
      state: {
        username: 'demo',
        message: 'Welcome, demo.'
      }
    });
  });
});