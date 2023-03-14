import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Router} from "@angular/router";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-institute-exam-daham-pasal',
  templateUrl: './institute-exam-daham-pasal.component.html',
  styleUrls: ['./institute-exam-daham-pasal.component.css']
})
export class InstituteExamDahamPasalComponent implements OnInit, OnDestroy {
  exam_towns: any;
  errorsA: any[] = [];
  errorsB: any[] = [];
  errorsC: any[] = [];
  secAFileUploadBtnIcon = 'pi pi-cloud-upload'
  secAFileUploadBtnLabel = 'Click here to validate & upload filled applicant details data sheet'
  secAFileUploadBtnStatus = false
  secBFileUploadBtnIcon = 'pi pi-cloud-upload'
  secBFileUploadBtnLabel = 'Click here to validate & upload filled applicant details data sheet'
  secBFileUploadBtnStatus = false
  secCFileUploadBtnIcon = 'pi pi-cloud-upload'
  secCFileUploadBtnLabel = 'Click here to validate & upload filled applicant details data sheet'
  secCFileUploadBtnStatus = false
  errorMessageA = ''
  errorMessageB = ''
  errorMessageC = ''
  subscription: Subscription = new Subscription();
  instituteExamApplicantsForm: FormGroup = new FormGroup<any>({
    town_number: new FormControl('', [Validators.required]),
  })

  constructor(private store: Store<AppState>, private route: Router) {
  }

  ngOnInit() {
    this.exam_towns = [
      {'town_number': '101', 'town_name': 'KOTAHENA'},
      {'town_number': '102', 'town_name': 'MARADANA'},
      {'town_number': '103', 'town_name': 'BORELLA'},
      {'town_number': '201', 'town_name': 'GAMPAHA'},
      {'town_number': '202', 'town_name': 'VEYANGODA'},
    ]
  }

  setSectionAButtonsToDefaults() {
    this.secAFileUploadBtnIcon = 'pi pi-cloud-upload'
    this.secAFileUploadBtnLabel = 'Click here to validate & upload filled applicant details data sheet'
    this.secAFileUploadBtnStatus = false
  }

  setSectionBButtonsToDefaults() {
    this.secBFileUploadBtnIcon = 'pi pi-cloud-upload'
    this.secBFileUploadBtnLabel = 'Click here to validate & upload filled applicant details data sheet'
    this.secBFileUploadBtnStatus = false
  }

