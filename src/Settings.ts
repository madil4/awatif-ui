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

  pane.addBinding(settings.val, "gridSize", { label: "grid size", min: 1 });
  pane.addBinding(settings.val, "displayScale", {
    label: "display scale",
    min: -10,
    max: 10,
    step: 1,
  });
  pane.addBinding(settings.val, "nodes");
  pane.addBinding(settings.val, "elements");
  pane.addBinding(settings.val, "nodesIndices", { label: "nodes indices" });
  pane.addBinding(settings.val, "elementsIndices", {
    label: "elements indices",
  });
  pane.addBinding(settings.val, "supports");
  pane.addBinding(settings.val, "loads");
  pane.addBinding(settings.val, "deformedShape", { label: "deformed shape" });
  pane.addBinding(settings.val, "elementResults", {
    options: {
      none: "none",
      normal: "normal",
    },
    label: "element results",
  });
  pane.addBinding(settings.val, "nodeResults", {
    options: {
      none: "none",
      deformation: "deformation",
      reaction: "reaction",
    },
    label: "node results",
  });

  pane.on("change", (e) => {
    // @ts-ignore
    settings.val[e.target.key] = e.value;
    settings.val = { ...settings.val };
  });
}
