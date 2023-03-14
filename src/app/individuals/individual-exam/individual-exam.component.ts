import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {ExamsService} from "../../services/exams.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-individual-exam',
  templateUrl: './individual-exam.component.html',
  styleUrls: ['./individual-exam.component.css']
})
export class IndividualExamComponent implements OnInit, OnDestroy {
  exams: any;
  showLoginForm = false
  errorMessage: Observable<string> = new Observable<string>()
  subscription: Subscription = new Subscription();
  individualExamForm: FormGroup = new FormGroup<any>({
    exam_code: new FormControl('', [Validators.required]),
    nic: new FormControl('', [Validators.required, this.trimmedEmptyValidator]),
    password: new FormControl('', [Validators.required, this.trimmedEmptyValidator]),
  })

  constructor(private store: Store<AppState>, private examsService: ExamsService, private router: Router) {
  }

  ngOnInit() {
    // this.subscription = this.examsService.getIndividualActiveExams().subscribe((examsRes: Exam) => {
    //   this.exams = examsRes
    // })
    this.exams = [
      {'code': 'exam1', 'name': 'DAHAMPASAL EXAMINATION - 2023'},
    ]
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  trimmedEmptyValidator(control: FormControl) {
    const isWhiteSpace = (control.value || '').trim().length === 0
    const isValid = !isWhiteSpace
    return isValid ? null : {'whitespace': true}
  }

  onExamChange() {
    if (this.individualExamForm.get('exam_code')?.valid) {
      this.showLoginForm = true
    }
  }

  onSubmit() {

  }
}
