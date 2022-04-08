import { defineAppSetup } from "@slidev/types";
import ZoomPlugin from "../src/index";

export default defineAppSetup(({ app }) => {
  app.use(ZoomPlugin);
});
