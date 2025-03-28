import Users from '~/users';
import SignupForm from '~/signup-form';
import { getUsers } from '~/_data/user-repository';

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="container mx-auto grid min-h-screen space-y-5 lg:grid-cols-2">
      <div className="space-y-4 self-center justify-self-center">
        <h1 className="text-center text-2xl font-semibold">Add User</h1>
        <SignupForm />
      </div>
      <aside className="space-y-4">
        <h2 className="text-center font-semibold">Available users</h2>
        {!users?.length && <p className="font-normal">No users right now</p>}
        {users && users.length > 0 && <Users users={users} />}
      </aside>
    </main>
  );
}
