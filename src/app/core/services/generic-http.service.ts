import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  private _apiUrl = 'http://127.0.0.1:8000/api';
  private _http = inject(HttpClient);
  private _authService = inject(AuthService);

  /**
   * Executa uma requisição GET para um endpoint específico.
   * @param endpoint O caminho do recurso (ex: 'especie', 'produtorproprietario').
   * @param params Parâmetros de query opcionais.
   */
  public get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    if (this._authService.isLoggedIn()) {
      const token = this._authService.getToken();
      return this._http.get<T>(`${this._apiUrl}/${endpoint}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return this._http.get<T>(`${this._apiUrl}/${endpoint}/`, {params});
  }

  /**
   * Executa uma requisição GET para um endpoint específico e um ID.
   * @param endpoint O caminho do recurso.
   * @param id O id do item da entidade.
   */
  public getById<T>(endpoint: string, id: number | string): Observable<T> {
    return this._http.get<T>(`${this._apiUrl}/${endpoint}/${id}/`);
  }

  /**
   * Executa uma requisição POST.
   * @param endpoint O caminho do recurso (ex: 'especie').
   * @param body O corpo da requisição.
   */
  public post<T>(endpoint: string, body: T): Observable<T> {
    // se logado, adiciona o token de autenticação no header
    if (this._authService.isLoggedIn()) {
      const token = this._authService.getToken();
      return this._http.post<T>(`${this._apiUrl}/${endpoint}/`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return this._http.post<T>(`${this._apiUrl}/${endpoint}/`, body);
  }

  /**
   * Executa uma requisição PUT.
   * @param endpoint O caminho do recurso com o ID (ex: 'especie/1').
   * @param id O id do item da entidade.
   * @param body O corpo da requisição.
   */
  public put<T>(endpoint: string, id: number | string, body: T): Observable<T> {
    return this._http.put<T>(`${this._apiUrl}/${endpoint}/${id}/`, body);
  }

  /**
   * Executa uma requisição DELETE.
   * @param endpoint O caminho do recurso com o ID (ex: 'especie/1').
   * @param id O id do item da entidade.
   */
  public delete<T>(endpoint: string, id: number | string): Observable<T> {
    const token = this._authService.getToken();
    return this._http.delete<T>(`${this._apiUrl}/${endpoint}/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return this._http.delete<T>(`${this._apiUrl}/${endpoint}/${id}/`);
  }
}
