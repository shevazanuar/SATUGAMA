import { pgTable, serial, text, integer, timestamp, boolean, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ──────────────────────────────────────────────────────────────────────────────
// ENUMS
// ──────────────────────────────────────────────────────────────────────────────
export const categoryEnum = pgEnum("product_category", ["2d", "3d", "ui"]);
export const inquiryStatusEnum = pgEnum("inquiry_status", ["new", "in_progress", "done", "rejected"]);

// ──────────────────────────────────────────────────────────────────────────────
// TABLES
// ──────────────────────────────────────────────────────────────────────────────

// 1. PRODUCTS
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  category: categoryEnum("category").notNull(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  shortDesc: text("short_desc").notNull(),
  longDesc: text("long_desc").array().notNull(), // text array untuk paragraf deskripsi
  price: text("price").notNull(), // format string, e.g. "Rp 49.000"
  priceValue: integer("price_value").notNull(), // nilai numerik, e.g. 49000
  badge: text("badge").notNull(),
  gradient: text("gradient").notNull(),
  headerGradient: text("header_gradient").notNull(),
  iconBg: text("icon_bg").notNull(),
  accentColor: text("accent_color").notNull(),
  ctaBorder: text("cta_border").notNull(),
  releaseDate: text("release_date").notNull(),
  version: text("version").notNull(),
  fileSize: text("file_size").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  whatYouGet: jsonb("what_you_get").$type<Array<{ title: string; description: string; icon: string }>>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. PRODUCT IMAGES
export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  altText: text("alt_text").notNull(),
  isThumbnail: boolean("is_thumbnail").default(false).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 3. PRODUCT FEATURES (checklist "apa yang didapat" / features)
export const productFeatures = pgTable("product_features", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  featureText: text("feature_text").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 4. PRODUCT TAGS
export const productTags = pgTable("product_tags", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  tag: text("tag").notNull(),
});

// 5. PRODUCT SPECS
export const productSpecs = pgTable("product_specs", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 6. PRODUCT COMPATIBILITY
export const productCompatibility = pgTable("product_compatibility", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  engineName: text("engine_name").notNull(),
});

// 7. INQUIRIES (form kontak)
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  assetStyle: text("asset_style"),
  budget: text("budget"),
  message: text("message").notNull(),
  status: inquiryStatusEnum("status").default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. TEAM MEMBERS
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  photoUrl: text("photo_url").notNull(),
  badge: text("badge"),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

// 9. TESTIMONIALS
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  reviewerName: text("reviewer_name").notNull(),
  reviewerCompany: text("reviewer_company").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(), // 1 sampai 5
  productId: integer("product_id").references(() => products.id, { onDelete: "set null" }),
  isApproved: boolean("is_approved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 10. BETTER AUTH TABLES
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: text("role").default("admin").notNull(), // 'admin' | 'super_admin'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const accounts = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"), // password hash disimpan oleh Better Auth di kolom ini
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verifications = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ──────────────────────────────────────────────────────────────────────────────
// RELATIONS
// ──────────────────────────────────────────────────────────────────────────────

export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages),
  features: many(productFeatures),
  tags: many(productTags),
  specs: many(productSpecs),
  compatibility: many(productCompatibility),
  testimonials: many(testimonials),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const productFeaturesRelations = relations(productFeatures, ({ one }) => ({
  product: one(products, {
    fields: [productFeatures.productId],
    references: [products.id],
  }),
}));

export const productTagsRelations = relations(productTags, ({ one }) => ({
  product: one(products, {
    fields: [productTags.productId],
    references: [products.id],
  }),
}));

export const productSpecsRelations = relations(productSpecs, ({ one }) => ({
  product: one(products, {
    fields: [productSpecs.productId],
    references: [products.id],
  }),
}));

export const productCompatibilityRelations = relations(productCompatibility, ({ one }) => ({
  product: one(products, {
    fields: [productCompatibility.productId],
    references: [products.id],
  }),
}));

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  product: one(products, {
    fields: [testimonials.productId],
    references: [products.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
