import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.getStoredUsers());
  users$: Observable<any[]> = this.usersSubject.asObservable();

  constructor() { }

  public citiesByState: { [key: string]: string[] } = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
    "Assam": ["Guwahati", "Dibrugarh", "Jorhat"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Haryana": ["Chandigarh", "Faridabad", "Gurgaon"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Kolar"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Kolhapur"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
    "Sikkim": ["Gangtok", "Namchi", "Mangan"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Telangana": ["Hyderabad", "Warangal", "Karimnagar"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur"]
  };



  private getStoredUsers(): any[] {
    const storedUsers = localStorage.getItem('registeredUsers');
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  public updateStoredUsers(users: any[]): void {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }

  getCitiesByState(state: string): string[] {
    return this.citiesByState[state] || [];
  }

  registerUser(user: any): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = [...currentUsers, user];
    this.usersSubject.next(updatedUsers);
    this.updateStoredUsers(updatedUsers);
  }

  getRegisteredUsers(): Observable<any[]> {
    return this.users$;
  }

  addUser(user: any) {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = [...currentUsers, user];
    this.usersSubject.next(updatedUsers);
  }

  getUsers(): Observable<any[]> {
    return this.users$;
  }

  deleteUser(index: number) {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = [...currentUsers.slice(0, index), ...currentUsers.slice(index + 1)];
    this.usersSubject.next(updatedUsers);
  }
}
