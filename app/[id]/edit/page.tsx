import { User } from '@prisma/client';

import SignupForm from '~/signup-form';
import { getUser } from '~/_data/user-repository';

type EditProps = {
  params: { id: string };
};

export default async function Page(props: EditProps) {
  const id = props.params.id;
  const user = await getUser(id);

  return (
    <main className="grid min-h-screen place-content-center">
      <SignupForm user={user as User} />
    </main>
  );
}
