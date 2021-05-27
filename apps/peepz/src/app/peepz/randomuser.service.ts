import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'libs/api-interfaces/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomuserService {
  constructor(private http: HttpClient) {}

  getRandomPerson(): Observable<PersonResult> {
    return this.http.get<PersonResult>('https://randomuser.me/api/?results=1');
  }
}

export interface PersonResult {
  results: RandomPerson[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
export interface RandomPerson {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
