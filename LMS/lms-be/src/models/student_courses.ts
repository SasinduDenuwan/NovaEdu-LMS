import mongoose, { Document, Schema } from "mongoose";

export interface IStudentCourse extends Document {
    _id: mongoose.Types.ObjectId;
    student_id: mongoose.Schema.Types.ObjectId;
    course_id: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}   

const studentCourseSchema = new Schema<IStudentCourse>(
    {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    }, { 
        timestamps: true 
    }
);

export const StudentCourse = mongoose.model<IStudentCourse>("StudentCourse", studentCourseSchema);