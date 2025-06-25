import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericHttpService } from './generic-http.service'; // Ajuste o caminho se necessário
import { Room } from './room.service'; // Importando a interface Room

/**
 * Interface mínima para representar o usuário aninhado na reserva.
 */
export interface ReservationUser {
  id: number;
  username: string;
}

/**
 * Interface que representa a estrutura de uma Reserva,
 * conforme retornado pela API Django.
 */
export interface Reservation {
  id: number;
  user: ReservationUser;
  room: Room; // A API retorna o ID da sala.
  start_time: string; // Datas são recebidas como string no formato ISO 8601.
  end_time: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private genericHttp = inject(GenericHttpService);
  private readonly endpoint = 'reservations';

  /**
   * Busca uma lista de reservas.
   * A API Django já filtra para mostrar apenas as do usuário logado.
   * @param params Parâmetros de query opcionais (ex: para filtrar por sala).
   * Delega para: GET /api/reservations/
   */
  public getReservations(params?: HttpParams): Observable<Reservation[]> {
    return this.genericHttp.get<Reservation[]>(this.endpoint, params);
  }

  /**
   * Busca uma reserva específica pelo seu ID.
   * @param id O ID da reserva a ser buscada.
   * Delega para: GET /api/reservations/{id}/
   */
  public getReservationById(id: number): Observable<Reservation> {
    return this.genericHttp.getById<Reservation>(this.endpoint, id);
  }

  /**
   * Cria uma nova reserva.
   * @param reservationData Os dados da reserva a ser criada.
   * Delega para: POST /api/reservations/
   */
  public createReservation(reservationData: Reservation): Observable<Reservation> {
    return this.genericHttp.post<Reservation>(this.endpoint, reservationData);
  }

  /**
   * Deleta (cancela) uma reserva.
   * @param id O ID da reserva a ser deletada.
   * Delega para: DELETE /api/reservations/{id}/
   */
  public deleteReservation(id: number): Observable<void> {
    return this.genericHttp.delete<void>(this.endpoint, id);
  }
}
