
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  X,
  Trash2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Comment {
  id: number;
  userName: string;
  userEmail: string;
  comment: string;
  postTitle: string;
  postLink: string;
  status: "Approved" | "Pending";
}

const INITIAL_DATA: Comment[] = [
  {
    id: 1,
    userName: "Sakinur Rahman",
    userEmail: "sakinur.ws99@gmail.com",
    comment: "ZSXAFcsd",
    postTitle: "collegiate-power-shifts-and-legal-battles-ignite-college-sports-landscape",
    postLink: "#",
    status: "Approved"
  },
  {
    id: 2,
    userName: "Franquia Mercado Financeiro Bitcoin Forex Ações Br",
    userEmail: "fxwebea@gmail.com",
    comment: "teste teste",
    postTitle: "theunitedstateshaslongbeenknownasanationofimmigrantsanddiversity",
    postLink: "#",
    status: "Pending"
  },
  {
    id: 3,
    userName: "Alice Dupont",
    userEmail: "alice.dupont1981@gmail.com",
    comment: "Hello",
    postTitle: "ausigbnsgmc",
    postLink: "#",
    status: "Pending"
  },
  {
    id: 4,
    userName: "Joel Condori",
    userEmail: "joel@promundos.com",
    comment: "Ujh",
    postTitle: "tensions-and-conflict-define-recent-months-in-the-last-few-months-the-global-political-landscape",
    postLink: "#",
    status: "Pending"
  },
  {
    id: 5,
    userName: "Joel Condori",
    userEmail: "joel@promundos.com",
    comment: "Ujhhh",
    postTitle: "acsfgbnsgnc",
    postLink: "#",
    status: "Pending"
  },
  {
    id: 6,
    userName: "AJOY Quomodosoft",
    userEmail: "ajoy.quomodosoft@gmail.com",
    comment: "Very good",
    postTitle: "acsfgbnsgnc",
    postLink: "#",
    status: "Approved"
  },
  {
    id: 7,
    userName: "Rubén Silva",
    userEmail: "tsacianiegu@gmail.com",
    comment: "...",
    postTitle: "wwe-evolution-returns-allwomen-main-event-broadcast-on-netflix-peacock",
    postLink: "#",
    status: "Pending"
  },
  {
    id: 8,
    userName: "wisdomnkwocha8@gmail.com",
    userEmail: "wisdomnkwocha8@gmail.com",
    comment: "Ok",
    postTitle: "fifa-world-cup-2026-key-updates-and-developments-as-the-tournament-approaches",
    postLink: "#",
    status: "Approved"
  },
  {
    id: 9,
    userName: "Bdtask Ltd",
    userEmail: "bdtask.pr17@gmail.com",
    comment: "Teste sdfsd",
    postTitle: "insidethetalibanstakeoverofafghanistanexclusiveaccess",
    postLink: "#",
    status: "Approved"
  },
  {
    id: 10,
    userName: "Bdtask Ltd",
    userEmail: "bdtask.pr17@gmail.com",
    comment: "Teplsdfs",
    postTitle: "tm-tkdym-tlb-astynaf-bshan-algryd-alrsmy-lbldy-ashrak",
    postLink: "#",
    status: "Approved"
  },
  {
    id: 11,
    userName: "Bdtask Ltd",
    userEmail: "bdtask.pr17@gmail.com",
    comment: "Tessdsd sdfdsf",
    postTitle: "tm-tkdym-tlb-astynaf-bshan-algryd-alrsmy-lbldy-ashrak",
    postLink: "#",
    status: "Approved"
  }
];

