import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-institute-summery',
  templateUrl: './institute-summery.component.html',
  styleUrls: ['./institute-summery.component.css']
})
export class InstituteSummeryComponent {
  uploadedFiles: any[] = [];

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  applicants = [
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "SCHOOL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 0
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH KAMAL PRASANNA HERATH PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "SCHOOL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 0
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "REFERRED",
      year: "2021",
      index: "100001",
      subjects: "02",
      payment: 50
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "SCHOOL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 0
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "EXTERNAL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 200
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "EXTERNAL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 200
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "EXTERNAL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 200
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "EXTERNAL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 200
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "EXTERNAL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 200
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "EXTERNAL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 200
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "EXTERNAL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 200
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "EXTERNAL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 200
    },
    {
      name: "HERATH MUDIYANSELAGE THARINDU PRASANNA HERATH",
      medium: "2",
      gender: "0",
      Applicant_Type: "EXTERNAL",
      year: "",
      index: "",
      subjects: "ALL",
      payment: 200
    },
  ]

  constructor(private messageService: MessageService) {
  }


}
