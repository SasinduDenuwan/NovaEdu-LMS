import mongoose, { Document, Schema} from "mongoose";

export enum Req_or_Obj {
    REQUIREMENTS = "REQUIREMENTS",
    OBJECTIVES = "OBJECTIVES"
}

export interface ICourseRO extends Document {
    _id: mongoose.Types.ObjectId;
    course_id: mongoose.Schema.Types.ObjectId;
    req_or_obj: Req_or_Obj;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

const courseROSchema = new Schema<ICourseRO>(
    {
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    req_or_obj: { type: String, enum: Object.values(Req_or_Obj), default: Req_or_Obj.REQUIREMENTS },
    text: { type: String },
    }, { 
        timestamps: true 
    }
);

export const CourseRO = mongoose.model<ICourseRO>("CourseRO", courseROSchema);