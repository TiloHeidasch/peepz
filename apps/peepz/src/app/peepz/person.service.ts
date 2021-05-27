import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person, DeletionReport, Tag } from 'libs/api-interfaces/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>('/api/person');
  }
  getById(id: any): Observable<Person> {
    return this.http.get<Person>('/api/person/' + id);
  }
  create(): Observable<Person> {
    return this.http.post<Person>('/api/person', {});
  }
  update(id: string, person: Person): Observable<Person> {
    return this.http.put<Person>('/api/person/' + id, person);
  }
  delete(id: string): Observable<DeletionReport> {
    return this.http.delete<DeletionReport>('/api/person/' + id);
  }
}
