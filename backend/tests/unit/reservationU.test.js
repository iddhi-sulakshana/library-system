import Reservation from "../../models/schemas/Reservation";
import mongoose from "mongoose";


const ReservationM = mongoose.model('Reservation', Reservation);

describe('Reservation', () => {
    it('should create a new reservation with default bookingId', () => {
        const reservation = new ReservationM({
            userId: 123,
            roomId: 456,
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        expect(reservation.bookingId).toBeDefined();
        expect(reservation.bookingId).toBeInstanceOf(mongoose.Types.ObjectId);
    });

    it('should require userId and roomId', () => {
        const reservation = new ReservationM({
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        const validationError = reservation.validateSync();
        expect(validationError.errors.userId).toBeDefined();
        expect(validationError.errors.roomId).toBeDefined();
    });

    it('should have createdAt set to current date by default', () => {
        const reservation = new ReservationM({
            userId: 123,
            roomId: 456,
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        const currentDate = new Date();
        const createdAt = reservation.createdAt;

        expect(reservation.createdAt).toBeDefined();
        expect(createdAt.getTime()).toBeGreaterThanOrEqual(currentDate.getTime() - 1000);
        expect(createdAt.getTime()).toBeLessThanOrEqual(currentDate.getTime() + 1000);
      });

    it('should have a valid bookingId', () => {
        const reservation = new ReservationM({
            userId: 123,
            roomId: 456,
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        expect(reservation.bookingId).toBeDefined();
        expect(reservation.bookingId).toBeInstanceOf(mongoose.Types.ObjectId);
        expect(reservation.bookingId.toString()).toMatch(/^[0-9a-fA-F]{24}$/);
    });

    it('should have a valid userId', () => {
        const reservation = new ReservationM({
            userId: 123,
            roomId: 456,
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        expect(reservation.userId).toBeDefined();
        expect(typeof reservation.userId).toBe('number');
    });

    it('should have a valid roomId', () => {
        const reservation = new ReservationM({
            userId: 123,
            roomId: 456,
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        expect(reservation.roomId).toBeDefined();
        expect(typeof reservation.roomId).toBe('number');
    });

    it('should have a valid studyRoomId', () => {
        const reservation = new ReservationM({
            userId: 123,
            roomId: 456,
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        expect(reservation.studyRoomId).toBeDefined();
        expect(reservation.studyRoomId).toBeInstanceOf(mongoose.Types.ObjectId);
        expect(reservation.studyRoomId.toString()).toMatch(/^[0-9a-fA-F]{24}$/);
    });

    it('should have a valid startTime', () => {
        const reservation = new ReservationM({
            userId: 123,
            roomId: 456,
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        expect(reservation.startTime).toBeDefined();
        expect(reservation.startTime).toBeInstanceOf(Date);
    });

    it('should have a valid endTime', () => {
        const reservation = new ReservationM({
            userId: 123,
            roomId: 456,
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        expect(reservation.endTime).toBeDefined();
        expect(reservation.endTime).toBeInstanceOf(Date);
    });

    it('should have a valid createdAt', () => {
        const reservation = new ReservationM({
            userId: 123,
            roomId: 456,
            studyRoomId: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            endTime: new Date(),
        });

        expect(reservation.createdAt).toBeDefined();
        expect(reservation.createdAt).toBeInstanceOf(Date);
    });
});
