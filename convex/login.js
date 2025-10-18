import { query } from "./_generated/server";
import { v } from "convex/values";

export const checkLogin = query({
  args: { name: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const student = await ctx.db
      .query("students")
      .filter((q) =>
        q.and(q.eq(q.field("name"), args.name), q.eq(q.field("password"), args.password))
      )
      .first();

    if (!student) {
      return { success: false, message: "Invalid name or password" };
    }
    return { success: true, student };
  },
});
