import { validateStaff } from "../../models/staff";

describe("Staff Validation", () => {
    let staff;
    beforeEach(() => {
        staff = {
            _id: "5f4b8cf0877db7ebcdeb7b18", // a valid ObjectId string
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            password: "securepassword",
            role: "admin",
            image: "profile.jpg",
        };
    });
    it("should return true for valid staff", () => {
        const result = validateStaff(staff);
        expect(result).toBeNull();
    });
    it("should return error if image is not present", () => {
        delete staff.image;
        const result = validateStaff(staff);
        expect(result).toEqual(expect.stringContaining('"image" is required'));
    });
    it("should return error if role is not present", () => {
        delete staff.role;
        const result = validateStaff(staff);
        expect(result).toEqual(expect.stringContaining('"role" is required'));
    });
    it("should return error if password is not present", () => {
        delete staff.password;
        const result = validateStaff(staff);
        expect(result).toEqual(
            expect.stringContaining('"password" is required')
        );
    });
    it("should return error if email is not present", () => {
        delete staff.email;
        const result = validateStaff(staff);
        expect(result).toEqual(expect.stringContaining('"email" is required'));
    });
    it("should return error if lastname is not present", () => {
        delete staff.lastname;
        const result = validateStaff(staff);
        expect(result).toEqual(
            expect.stringContaining('"lastname" is required')
        );
    });
    it("should return error if firstname is not present", () => {
        delete staff.firstname;
        const result = validateStaff(staff);
        expect(result).toEqual(
            expect.stringContaining('"firstname" is required')
        );
    });
    it("should return error if _id is invalid objectId", () => {
        staff._id = "123";
        const result = validateStaff(staff);
        expect(result).toEqual(
            expect.stringContaining('"_id" with value "123" fails to match')
        );
    });
    it("should return error if email is invalid", () => {
        staff.email = "john.doe";
        const result = validateStaff(staff);
        expect(result).toEqual(
            expect.stringContaining('"email" must be a valid email')
        );
    });
});
