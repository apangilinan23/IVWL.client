import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [App],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should submit login credentials to the server', () => {
    component.username = 'demo';
    component.password = 'pass123';

    component.submitLogin();

    const req = httpMock.expectOne('/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username: 'demo', password: 'pass123' });

    req.flush({ success: true, message: 'Welcome, demo.' });

    expect(component.isError).toBeFalse();
    expect(component.message).toBe('Welcome, demo.');
  });
});
