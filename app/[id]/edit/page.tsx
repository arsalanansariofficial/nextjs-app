import { User } from '@prisma/client';

import SignupForm from '~/signup-form';
import { getUser } from '~/_data/user-repository';
import { EditPageProps } from '~/_lib/definitions';

export default async function Page(props: EditPageProps) {
  const user = await getUser((await props.params).id);

  return (
    <main className="grid min-h-screen place-content-center">
      <SignupForm user={user as User} />
    </main>
  );
}
