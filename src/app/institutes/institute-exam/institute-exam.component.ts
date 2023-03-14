import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {ExamsService} from "../../services/exams.service";
import {getSelectedExam} from "../../store/shared/shared.selectors";
import {setSelectedExam} from "../../store/shared/shared.actions";
import {LocalStorageService} from "../../services/localStorage.service";

@Component({
  selector: 'app-institute-exam',
  templateUrl: './institute-exam.component.html',
  styleUrls: ['./institute-exam.component.css']
})
export class InstituteExamComponent {
  exams: any;
  selectedExam = ''
  errorMessage: Observable<string> = new Observable<string>()
  subscription1: Subscription = new Subscription();
  instituteExamForm: FormGroup = new FormGroup<any>({})

  constructor(private store: Store<AppState>,
              private examsService: ExamsService,
              private route: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    // this.subscription = this.examsService.getInstituteActiveExams().subscribe((examsRes: Exam) => {
    //   this.exams = examsRes
    // })

    this.subscription1 = this.store.select(getSelectedExam).subscribe((data: string | null) => {
      if (data) {
        this.selectedExam = data
      }
    })

    this.exams = [
      {'code': 'exam1', 'name': 'DAHAMPASAL EXAMINATION - 2023', 'path': 'daham-pasal'},
      {'code': 'exam2', 'name': 'KATHOLIKA DHARMACHARYA EXAMINATION - 2023', 'path': 'katholika-dharmacharya'},
    ]

    this.instituteExamForm = new FormGroup<any>({
      exam_code: new FormControl(this.selectedExam, [Validators.required])
    })
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe()
  }

  onExamChange() {
    this.localStorageService.setValue('exam', this.instituteExamForm.controls['exam_code'].value)
    this.store.dispatch(setSelectedExam({'exam': this.instituteExamForm.controls['exam_code'].value}))
  }

  onSubmit() {
    let routePath = this.exams.find((exam: any) => exam.code === this.instituteExamForm.controls['exam_code'].value);
    if (routePath) this.route.navigate(['institutes', routePath.path])
  }
}
