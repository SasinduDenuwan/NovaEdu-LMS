import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}   

const cartSchema = new Schema<ICart>(
    {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }, { 
        timestamps: true 
    }
);

export const Cart = mongoose.model<ICart>("Cart", cartSchema);