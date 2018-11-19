const semver = require("semver");
const fs = require("fs");

module.exports.default = function (comp) {
  const raw = fs.readFileSync("./package.json");
  const pkg = JSON.parse(raw);

  // Version parts
  const major = semver.major(pkg.version);
  const minor = semver.minor(pkg.version);
  const patch = semver.patch(pkg.version);
  let channel = "stable";
  let prever = "";
  console.log(`version: ${semver.prerelease(pkg.version)}`);
  if (semver.prerelease(pkg.version) != null) {
    [channel, prever] = semver.prerelease(pkg.version);
  }

  console.log(`channel: ${channel}`);
  console.log(`channel: ${prever}`);

  let ver;
  switch (comp) {
    case "full":
      ver = pkg.version;
      break;
    case "major":
      ver = major;
      break;
    case "minor":
      ver = minor;
      break;
    case "patch":
      ver = patch;
      break;
    case "channel":
      ver = channel;
      break;
    case "pre":
    case "prerelease":
      ver = prever;
      break;
    default:
      ver = `${major}.${minor}.${patch}`;
      break;
  }

  return ver;
};
