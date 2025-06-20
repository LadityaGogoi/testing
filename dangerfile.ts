// dangerfile.ts
import { danger, warn, message } from "danger";

// Get the number of lines changed in the PR
const additions = danger.github.pr.additions || 0;
const deletions = danger.github.pr.deletions || 0;
const totalChanges = additions + deletions;

// Scoring logic
let points = 0;
if (totalChanges > 500) {
  points = 100;
  let over = totalChanges - 500;
  while (over > 0) {
    points -= points * 0.1; // Decrease by 10%
    over -= 50;
  }
  points = Math.round(points);
  warn(`:warning: This PR is very large (${totalChanges} lines changed). Points: **${points}**`);
} else {
  message(`This PR changes ${totalChanges} lines. No penalty.`);
}