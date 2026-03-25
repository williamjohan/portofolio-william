export async function GET() {
  return new Response("dh=61600faa53c1208062f818c86afa4196fc", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}