import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add new test
export const addTest = mutation({
  args: {
    title: v.string(),
    subject: v.string(),
    date: v.string(),
    time: v.string(),
    duration: v.string(),
    totalMarks: v.string(),
    driveLink: v.string(),
    testType: v.string(), // "MCQ", "AI", "Chapter Wise"
  },
  handler: async (ctx, args) => {
    const testId = await ctx.db.insert("tests", args);
    return testId;
  },
});

// Fetch all tests
export const getAllTests = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("tests")
      .order("desc") // Orders by _creationTime by default
      .collect();
  },
});

// Delete a test
export const removeTest = mutation({
  args: { id: v.id("tests") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Get single test by ID
export const getTest = query({
  args: { id: v.id("tests") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get tests by type
export const getTestsByType = query({
  args: { testType: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tests")
      .filter((q) => q.eq(q.field("testType"), args.testType))
      .order("desc")
      .collect();
  },
});