import path from 'path';
import fs from 'fs/promises';

import { RouteProps } from '~/_lib/definitions';

export async function GET(_req: Request, routeProps: RouteProps) {
  try {
    const image = await fs.readFile(
      path.join(process.cwd(), 'public', (await routeProps.params).imageName)
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
