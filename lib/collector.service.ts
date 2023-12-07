import { Injectable, OnModuleInit, Type } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { AbstractCollector } from './abstract.collector';

@Injectable()
export class CollectorService implements OnModuleInit {
  private readonly collectorIdentifiers: Set<string> = new Set<string>();

  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    const collectorInstances = this.findAllCollectors();
    const collectableInstances = this.findAllCollectables();

    collectorInstances.forEach((collector) => {
      const collectorIdentifier = Reflect.getMetadata('collector', collector.constructor);
      const relevantCollectables = collectableInstances.filter(
        (collectable) => Reflect.getMetadata('collectable', collectable.constructor) === collectorIdentifier,
      );

      if (this.collectorIdentifiers.has(collectorIdentifier)) {
        throw new Error(`Duplicate collector identifier detected: ${collectorIdentifier}`);
      }
      this.collectorIdentifiers.add(collectorIdentifier);

      relevantCollectables.forEach((collectable) => {
        collector.addCollectable(collectable);
      });
    });
  }

  private findAllCollectors(): Array<AbstractCollector<object>> {
    return this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic() && this.isCollector(wrapper.metatype))
      .map((wrapper) => wrapper.instance);
  }

  private findAllCollectables(): Array<AbstractCollector<object>> {
    return this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic() && this.isCollectable(wrapper.metatype))
      .map((wrapper) => wrapper.instance);
  }

  private isCollector(metatype: Function | Type<unknown> | undefined): boolean {
    return !!metatype && !!Reflect.getMetadata('collector', metatype);
  }

  private isCollectable(metatype: Function | Type<unknown> | undefined): boolean {
    return !!metatype && !!Reflect.getMetadata('collectable', metatype);
  }
}
