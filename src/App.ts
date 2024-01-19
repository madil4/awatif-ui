import van from "vanjs-core";
import {
  Element,
  Model,
  ModelState,
  Node,
  Parameters as ParametersType,
} from "./App.types";
import { Viewer } from "./Viewer";
import { Parameters } from "./Parameters";

function App({
  model: modelDirect,
  onParameterChange,
  parameters,
}: {
  model?: Model;
  onParameterChange?: (p: ParametersType) => Model;
  parameters?: ParametersType;
  settings?: any;
}) {
  const modelOnChange = parameters && onParameterChange?.(parameters);
  const model: ModelState = {
    nodes: van.state<Node[]>(modelDirect?.nodes ?? modelOnChange?.nodes ?? []),
    elements: van.state<Element[]>(
      modelDirect?.elements ?? modelOnChange?.elements ?? []
    ),
  };

  if (parameters && onParameterChange)
    Parameters(parameters, (e) => {
      // @ts-ignore
      parameters[e.target.key].value = e.value;

      const newModel = onParameterChange(parameters);

      model.nodes.val = newModel.nodes || [];
      model.elements.val = newModel.elements || [];
    });

  Viewer(model);
}

export const app = App;
