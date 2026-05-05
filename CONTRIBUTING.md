# Contributing to Trackr

Welcome to Trackr! This document outlines how our team works together and how contributors can get involved.

---

## Team Norms

### Our Values

- We respect each other's time and commitments
- We communicate honestly
- We support each other
- If you're struggling or have a blocker, don't hesitate to say something
- We take ownership of our tasks and follow through to the best of our abilities

### Communication

All team communication happens on **Discord** in the `student-expense-tracker` channel under **Team 02**. Please check Discord regularly and respond to messages in a timely manner.

### Roles

In addition to all members being developers, each sprint has:

- **Product Owner** — listens and communicates user stories
- **Scrum Master** — maintains the board and runs sprint planning

We switch roles each sprint.

### Standups

Meetings on **Tues/Thurs 4pm EST** on Zoom.

All team members are expected to attend. If you can't make it, let the team know and if possible post a written standup update in Discord **before** the meeting with:
- What you worked on since the last standup
- What you're working on next
- Any blockers

### Dealing with Non-Participation

If a teammate misses two or more standups in a row or is not contributing meaningfully to the project, the following steps will be taken:

The issue will first be raised privately with the teammate. If it continues, it will be brought to the team and escalated to the professor if necessary.

---

## Git Workflow

Each team member works on their own branch. When your feature is ready, push your branch and open a Pull Request to `master`. At least one teammate should review before merging. Use **Squash and merge** to keep the history clean.

### Rules

- Don't push directly to `master` without letting the team know
- Keep PRs focused 
- Write clear commit messages that describe what changed 
- Resolve any merge conflicts before requesting a review

---

## Setting Up Your Local Environment

See the [frontend README](front-end/README.md) and [backend README](back-end/server/README.md) for full setup instructions. In short:

1. Clone the repo
2. `cd back-end/server && npm install && npm run dev`
3. In a new terminal: `cd front-end && npm install && npm run dev`
4. Open `http://localhost:5173` in your browser

---

## Building and Testing

See the [frontend README](front-end/README.md) and [backend README](back-end/server/README.md) for full build and test commands.

---

## What to Contribute

Check the GitHub Issues tab for open tasks. Pick one, assign it to yourself, and create a branch for it. Focus on one feature or fix per PR. When your work is ready, open a PR to `master` and tag a teammate for review.