import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'roles'})
export class RolesPipe implements PipeTransform {
  transform(value) {
    switch (value) {
      case 'firetruck':
        return 'כבאית';
      case 'patrol':
        return 'סייר';
      case 'firefighter':
        return 'מכבה אש';

      default:
        return 'עוזר בשטח';
    }
  }
}
