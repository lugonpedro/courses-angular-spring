import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { ErrorDialogComponent } from "../../@shared/components/error-dialog/error-dialog.component";
import { MaterialModule } from "../../@shared/material.module";
import { SharedModule } from "../../@shared/shared.module";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "app-courses",
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: "./courses.component.html",
  styleUrl: "./courses.component.scss",
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ["name", "category", "actions"];

  constructor(
    private service: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.service.list().pipe(
      catchError((err) => {
        this.onError("Erro ao carregar cursos.");
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  onError(msg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg,
    });
  }

  onAdd() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
