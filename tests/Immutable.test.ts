import { attemptUpdate, Immutable } from '../src';

describe('immutable annotation', () => {

    class Entity {
        public name: string;

        @Immutable()
        public email: string;
    }

    const email = 'email@email.org';
    const name = 'Name';

    let entity: Entity;

    beforeEach(() => {
        entity = new Entity();
        entity.email = email;
        entity.name = name;
    });

    it('should protect immutable properties from writes', () => {
        expect(() => attemptUpdate(entity, { email: 'changed' }, { fail: true })).toThrow();

        expect(entity.email).toEqual(email);
    });

    it('should allow unprotected properties to be assigned', () => {
        attemptUpdate(entity, { name: 'changed' });

        expect(entity.name).toEqual('changed');
    });
});
