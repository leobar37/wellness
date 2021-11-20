import { DeepPartial, SafeAny } from '@wellness/common';
export abstract class WellnessEvent {
  public readonly createdAt: Date;
  protected constructor(input: DeepPartial<WellnessEvent>) {
    this.createdAt = new Date();
    for (const [key, value] of Object.entries(input)) {
      (this as SafeAny)[key] = value;
    }
  }

  get created() {
    return this.createdAt;
  }
}
