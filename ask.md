# Ask Mode

## Question

│  what it inside the /modes/agent/orchestrator.ts explain what is going on into proper example code

## Answer

Here's a breakdown of what's happening in `/modes/agent/orchestrator.ts` with proper example code:

### Core Workflow (Example Code Flow):
```typescript
async function runAgentMode() {
  // 1. Get user goal
  const goal = await text({ 
    message: "What would you like the agent to do?",
    placeholder: "Concrete task"
  });

  // 2. Initialize agent components
  const config = defaultAgentConfig(); // Creates config object with paths, exclusions, etc.
  const tracker = new ActionTracker(); // Tracks pending/approved actions
  const executor = new ToolExecutor(config, tracker); // Manages actual changes
  const tools = createAgentTools(executor); // Wraps executor methods as usable tools
  const agent = new ToolLoopAgent({
    model: getAgentModel(), // Loads AI model
    stopWhen: stepCountIs(40), // Safety limit
    instructions: [`Workspace: ${config.codebasePath}`, `Require user approval before changes`],
    tools
  });

  // 3. Run agent with user goal
  const result = await agent.generate({
    prompt: goal,
    onStepFinish: ({ toolCalls }) => { // Live preview of tool calls
      for (const tc of toolCalls) {
        console.log(`✓ ${tc.toolName} [${JSON.stringify(tc.input).slice(0, 160)}...]`);
      }
    }
  });

  // 4. Get user approval
  const ok = await runApprovalFlow(tracker);
  if (!ok) executor.clearStaging(); // Cancel changes if user rejects

  // 5. Apply approved changes
  const { errors } = executor.applyApprovedFromTracker();
  if (errors.length) {
    // Show errors
  } else {
    console.log("✓ All changes applied");
  }
}
```

### Key Components:
1. **User Goal Parsing**  
   Uses `@clack/prompts` to get clear instructions from the user.

2. **Agent Setup**  
   - `ActionTracker`: Tracks all pending/approved changes
   - `ToolExecutor`: Handles file operations, shell commands, etc.
   - `ToolLoopAgent`: Coordinates AI requests with tool execution

3. **Tool Execution Process**  
   When the agent decides to:
   - Read a file → `executor.readFile()`
   - Modify a file → `executor.modifyFile()`
   - Execute a shell command → `executor.queueShell()`
   
   All operations are tracked in `ActionTracker`.

4. **Approval Flow**  
   Shows user a preview of all requested changes, waits for approval before modifying files.

### Example Interaction:
```text
🤖 Agent Mode

What would you like the agent to do?
→ Create a new README.md with project overview

✓ create_file [{"path": "README.md", "content": "..."}]
✓ modify_file [{"path": "README.md", "content": "Updated..."}]

Would you like to apply these changes? (y/n)
→ y

✓ All changes applied successfully.
```

This pattern ensures safe, auditable changes through explicit approval, with detailed logging at every step.
