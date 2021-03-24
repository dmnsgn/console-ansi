import console from "../index.js";
import styles from "../styles.js";

const separator = () => {
  const prefix = console.prefix;
  console.prefix =
    "––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––";
  console.debug();
  console.prefix = prefix;
};

if (typeof process !== "undefined") {
  console.log(`Terminal hasColors:`, process.stdout.hasColors?.());
}

// Start time...
console.prefix = "[time]";
console.time("Test console time");

// Common
separator();
console.prefix = "[common]";
console.debug("Test console debug");
console.log("Test console log");
console.info("Test console info");
console.warn("Test console warn");
console.error("Test console error");
console.trace("Test console trace");
console.debug("Test console debug\non multiple\nlines");

// Labelled
separator();
console.prefix = "[labelled]";
console.count("Test console count");
console.count("Test console count");
console.debug("Test console count reset");
console.countReset("Test console count");
console.count("Test console count");

console.group("Test console group");
console.group("Test console group indented");
console.debug("Test console group indented debug");
console.groupEnd("Test console group indented");
console.groupEnd("Test console group");

// Use defaults
separator();
console.prefix = "[unsupported]";
console.debug("");
console.dir({ test: "dir" }, { colors: true });
console.table([
  { test: 0, key: "A" },
  { test: 1, key: "B" },
]);

// Falsy and nullish values
separator();
console.prefix = "[falsy-nullish]";
console.log();
console.log("");
console.log(false);
console.log(null);
console.log(undefined);
console.log({ test: 0, key: "A" });

// ...end time
separator();
console.prefix = "[time]"; // Needs to be the same as time()
console.timeLog("Test console time", "timeLog1", "timeLog2");
console.timeEnd("Test console time");

// Level
separator();
console.prefix = "[level]";
console.level = "error";
console.log("Test console level log hidden");
console.info("Test console level info hidden");
console.warn("Test console level warn hidden");
console.error("Test console level error. Above log/info/warn not shown.");
console.debug("Test console level not defined in levels");
console.level = "log";

// Empty prefix and symbol
separator();
console.prefix = "";
console.symbol = {};
console.log({ test: 0, key: "A" }); // will add a space

// Change theme
separator();
console.prefix = "[custom-theme]";
console.theme.log = styles.bgBlack;
console.log("Test change theme log bg black");
console.theme.log = [styles.bgRed, styles.black, styles.underline];
console.log("Test change theme log bg red, color black with underline");
