"use client";

import { useState } from "react";
import { Clock, Users, Heart, Share2, Bookmark, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeStep {
  step: number;
  description: string;
}

export interface RecipeProps {
  title: string;
  description: string;
  imageUrl: string;
  ingredients: RecipeIngredient[];
  calories: number;
  carbs: number;
  fat: number;
  fiber: number;
  protein: number;
  sugar: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  steps: RecipeStep[];
  tags: string[];
}

export function RecipeLoading() {
  return (
    <Card className="w-[800px] max-w-[95vw] overflow-hidden shadow-xl border-slate-200/50 dark:border-slate-700/50 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="h-[300px] bg-slate-200 dark:bg-slate-800 relative">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-[32px] w-[300px] mb-2" />
            <Skeleton className="h-[18px] w-[250px]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
          </div>
        </div>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-500" />
            <Skeleton className="h-[16px] w-[80px]" />
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-[16px] w-[70px]" />
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <Tabs defaultValue="ingredients">
          <TabsList className="mb-4">
            <TabsTrigger value="ingredients">食材</TabsTrigger>
            <TabsTrigger value="instructions">步骤</TabsTrigger>
            <TabsTrigger value="nutrition">营养信息</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients" className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`ingredient-${i}`} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <Skeleton className="h-[18px] w-[200px]" />
                <Skeleton className="h-[18px] w-[80px]" />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="instructions" className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`step-${i}`} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <Skeleton className="h-[20px] w-[20px] rounded-full" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-[18px] w-full mb-2" />
                  <Skeleton className="h-[18px] w-[90%]" />
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="nutrition" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`nutrition-${i}`} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Skeleton className="h-[18px] w-[100px]" />
                  <Skeleton className="h-[18px] w-[60px]" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
        <div className="flex gap-2">
          <Skeleton className="h-[36px] w-[80px] rounded-lg" />
          <Skeleton className="h-[36px] w-[80px] rounded-lg" />
        </div>
        <Skeleton className="h-[36px] w-[120px] rounded-lg" />
      </CardFooter>
    </Card>
  );
}

export function Recipe(props: RecipeProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const totalTime = props.prepTime + props.cookTime;
  
  // 对步骤进行排序，确保按正确顺序显示
  const sortedSteps = [...props.steps].sort((a, b) => a.step - b.step);
  
  return (
    <Card className="w-[800px] max-w-[95vw] overflow-hidden shadow-xl border-slate-200/50 dark:border-slate-700/50 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="h-[300px] relative overflow-hidden">
        <img 
          src={props.imageUrl} 
          alt={props.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // 图片加载失败时使用默认图片
            e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000";
          }}
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {props.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-full text-sm font-medium backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {props.title}
            </CardTitle>
            <CardDescription className="text-base mt-1 text-slate-600 dark:text-slate-400">
              {props.description}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full transition-colors",
                isFavorite ? "bg-red-100 text-red-500 border-red-200 dark:bg-red-900/30 dark:border-red-800" : ""
              )}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500" : "")} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full transition-colors",
                isSaved ? "bg-blue-100 text-blue-500 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800" : ""
              )}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark className={cn("h-5 w-5", isSaved ? "fill-blue-500" : "")} />
            </Button>
          </div>
        </div>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">{totalTime} 分钟</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">{props.servings} 份</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">{props.calories} 卡路里</span>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <Tabs defaultValue="ingredients">
          <TabsList className="mb-4">
            <TabsTrigger value="ingredients">食材</TabsTrigger>
            <TabsTrigger value="instructions">步骤</TabsTrigger>
            <TabsTrigger value="nutrition">营养信息</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients" className="space-y-4">
            {props.ingredients.map((ingredient, index) => (
              <div key={index} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-medium text-slate-800 dark:text-slate-200">{ingredient.name}</span>
                <span className="text-slate-600 dark:text-slate-400">{ingredient.amount} {ingredient.unit}</span>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="instructions" className="space-y-6">
            {sortedSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{step.step}</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 dark:text-slate-300">{step.description}</p>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="nutrition" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-600 dark:text-slate-400">蛋白质</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{props.protein}g</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-600 dark:text-slate-400">碳水化合物</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{props.carbs}g</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-600 dark:text-slate-400">脂肪</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{props.fat}g</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-600 dark:text-slate-400">纤维</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{props.fiber}g</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-600 dark:text-slate-400">糖</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{props.sugar}g</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-600 dark:text-slate-400">卡路里</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{props.calories}kcal</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-lg">
            <Share2 className="h-4 w-4 mr-2" />
            分享
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg">
            打印
          </Button>
        </div>
        <Button className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
          开始烹饪
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}