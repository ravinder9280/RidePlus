// app/requests/page.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import IncomingRequestsClient from "@/components/requests/IncomingRequests";
import MyRequestsList from "@/components/requests/MyRequestsList";
import { Separator } from "@/components/ui/separator";
import { Handshake } from 'lucide-react';

export default async function RequestsHubPage() {
    return (
        <div className="mx-auto container xl:p-0 p-2 md:p-6 space-y-6">
            <h1 className="text-xl flex items-center gap-2 font-semibold">
                <Handshake/>
                
                <span>

                Requests
                </span>
            </h1>
            <Separator/>

            <Tabs defaultValue="incoming" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="incoming">Requests</TabsTrigger>
                    <TabsTrigger value="mine">My Requests</TabsTrigger>
                </TabsList>

                <TabsContent value="incoming">
                    <IncomingRequestsClient />
                </TabsContent>

                <TabsContent value="mine">
                    <MyRequestsList filter="ALL" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
