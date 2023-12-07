import { AbstractCollector } from '../abstract.collector';

class CollectorMock extends AbstractCollector<object> {}

describe('AbstractCollector', () => {
  let collector: CollectorMock;

  beforeEach(() => {
    collector = new CollectorMock();
  });

  it('should add a valid collectable', () => {
    const collectable = {};
    collector.addCollectable(collectable);
    expect(collector['collectables']).toContain(collectable);
  });

  it('should not add a null collectable', () => {
    const collectable = null;
    collector.addCollectable(collectable as any);
    expect(collector['collectables']).not.toContain(collectable);
  });

  it('should not add a duplicate collectable', () => {
    const collectable = {};
    collector.addCollectable(collectable);
    collector.addCollectable(collectable);
    expect(collector['collectables'].length).toBe(1);
  });
});
