export function analyze(params: { files: string[] }) {
  console.debug(
    `Analyzing ${params.files.length} files:\n${params.files.join("\n")}`,
  );
}
