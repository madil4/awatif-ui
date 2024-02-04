import {
  AnalysisResults,
  ElementResult,
  ProcessedAnalysisResults,
} from "../types";

export function processAnalysisResults(
  analysisResults: AnalysisResults
): ProcessedAnalysisResults {
  const par: ProcessedAnalysisResults = {
    normals: new Map<number, ElementResult["normal"]>(),
    shearYs: new Map<number, ElementResult["shearY"]>(),
    shearZs: new Map<number, ElementResult["shearZ"]>(),
    torsions: new Map<number, ElementResult["torsion"]>(),
    bendingYs: new Map<number, ElementResult["bendingY"]>(),
    bendingZs: new Map<number, ElementResult["bendingZ"]>(),
  };
  // you can also process nodes results here

  analysisResults["default"].forEach((result) => {
    if ("normal" in result) par.normals.set(result.element, result.normal);
    if ("shearY" in result) par.shearYs.set(result.element, result.shearY);
    if ("shearZ" in result) par.shearZs.set(result.element, result.shearZ);
    if ("torsion" in result) par.torsions.set(result.element, result.torsion);
    if ("bendingY" in result)
      par.bendingYs.set(result.element, result.bendingY);
    if ("bendingZ" in result)
      par.bendingZs.set(result.element, result.bendingZ);
  });

  return par;
}
