import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from './generic-http.service'; // Ajuste o caminho se necessário

/**
 * Interface que representa a estrutura de dados de uma Sala,
 * espelhando o model do Django.
 */
export interface Room {
  id: number;
  name: string;
  location: string;
  capacity: number;
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  // Injeta o serviço genérico para delegação das chamadas HTTP.
  private genericHttp = inject(GenericHttpService);

  // Define o endpoint específico para este serviço.
  // O GenericHttpService irá concatenar isso com a URL base.
  private readonly endpoint = 'rooms';

  /**
   * Busca uma lista de todas as salas.
   * Delega para: GET /api/rooms/
   */
  public getRooms(): Observable<Room[]> {
    return this.genericHttp.get<Room[]>(this.endpoint);
  }

  /**
   * Busca uma sala específica pelo seu ID.
   * @param id O ID da sala a ser buscada.
   * Delega para: GET /api/rooms/{id}/
   */
  public getRoomById(id: number): Observable<Room> {
    return this.genericHttp.getById<Room>(this.endpoint, id);
  }

  /**
   * Cria uma nova sala.
   * @param roomData Os dados da sala a ser criada.
   * Delega para: POST /api/rooms/
   *
   */
  public createRoom(roomData: Room): Observable<Room> {
    return this.genericHttp.post<Room>(this.endpoint, roomData);
  }

  /**
   * Deleta uma sala.
   * @param id O ID da sala a ser deletada.
   * Delega para: DELETE /api/rooms/{id}/
   */
  public deleteRoom(id: number): Observable<void> {
    return this.genericHttp.delete<void>(this.endpoint, id);
  }
}
