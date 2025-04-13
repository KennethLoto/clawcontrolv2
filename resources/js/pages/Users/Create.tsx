import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },

    {
        title: 'Create Users',
        href: '/users/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <Label htmlFor="Name">
                                Name<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g. Juan"
                                type="text"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            ></Input>
                            {errors.name && <div className="text-red-500">{errors.name}</div>}

                            <Label htmlFor="Email">
                                Email<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="e.g. juan@example.com"
                                type="email"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            ></Input>
                            {errors.email && <div className="text-red-500">{errors.email}</div>}

                            <Label htmlFor="Password">
                                Password<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="e.g. Pa$$word"
                                type="password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            ></Input>
                            {errors.password && <div className="text-red-500">{errors.password}</div>}

                            <Label htmlFor="Role">
                                Role<span className="text-red-500">*</span>
                            </Label>
                            <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="User">User</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.role && <div className="text-red-500">{errors.role}</div>}

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
