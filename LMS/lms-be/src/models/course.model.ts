import mongoose, { Document, Schema} from "mongoose";

export enum Course_Level {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED"
}

export enum Course_Category {
    DEVELOPMENT = "DEVELOPMENT",
    DESIGN = "DESIGN",
    BUSINESS = "BUSINESS",
    MARKETING = "MARKETING",
    IT_AND_SOFTWARE = "IT & SOFTWARE",
    PERSONAL_DEVELOPMENT = "PERSONAL DEVELOPMENT",
    MUSIC = "MUSIC",
    PHOTOGRAPHY = "PHOTOGRAPHY",
    GENERAL = "GENERAL"
}

export interface ICourse extends Document {
    _id: mongoose.Types.ObjectId;
    course_name?: string;
    course_desc?: string;
    course_level: Course_Level;
    course_category: Course_Category;
    course_image: string;
    course_object_req_id: mongoose.Schema.Types.ObjectId;
    num_of_students: number;
    instructor_id: mongoose.Schema.Types.ObjectId;
    course_price: number;
    course_lessons: number;
    course_duration: number;
    createdAt: Date;
    updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
    {
    course_name: { type: String},
    course_desc: { type: String},
    course_level: { type: String, enum: Object.values(Course_Level), default: Course_Level.BEGINNER },
    course_category: { type: String, enum: Object.values(Course_Category), default: Course_Category.GENERAL },
    course_image: { type: String },
    course_object_req_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseRO' },
    num_of_students: { type: Number },
    instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    course_price: { type: Number }, 
    course_lessons: { type: Number },
    course_duration: { type: Number },
    
    }, { 
        timestamps: true 
    }
);

export const Course = mongoose.model<ICourse>("Course", courseSchema);