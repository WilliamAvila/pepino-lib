"use strict";

import * as _ from 'underscore';
import * as Promise from 'bluebird'; 
import * as p from './domain/services/StepParser';
import * as g from './domain/services/CucumberStepFunctionGenerator';
import * as fileGen from './domain/services/CommonJsCucumberStepFileGenerator';
import {Step} from './domain/Step';
import {ICodeGenerationStrategy} from './domain/ICodeGenerationStrategy';
import {ClickElementStrategy} from './domain/codeGenerationStrategies/ClickElementStrategy';
import {NavigateStrategy} from './domain/codeGenerationStrategies/NavigateStrategy';
import {TypeTextWithElementStrategy} from './domain/codeGenerationStrategies/TypeTextWithElementStrategy';
import {TypeTextWithoutElementStrategy} from './domain/codeGenerationStrategies/TypeTextWithoutElementStrategy';
import {JasmineExpectStrategy} from './domain/jasmineExpectCodeGeneration/JasmineExpectStrategy';
import * as PepinoModule from "./domain/services/IStepFunctionGenerator";

var stepParser = new p.Pepino.PepinoLangStepParser();
var codeGenerator = new g.Pepino.CucumberStepFunctionGenerator(new Array<ICodeGenerationStrategy>(
    new ClickElementStrategy(),
    new NavigateStrategy(),
    new TypeTextWithElementStrategy(),
    new TypeTextWithoutElementStrategy(),
    new JasmineExpectStrategy()
));
var stepFileGenerator = new fileGen.Pepino.CommonJsCucumberStepFileGenerator();

class converter {
    
    constructor(private fileGenerator: fileGen.Pepino.IStepFileGenerator, 
                private parser: p.Pepino.IStepParser,
                private stepGenerator: PepinoModule.Pepino.IStepFunctionGenerator){        
    }
    
    convert(pepinoStepFile: string): string {
        var steps = this.parser.parse(pepinoStepFile);
        
        var stepsBySegment = _.groupBy(steps, (step) => {
            return step.segment;
        });
        
        var functions = _.map(Object.keys(stepsBySegment), (key) => {
            return this.stepGenerator.generate(stepsBySegment[key]);
        });
        
        var commonJsFile = this.fileGenerator.generate(functions);
        
        return commonJsFile;
    }
}

export = new converter(stepFileGenerator, stepParser, codeGenerator);