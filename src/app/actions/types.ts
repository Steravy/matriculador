import { ReceiptStatus } from "../../../generated/prisma";

export type SerializedReceipt = {
    id: string;
    clientName: string;
    origin: string;
    destination: string;
    distance: number | null;
    amount: string;
    status: ReceiptStatus // adjust based on your enum
    notes: string | null;
    tripDate: Date;
    tripTime: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    userId: string;
    vehicleId: string;
    vehicle?: {
        id: string;
        licensePlate: string;
        make: string;
        model: string;
        color: string | null;
    };
};

export type SerializedVehicle = {
    id: string;
    licensePlate: string;
    make: string;
    model: string;
    color: string | null;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    userId: string;
};

export type SerializedDrivingSchool = {
    id: string;
    name: string;
    location: string;
    phoneNumber: string;
    email: string;
    address: string;
    description: string | null;
    instructorCapacity: number;
    studentCapacity: number;
    totalStudents: number;
    activeStudents: number;
    totalInstructors: number;
    vehiclesCount: number;
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
    userId: string;
};
