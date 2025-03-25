'use client';

import { useActionState } from 'react';

import { Label } from '~/_components/ui/label';
import { Input } from '~/_components/ui/input';
import { Button } from '~/_components/ui/button';
import { signup } from '~/_actions/user-actions';

export default function SignupForm() {
  const [state, formAction] = useActionState(signup, {});

  return (
    <form
      action={formAction}
      className="border-input space-y-4 rounded-md border p-4"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Teagan Croft"
          defaultValue={state?.name}
        />
        {state?.errors?.name && (
          <p className="text-destructive text-xs font-normal">
            {state.errors.name}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={state?.email}
          placeholder="teagan@croft.com"
        />
        {state?.errors?.email && (
          <p className="text-destructive text-xs font-normal">
            {state.errors.email}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input type="file" id="picture" name="image" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
