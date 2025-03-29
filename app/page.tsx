import Users from '~/users';
import { getUsers } from '~/_data/user-repository';

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="container mx-auto min-h-screen space-y-5">
      <h2 className="text-center font-semibold">Available users</h2>
      {!users?.length && <p className="text-center">No users right now</p>}
      {users && users.length > 0 && <Users users={users} />}
    </main>
  );
}
