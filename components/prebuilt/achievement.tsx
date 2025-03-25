"use client";

import { useState } from "react";
import { CalendarIcon, Share2Icon } from "@radix-ui/react-icons";
import { Award, Edit as EditIcon, Star, Trophy, Medal, Target, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: "award" | "star" | "trophy" | "medal" | "target" | "zap" | "check";
  category: string;
  earnedDate: string;
  level: "bronze" | "silver" | "gold" | "platinum";
  progress?: number; // 可选，用于显示进度
  maxProgress?: number; // 可选，用于显示进度上限
}

export interface AchievementProps {
  title: string;
  description?: string;
  badges: AchievementBadge[];
}

export function AchievementLoading() {
  return (
    <Card className="w-[800px] max-w-[95vw] bg-gradient-to-br from-slate-50/90 to-slate-100/90 dark:from-slate-900/90 dark:to-slate-800/90 shadow-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-md">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0 pb-6">
        <div className="space-y-2">
          <CardTitle>
            <Skeleton className="h-[28px] w-[280px] bg-slate-200/70 dark:bg-slate-700/70" />
          </CardTitle>
          <CardDescription>
            <div className="flex flex-col gap-[4px] pt-[6px]">
              <Skeleton className="h-[18px] w-[200px] bg-slate-200/70 dark:bg-slate-700/70" />
            </div>
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md">
          <Skeleton className="h-[44px] w-[100px] bg-slate-200/70 dark:bg-slate-700/70 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="pb-6 px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`badge-${i}`} className="flex flex-col p-6 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-sm border border-slate-100 dark:border-slate-700/50 transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-3">
                <Skeleton className="h-[48px] w-[48px] rounded-full bg-slate-200/70 dark:bg-slate-700/70" />
                <Skeleton className="h-[22px] w-[70px] rounded-full bg-slate-200/70 dark:bg-slate-700/70" />
              </div>
              <Skeleton className="h-[20px] w-[140px] mb-2 bg-slate-200/70 dark:bg-slate-700/70" />
              <Skeleton className="h-[16px] w-full bg-slate-200/70 dark:bg-slate-700/70" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function Achievement(props: AchievementProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [achievementData, setAchievementData] = useState<AchievementProps>(props);
  
  const handleShare = async () => {
    try {
      await navigator.share({
        title: achievementData.title,
        text: `查看我的成就徽章：${achievementData.title}`,
        url: window.location.href,
      });
    } catch (error) {
      console.log('分享失败:', error);
      const shareText = `${achievementData.title}: 我已获得 ${achievementData.badges.length} 个成就徽章！`;
      await navigator.clipboard.writeText(shareText);
      alert('已复制到剪贴板');
    }
  };

  const handleSave = (newData: Partial<AchievementProps>) => {
    setAchievementData({ ...achievementData, ...newData });
    setShowEditDialog(false);
  };

  const getBadgeIcon = (iconName: string) => {
    switch(iconName) {
      case "award": return <Award className="h-10 w-10" />;
      case "star": return <Star className="h-10 w-10" />;
      case "trophy": return <Trophy className="h-10 w-10" />;
      case "medal": return <Medal className="h-10 w-10" />;
      case "target": return <Target className="h-10 w-10" />;
      case "zap": return <Zap className="h-10 w-10" />;
      case "check": return <CheckCircle className="h-10 w-10" />;
      default: return <Award className="h-10 w-10" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case "bronze": return "text-amber-700 dark:text-amber-600";
      case "silver": return "text-slate-400 dark:text-slate-300";
      case "gold": return "text-yellow-500 dark:text-yellow-400";
      case "platinum": return "text-cyan-500 dark:text-cyan-400";
      default: return "text-slate-500 dark:text-slate-400";
    }
  };

  const getLevelBgColor = (level: string) => {
    switch(level) {
      case "bronze": return "bg-amber-100/70 dark:bg-amber-900/30";
      case "silver": return "bg-slate-100/70 dark:bg-slate-800/50";
      case "gold": return "bg-yellow-100/70 dark:bg-yellow-900/30";
      case "platinum": return "bg-cyan-100/70 dark:bg-cyan-900/30";
      default: return "bg-slate-100/70 dark:bg-slate-800/50";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy年MM月dd日', { locale: zhCN });
  };

  return (
    <Card className={cn(
      "w-[800px] max-w-[95vw] transition-all duration-300 rounded-2xl overflow-hidden",
      "bg-gradient-to-br from-purple-50/90 via-indigo-50/90 to-blue-50/90 dark:from-slate-900/90 dark:via-purple-950/90 dark:to-indigo-950/90",
      "border border-indigo-100/50 dark:border-indigo-900/30 backdrop-blur-md",
      "shadow-xl"
    )}>
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-6 space-y-0 border-b border-indigo-100/30 dark:border-indigo-800/20 pb-6">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">
            {achievementData.title}
          </CardTitle>
          {achievementData.description && (
            <CardDescription className="text-indigo-600/90 dark:text-indigo-400/90 text-base">
              {achievementData.description}
            </CardDescription>
          )}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowEditDialog(true)}
            className="h-11 w-11 rounded-full border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/50 transition-colors"
          >
            <EditIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </Button>
          <Button
            variant="secondary"
            className="rounded-full px-5 bg-indigo-100/80 hover:bg-indigo-200/80 dark:bg-indigo-900/60 dark:hover:bg-indigo-800/80 text-indigo-700 dark:text-indigo-300 shadow-sm transition-colors text-base"
            onClick={handleShare}
          >
            <Share2Icon className="mr-2 h-5 w-5" />
            分享
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-8 pb-6 px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {achievementData.badges.map((badge) => (
            <div 
              key={badge.id} 
              className={cn(
                "flex flex-col p-6 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-sm",
                "border border-indigo-100/50 dark:border-indigo-800/30",
                "transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={cn(
                  "p-2.5 rounded-full",
                  getLevelBgColor(badge.level)
                )}>
                  <div className={getLevelColor(badge.level)}>
                    {getBadgeIcon(badge.icon)}
                  </div>
                </div>
                <Badge className={cn(
                  "px-3 py-1 text-sm font-medium rounded-full",
                  getLevelBgColor(badge.level),
                  getLevelColor(badge.level)
                )}>
                  {badge.level === "bronze" ? "铜牌" : 
                   badge.level === "silver" ? "银牌" : 
                   badge.level === "gold" ? "金牌" : "白金"}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-1.5">{badge.title}</h3>
              <p className="text-sm text-indigo-700/80 dark:text-indigo-400/80 mb-3">{badge.description}</p>
              <div className="mt-auto flex items-center text-xs text-indigo-600/70 dark:text-indigo-400/70">
                <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                {formatDate(badge.earnedDate)}
              </div>
              {(badge.progress !== undefined && badge.maxProgress !== undefined) && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-indigo-600/80 dark:text-indigo-400/80 mb-1">
                    <span>进度</span>
                    <span>{badge.progress}/{badge.maxProgress}</span>
                  </div>
                  <div className="h-1.5 w-full bg-indigo-100/70 dark:bg-indigo-900/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-400 rounded-full" 
                      style={{ width: `${Math.min((badge.progress / badge.maxProgress) * 100, 100)}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      {/* 编辑对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>编辑成就信息</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                标题
              </Label>
              <Input
                id="title"
                defaultValue={achievementData.title}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                描述
              </Label>
              <Input
                id="description"
                defaultValue={achievementData.description}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" onClick={() => handleSave({
              title: (document.getElementById('title') as HTMLInputElement).value,
              description: (document.getElementById('description') as HTMLInputElement).value
            })}>保存</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}