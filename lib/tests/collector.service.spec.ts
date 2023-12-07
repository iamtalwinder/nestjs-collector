// collector.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { DiscoveryService } from '@nestjs/core';
import { CollectorService } from '../collector.service';
import { Collector, Collectable } from '../decorators';
import { AbstractCollector } from '../abstract.collector';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Collector('TestCollector')
class MockCollector extends AbstractCollector<any> {
  addCollectable = jest.fn();
}

@Collectable('TestCollector')
class MockCollectable {}

describe('CollectorService', () => {
  let service: CollectorService;
  let discoveryService: DiscoveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectorService,
        {
          provide: DiscoveryService,
          useValue: {
            getProviders: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CollectorService>(CollectorService);
    discoveryService = module.get<DiscoveryService>(DiscoveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should discover and aggregate collectors and collectables', async () => {
    const mockCollectorInstance = new MockCollector();
    const mockCollectableInstance = new MockCollectable();

    jest.spyOn(discoveryService, 'getProviders').mockImplementation(() => [
      {
        instance: mockCollectorInstance,
        metatype: MockCollector,
        isDependencyTreeStatic: () => true,
      },
      {
        instance: mockCollectableInstance,
        metatype: MockCollectable,
        isDependencyTreeStatic: () => true,
      },
    ] as InstanceWrapper[]);

    await service.onModuleInit();

    expect(mockCollectorInstance.addCollectable).toHaveBeenCalledWith(mockCollectableInstance);
  });

  it('should throw an error for duplicate collector identifiers', async () => {
    jest.spyOn(discoveryService, 'getProviders').mockImplementation(() => [
      {
        instance: new MockCollector(),
        metatype: MockCollector,
        isDependencyTreeStatic: () => true,
      },
      {
        instance: new MockCollector(), // Duplicate collector
        metatype: MockCollector,
        isDependencyTreeStatic: () => true,
      },
    ] as InstanceWrapper[]);

    await expect(service.onModuleInit()).rejects.toThrow(
      'Duplicate collector identifier detected: TestCollector',
    );
  });

  it('should ignore non-static providers', async () => {
    const mockCollectorInstance = new MockCollector();

    jest.spyOn(discoveryService, 'getProviders').mockImplementation(() => [
      {
        instance: mockCollectorInstance,
        metatype: MockCollector,
        isDependencyTreeStatic: () => false, // Non-static provider
      },
    ] as InstanceWrapper[]);

    await service.onModuleInit();

    expect(mockCollectorInstance.addCollectable).not.toHaveBeenCalled();
  });
});
