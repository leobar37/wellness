export abstract class WellnessEvent {
  public readonly createdAt: Date;
  protected constructor() {
    this.createdAt = new Date();
  }
}
