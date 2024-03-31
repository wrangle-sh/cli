import { ESLintIntegrationMapper } from "@/external/eslint/mapper.js";
/**
 * Base standardization layer that provides a common interface for all external libraries. Goal is to minimize the surface area of our mapping layer from Integration -> Wrangle.
 */
import type { RuleInstance } from "@/model.js";

export abstract class IntegrationMapper {
  /**
   * List of file extensions that this integration supports.
   */
  abstract supportedExtensions: string[];

  /**
   * Analyze the given file with the given integration, returning a list of violations.
   *
   * Not all integrations will require an async loop, but we keep the interface itself async so that we can support those that do. Worst that happens is just a promise that resolves immediately.
   */
  abstract analyze(filepath: string): Promise<RuleInstance[]>;
}

export const Mappers: IntegrationMapper[] = [new ESLintIntegrationMapper()];
