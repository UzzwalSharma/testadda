import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Worksheet Submissions
export const addWorksheetSubmission = mutation({
  args: {
    studentName: v.string(),
    worksheetName: v.string(),
    marks: v.number(),
    timelySubmission: v.boolean(),
    submittedAt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("worksheetSubmissions", args);
  },
});