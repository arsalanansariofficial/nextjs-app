'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { UsersProps } from '~/_lib/definitions';
import { Button } from '~/_components/ui/button';
import { deleteUser } from '~/_actions/user-actions';

export default function Users(props: UsersProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleDeleteUser(id: string) {
    const { message } = await deleteUser(id);
    if (message) setError(message);
  }

  return (
    <ul className="space-y-2">
      {props.users.map(user => (
        <li
          key={user.id}
          className="relative container grid gap-4 rounded-md border p-4 lg:grid-cols-[auto_1fr]"
        >
          <Image
            width={100}
            height={100}
            alt={user.name}
            src={`/api/${user.image}`}
            className="hidden aspect-square rounded-md object-fill lg:block"
          />
          <div className="relative aspect-video lg:hidden">
            <Image
              fill
              alt={user.name}
              src={`/api/${user.image}`}
              className="aspect-video rounded-md object-fill"
            />
          </div>
          <div className="self-center">
            <h1 className="font-semibold">{user.name}</h1>
            <p className="text-green-700 dark:text-green-200">{user.email}</p>
            {error && <p className="text-destructive">{error}</p>}
          </div>
          <div className="grid grid-cols-[1fr_0.5px_1fr] overflow-hidden rounded-md border lg:absolute lg:top-0 lg:right-0 lg:mt-2 lg:mr-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/${user.id}/edit`)}
              className="rounded-none border-none shadow-none lg:w-auto"
            >
              Edit
            </Button>
            <hr className="bg-input h-full" />
            <Button
              variant="outline"
              onClick={async () => await handleDeleteUser(user.id)}
              className="text-destructive rounded-none border-none shadow-none lg:w-auto"
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
