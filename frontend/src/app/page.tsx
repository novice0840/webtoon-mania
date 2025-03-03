import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebtoonList from "./components/WebtoonList";

export default async function Home() {
  return (
    <Tabs defaultValue="all" className="flex w-full flex-col items-center">
      <TabsList>
        <TabsTrigger value="all">전체</TabsTrigger>
        <TabsTrigger value="네이버웹툰">네이버웹툰</TabsTrigger>
        <TabsTrigger value="카카오페이지">카카오페이지</TabsTrigger>
        <TabsTrigger value="카카오웹툰">카카오웹툰</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <WebtoonList platform="all" />
      </TabsContent>
      <TabsContent value="네이버웹툰">
        <WebtoonList platform="네이버웹툰" />
      </TabsContent>
      <TabsContent value="카카오페이지">
        <WebtoonList platform="카카오페이지" />
      </TabsContent>
      <TabsContent value="카카오웹툰">
        <WebtoonList platform="카카오웹툰" />
      </TabsContent>
    </Tabs>
  );
}
