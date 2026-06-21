import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Expose API routes untuk Uploadthing
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // config: { ... } (opsional jika ada konfigurasi tambahan)
});
