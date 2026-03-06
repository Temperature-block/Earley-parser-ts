TypeScript Earley Parser
A minimal, from-scratch implementation of an Earley parser written in TypeScript. This project processes context-free grammars by advancing input strings through state sets, fully supporting nullables and complex grammar rules.

Core Algorithm
The parser processes input by dynamically building state sets using the three standard Earley algorithm operations:

Predictor: Expands the state set by adding new states for non-terminals expected next.
Scanner: Advances the state when the expected terminal matches the current character in the input string.
Completion: Updates parent states by advancing their parse position once a nested non-terminal rule is fully satisfied.

Features
JSON Grammar Ingestion: Reads grammar definitions, rules, and nullable sets directly from structured JSON data.
State Set Visualization: Renders the complete internal state set for each step of the parsing process. It utilizes a positional indicator (⚪) to visually represent the current location within a specific rule's execution.
End-to-End Validation: Analyzes the final state array against the origin point to verify if the entire input string was successfully parsed by the starting rule.
