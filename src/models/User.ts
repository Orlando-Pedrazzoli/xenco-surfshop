import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAddress {
  label?: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  phone?: string;
  role: "customer" | "admin";
  addresses: IAddress[];
  stripeCustomerId?: string;

  // Dados do surfista (para encomendas custom)
  surferProfile?: {
    weight?: number;
    height?: number;
    skillLevel?: "iniciante" | "intermédio" | "avançado" | "profissional";
    instagram?: string;
    facebook?: string;
  };

  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>(
  {
    label: String,
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: "Portugal" },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      select: false,
      minlength: 6,
    },
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      index: true,
    },
    addresses: [AddressSchema],
    stripeCustomerId: { type: String, index: true, sparse: true },

    surferProfile: {
      weight: Number,
      height: Number,
      skillLevel: {
        type: String,
        enum: ["iniciante", "intermédio", "avançado", "profissional"],
      },
      instagram: String,
      facebook: String,
    },

    emailVerified: Date,
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
