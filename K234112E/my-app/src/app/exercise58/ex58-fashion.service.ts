import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ex58Fashion } from './ex58-fashion.model';

const API = 'http://localhost:3002/api/fashion';

@Injectable({ providedIn: 'root' })
export class Ex58FashionService {
  constructor(private http: HttpClient) {}

  getAll(style?: string): Observable<Ex58Fashion[]> {
    const url = style ? `${API}?style=${encodeURIComponent(style)}` : API;
    return this.http.get<Ex58Fashion[]>(url);
  }

  getById(id: string): Observable<Ex58Fashion> {
    return this.http.get<Ex58Fashion>(`${API}/${id}`);
  }

  add(body: Partial<Ex58Fashion>): Observable<Ex58Fashion> {
    return this.http.post<Ex58Fashion>(API, body);
  }

  update(id: string, body: Partial<Ex58Fashion>): Observable<Ex58Fashion> {
    return this.http.put<Ex58Fashion>(`${API}/${id}`, body);
  }

  delete(id: string): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${API}/${id}`);
  }
}
