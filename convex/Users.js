import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const CreateNewUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length == 0) {
      const data = {
        email: args.email,
        name: args.name,
      };

      const result = await ctx.db.insert("users", {
        ...data,
      });

      return data;
    }

    return user[0];
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return user[0];
  },
});

