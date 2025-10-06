#!/usr/bin/env node

/**
 * GitHub Actions Workflow Test Script
 * Tests the workflow steps without requiring real API credentials
 */

import { loadConfig } from "../agent/lib/config.js";
import { validateEnvironment } from "../agent/lib/config.js";

async function testWorkflowSteps() {
  console.log("🧪 Testing GitHub Actions Workflow Steps\n");

  try {
    // Step 1: Test configuration loading
    console.log("1️⃣ Testing configuration loading...");
    const config = await loadConfig("config/agent.yaml");
    console.log("✅ Configuration loaded successfully");
    console.log(`   Model: ${config.model}`);
    console.log(`   Max tokens: ${config.max_tokens}`);
    console.log(`   Cost cap: $${config.cost_cap_usd}`);
    console.log(`   Max files: ${config.max_files}`);
    console.log(`   Exclude patterns: ${config.exclude_patterns.length}`);
    console.log();

    // Step 2: Test environment validation (with mock env vars)
    console.log("2️⃣ Testing environment validation...");

    // Set mock environment variables
    const originalAnthropicKey = process.env.ANTHROPIC_API_KEY;
    const originalGithubToken = process.env.GITHUB_TOKEN;

    process.env.ANTHROPIC_API_KEY = "test-anthropic-key";
    process.env.GITHUB_TOKEN = "test-github-token";

    try {
      validateEnvironment();
      console.log("✅ Environment validation passed");
    } catch (error) {
      console.log("❌ Environment validation failed:", error.message);
      throw error;
    } finally {
      // Restore original environment variables
      if (originalAnthropicKey) {
        process.env.ANTHROPIC_API_KEY = originalAnthropicKey;
      } else {
        delete process.env.ANTHROPIC_API_KEY;
      }

      if (originalGithubToken) {
        process.env.GITHUB_TOKEN = originalGithubToken;
      } else {
        delete process.env.GITHUB_TOKEN;
      }
    }
    console.log();

    // Step 3: Test dependency installation simulation
    console.log("3️⃣ Testing dependency validation...");
    const fs = await import("fs");
    const packageJsonContent = fs.readFileSync("package.json", "utf8");
    const packageJson = JSON.parse(packageJsonContent);
    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});

    console.log("✅ Package.json loaded successfully");
    console.log(`   Dependencies: ${dependencies.length}`);
    console.log(`   Dev dependencies: ${devDependencies.length}`);
    console.log(`   Main entry: ${packageJson.main}`);
    console.log(
      `   Node version: ${packageJson.engines?.node || "not specified"}`,
    );
    console.log();

    // Step 4: Test file structure validation
    console.log("4️⃣ Testing file structure validation...");
    const path = await import("path");

    const requiredFiles = [
      "agent/reviewer.js",
      "agent/lib/config.js",
      "agent/lib/github-client.js",
      "agent/lib/claude-client.js",
      "agent/lib/diff-parser.js",
      "agent/lib/cost-estimator.js",
      "agent/lib/comment-formatter.js",
      "agent/lib/metrics.js",
      "agent/prompts/review-prompt.js",
      "config/agent.yaml",
      "package.json",
      "README.md",
    ];

    const missingFiles = [];
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length === 0) {
      console.log("✅ All required files present");
    } else {
      console.log("❌ Missing required files:", missingFiles.join(", "));
      throw new Error(`Missing files: ${missingFiles.join(", ")}`);
    }
    console.log();

    // Step 5: Test script execution
    console.log("5️⃣ Testing script execution...");
    const { spawn } = await import("child_process");

    return new Promise((resolve, reject) => {
      const child = spawn("node", ["scripts/validate-config.js"], {
        stdio: "pipe",
      });

      let output = "";
      let errorOutput = "";

      child.stdout.on("data", (data) => {
        output += data.toString();
      });

      child.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      child.on("close", (code) => {
        if (code === 0) {
          console.log("✅ Script execution successful");
          console.log("   Output:", output.trim().split("\n").pop());
        } else {
          console.log("❌ Script execution failed");
          console.log("   Error:", errorOutput.trim());
          reject(new Error(`Script failed with code ${code}`));
          return;
        }
        console.log();

        // Final summary
        console.log("🎉 All workflow steps passed!");
        console.log("✅ Configuration loading");
        console.log("✅ Environment validation");
        console.log("✅ Dependency validation");
        console.log("✅ File structure validation");
        console.log("✅ Script execution");
        console.log();
        console.log("🚀 GitHub Actions workflow should work correctly");

        resolve();
      });
    });
  } catch (error) {
    console.error("❌ Workflow test failed:", error.message);
    console.error("\nStack trace:", error.stack);
    process.exit(1);
  }
}

// Run the test
testWorkflowSteps().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
