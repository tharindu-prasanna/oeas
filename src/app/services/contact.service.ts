import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ContactModel} from "../models/contact.model";
import {Inquiry} from "../models/inquiry.model";
import {Rating} from "../models/rating.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl = environment.apiURL

  constructor(private http: HttpClient) {
  }

  getContacts() {
    return this.http.get<ContactModel>(`${this.apiUrl}/inquiries/contacts`)
  }

  setInquiry(inquiryData: Inquiry) {
    return this.http.post<Inquiry>(`${this.apiUrl}/inquiries/add`, inquiryData)
  }

  setRating(ratingData: Rating) {
    return this.http.post<Rating>(`${this.apiUrl}/ratings/add`, ratingData)
  }
}
