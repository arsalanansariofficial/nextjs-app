import Users from '~/users';
import SignupForm from '~/signup-form';
import { getUsers } from '~/_data/user-repository';

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="grid min-h-screen space-y-5 p-5 lg:grid-cols-2 lg:space-y-0 xl:block xl:space-y-5">
      <div className="space-y-4 self-center justify-self-center text-xl font-semibold">
        <h1 className="text-center text-2xl">Add User</h1>
        <SignupForm />
      </div>
      <aside className="space-y-4 justify-self-center p-4 lg:justify-self-stretch xl:justify-self-center">
        <h2 className="text-center font-semibold lg:text-left xl:text-center">
          Available users
        </h2>
        {!users?.length && <p className="font-normal">No users right now</p>}
        {users && users.length > 0 && <Users users={users} />}
      </aside>
    </main>
  );
}
