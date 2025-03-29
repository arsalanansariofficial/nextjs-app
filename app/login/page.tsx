'use client';

import { useActionState } from 'react';

import { Input } from '~/_components/ui/input';
import { Label } from '~/_components/ui/label';
import { Button } from '~/_components/ui/button';
import { loginAdmin } from '~/_actions/user-actions';

export default function Page() {
  const [state, formAction] = useActionState(loginAdmin, {});

  return (
    <main className="container mx-auto grid min-h-screen place-content-center">
      <form action={formAction} className="space-y-4 rounded-md border p-4">
        <div className="grid items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state?.email}
            placeholder="teagan@croft.com"
          />
          {state?.errors?.email && (
            <p className="text-destructive text-xs">{state.errors.email}</p>
          )}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password@123"
            defaultValue={state?.password}
          />
          {state?.errors?.password && (
            <p className="text-destructive text-xs font-normal">
              {state.errors.password}
            </p>
          )}
        </div>
        <Button type="submit">Submit</Button>
        {state?.message && (
          <p className="text-destructive text-xs font-normal">
            {state.message}
          </p>
        )}
      </form>
    </main>
  );
}
