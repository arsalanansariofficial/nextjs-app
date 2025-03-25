import { Label } from './_components/ui/label';
import { Input } from './_components/ui/input';
import { Button } from './_components/ui/button';

export default function SignupForm() {
  return (
    <form action="" className="border-input space-y-4 rounded-md border p-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" placeholder="Teagan Croft" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="teagan@croft.com" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
