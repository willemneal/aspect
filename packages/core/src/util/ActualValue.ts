import { LogValue } from "./LogValue";

/**
 * A class representing a reported expected or actual value. It shares a lot of properties with
 * LogValue, so those are copied over.
 */
export class ActualValue extends LogValue {
  /**
   * An indicator if the actual expected value is negated.
   */
  public negated: boolean = false;
}