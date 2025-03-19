import { auth } from "@/app/(auth)/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Eye, ArrowLeft, Download, Filter } from "lucide-react";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getAllChats, isUserAdmin } from "@/lib/db/queries";
import { Badge } from "@/components/ui/badge";

export default async function AdminChatsPage() {
  const session = await auth();
  
  // Check if user is authenticated and is an admin
  if (!session?.user?.id) {
    return notFound();
  }
  
  const userIsAdmin = await isUserAdmin(session.user.id);
  if (!userIsAdmin) {
    return notFound();
  }
  
  // Fetch all chats
  const chats = await getAllChats();
  
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat Sessions</h1>
          <p className="text-muted-foreground">View and analyze user chat sessions</p>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Chat Sessions</CardTitle>
              <CardDescription>Showing {chats.length} chat sessions from users</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Chat ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No chat sessions found
                    </TableCell>
                  </TableRow>
                ) : (
                  chats.map((chat) => (
                    <TableRow key={chat.id}>
                      <TableCell className="font-medium max-w-[100px] truncate">
                        {chat.id}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {chat.title || "Untitled Chat"}
                      </TableCell>
                      <TableCell>
                        {format(new Date(chat.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={chat.visibility === "public" ? "secondary" : "outline"}
                          className="capitalize"
                        >
                          {chat.visibility}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/chat/${chat.id}`}>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
