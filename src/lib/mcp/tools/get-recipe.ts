import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { recipes } from "@/lib/baristo-data";

export default defineTool({
  name: "get_recipe",
  title: "Get Baristo recipe",
  description:
    "Get full details for one Baristo recipe by slug — ingredients, step-by-step brew instructions, tasting notes, and pairing.",
  inputSchema: {
    slug: z.string().min(1).describe("Recipe slug, e.g. baristo-classic, sage, zen"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const recipe = recipes.find((r) => r.slug === slug);
    if (!recipe) {
      return { content: [{ type: "text", text: `No recipe found for slug: ${slug}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(recipe, null, 2) }],
      structuredContent: { recipe },
    };
  },
});
