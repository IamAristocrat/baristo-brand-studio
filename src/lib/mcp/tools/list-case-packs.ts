import { defineTool } from "@lovable.dev/mcp-js";
import { casePacks } from "@/lib/baristo-data";

export default defineTool({
  name: "list_case_packs",
  title: "List Baristo case packs",
  description:
    "List all 10-pack Baristo case collections (single-roast, discovery, executive, altitude) with pack split, total, MRP, and launch pricing in INR.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(casePacks, null, 2) }],
    structuredContent: { casePacks },
  }),
});
