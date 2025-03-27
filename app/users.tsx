'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { User } from '@prisma/client';

import { Button } from '~/_components/ui/button';
import { removeUser } from '~/_actions/user-actions';

export default function Users({ users }: { users: User[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleDeleteUser(id: string) {
    const result = await removeUser(id);
    if (typeof result === 'string') setError(result);
  }

  return (
    <ul className="space-y-2">
      {users.map(user => (
        <li
          key={user.id}
          className="border-input relative grid gap-4 rounded-md border p-4 md:grid-cols-[auto_1fr] xl:min-w-[30em] xl:grid-cols-none"
        >
          <Image
            width={100}
            height={100}
            alt={user.name}
            src={`/${user.image}`}
            className="hidden aspect-square h-full rounded-md object-cover md:block xl:hidden"
          />
          <div className="xl:max-h-75- relative aspect-video md:hidden xl:block">
            <Image
              layout="fill"
              alt={user.name}
              src={`/${user.image}`}
              className="aspect-video rounded-md object-cover"
            />
          </div>
          <div className="self-center">
            <h1 className="font-semibold text-slate-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-slate-500 dark:text-green-200">{user.email}</p>
            {error && <p className="text-destructive">{error}</p>}
          </div>
          <div className="grid max-w-fit grid-cols-[1fr_auto_1fr] overflow-hidden rounded-md border md:absolute md:top-0 md:right-0 md:mt-2 md:mr-2 md:flex xl:static xl:ml-auto">
            <Button
              variant="outline"
              className="rounded-none border-none shadow-none md:w-auto"
              onClick={() => router.push(`/${user.id}/edit`)}
            >
              Edit
            </Button>
            <hr className="bg-input h-full w-[0.5px] md:h-auto lg:w-[0.7px]" />
            <Button
              variant="outline"
              className="text-destructive rounded-none border-none shadow-none md:w-auto"
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
