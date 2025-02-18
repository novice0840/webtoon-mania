import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebtoonList from "./components/WebtoonList";

export default async function Home() {
  return (
    <Tabs defaultValue="all" className="flex w-full flex-col items-center">
      <TabsList>
        <TabsTrigger value="all">전체</TabsTrigger>
        <TabsTrigger value="naverWebtoon">네이버웹툰</TabsTrigger>
        <TabsTrigger value="kakaoPage">카카오페이지</TabsTrigger>
        <TabsTrigger value="kakaoWebtoon">카카오웹툰</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <WebtoonList platform="all" />
      </TabsContent>
      <TabsContent value="naverWebtoon">
        <WebtoonList platform="naver" />
      </TabsContent>
      <TabsContent value="kakaoPage">
        <WebtoonList platform="kakaoPage" />
      </TabsContent>
      <TabsContent value="kakaoWebtoon">
        <WebtoonList platform="kakaoWebtoon" />
      </TabsContent>
    </Tabs>
  );
}
