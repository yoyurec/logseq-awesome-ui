module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/exec",
      {
        "versionCmd": "echo export default '${nextRelease.version}'; > .version.ts"
      }
    ],
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
        verifyConditions: false,
      },
    ],
    "@semantic-release/git",
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "zip -qq -r logseq-awesome-ui-${nextRelease.version}.zip dist README.md icon.png LICENSE package.json",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: "logseq-awesome-ui-*.zip",
      },
    ],
  ],
};
