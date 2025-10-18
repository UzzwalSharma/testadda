import {  mutation } from "./_generated/server";
import { v } from "convex/values";
// Test Submissions
export const addTestSubmission = mutation({
  args: {
    studentName: v.string(),
    testName: v.string(),
    marks: v.number(),
    timelySubmission: v.boolean(),
    submittedAt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("testSubmissions", args);
  },
});