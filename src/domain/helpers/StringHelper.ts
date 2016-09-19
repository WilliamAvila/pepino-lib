"use strict";
import * as _ from "underscore";

export class StringHelper {

    private static textInQuotes: RegExp = /"(.*?)"/g

    static extractTextInQuotes(str: string): Array<string> {
        return this.getArrayOfMatches(str, this.textInQuotes);
    }

    static extractTextInGreaterThanLessThan(str: string): Array<string> {
        return this.getArrayOfMatches(str, /\<(.*?)\>/g);
    }

    static escapeQuotes(str: string): string {
        return str.replace(new RegExp("\"", 'g'), "\\\"");
    }

    private static getArrayOfMatches(str: string, exp: RegExp): Array<string> {
        var matches = new Array<string>();
        var match = exp.exec(str);
        while (match !== null) {
            matches.push(match[1]);
            match = exp.exec(str);
        }
        return _.map(matches, (m) => { return this.escapeQuotes(m); });
    }

    static capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static containsNonTokenText(text: string, contents: string) {
        var textWithoutTokens = text.replace(this.textInQuotes, "");
        return textWithoutTokens.toLowerCase().indexOf(contents.toLowerCase()) > -1;
    }

    static extractId(str: string): string {
        return str.substring(str.indexOf("#") + 1, str.length);
    }

    static extractClassname(str: string): string {
        return str.substring(str.indexOf(".") + 1, str.length);
    }
}