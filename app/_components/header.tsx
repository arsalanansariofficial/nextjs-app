import Link from 'next/link';

import { auth } from '../../auth';
import { Button } from '~/_components/ui/button';
import ThemeToggle from '~/_components/theme-toggle';
import { logoutAdmin } from '~/_actions/user-actions';

export default async function Header() {
  const session = await auth();

  return (
    <header className="container mx-auto grid grid-cols-[1fr_auto_auto] gap-4">
      <ThemeToggle />
      {session?.user && (
        <form action={logoutAdmin}>
          <Button variant="secondary">Logout</Button>
        </form>
      )}
      {!session?.user && (
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </header>
  );
}
