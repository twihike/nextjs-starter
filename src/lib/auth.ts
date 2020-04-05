import { createStateContext } from './react-utils';

export type OnSetTokenHandler = (auth: Auth) => void;

export class Auth {
  private token = '';

  private isTokenCached = false;

  private onSetTokenHooks: OnSetTokenHandler[] = [];

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    this.token = token;
    this.onSetTokenHooks.map((h) => h(this));
  }

  getToken(): string {
    if (typeof window !== 'undefined' && !this.isTokenCached) {
      this.token = localStorage.getItem('token') || '';
      this.isTokenCached = true;
    }
    return this.token;
  }

  addSetTokenHook(handler: OnSetTokenHandler): void {
    const index = this.onSetTokenHooks.indexOf(handler);
    if (index === -1) {
      this.onSetTokenHooks.push(handler);
    }
  }

  removeSetTokenHook(handler: OnSetTokenHandler): void {
    this.onSetTokenHooks = this.onSetTokenHooks.filter((v) => v !== handler);
  }
}

export const authInstances: { [key: string]: Auth } = { default: new Auth() };
export const [AuthContext, AuthProvider] = createStateContext(authInstances);
