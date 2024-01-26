import van from "vanjs-core";
import {
  Element,
  App as AppType,
  ModelState,
  Node,
  Settings as SettingsType,
  ProcessedAssignments,
} from "./types";
import { Viewer } from "./Viewer";
import { Parameters } from "./Parameters";
import { Settings } from "./Settings";
import { processAssignments } from "./utils/processAssignments";

function App({
  model: modelDirect,
  parameters,
  onParameterChange,
  settings: settingsOverwrite,
}: AppType) {
  // init
  const modelOnChange = parameters && onParameterChange?.(parameters);

  const model: ModelState = {
    nodes: van.state<Node[]>(modelDirect?.nodes ?? modelOnChange?.nodes ?? []),
    elements: van.state<Element[]>(
      modelDirect?.elements ?? modelOnChange?.elements ?? []
    ),
    assignments: van.state<ProcessedAssignments>(
      processAssignments(
        modelDirect?.assignments ?? modelOnChange?.assignments ?? []
      )
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
      // on parameter change
      // @ts-ignore
      parameters[e.target.key].value = e.value;

      const newModel = onParameterChange(parameters);

      model.nodes.val = newModel.nodes || [];
      model.elements.val = newModel.elements || [];
      model.assignments.val = processAssignments(newModel.assignments || []); // todo: check if changed before setting
    });

  Viewer(model, settings);
  Settings(settings);
}

export const app = App;
