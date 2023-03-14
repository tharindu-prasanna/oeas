import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Exam} from "../models/exam.model";

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  apiUrl = environment.apiURL

  constructor(private http: HttpClient) {
  }

  getIndividualActiveExams() {
    // return this.http.get<Exam>(`${this.apiUrl}/exams/individual/active`)
    return this.http.get<Exam>(`${this.apiUrl}/exams/other/active`)
  }

  getInstituteActiveExams() {
    // return this.http.get<Exam>(`${this.apiUrl}/exams/institute/active`)
    return this.http.get<Exam>(`${this.apiUrl}/exams/school/active`)
  }
}
