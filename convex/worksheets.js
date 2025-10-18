import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Fetch all worksheets
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("worksheets").collect();
  },
});

//add new worksheet
export const add = mutation({
  args: {
    subject: v.string(),
    chapter: v.string(),
    color: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    difficulty: v.string(),
    description: v.string(),
    driveLink: v.string(),
  
     date: v.string(),
    pages: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("worksheets", args);
  },
});

//delete worksheet by id

export const remove = mutation({
  args: { id: v.id("worksheets") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
