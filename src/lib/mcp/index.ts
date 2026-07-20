import { defineMcp } from "@lovable.dev/mcp-js";
import listRoasts from "./tools/list-roasts";
import getRoast from "./tools/get-roast";
import listCasePacks from "./tools/list-case-packs";
import listRecipes from "./tools/list-recipes";
import getRecipe from "./tools/get-recipe";

export default defineMcp({
  name: "baristo-mcp",
  title: "Baristo.Online MCP",
  version: "0.1.0",
  instructions:
    "Public catalog tools for Baristo.Online — a premium Indian single-origin coffee brand. Use list_roasts / get_roast for the three roast profiles (Medium, Medium-Dark, Truly Dark), list_case_packs for the 10-pack case collections and pricing, and list_recipes / get_recipe for brewing rituals with ingredients and step-by-step instructions.",
  tools: [listRoasts, getRoast, listCasePacks, listRecipes, getRecipe],
});
