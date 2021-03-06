"use strict";
import {ICodeGenerationStrategy} from "../ICodeGenerationStrategy";
import {StringHelper} from "../helpers/StringHelper";
import {VariableHelper} from "../helpers/VariableHelper";

export class JasmineExpectCssPropertyEqualStrategy implements ICodeGenerationStrategy {

    canGenerate(text: string): boolean {
        const lowercase = text.toLowerCase();
        const hasCss = lowercase.indexOf("css") > -1;
        const hasEqual = lowercase.indexOf("equal") > -1;
        const hasProperty = lowercase.indexOf("property") > -1;
        return lowercase.startsWith("verify ") && hasProperty && hasCss && hasEqual;
    }

    generate(text: string): string {
        const element = VariableHelper.getString(StringHelper.extractTextInGreaterThanLessThan(text)[0]);
        text = text.substring(text.indexOf(element) + element.length + 1);
        const property = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);
        text = text.substring(text.indexOf(property) + property.length + 1);
        const value = VariableHelper.getString(StringHelper.extractTextInQuotes(text)[0]);

        return `expect(browser.getCssProperty(${element}, ${property}).value).toEqual(${value});`;
    }
}
