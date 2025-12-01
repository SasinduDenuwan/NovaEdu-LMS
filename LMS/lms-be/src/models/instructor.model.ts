import mongoose, { Document, Schema} from "mongoose";

export interface IInstructor extends Document {
    _id: mongoose.Types.ObjectId;
    first_name?: string;
    last_name?: string;
    job_title?: string;
    bio?: string;
    experience?: number;
    courses?: number;
    students?: number;
    createdAt: Date;
    updatedAt: Date;
}

const instructorSchema = new Schema<IInstructor>(
    {
    first_name: { type: String},
    last_name: { type: String},
    job_title: { type: String},
    bio: { type: String},
    experience: { type: Number},
    courses: { type: Number},
    students: { type: Number},
    }, { 
        timestamps: true    
    }
);

export const Instructor = mongoose.model<IInstructor>("Instructor", instructorSchema);