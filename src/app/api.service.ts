import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './types/carType';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'https://carz-67158-default-rtdb.europe-west1.firebasedatabase.app/Cars';

  constructor(private http: HttpClient, private router: Router) { }

  getCar(id: string): Observable<Car> {
    this.http.get<Car>(`${this.apiUrl}/${id}.json`).subscribe((car: Car) => {
      if(car === null){
        this.router.navigate(['404'])
        return;
      }
    });
    return this.http.get<Car>(`${this.apiUrl}/${id}.json`);
  }
  deleteCarById(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}.json`)
  }
  getCarsByOwnerId(ownerId: string): Observable<any> {
    const url = `${this.apiUrl}.json?orderBy="ownerId"&equalTo="${ownerId}"`

    const cars = this.http.get(url)
    return cars
  }
}
