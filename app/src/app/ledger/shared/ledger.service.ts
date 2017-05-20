import { RequestOptionsArgs } from '@angular/http';
import { AuthRequestService } from 'app/auth/shared/auth-request.service';
import { Injectable } from '@angular/core';

const BASE_URL = '';

@Injectable()
export class LedgerService {
  constructor(private authenticated: AuthRequestService) { }

  private request(url: string, options?: RequestOptionsArgs) {
    return this.authenticated.request(BASE_URL + url, options);
  }

  fetch() {
    return this.request('/', { method: 'GET' });
  }

  create(body) {
    return this.request('/', { method: 'POST', body });
  }

  update(id, body) {
    return this.request(`/${id}`, { method: 'POST', body });
  }

  destroy(id) {
    return this.request(`/${id}`, { method: 'DELETE' });
  }

}
