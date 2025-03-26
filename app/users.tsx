'use client';

import { useState } from 'react';

import Image from 'next/image';
import { User } from '@prisma/client';

import { Button } from './_components/ui/button';
import { removeUser } from './_actions/user-actions';

export default function Users({ users }: { users: User[] }) {
  const [error, setError] = useState<string | null>(null);

  async function handleDeleteUser(id: string) {
    const result = await removeUser(id);

    if (typeof result === 'string') {
      setError(result);
    }
  }

  return (
    <ul className="space-y-2">
      {users.map(user => (
        <li
          key={user.id}
          className="border-input relative grid grid-cols-[auto_1fr] gap-4 rounded-md border p-4"
        >
          <Image
            width={100}
            height={100}
            alt={user.name}
            src={user.image}
            className="aspect-square h-full rounded-md"
          />
          <div className="self-center">
            <h1 className="font-semibold text-slate-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-slate-500 dark:text-green-200">{user.email}</p>
            {error && <p className="text-destructive">{error}</p>}
          </div>
          <div className="absolute top-0 right-0 mt-2 mr-2 flex overflow-hidden rounded-md border">
            <Button
              variant="outline"
              className="rounded-none border-none shadow-none"
            >
              Edit
            </Button>
            <hr className="bg-input h-auto w-[0.5px] lg:w-[0.7px]" />
            <Button
              variant="outline"
              className="text-destructive rounded-none border-none shadow-none"
              onClick={async () => await handleDeleteUser(user.id)}
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
