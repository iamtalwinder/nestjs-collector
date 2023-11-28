import { SetMetadata } from '@nestjs/common';
import { AbstractCollector } from './abstract.collector';

export function Collector(identifier: string): ClassDecorator {
  return (target: Function) => {
    if (!(target.prototype instanceof AbstractCollector)) {
      throw new Error(`${target.name} must extend AbstractCollector`);
    }
    Reflect.defineMetadata('collector', identifier, target);
  };
}

export const Collectable = (identifier: string) => SetMetadata('collectable', identifier);
