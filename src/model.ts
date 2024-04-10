/**
 * An enumeration of all possible sources that we pull rules from.
 */
export enum RuleSourcesEnum {
  ESLINT = "eslint",
  BIOME = "biome",
}

/**
 * An enumeration of all possible severities that a rule can have.
 * NIT: Things that are subjective generally fall under this.
 * MINOR: Things that are objectively wrong, but aren't really a big deal and/or aren't urgent.
 * MAJOR: Things that are definitely wrong and should be fixed soon, but aren't urgent.
 * CRITICAL: Things that are definitely wrong and may *actively* be causing bugs.
 *
 * TODO: This will need a bit of refinement, but will be sufficient for now.
 */
export enum SeverityLevelsEnum {
  NIT = "nit",
  MINOR = "minor",
  MAJOR = "major",
  CRITICAL = "critical",
}

/**
 * A <source, identifier> tuple that uniquely identifies a given rule.
 */
export type RuleIdentifier = {
  source: RuleSourcesEnum;
  slug: string; // An identifier that must be unique within other rules of the same source
};

/**
 * A rule represents a discrete "type" of issue that can be found within a codebase.
 */
export type Rule = {
  identifier: RuleIdentifier;
  severity: SeverityLevelsEnum;
  message: string;
  referenceUrl?: string; // A URL that the user can follow for more context. Not guaranteed to exist, particularly for some custom rules that are planned down the road.
};

/**
 * Represents a single instance where the user's code has violated a rule.
 * Is essentially a pointer, and does not include any of the actual code.
 */
export type RuleViolation = {
  rule: Rule;
  location: {
    file: string;
    line: number;
    column: number;
  };
};
