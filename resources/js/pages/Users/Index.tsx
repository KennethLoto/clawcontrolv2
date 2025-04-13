import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Flash {
    success?: string;
}

export default function Index({ users }: { users: User[] }) {
    const { flash } = usePage<{ flash: Flash }>().props;

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setDeleteDialogOpen(true);
        setDeleteUserId(id);
    };

    const handleDeleteConfirm = () => {
        router.delete(`/users/${deleteUserId}`);
        setDeleteDialogOpen(false);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto p-4">
                    <div className="mb-5 flex justify-between">
                        <h1 className="text-2xl font-bold">Users</h1>
                        <Link href="users/create">
                            <Button variant="default" className="flex items-center gap-2">
                                <PlusCircleIcon className="h-4 w-4" />
                                Create User
                            </Button>
                        </Link>
                    </div>
                    <Card>
                        <CardContent>
                            <Table>
                                <TableCaption>A list of your recent invoices.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.id}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>
                                                <Link href={`/users/${user.id}/edit`}>
                                                    <Button variant="link">Edit</Button>
                                                </Link>
                                                <Button variant="link" className="ml-2 text-red-500" onClick={() => handleDelete(user.id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </AppLayout>
    );
}
