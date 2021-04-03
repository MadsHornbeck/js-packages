"use strict";

// eslint-disable-next-line no-undef
const rollup = require("rollup");

const configs = {
  "react-carousel": {
    input: { external: ["@hornbeck/scroll-lock", "react"] },
    output: {
      exports: "default",
    },
  },
  "react-form": { input: { external: ["react"] } },
  "react-modals": { input: { external: ["@hornbeck/scroll-lock", "react"] } },
  "scroll-lock": { input: { external: ["react"] } },
  validators: undefined,
};

Promise.all(
  Object.entries(configs).map(async ([name, config = {}]) => {
    const bundle = await rollup.rollup({
      input: `${name}/src/index.js`,
      ...config.input,
    });
    await bundle.write({
      file: `${name}/index.cjs`,
      format: "cjs",
      ...config.output,
    });
    return bundle.close();
  })
).then(
  () => console.log("\u001b[92mBuild complete.\u001b[39m"),
  (e) => {
    console.log("\u001b[91mBuild error!\u001b[39m");
    console.error(e);
  }
);
