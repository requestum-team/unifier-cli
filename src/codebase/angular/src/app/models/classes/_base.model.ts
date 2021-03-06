import { ClassConstructor } from 'class-transformer';
import { convertToModelsArray } from '@misc/helpers/model-conversion/convert-to-models-array';

export class List<T = any> {
  entities: T[];
  total: number;

  constructor({ entities = [], total = 0 }: List<T> = { entities: [], total: 0 }, entityClass: ClassConstructor<T>) {
    this.entities = convertToModelsArray(entities, entityClass);
    this.total = total;
  }
}
