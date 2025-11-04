import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  worksheets: defineTable({
    subject: v.string(),
    chapter: v.string(),
    color: v.optional(v.string()),
     imageUrl: v.optional(v.string()),
  
 description: v.string(),
 difficulty: v.string(),
    driveLink: v.string(),
    pages: v.number(),
     date: v.string(),
  }),
  students: defineTable({
    name: v.string(),
    password: v.string(),
  }),
   worksheetSubmissions: defineTable({
    studentName: v.string(),
    worksheetName: v.string(),
    marks: v.number(),
    timelySubmission: v.boolean(),
    submittedAt: v.string(),
  }),
   testSubmissions: defineTable({
    studentName: v.string(),
    testName: v.string(),
    marks: v.number(),
    timelySubmission: v.boolean(),
    submittedAt: v.string(),
  }),
   tests: defineTable({
    title: v.string(),
    subject: v.string(),
    date: v.string(),
    time: v.string(),
    duration: v.string(),
    totalMarks: v.string(),
    driveLink: v.string(),
    testType: v.string(), // "MCQ", "AI", "Chapter Wise"
   
  }),
});
