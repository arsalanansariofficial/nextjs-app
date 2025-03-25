import Image from 'next/image';

import SignupForm from './signup-form';
import { Button } from './_components/ui/button';

export default function Home() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="space-y-4 self-center justify-self-center text-xl font-semibold">
        <h1 className="text-center text-2xl">Add User</h1>
        <SignupForm />
      </div>
      <aside className="space-y-4 p-4">
        <h2 className="font-semibold">Available users</h2>
        <ul className="space-y-2">
          <li className="border-input relative grid grid-cols-[auto_1fr] gap-4 rounded-md border p-4">
            <Image
              width={50}
              height={50}
              alt="User Profile"
              src="/teagan-croft.jpg"
              className="max-h-full rounded-md"
            />
            <div className="self-center">
              <h1 className="font-semibold text-slate-900">Teagan Croft</h1>
              <p className="text-slate-500">teagan@croft.com</p>
            </div>
            <div className="absolute top-0 right-0 mt-2 mr-2 flex overflow-hidden rounded-md border">
              <Button
                variant="outline"
                className="rounded-none border-none shadow-none"
              >
                Edit
              </Button>
              <hr className="h-full w-[0.5px] bg-slate-300" />
              <Button
                variant="outline"
                className="text-destructive rounded-none border-none shadow-none"
              >
                Delete
              </Button>
            </div>
          </li>
        </ul>
      </aside>
    </main>
  );
}
