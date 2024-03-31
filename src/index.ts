import { Command } from "commander";
import { z } from "zod";

const program = new Command();

program.name("wrangle").description("Wrangle CLI").version("1.0.0");

program
  .command("run")
  .description("Runs Wrangle on the current directory.")
  .parse(process.argv);

const opts = program.opts();
console.log(`opts: ${JSON.stringify(opts)}`);

const options = z
  .object({
    llm: z.boolean().default(false),
  })
  .parse(opts);

console.log(`Running with options:\n${JSON.stringify(options, undefined, 2)}`);
