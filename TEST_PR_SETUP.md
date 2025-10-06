# Test PR Setup for PR-Pilot

This test PR contains intentional code issues designed to demonstrate PR-Pilot's capabilities across different categories.

## Test Files Created

### 1. `src/security-issues.js`

**Issues to detect:**

- 🔒 **Security**: Hardcoded API key
- 🔒 **Security**: MD5 password hashing (weak)
- 🔒 **Security**: SQL injection vulnerabilities
- 🔒 **Security**: No input validation
- 🔒 **Security**: Logging sensitive data
- 🔒 **Security**: Unsafe file operations

### 2. `src/performance-issues.js`

**Issues to detect:**

- ⚡ **Performance**: N+1 query problem
- ⚡ **Performance**: Inefficient array operations
- ⚡ **Performance**: Synchronous file I/O in loops
- ⚡ **Performance**: Memory leaks
- ⚡ **Performance**: Inefficient string concatenation

### 3. `src/bugs-and-style.js`

**Issues to detect:**

- 🐛 **Bug**: Division by zero potential
- 🐛 **Bug**: Null reference errors
- 🐛 **Bug**: Missing error handling
- 🐛 **Bug**: Async/await issues
- 💅 **Style**: Using `var` instead of `const`/`let`
- 💅 **Style**: Poor spacing and formatting
- 💅 **Style**: Missing JSDoc comments
- 💅 **Style**: Inconsistent naming conventions
- 💅 **Style**: Functions too long

### 4. `src/untested-features.js`

**Issues to detect:**

- 🧪 **Test**: Critical business logic without unit tests
- 🧪 **Test**: Financial calculations without tests
- 🧪 **Test**: Security functions without tests
- 🧪 **Test**: Database operations without tests
- 🧪 **Test**: Communication logic without tests

## Expected PR-Pilot Findings

PR-Pilot should identify approximately **15-20 issues** across all categories:

- **Security**: 6-8 issues (hardcoded secrets, injection vulnerabilities, weak crypto)
- **Performance**: 4-6 issues (N+1 queries, memory leaks, inefficient operations)
- **Bugs**: 5-7 issues (error handling, null references, async issues)
- **Style**: 8-10 issues (formatting, naming, JSDoc, code structure)
- **Testing**: 4-6 issues (missing tests for critical functions)

## Testing PR-Pilot Capabilities

This PR will test:

1. **Issue Detection Accuracy**: Can PR-Pilot identify real issues?
2. **Category Classification**: Are issues properly categorized?
3. **Severity Assessment**: Are critical issues marked as high severity?
4. **Fix Suggestions**: Does PR-Pilot provide actionable solutions?
5. **Cost Management**: Does the review stay within budget?
6. **Comment Formatting**: Are comments well-formatted and helpful?

## Manual Verification

After PR-Pilot runs, manually verify:

- [ ] Inline comments are posted on problematic lines
- [ ] Comments include category emojis and severity levels
- [ ] Fix suggestions are provided where appropriate
- [ ] Summary comment includes overall assessment
- [ ] Metrics are collected and available as artifacts
- [ ] Workflow completes successfully
- [ ] Cost stays under the configured limit ($0.50)

## Expected Workflow Execution

1. **Trigger**: PR creation should trigger the workflow automatically
2. **Analysis**: PR-Pilot should analyze all 4 files (~400 lines total)
3. **Cost**: Estimated cost should be ~$0.02-0.05 (well under limit)
4. **Comments**: Should post 15-20 inline comments + 1 summary
5. **Duration**: Should complete in 30-60 seconds
6. **Status**: Workflow should succeed with all issues identified

## Troubleshooting

If the workflow fails:

1. Check that `ANTHROPIC_API_KEY` secret is properly set
2. Verify the workflow file is in `.github/workflows/pr-review.yml`
3. Check the Actions tab for detailed logs
4. Ensure the configuration file `config/agent.yaml` is valid

## Next Steps

After this PR is reviewed:

1. Create additional PRs to test edge cases
2. Test manual workflow dispatch
3. Test cost cap limits with larger PRs
4. Verify metrics collection and reporting
5. Test different types of code changes
