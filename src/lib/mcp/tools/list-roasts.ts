import { defineTool } from "@lovable.dev/mcp-js";
import { roasts } from "@/lib/baristo-data";

export default defineTool({
  name: "list_roasts",
  title: "List Baristo roasts",
  description:
    "List all Baristo.Online single-origin roasts (Medium, Medium-Dark, Truly Dark) with tasting notes, intensity, pricing (INR), and pouch size.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(roasts, null, 2) }],
    structuredContent: { roasts },
  }),
});
