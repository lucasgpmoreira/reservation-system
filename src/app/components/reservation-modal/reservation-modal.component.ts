import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {Room} from '../../core/services/room.service';

// Interface para os dados injetados no modal
export interface ReservationModalData {
  room: Room;
}

// Interface para o resultado retornado pelo modal
export interface ReservationModalResult {
  room_id: number;
  start_time: Date;
  end_time: Date;
}

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()], // Provedor para o MatDatepicker
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit {

  reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationModalData
  ) {
    this.reservationForm = this.fb.group({
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      endDate: ['', [Validators.required]],
      endTime: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
    });
  }

  ngOnInit(): void {
    // Lógica adicional na inicialização, se necessário
  }

  setCurrentTime(dateControlName: string, timeControlName: string): void {
    const now = new Date();
    this.reservationForm.get(dateControlName)?.setValue(now);

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.reservationForm.get(timeControlName)?.setValue(`${hours}:${minutes}`);
  }

  onConfirm(): void {
    if (this.reservationForm.invalid) {
      return;
    }

    const { startDate, startTime, endDate, endTime } = this.reservationForm.value;

    const startDateTime = new Date(startDate);
    const [startHours, startMinutes] = startTime.split(':');
    startDateTime.setHours(parseInt(startHours, 10), parseInt(startMinutes, 10));

    const endDateTime = new Date(endDate);
    const [endHours, endMinutes] = endTime.split(':');
    endDateTime.setHours(parseInt(endHours, 10), parseInt(endMinutes, 10));

    const result: ReservationModalResult = {
      room_id: this.data.room.id,
      start_time: startDateTime,
      end_time: endDateTime
    };

    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
