import mongoose, { Schema, Document, Model } from "mongoose";

import type {
  TailShape,
  GlassingType,
  RailType,
  FinSystem,
  FinSetup,
  ConstructionType,
  FinishType,
} from "./SurfboardModel";

export type SurfboardType = "custom_order" | "new_stock" | "used";

export type UsedCondition = "as_new" | "good" | "fair" | "well_used";

/**
 * Especificações técnicas — partilhadas pelos três tipos de prancha.
 */
export interface ISurfboardSpecs {
  brandSlug: string;
  brandName: string;

  modelSlug: string | null;
  modelName: string;

  length: string;
  lengthInches: number;
  width: string;
  widthInches: number;
  thickness: string;
  thicknessInches: number;
  volume: number;

  tail: TailShape;
  glassing: GlassingType;
  rails: RailType;
  customRailNote?: string;

  finSystem: FinSystem;
  finSetup: FinSetup;

  construction: ConstructionType;
  finish: FinishType;
}

export interface IUsedDetails {
  yearShaped?: number;
  condition: UsedCondition;
  dingsCount: number;
  repairsHistory?: string;
  previousOwner?: string;
  reasonForSelling?: string;
}

export interface ICustomOrderDetails {
  surferInfo: {
    name: string;
    weight: number;
    height: number;
    skillLevel: "iniciante" | "intermédio" | "avançado" | "profissional";
    phone: string;
    email: string;
    instagram?: string;
    facebook?: string;
  };
  customDesignFile?: string;
  customerNotes?: string;
  estimatedReadyDate: Date;
}

export interface ISurfboard extends Document {
  type: SurfboardType;

  slug: string;
  title: string;
  description?: string;

  specs: ISurfboardSpecs;

  price: number;
  salePrice?: number;
  currency: string;

  stockQuantity: number;

  images: string[];

  usedDetails?: IUsedDetails;

  customOrderDetails?: ICustomOrderDetails;

  active: boolean;
  featured: boolean;
  archived: boolean;

  views: number;

  createdAt: Date;
  updatedAt: Date;
}

const SpecsSchema = new Schema<ISurfboardSpecs>(
  {
    brandSlug: { type: String, required: true, index: true },
    brandName: { type: String, required: true },

    modelSlug: { type: String, default: null, index: true },
    modelName: { type: String, required: true },

    length: { type: String, required: true },
    lengthInches: { type: Number, required: true },
    width: { type: String, required: true },
    widthInches: { type: Number, required: true },
    thickness: { type: String, required: true },
    thicknessInches: { type: Number, required: true },
    volume: { type: Number, required: true },

    tail: {
      type: String,
      enum: ["pin", "round", "swallow", "squash", "square", "diamond"],
      required: true,
    },
    glassing: {
      type: String,
      enum: ["leve", "normal", "forte"],
      required: true,
    },
    rails: {
      type: String,
      enum: ["low", "full", "boxy", "outro"],
      required: true,
    },
    customRailNote: String,

    finSystem: {
      type: String,
      enum: ["FCS II", "Futures"],
      required: true,
    },
    finSetup: {
      type: String,
      enum: ["single", "twin", "thruster", "quad", "5-fin", "2plus1"],
      required: true,
    },

    construction: {
      type: String,
      enum: ["PU", "EPS", "FullCarbon"],
      required: true,
    },
    finish: {
      type: String,
      enum: ["polish", "drySand", "paint", "customDesign"],
      required: true,
    },
  },
  { _id: false }
);

const UsedDetailsSchema = new Schema<IUsedDetails>(
  {
    yearShaped: Number,
    condition: {
      type: String,
      enum: ["as_new", "good", "fair", "well_used"],
      required: true,
    },
    dingsCount: { type: Number, default: 0 },
    repairsHistory: String,
    previousOwner: String,
    reasonForSelling: String,
  },
  { _id: false }
);

const CustomOrderDetailsSchema = new Schema<ICustomOrderDetails>(
  {
    surferInfo: {
      name: { type: String, required: true },
      weight: { type: Number, required: true },
      height: { type: Number, required: true },
      skillLevel: {
        type: String,
        enum: ["iniciante", "intermédio", "avançado", "profissional"],
        required: true,
      },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      instagram: String,
      facebook: String,
    },
    customDesignFile: String,
    customerNotes: String,
    estimatedReadyDate: { type: Date, required: true },
  },
  { _id: false }
);

const SurfboardSchema = new Schema<ISurfboard>(
  {
    type: {
      type: String,
      enum: ["custom_order", "new_stock", "used"],
      required: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    description: String,

    specs: { type: SpecsSchema, required: true },

    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    currency: { type: String, default: "EUR" },

    stockQuantity: { type: Number, default: 1, min: 0 },

    images: [String],

    usedDetails: UsedDetailsSchema,
    customOrderDetails: CustomOrderDetailsSchema,

    active: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false },
    archived: { type: Boolean, default: false, index: true },

    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

SurfboardSchema.index({ type: 1, active: 1, archived: 1 });
SurfboardSchema.index({ "specs.brandSlug": 1, "specs.modelSlug": 1 });
SurfboardSchema.index({ price: 1 });
SurfboardSchema.index({ createdAt: -1 });

SurfboardSchema.pre("save", function () {
  if (this.type === "used" && !this.usedDetails) {
    throw new Error(
      "Pranchas usadas precisam de usedDetails preenchido (condição mínimo)."
    );
  }
  if (this.type === "custom_order" && !this.customOrderDetails) {
    throw new Error(
      "Encomendas custom precisam de customOrderDetails preenchido."
    );
  }
  if (this.type === "used" && this.stockQuantity > 1) {
    this.stockQuantity = 1;
  }
});

export const Surfboard: Model<ISurfboard> =
  mongoose.models.Surfboard ||
  mongoose.model<ISurfboard>("Surfboard", SurfboardSchema);
