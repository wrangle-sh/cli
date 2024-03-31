import assert from "node:assert";
import { Mappers } from "@/external/base.js";

for (const mapper of Mappers) {
  assert(mapper.supportedExtensions.every((ext) => ext.startsWith(".")));
}
