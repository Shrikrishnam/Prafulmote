import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Appointment } from './appointment.model';
import { Contact } from '../contact-us/contact-us.component';
import { SaveContact } from './contact.model';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};


@Injectable({ providedIn: 'root' })
export class UserService {

  currentApp: Appointment = {
    firstname: '',
    lastname: '',
    age: null,
    email: '',
    streetaddress: "",
    pincode: null,
    packages: '',
    trainerpreference: '',
    physiotherapist: '',
    inr: null,
    paisa: null,
    city: '',
    state: '',
    country: '',
    phonenumber:null,
    id: null,
  }

  public static BaseUrl = "http://localhost:6565/";

  constructor(private http: HttpClient) { }
  postfitnessdata(data): Observable<Appointment> {
    return this.http.post<Appointment>(UserService.BaseUrl + 'allfriends', data, httpOptions);
    //return this.http.post(UserService.BaseUrl + 'allfriends', data, httpOptions).pipe(map((response: Response) => response.json()));
  }
  getfitnessdata(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(UserService.BaseUrl + 'allfriends', httpOptions);
    //return this.http.get<Appointment[]>(UserService.BaseUrl+'allfriends',httpOptions).pipe(map((response: Response) => response.json()));
  }
  deletefitnessdata(id: number): Observable<Appointment> {
    return this.http.delete<Appointment>(UserService.BaseUrl + 'allfriends/' + id, httpOptions);
  }
  updatefitnessdata(data: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(UserService.BaseUrl + 'allfriends/' + data.id, data, httpOptions);
  }
  postcontactdata(data: SaveContact): Observable<SaveContact> {
    return this.http.post<SaveContact>(UserService.BaseUrl + 'contact', data, httpOptions);
  }
}