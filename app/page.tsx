import Users from '~/users';
import SignupForm from '~/signup-form';
import { getUsers } from '~/_data/user-repository';

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="space-y-4 self-center justify-self-center text-xl font-semibold">
        <h1 className="text-center text-2xl">Add User</h1>
        <SignupForm />
      </div>
      <aside className="space-y-4 p-4">
        <h2 className="font-semibold">Available users</h2>
        {!users?.length && <p className="font-normal">No users right now</p>}
        {users && users.length > 0 && <Users users={users} />}
      </aside>
    </main>
  );
}
