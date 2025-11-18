import mongoose, { Document, Schema} from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    USER = "USER"
}

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING",
    REJECTED = "REJECTED"
}

export interface IUSER extends Document {
    _id: mongoose.Types.ObjectId;
    firstname?: string;
    lastname?: string;
    email: string;
    password: string;
    roles: Role[];
    mobile?: string;
    profilePicLink?: string;
    address?: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUSER>(
    {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    roles: { type: [String], enum: Object.values(Role), default: [Role.USER] },
    mobile: { type: String, required: true },
    profilePicLink: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: Object.values(Status), default: Status.PENDING }
    }, { 
        timestamps: true 
    }
);

export const User = mongoose.model<IUSER>("User", userSchema);