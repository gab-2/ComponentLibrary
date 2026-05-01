# PLANS.md

This document defines how ExecPlans must be written and used in this repository.

ExecPlans are implementation plans designed to be followed by a coding agent or developer.

They are used for complex tasks, architectural work, large features, refactors, integrations and release workflows.

## Purpose

An ExecPlan should make a complex change executable.

A developer or coding agent should be able to complete the task using only:

- the current repository state;
- this `PLANS.md` file;
- the active ExecPlan;
- the referenced project documentation.

## Location

Active ExecPlans live in:

```txt
docs/exec-plans/active/
```

Completed ExecPlans live in:

```txt
docs/exec-plans/completed/
```

## When to Use an ExecPlan

Use an ExecPlan for:

- creating or changing monorepo structure;
- adding new apps;
- adding new packages;
- implementing billing;
- implementing registry access;
- implementing entitlement logic;
- implementing multi-framework support;
- adding CI/CD;
- adding release workflows;
- large refactors;
- security-sensitive work;
- anything that touches multiple apps or packages.

Do not use an ExecPlan for:

- fixing a typo;
- updating a small README section;
- changing one CSS class;
- a trivial one-file bug fix.

## ExecPlan Requirements

Every ExecPlan must be self-contained.

Every ExecPlan must include:

1. Title
2. Purpose
3. Scope
4. Non-goals
5. Relevant documentation
6. Relevant files and directories
7. Architecture notes
8. Implementation milestones
9. Step-by-step tasks
10. Progress checklist
11. Decision log
12. Risks
13. Verification commands
14. Acceptance criteria

## Required ExecPlan Template

Use this structure:

````md
# ExecPlan: Title

## Purpose

Explain what this plan will accomplish and why it matters.

## Scope

List what is included in this plan.

## Non-goals

List what this plan intentionally does not cover.

## Relevant Documentation

List docs that must be read before implementation.

## Relevant Files and Directories

List files and directories likely to be created or modified.

## Architecture Notes

Explain important architecture constraints and decisions.

## Implementation Milestones

Break the work into milestones.

### Milestone 1: Name

Explain the milestone.

### Milestone 2: Name

Explain the milestone.

## Step-by-Step Tasks

List concrete tasks.

## Progress

Use a checklist.

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Decision Log

Record decisions made during implementation.

Example:

### Decision: Use tokens/styles/core/framework adapters

Reason:

React components should not be reused directly in other frameworks.

## Risks

List technical and product risks.

## Verification Commands

List commands that must be run.

Example:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
````

## Acceptance Criteria

List the conditions that must be true before the plan is completed.

````

## Working Rules

When working on an ExecPlan:

1. Read this file first.
2. Read the target ExecPlan completely.
3. Read all referenced documentation.
4. Implement the milestones in order.
5. Keep the Progress section updated.
6. Add Decision Log entries when decisions are made.
7. Run the verification commands.
8. Do not mark the plan complete if acceptance criteria fail.
9. Move the plan to `completed/` only after the plan is actually complete.

## Progress Updates

The Progress section should be updated as work is completed.

Example:

```md
## Progress

- [x] Created pnpm workspace
- [x] Added Turborepo config
- [ ] Added Docker Compose
- [ ] Verified build
````

## Decision Log Rules

Use the Decision Log to record important choices.

Examples:

```md
### Decision: Use Verdaccio for initial private registry

Reason:

It provides a self-hosted npm registry foundation and can be extended or replaced later.
```

```md
### Decision: Keep Pro packages physically separate

Reason:

Public packages must never contain paid source code.
```

## Verification Rules

Every ExecPlan must include commands that can verify the work.

If a command cannot run yet, document why.

Do not silently ignore failing commands.

## Completion Rules

Before moving an ExecPlan to `completed/`, ensure:

- all Progress items are checked;
- all acceptance criteria pass;
- verification commands pass or documented exceptions exist;
- no critical TODOs remain;
- documentation is updated.

## Initial ExecPlans for This Project

This repository should start with these active ExecPlans:

```txt
docs/exec-plans/active/001-monorepo-foundation.md
docs/exec-plans/active/002-design-system-packages.md
docs/exec-plans/active/003-auth-billing-entitlements.md
docs/exec-plans/active/004-private-registry.md
docs/exec-plans/active/005-marketing-dashboard-docs.md
docs/exec-plans/active/006-multiframework-adapters.md
docs/exec-plans/active/007-ci-release-security.md
```

## Recommended Implementation Order

The recommended order is:

1. `001-monorepo-foundation.md`
2. `002-design-system-packages.md`
3. `003-auth-billing-entitlements.md`
4. `004-private-registry.md`
5. `005-marketing-dashboard-docs.md`
6. `006-multiframework-adapters.md`
7. `007-ci-release-security.md`

This order is recommended because the platform foundation should exist before the product packages, and packages should exist before registry and release workflows are finalized.

## Important Product Constraints

The following constraints apply to all ExecPlans:

- Do not put paid code in public packages.
- Do not use runtime license checks inside installed frontend components.
- Use private registry access for paid package control.
- Use entitlements for authorization.
- Use Lifetime as permanent access.
- Do not reuse React components directly in other frameworks.
- Use tokens, styles and core logic as shared layers.