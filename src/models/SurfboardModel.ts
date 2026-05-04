import mongoose, { Schema, Document, Model } from "mongoose";

export type TailShape =
  | "pin"
  | "round"
  | "swallow"
  | "squash"
  | "square"
  | "diamond";

export type GlassingType = "leve" | "normal" | "forte";

export type RailType = "low" | "full" | "boxy" | "outro";

export type FinSystem = "FCS II" | "Futures";

export type FinSetup =
  | "single"
  | "twin"
  | "thruster"
  | "quad"
  | "5-fin"
  | "2plus1";

export type ConstructionType = "PU" | "EPS" | "FullCarbon";

export type FinishType = "polish" | "drySand" | "paint" | "customDesign";

export interface IStandardDimension {
  length: string;       // "5'10\""
  lengthInches: number; // 70 (para cálculos e ordenação)
  width: string;        // "18 5/8\""
  widthInches: number;  // 18.625
  thickness: string;    // "2 3/8\""
  thicknessInches: number; // 2.375
  volume: number;       // litros
}

export interface IPriceMatrix {
  basePrice: number | null;

  constructions: {
    PU: { available: boolean; addon: number };
    EPS: { available: boolean; addon: number };
    FullCarbon: { available: boolean; addon: number };
  };

  finishOptions: {
    polish: { addon: number };
    drySand: { addon: number };
    paint: { addon: number };
    customDesign: { addon: number };
  };

  glassingOptions: {
    leve: { addon: number };
    normal: { addon: number };
    forte: { addon: number };
  };

  finSystemAddon: {
    "FCS II": number;
    Futures: number;
  };
}

export interface ISurfboardModel extends Document {
  brandSlug: string;
  slug: string;
  name: string;

  shaper?: string;
  tagline?: string;
  description?: string;
  shaperNotes?: string;

  category:
    | "shortboard"
    | "midlength"
    | "longboard"
    | "fish"
    | "twin"
    | "groveler"
    | "gun"
    | "evolution";

  idealWaveSize: { min: number; max: number };

  skillLevels: ("iniciante" | "intermédio" | "avançado" | "profissional")[];

  images: {
    main?: string;
    deck?: string;
    bottom?: string;
    profile?: string;
    logo?: string;
  };

  standardDimensions: IStandardDimension[];

  customRanges: {
    length: { min: string; max: string };
    width: { min: string; max: string };
    thickness: { min: string; max: string };
  };

  availableTails: TailShape[];
  recommendedTail?: TailShape;

  availableConstructions: ConstructionType[];

  pricing: IPriceMatrix;

  active: boolean;
  featured: boolean;
  order: number;

  createdAt: Date;
  updatedAt: Date;
}

const StandardDimensionSchema = new Schema<IStandardDimension>(
  {
    length: { type: String, required: true },
    lengthInches: { type: Number, required: true },
    width: { type: String, required: true },
    widthInches: { type: Number, required: true },
    thickness: { type: String, required: true },
    thicknessInches: { type: Number, required: true },
    volume: { type: Number, required: true },
  },
  { _id: false }
);

const SurfboardModelSchema = new Schema<ISurfboardModel>(
  {
    brandSlug: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },

    shaper: String,
    tagline: String,
    description: String,
    shaperNotes: String,

    category: {
      type: String,
      enum: [
        "shortboard",
        "midlength",
        "longboard",
        "fish",
        "twin",
        "groveler",
        "gun",
        "evolution",
      ],
      required: true,
      index: true,
    },

    idealWaveSize: {
      min: { type: Number, default: 0.5 },
      max: { type: Number, default: 2.5 },
    },

    skillLevels: [
      {
        type: String,
        enum: ["iniciante", "intermédio", "avançado", "profissional"],
      },
    ],

    images: {
      main: String,
      deck: String,
      bottom: String,
      profile: String,
      logo: String,
    },

    standardDimensions: [StandardDimensionSchema],

    customRanges: {
      length: {
        min: { type: String, required: true },
        max: { type: String, required: true },
      },
      width: {
        min: { type: String, required: true },
        max: { type: String, required: true },
      },
      thickness: {
        min: { type: String, required: true },
        max: { type: String, required: true },
      },
    },

    availableTails: [
      {
        type: String,
        enum: ["pin", "round", "swallow", "squash", "square", "diamond"],
      },
    ],
    recommendedTail: {
      type: String,
      enum: ["pin", "round", "swallow", "squash", "square", "diamond"],
    },

    availableConstructions: [
      { type: String, enum: ["PU", "EPS", "FullCarbon"] },
    ],

    pricing: {
      basePrice: { type: Number, default: null },

      constructions: {
        PU: {
          available: { type: Boolean, default: true },
          addon: { type: Number, default: 0 },
        },
        EPS: {
          available: { type: Boolean, default: false },
          addon: { type: Number, default: 0 },
        },
        FullCarbon: {
          available: { type: Boolean, default: false },
          addon: { type: Number, default: 0 },
        },
      },

      finishOptions: {
        polish: { addon: { type: Number, default: 0 } },
        drySand: { addon: { type: Number, default: 0 } },
        paint: { addon: { type: Number, default: 0 } },
        customDesign: { addon: { type: Number, default: 0 } },
      },

      glassingOptions: {
        leve: { addon: { type: Number, default: 0 } },
        normal: { addon: { type: Number, default: 0 } },
        forte: { addon: { type: Number, default: 0 } },
      },

      finSystemAddon: {
        "FCS II": { type: Number, default: 0 },
        Futures: { type: Number, default: 0 },
      },
    },

    active: { type: Boolean, default: false, index: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

SurfboardModelSchema.index({ brandSlug: 1, slug: 1 }, { unique: true });

SurfboardModelSchema.pre("save", function () {
  if (this.pricing.basePrice === null || this.pricing.basePrice <= 0) {
    this.active = false;
  }
});

export const SurfboardModel: Model<ISurfboardModel> =
  mongoose.models.SurfboardModel ||
  mongoose.model<ISurfboardModel>("SurfboardModel", SurfboardModelSchema);
