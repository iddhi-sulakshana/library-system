import mongoose from 'mongoose';
import BorrowBookSchema from '../../models/schemas/BorrowBook';

describe('BorrowBook Schema', () => {
    it('should require userid field', () => {
        const borrowBook = new mongoose.model('BorrowBook', BorrowBookSchema)();
        const { errors } = borrowBook.validateSync();
        expect(errors.userid).toBeDefined();
    });

    it('should require bookid field', () => {
        const borrowBook = new mongoose.model('BorrowBook', BorrowBookSchema)();
        const { errors } = borrowBook.validateSync();
        expect(errors.bookid).toBeDefined();
    });

    it('should require tackdate field', () => {
        const borrowBook = new mongoose.model('BorrowBook', BorrowBookSchema)();
        const { errors } = borrowBook.validateSync();
        expect(errors.tackdate).toBeDefined();
    });

    it('should require deliverydate field', () => {
        const borrowBook = new mongoose.model('BorrowBook', BorrowBookSchema)();
        const { errors } = borrowBook.validateSync();
        expect(errors.deliverydate).toBeDefined();
    });
});
