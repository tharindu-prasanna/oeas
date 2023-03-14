import {Injectable} from '@angular/core';

const TOKEN = 'signedInStatus';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setToken(data: string) {
    localStorage.setItem(TOKEN, data);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  setValue(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  getValue(name: string) {
    return localStorage.getItem(name);
  }

  removeValue(name: string) {
    localStorage.removeItem(name);
  }
}
