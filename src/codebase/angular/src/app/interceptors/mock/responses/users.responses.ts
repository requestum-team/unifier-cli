import { User } from '@models/classes/user.model';
import { UserRole } from '@models/enums/user-role.enum';
import { convertToModel } from '@misc/helpers/model-conversion/convert-to-model.function';
import { Responses } from '@interceptors/mock/responses/_responses.class';
import { ClassConstructor } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Params } from '@angular/router';

class UserResponses extends Responses<User> {
  protected readonly MODEL: ClassConstructor<User> = User;
  readonly ENTITIES: User[] = [
    convertToModel(
      {
        id: 'vkvggvc9-33g3-vk0p-v90c-g9g9ggp8v453',
        email: 'john.doe@gmail.com',
        name: 'John Doe',
        role: UserRole.admin
      },
      User
    )
  ];

  protected entitiesFn(index: number): Partial<User> {
    return {
      id: `vkvggvc9-33g3-vk0p-v90c-g9g9ggp8v9${index.toString().padStart(2, '0')}`,
      firstName: `John`,
      lastName: `Doe ${index.toString().padStart(3, '0')}`,
      email: `john.doe+${index + 1}@gmail.com`,
      role: UserRole.admin
    };
  }

  protected _oneById([id]: string[], body: Params, headers: HttpHeaders): Observable<HttpResponse<Partial<User>>> {
    const token: string = headers.get('Authorization');
    const role: UserRole = token ? (atob(token.replace('Bearer ', '')) as UserRole) : null;
    if (id && id !== 'me') {
      return super._oneById([id], body, headers);
    } else {
      return of(
        new HttpResponse({
          status: 200,
          body: this.ENTITIES.find((user: User): boolean => user.role === role)
        })
      );
    }
  }
}

export const usersResponses: UserResponses = new UserResponses();
usersResponses.init(500);
