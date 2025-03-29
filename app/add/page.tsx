import SignupForm from '~/signup-form';

export default async function Page() {
  return (
    <main className="grid min-h-screen place-content-center space-y-4">
      <h1 className="text-center text-2xl font-semibold">Add User</h1>
      <SignupForm />
    </main>
  );
}