export default function PostCommentsPage() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filter Logic
  const filteredComments = comments.filter(comment => 
    comment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedComments = filteredComments.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Actions
  const handleApprove = (id: number) => {
    setComments(prev => prev.map(c => 
      c.id === id ? { ...c, status: "Approved" } : c
    ));
    setSuccessMessage("Comment approved successfully!");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      setComments(prev => prev.filter(c => c.id !== deleteId));
      setSuccessMessage("Comment deleted successfully!");
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Comments list</h2>
      </div>

      <div className="flex items-center justify-between py-4">
         <div className="flex items-center gap-2">
             {/* Placeholders for potentially other actions like "Cache clear" or "View site" from image, 
                 but keeping it simple for now as requested. */}
         </div>
         <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
        </div>
      </div>

      {successMessage && (
        <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-900 dark:text-emerald-400 mb-4 flex items-center justify-between">
           <div>
               <AlertTitle>Success</AlertTitle>
               <AlertDescription>{successMessage}</AlertDescription>
           </div>
           <Button variant="ghost" size="sm" onClick={() => setSuccessMessage(null)} className="h-6 w-6 p-0 hover:bg-emerald-100 dark:hover:bg-emerald-800">
               <X className="h-4 w-4" />
           </Button>
        </Alert>
      )}

      <Card className="dark:bg-sidebar dark:border-border">
        <CardContent className="p-0">
             <div className="rounded-md border bg-white dark:bg-sidebar dark:border-border">
                <Table>
                    <TableHeader className="bg-gray-100 dark:bg-muted/20">
                        <TableRow>
                            <TableHead className="w-[50px] font-bold">Sl</TableHead>
                            <TableHead className="font-bold">User</TableHead>
                            <TableHead className="font-bold">Comments</TableHead>
                            <TableHead className="font-bold">Post</TableHead>
                            <TableHead className="font-bold w-[100px]">Status</TableHead>
                            <TableHead className="font-bold w-[100px] text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedComments.length > 0 ? (
                            paginatedComments.map((comment, index) => (
                                <TableRow key={comment.id} className="hover:bg-muted/50 dark:hover:bg-muted/10">
                                    <TableCell>{startIndex + index + 1}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{comment.userName}</div>
                                        <div className="text-sm text-muted-foreground">{comment.userEmail}</div>
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate" title={comment.comment}>
                                        {comment.comment}
                                    </TableCell>
                                    <TableCell className="max-w-[250px] truncate">
                                        <Link href={comment.postLink} className="text-blue-600 hover:underline dark:text-blue-400">
                                            {comment.postTitle}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            className={comment.status === "Approved" 
                                                ? "bg-green-600 hover:bg-green-700" 
                                                : "bg-amber-400 hover:bg-amber-500 text-black"
                                            }
                                        >
                                            {comment.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-2">
                                            {/* {comment.status === "Pending" && (
                                                <Button 
                                                    size="icon" 
                                                    className="h-8 w-8 bg-green-600 hover:bg-green-700 text-white rounded-md"
                                                    onClick={() => handleApprove(comment.id)}
                                                    title="Approve"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                            )} */}
                                             {/* If Approved, technically user might want to un-approve, 
                                                 but image shows distinct Delete button. 
                                                 Keeping check button always visible for "Approved" state 
                                                 doesn't make sense if it does nothing. 
                                                 However, looking at the image, row 1 is Approved and has Delete. 
                                                 Row 2 is Pending and has Approve + Delete. 
                                                 So Approved rows ONLY have delete? 
                                                 Wait, row 2 has a Green Check and a Red Trash. 
                                                 Row 1 (Approved) has Red Trash. 
                                                 Let's follow this logic:
                                                 - Pending: Show Approve (Green Check) and Delete (Red Trash).
                                                 - Approved: Show Delete (Red Trash). (Maybe Unapprove later?)
                                                 
                                                 Wait, re-examining image:
                                                 Row 1 (Approved): Action has [Red X] [Red Trash]. 
                                                 Actually, typically Red X means "Reject/Unapprove".
                                                 Row 2 (Pending): Action has [Green Check] [Red Trash].
                                                 
                                                 Let's implement:
                                                 - Pending: Green Check (Approve), Red Trash (Delete).
                                                 - Approved: Red X (Reject - sets to Pending?), Red Trash (Delete).
                                                 
                                                 Simplify for now: 
                                                 - ALWAYS show Red Trash.
                                                 - Show Green Check only if Pending.
                                                 - Maybe show Red X if Approved? 
                                                 
                                                 Let's stick to the core requirement "Actions: Approve (Green Check), Delete".
                                                 I'll implement logically:
                                                 - If Pending: Show Approve Button.
                                                 - Always show Delete Button.
                                            */}
                                            
                                            {comment.status === "Pending" ? (
                                                 <Button 
                                                    size="icon" 
                                                    className="h-8 w-8 bg-green-600 hover:bg-green-700 text-white rounded-md"
                                                    onClick={() => handleApprove(comment.id)}
                                                    title="Approve"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                            ) : (
                                                 <Button 
                                                    size="icon" 
                                                    className="h-8 w-8 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                                    onClick={() => setComments(prev => prev.map(c => c.id === comment.id ? { ...c, status: "Pending" } : c))}
                                                    title="Reject"
                                                >
                                                     <X className="h-4 w-4" />
                                                </Button>
                                            )}

                                            <Button 
                                                size="icon" 
                                                className="h-8 w-8 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                                                onClick={() => confirmDelete(comment.id)}
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                             <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No comments found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
             </div>

             {/* Pagination Controls */}
            <div className="flex items-center justify-between space-x-2 py-4 px-4">
                <div className="text-sm text-muted-foreground">
                     Showing {paginatedComments.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredComments.length)} of {filteredComments.length} entries
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                     <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                             <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                className={currentPage === page ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800" : "w-8"}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
             <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
             <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