  setSectionCButtonsToDefaults() {
    this.secCFileUploadBtnIcon = 'pi pi-cloud-upload'
    this.secCFileUploadBtnLabel = 'Click here to validate & upload filled applicant details data sheet'
    this.secCFileUploadBtnStatus = false
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onSecAFileChange(event: any, fileUploadA: any) {
    this.errorMessageA = ''
    this.errorsA = []

    this.secAFileUploadBtnIcon = 'pi pi-spinner pi-spin'
    this.secAFileUploadBtnLabel = 'Please wait. File is validating...'
    this.secAFileUploadBtnStatus = true

    // const file = event.target.files[0];
    const fileA = event.files[0];

    if (!fileA) {
      this.errorMessageA = 'Please select a file.'
      fileUploadA.clear()
      this.setSectionAButtonsToDefaults()
      return;
    }

    if (fileA.size > 100000000) {
      this.errorMessageA = 'File size is too large. Maximum file size is 100MB.'
      fileUploadA.clear()
      this.setSectionAButtonsToDefaults()
      return;
    }

    if (fileA.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && fileA.type !== 'application/vnd.ms-excel') {
      this.errorMessageA = 'Invalid file type. Please upload an Excel file.'
      fileUploadA.clear()
      this.setSectionAButtonsToDefaults()
      return;
    }

    const fileReaderA = new FileReader();
    fileReaderA.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {type: 'array'});
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any = XLSX.utils.sheet_to_json(worksheet, {header: 1, defval: ''});

      // Check that the headers are correct
      if (rows[0].length !== 3) {
        this.errorsA.push({row: 1, message: 'Invalid number of columns in header row.'});
      } else if (rows[0][0].trim() !== 'Full Name' || rows[0][1].trim() !== 'Medium' || rows[0][2].trim() !== 'Gender') {
        this.errorsA.push({row: 1, message: 'Invalid column heading(s) in header row.'});
      }

      // Start from index 1 to skip header row
      for (let i = 1; i < rows.length; i++) {
        const row: any = rows[i];
        if (row.length !== 3) {
          this.errorsA.push({row: (i + 1), message: 'Invalid number of columns.'});
        } else {
          const [name, medium, gender] = row.map((value: any) => typeof value === 'string' ? value.trim() : value);

          if (!(/^[a-zA-Z.' ,-]+$/.test(name))) {
            this.errorsA.push({row: (i + 1), message: 'Invalid name.'});
          } else if (name.length === 0) {
            this.errorsA.push({row: (i + 1), message: 'Name is required.'});
          } else if (name.length > 90) {
            this.errorsA.push({row: (i + 1), message: 'Name length exceeds 90 characters.'});
          }

          if (!(/^\d+$/.test(medium))) {  // Checking if contains only numbers
            this.errorsA.push({row: (i + 1), message: 'Invalid medium.'});
          } else if (![2, 3, 4].includes(parseInt(medium))) {
            this.errorsA.push({row: (i + 1), message: 'Invalid medium code.'});
          }

          if (!(/^\d+$/.test(gender))) {  // Checking if contains only numbers
            this.errorsA.push({row: (i + 1), message: 'Invalid gender.'});
          } else if (![0, 1].includes(parseInt(gender))) {
            this.errorsA.push({row: (i + 1), message: 'Invalid gender.'});
          }
        }
      }

      if (this.errorsA.length > 0) {
        fileUploadA.clear()
      } else {
        // Upload valid excel file to nodejs server
        const formData = new FormData();
        formData.append('file', fileA);
        fileUploadA.clear()
        // Send formData to nodejs server using HttpClient or a similar mechanism
      }
    };
    fileReaderA.readAsArrayBuffer(fileA);
    this.setSectionAButtonsToDefaults()
  }

  onSecBFileChange(event: any, fileUploadB: any) {
    this.errorMessageB = ''
    this.errorsB = []

    this.secBFileUploadBtnIcon = 'pi pi-spinner pi-spin'
    this.secBFileUploadBtnLabel = 'Please wait. File is validating...'
    this.secBFileUploadBtnStatus = true

    // const file = event.target.files[0];
    const fileB = event.files[0];

    if (!fileB) {
      this.errorMessageB = 'Please select a file.'
      fileUploadB.clear()
      this.setSectionBButtonsToDefaults()
      return;
    }

    if (fileB.size > 100000000) {
      this.errorMessageB = 'File size is too large. Maximum file size is 100MB.'
      fileUploadB.clear()
      this.setSectionBButtonsToDefaults()
      return;
    }

    if (fileB.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && fileB.type !== 'application/vnd.ms-excel') {
      this.errorMessageB = 'Invalid file type. Please upload an Excel file.'
      fileUploadB.clear()
      this.setSectionBButtonsToDefaults()
      return;
    }

    const fileReaderB = new FileReader();
    fileReaderB.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {type: 'array'});
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any = XLSX.utils.sheet_to_json(worksheet, {header: 1, defval: ''});

      // Check that the headers are correct
      if (rows[0].length !== 3) {
        this.errorsB.push({row: 1, message: 'Invalid number of columns in header row.'});
      } else if (rows[0][0].trim() !== 'Full Name' || rows[0][1].trim() !== 'Medium' || rows[0][2].trim() !== 'Gender') {
        this.errorsB.push({row: 1, message: 'Invalid column heading(s) in header row.'});
      }

      // Start from index 1 to skip header row
      for (let i = 1; i < rows.length; i++) {
        const row: any = rows[i];
        if (row.length !== 3) {
          this.errorsB.push({row: (i + 1), message: 'Invalid number of columns.'});
        } else {
          const [name, medium, gender] = row.map((value: any) => typeof value === 'string' ? value.trim() : value);

          if (!(/^[a-zA-Z.' ,-]+$/.test(name))) {
            this.errorsB.push({row: (i + 1), message: 'Invalid name.'});
          } else if (name.length === 0) {
            this.errorsB.push({row: (i + 1), message: 'Name is required.'});
          } else if (name.length > 90) {
            this.errorsB.push({row: (i + 1), message: 'Name length exceeds 90 characters.'});
          }

          if (!(/^\d+$/.test(medium))) {  // Checking if contains only numbers
            this.errorsB.push({row: (i + 1), message: 'Invalid medium.'});
          } else if (![2, 3, 4].includes(parseInt(medium))) {
            this.errorsB.push({row: (i + 1), message: 'Invalid medium code.'});
          }

          if (!(/^\d+$/.test(gender))) {  // Checking if contains only numbers
            this.errorsB.push({row: (i + 1), message: 'Invalid gender.'});
          } else if (![0, 1].includes(parseInt(gender))) {
            this.errorsB.push({row: (i + 1), message: 'Invalid gender.'});
          }
        }
      }

      if (this.errorsB.length > 0) {
        fileUploadB.clear()
      } else {
        // Upload valid excel file to nodejs server
        const formData = new FormData();
        formData.append('file', fileB);
        fileUploadB.clear()
        // Send formData to nodejs server using HttpClient or a similar mechanism
      }
    };
    fileReaderB.readAsArrayBuffer(fileB);
    this.setSectionBButtonsToDefaults()
  }

  onSecCFileChange(event: any, fileUploadC: any) {
    this.errorMessageC = ''
    this.errorsC = []

    this.secCFileUploadBtnIcon = 'pi pi-spinner pi-spin'
    this.secCFileUploadBtnLabel = 'Please wait. File is validating...'
    this.secCFileUploadBtnStatus = true

    // const file = event.target.files[0];
    const fileC = event.files[0];

    if (!fileC) {
      this.errorMessageC = 'Please select a file.'
      fileUploadC.clear()
      this.setSectionCButtonsToDefaults()
      return;
    }

    if (fileC.size > 100000000) {
      this.errorMessageC = 'File size is too large. Maximum file size is 100MB.'
      fileUploadC.clear()
      this.setSectionCButtonsToDefaults()
      return;
    }

    if (fileC.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && fileC.type !== 'application/vnd.ms-excel') {
      this.errorMessageC = 'Invalid file type. Please upload an Excel file.'
      fileUploadC.clear()
      this.setSectionCButtonsToDefaults()
      return;
    }

    const fileReaderC = new FileReader();
    fileReaderC.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {type: 'array'});
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any = XLSX.utils.sheet_to_json(worksheet, {header: 1, defval: ''});

      // Check that the headers are correct
      if (rows[0].length !== 6) {
        this.errorsC.push({row: 1, message: 'Invalid number of columns in header row.'});
      } else if (rows[0][0].trim() !== 'Full Name' || rows[0][1].trim() !== 'Medium' || rows[0][2].trim() !== 'Gender' || rows[0][3].trim() !== 'Referred Year' || rows[0][4].trim() !== 'Index' || rows[0][5].trim() !== 'Referred Subject') {
        this.errorsC.push({row: 1, message: 'Invalid column heading(s) in header row.'});
      }

      // Start from index 1 to skip header row
      for (let i = 1; i < rows.length; i++) {
        const row: any = rows[i];
        if (row.length !== 6) {
          this.errorsC.push({row: (i + 1), message: 'Invalid number of columns.'});
        } else {
          const [name, medium, gender, year, index, subject] = row.map((value: any) => typeof value === 'string' ? value.trim() : value);

          if (!(/^[a-zA-Z.' ,-]+$/.test(name))) { // Checking if contains only ,. -'
            this.errorsC.push({row: (i + 1), message: 'Invalid name.'});
          } else if (name.length === 0) {
            this.errorsC.push({row: (i + 1), message: 'Name is required.'});
          } else if (name.length > 90) {
            this.errorsC.push({row: (i + 1), message: 'Name length exceeds 90 characters.'});
          }

          if (!(/^\d+$/.test(medium))) {  // Checking if contains only numbers
            this.errorsC.push({row: (i + 1), message: 'Invalid medium.'});
          } else if (![2, 3, 4].includes(parseInt(medium))) {
            this.errorsC.push({row: (i + 1), message: 'Invalid medium code.'});
          }

          if (!(/^\d+$/.test(gender))) {  // Checking if contains only numbers
            this.errorsC.push({row: (i + 1), message: 'Invalid gender.'});
          } else if (![0, 1].includes(parseInt(gender))) {
            this.errorsC.push({row: (i + 1), message: 'Invalid gender.'});
          }

          if (!(/^\d+$/.test(year))) {  // Checking if contains only numbers
            this.errorsC.push({row: (i + 1), message: 'Invalid referred year.'});
          } else if (parseInt(year) < 1980) {
            this.errorsC.push({row: (i + 1), message: 'Invalid referred year.'});
          } else if (parseInt(year) > (new Date().getFullYear())) {
            this.errorsC.push({row: (i + 1), message: 'Invalid referred year.'});
          }

          if (!(/^\d+$/.test(index))) {  // Checking if contains only numbers
            this.errorsC.push({row: (i + 1), message: 'Invalid index.'});
          } else if (index <= 0) {
            this.errorsC.push({row: (i + 1), message: 'Invalid index.'});
          }

          if (!(/^\d+$/.test(subject))) {  // Checking if contains only numbers
            this.errorsC.push({row: (i + 1), message: 'Invalid referred Subject.'});
          } else if (![1, 2, 3, 4].includes(parseInt(subject))) {
            this.errorsC.push({row: (i + 1), message: 'Invalid referred Subject.'});
          }

        }
      }

      if (this.errorsC.length > 0) {
        fileUploadC.clear()
      } else {
        // Upload valid excel file to nodejs server
        const formData = new FormData();
        formData.append('file', fileC);
        fileUploadC.clear()
        // Send formData to nodejs server using HttpClient or a similar mechanism
      }
    };
    fileReaderC.readAsArrayBuffer(fileC);
    this.setSectionCButtonsToDefaults()
  }

  onSecAClearErrors() {
    this.errorMessageA = ''
    this.errorsA = []
  }

  onSecBClearErrors() {
    this.errorMessageB = ''
    this.errorsB = []
  }

  onSecCClearErrors() {
    this.errorMessageC = ''
    this.errorsC = []
  }

  onUploading() {
    this.secAFileUploadBtnIcon = 'pi pi-spinner pi-spin'
    this.secAFileUploadBtnLabel = 'Please wait. File is uploading...'
    this.secAFileUploadBtnStatus = true
  }

  onSubmit() {
    this.route.navigate(['institutes', 'summery'])
  }
}
