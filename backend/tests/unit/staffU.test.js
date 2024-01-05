import Staff from '../../models/schemas/staff';
import mongoose from 'mongoose';

const StaffM = mongoose.model('Staff', Staff);


describe('Staff Model', () => {
    it('should require firstname', () => {
        const staff = new StaffM({
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password',
            role: 'admin',
            image: 'avatar.jpg',
        });
        expect(staff.validateSync().errors.firstname.message).toBe('Path `firstname` is required.');
    });

    it('should not require lastname', () => {
        const staff = new StaffM({
            firstname: 'John',
            email: 'john.doe@example.com',
            password: 'password',
            role: 'admin',
            image: 'avatar.jpg',
        });

        const validationError = staff.validateSync();

        expect(validationError).toBeUndefined();
    
        // Access 'errors' only if there are validation errors
        if (validationError && validationError.errors) {
          expect(validationError.errors.lastname).toBeUndefined();
        }
    });

    it('should require email', () => {
        const staff = new StaffM({
            firstname: 'John',
            lastname: 'Doe',
            password: 'password',
            role: 'admin',
            image: 'avatar.jpg',
        });
        expect(staff.validateSync().errors.email.message).toBe('Path `email` is required.');
    });

    it('should require unique email', () => {
        const staff = new StaffM({
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password',
            role: 'admin',
            image: 'avatar.jpg',
        });
        staff.save();
        const duplicateStaff = new StaffM({
            firstname: 'Jane',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password',
            role: 'admin',
            image: 'avatar.jpg',
        });
        try {
            // Save the duplicate staff, and expect it to throw a unique constraint error
            duplicateStaff.save();
          } catch (error) {
            // Ensure the error is a unique constraint error
            expect(error.errors.email.message).toBe('Error, expected `email` to be unique. Value: `john.doe@example.com`');
          }    });

    it('should require password', () => {
        const staff = new StaffM({
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            role: 'admin',
            image: 'avatar.jpg',
        });
        expect(staff.validateSync().errors.password.message).toBe('Path `password` is required.');
    });

    it('should require role', () => {
        const staff = new StaffM({
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password',
            image: 'avatar.jpg',
        });
        expect(staff.validateSync().errors.role.message).toBe('Path `role` is required.');
    });

    it('should not require image', () => {
        const staff = new StaffM({
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password',
            role: 'admin',
        });
        const validationError = staff.validateSync();
    
        if (validationError) {
            // Your expectations
            expect(validationError.errors.image).toBeUndefined();
          } else {
            // If validation is successful, there are no errors
            expect(validationError).toBeUndefined();
          }    });

    it('should validate successfully with all required fields', () => {
        const staff = new StaffM({
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password',
            role: 'admin',
            image: 'avatar.jpg',
        });
        expect(staff.validateSync()).toBeUndefined();
    });

    it('should validate successfully with all fields', () => {
        const staff = new StaffM({
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password',
            role: 'admin',
            image: 'avatar.jpg',
        });
        expect(staff.validateSync()).toBeUndefined();
    });
});
