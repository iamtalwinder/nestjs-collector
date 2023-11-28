export abstract class AbstractCollector<T> {
  protected collectables: T[] = [];

  addCollectable(collectable: T): void {
    if (!this.isValidCollectable(collectable) || this.alreadyExists(collectable)) {
      return;
    }

    this.collectables.push(collectable);
  }

  private isValidCollectable(collectable: T): boolean {
    return collectable !== null && collectable !== undefined;
  }

  private alreadyExists(collectable: T): boolean {
    return this.collectables.includes(collectable);
  }
}
