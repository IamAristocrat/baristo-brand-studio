import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { recipes } from "@/lib/baristo-data";

export default defineTool({
  name: "list_recipes",
  title: "List Baristo recipes",
  description:
    "List Baristo recipes with optional filters by roast (Medium, Dark, Truly Dark) and brew method (Moka Pot, French Press, Pour-Over, Espresso). Returns a summary; use get_recipe for full brewing steps.",
  inputSchema: {
    roast: z.enum(["Medium", "Dark", "Truly Dark"]).optional(),
    brewMethod: z.enum(["Moka Pot", "French Press", "Pour-Over", "Espresso"]).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ roast, brewMethod }) => {
    const filtered = recipes.filter((r) => {
      if (roast && !r.roasts.includes(roast)) return false;
      if (brewMethod && !r.brewMethods.includes(brewMethod)) return false;
      return true;
    });
    const summary = filtered.map((r) => ({
      slug: r.slug,
      name: r.name,
      theme: r.theme,
      roasts: r.roasts,
      brewMethods: r.brewMethods,
      moment: r.moment,
      difficulty: r.difficulty,
      prepTime: r.prepTime,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: { recipes: summary },
    };
  },
});
