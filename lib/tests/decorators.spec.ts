import 'reflect-metadata';
import { Collector, Collectable } from '../decorators';
import { AbstractCollector } from '../abstract.collector';

describe('Collector and Collectable Decorators', () => {
  it('should set collector metadata', () => {
    @Collector('TestCollector')
    class TestCollector extends AbstractCollector<any> {}

    expect(Reflect.getMetadata('collector', TestCollector)).toBe('TestCollector');
  });

  it('should throw an error if @Collector is applied to a class not extending AbstractCollector', () => {
    try {
      @Collector('TestCollector')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class InvalidCollector {}

      // If the decorator does not throw, force the test to fail
      fail('Decorator did not throw an error when applied to a class not extending AbstractCollector');
    } catch (error: any) {
      expect(error.message).toBe('InvalidCollector must extend AbstractCollector');
    }
  });

  it('should set collectable metadata', () => {
    @Collectable('TestCollectable')
    class TestCollectable {}

    expect(Reflect.getMetadata('collectable', TestCollectable)).toBe('TestCollectable');
  });
});
