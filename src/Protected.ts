import { getMetadataKey } from './Metadata';
import { ProtectionRules } from './Rules';

/**
 * A property annotated with `Protected` provides protection from modification
 * by unauthorised users.
 *
 * ```ts
 * class Entity {
 *  public name: string;
 *
 *  @Protected({
 *      immutable: true
 *  })
 *  public email: string;
 * }
 * ```
 *
 * @param options protection options
 */
export function Protected(options: ProtectionRules): PropertyDecorator {
    return (target: any, propertyKey: string | symbol): void => {
        const propertyName = propertyKey ? propertyKey.toString() : '';
        Reflect.defineMetadata(getMetadataKey(propertyName), options, target);
    };
}
