import { Protected } from './Protected';

/**
 * Shorthand for:
 *
 * ```ts
 * @Protected({
 *  immutable: true,
 * })
 * ```
 */
export function Immutable(): PropertyDecorator {
    return Protected({
        immutable: true,
    });
}
