import path from 'path';
import fs from 'fs/promises';

type RouteProps = { params: { imageName: string } };

export async function GET(_req: Request, routeProps: RouteProps) {
  const imageName = routeProps.params.imageName;

  try {
    const image = await fs.readFile(
      path.join(process.cwd(), 'public', imageName)
    );

    return new Response(image, {
      status: 200,
      headers: { 'Content-Type': 'image/jpeg' }
    });
  } catch {
    return Response.json(
      { status: 404, message: 'Image not found' },
      { status: 404 }
    );
  }
}
