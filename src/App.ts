import van from "vanjs-core";
import {
  Element,
  App as AppType,
  ModelState,
  Node,
  Settings as SettingsType,
} from "./App.types";
import { Viewer } from "./Viewer";
import { Parameters } from "./Parameters";
import { Settings } from "./Settings";

function App({
  model: modelDirect,
  onParameterChange,
  parameters,
  settings: settingsOverwrite,
}: AppType) {
  const modelOnChange = parameters && onParameterChange?.(parameters);
  const model: ModelState = {
    nodes: van.state<Node[]>(modelDirect?.nodes ?? modelOnChange?.nodes ?? []),
    elements: van.state<Element[]>(
      modelDirect?.elements ?? modelOnChange?.elements ?? []
    ),
  };
  const settings = van.state<Required<SettingsType>>({
    gridSize: 25,
    displayScale: 1,
    nodes: true,
    elements: true,
    nodesIndices: false,
    elementsIndices: false,
    supports: true,
    loads: true,
    deformedShape: true,
    elementResults: "none",
    nodeResults: "none",
    ...settingsOverwrite,
  });

  if (parameters && onParameterChange)
    Parameters(parameters, (e) => {
      // @ts-ignore
      parameters[e.target.key].value = e.value;

      const newModel = onParameterChange(parameters);

      model.nodes.val = newModel.nodes || [];
      model.elements.val = newModel.elements || [];
    });

  Viewer(model, settings);
  Settings(settings);
}

export const app = App;
