import { Pane } from "tweakpane";
import { Settings } from "./types";
import { State } from "vanjs-core";

export function Settings(settings: State<Settings>) {
  // init
  const pane = new Pane({ title: "Settings", expanded: false });
  const container = pane.element.parentElement;

  // update
  if (container) {
    container.style.top = "0px";
    container.style.bottom = "inherit";
    container.style.left = "8px";
    container.style.width = "300px";
  }

  pane.addBinding(settings.val, "displayScale", {
    label: "Display scale",
    min: -10,
    max: 10,
    step: 1,
  });
  pane.addBinding(settings.val, "nodes", { label: "Nodes" });
  pane.addBinding(settings.val, "elements", { label: "Elements" });
  pane.addBinding(settings.val, "nodesIndexes", { label: "Nodes indexes" });
  pane.addBinding(settings.val, "elementsIndexes", {
    label: "Elements indexes",
  });
  pane.addBinding(settings.val, "supports", { label: "Supports" });
  pane.addBinding(settings.val, "loads", { label: "Loads" });
  pane.addBinding(settings.val, "elementResults", {
    options: {
      none: "none",
      normal: "normal",
    },
    label: "Element results",
  });
  pane.addBinding(settings.val, "nodeResults", {
    options: {
      none: "none",
      deformation: "deformation",
      reaction: "reaction",
    },
    label: "Node results",
  });

  pane.on("change", (e) => {
    // @ts-ignore
    settings.val[e.target.key] = e.value;
    settings.val = { ...settings.val };
  });
}
