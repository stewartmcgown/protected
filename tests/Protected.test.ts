import { attemptUpdate, Protected } from '../src/';

describe('protected annotation', () => {

    class Entity {
        public name: string;

        @Protected({
            immutable: true,
        })
        public email: string;

        @Protected({
            roles: ['admin'],
        })
        public time: string;
    }

    const email = 'email@email.org';
    const name = 'Name';

    let entity: Entity;

    beforeEach(() => {
        entity = new Entity();
        entity.email = email;
        entity.name = name;
        entity.time = 'old time';
    });

    describe('immutable rule', () => {

        it('should protect immutable properties from writes', () => {
            expect(() => attemptUpdate(entity, { email: 'changed' }, { fail: true })).toThrow();

            expect(entity.email).toEqual(email);
        });

        it('should allow unprotected properties to be assigned', () => {
            attemptUpdate(entity, { name: 'changed' });

            expect(entity.name).toEqual('changed');
        });
    });

    describe('roles rule', () => {
        it('should prevent non-admins from changing this property', () => {
            expect(() => attemptUpdate(entity, { time: 'new time' }, { fail: true })).toThrow();
        });

        it('should allow admins to change this property', () => {
            attemptUpdate(entity, { time: 'new time' }, { ruleArgs: { roles: ['admin'] } });

            expect(entity.time).toEqual('new time');
        });
    });

});
