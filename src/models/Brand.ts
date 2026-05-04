import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBrand extends Document {
  slug: string;
  name: string;
  description?: string;
  logo?: string;

  /**
   * Se true → modelo é dropdown com SurfboardModels pré-carregados
   * Se false → modelo é texto livre quando se adiciona prancha
   */
  hasModelTemplates: boolean;

  /**
   * Categorias de produtos que esta marca cobre na loja
   * Ex: Semente → ["surfboards"], Rip Curl → ["wetsuits"], Dakine → ["accessories"]
   */
  productCategories: string[];

  active: boolean;
  featured: boolean;
  order: number;

  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    description: String,
    logo: String,

    hasModelTemplates: { type: Boolean, default: false },
    productCategories: [
      {
        type: String,
        enum: ["surfboards", "wetsuits", "accessories", "clothing"],
      },
    ],

    active: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Brand: Model<IBrand> =
  mongoose.models.Brand || mongoose.model<IBrand>("Brand", BrandSchema);
