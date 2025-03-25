import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { CUSTOM_UI_YIELD_NAME } from "@/utils/server";
import { Recipe, RecipeLoading } from "@/components/prebuilt/recipe";
import { dispatchCustomEvent } from "@langchain/core/callbacks/dispatch/web";

// 定义食材的schema
const ingredientSchema = z.object({
  name: z.string().describe("食材名称"),
  amount: z.number().describe("食材数量"),
  unit: z.string().describe("食材单位（如克、勺等）"),
});

// 定义烹饪步骤的schema
const stepSchema = z.object({
  step: z.number().describe("步骤序号"),
  description: z.string().describe("步骤描述"),
});

// 定义食谱的schema
const recipeSchema = z.object({
  title: z.string().describe("食谱标题"),
  description: z.string().describe("食谱描述"),
  imageUrl: z.string().url().describe("食谱图片URL"),
  ingredients: z.array(ingredientSchema).describe("食材列表"),
  calories: z.number().describe("卡路里"),
  carbs: z.number().describe("碳水化合物(克)"),
  fat: z.number().describe("脂肪(克)"),
  fiber: z.number().describe("纤维(克)"),
  protein: z.number().describe("蛋白质(克)"),
  sugar: z.number().describe("糖(克)"),
  prepTime: z.number().describe("准备时间(分钟)"),
  cookTime: z.number().describe("烹饪时间(分钟)"),
  servings: z.number().describe("份量"),
  steps: z.array(stepSchema).describe("烹饪步骤"),
  tags: z.array(z.string()).describe("标签，如'低脂'、'素食'等"),
});

// 导出类型定义
export type RecipeData = z.infer<typeof recipeSchema>;

export const recipeTool = tool(
  async (input: RecipeData, config) => {
    try {
      // 显示加载状态
      await dispatchCustomEvent(
        CUSTOM_UI_YIELD_NAME,
        {
          output: {
            value: <RecipeLoading />,
            type: "append",
          },
        },
        config,
      );

      // 更新UI显示处理后的数据
      await dispatchCustomEvent(
        CUSTOM_UI_YIELD_NAME,
        {
          output: {
            value: <Recipe {...input} />,
            type: "update",
          },
        },
        config,
      );

      // 返回JSON格式的成功消息，而不是纯文本
      return JSON.stringify({ status: "success", message: "食谱信息已成功生成并显示。" });
    } catch (error) {
      console.error("食谱处理失败:", error);
      throw new Error(`食谱处理失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
  {
    name: "recipe",
    description: "生成健康食谱的工具，包括标题、描述、食材、营养信息和烹饪步骤。适用于用户询问健康饮食、减肥食谱、增肌餐等场景。",
    schema: recipeSchema,
  },
);