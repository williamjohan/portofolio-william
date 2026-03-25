export async function GET() {
  return new Response("dh=f61600faa53c1208062f818c86afa4196fd0953c", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}