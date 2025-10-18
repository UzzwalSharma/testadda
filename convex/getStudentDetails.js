import { query } from "./_generated/server";
import { v } from "convex/values";

export const getStudentDetails = query({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    // Fetch worksheet submissions for this student
    const worksheets = await ctx.db
      .query("worksheetSubmissions")
      .filter((q) => q.eq(q.field("studentName"), name))
      .collect();

    // Fetch test submissions for this student
    const tests = await ctx.db
      .query("testSubmissions")
      .filter((q) => q.eq(q.field("studentName"), name))
      .collect();

    // Return combined data
    return {
      success: true,
      student: {
        name,
        worksheets,
        tests,
      },
    };
  },
});
