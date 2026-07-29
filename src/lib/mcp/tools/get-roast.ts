import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { roasts } from "@/lib/baristo-data";

export default defineTool({
  name: "get_roast",
  title: "Get Baristo roast details",
  description: "Get full details for one Baristo roast by key: dark or truly-dark.",
  inputSchema: {
    roastKey: z.enum(["dark", "truly-dark"]).describe("The roast key"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ roastKey }) => {
    const roast = roasts.find((r) => r.key === roastKey);
    if (!roast) {
      return { content: [{ type: "text", text: `No roast found for key: ${roastKey}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(roast, null, 2) }],
      structuredContent: { roast },
    };
  },
});
