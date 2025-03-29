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
    <ul className="space-y-4 sm:grid sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] sm:gap-4 sm:space-y-0">
      {props.users.map(user => (
        <li key={user.id} className="space-y-4 rounded-md border p-4">
          <Image
            width={500}
            height={300}
            alt={user.name}
            src={`/api/${user.image}`}
            className="aspect-video w-full rounded-md object-fill object-top"
          />
          <div className="overflow-hidden">
            <h1 className="overflow-hidden font-semibold text-ellipsis">
              {user.name}
            </h1>
            <p className="max-w-40- overflow-hidden text-ellipsis text-green-700 dark:text-green-200">
              {user.email}
            </p>
            {error && (
              <p className="text-destructive overflow-hidden text-ellipsis">
                {error}
              </p>
            )}
          </div>
          <div className="grid grid-cols-[1fr_0.5px_1fr] overflow-hidden rounded-md border sm:static">
            <Button
              variant="outline"
              onClick={() => router.push(`/${user.id}/edit`)}
              className="rounded-none border-none shadow-none sm:w-auto"
            >
              Edit
            </Button>
            <hr className="bg-input h-full" />
            <Button
              variant="outline"
              onClick={async () => await handleDeleteUser(user.id)}
              className="text-destructive rounded-none border-none shadow-none sm:w-auto"
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
