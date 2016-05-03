"use strict";
import * as _ from "underscore";

export class StringHelper {

    static extractTextInQuotes(str: string): Array<string> {
        return this.getArrayOfMatches(str, /"(.*?)"/g);                
    }
    
    static extractTextInGreaterThanLessThan(str: string) : Array<string> {
        return this.getArrayOfMatches(str, /\<(.*?)\>/g);        
    }
    
    static escapeQuotes(str: string): string {
        return str.replace(new RegExp("\"", 'g'), "\\\"");        
    }
    
    private static getArrayOfMatches(str: string, exp: RegExp): Array<string>{
        var matches = new Array<string>();
        var match = exp.exec(str);
        while(match !== null){
            matches.push(match[1]);
            match = exp.exec(str);            
        }
        return _.map(matches, (m) => { return this.escapeQuotes(m); });
    }
    
    static capitalizeFirstLetter(str: string) : string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    static textContains(text: string, contents: string){ 
        var textContains = text.indexOf(contents) > -1;
        if(!textContains) return false;
        
        var tokens = this.extractTextInQuotes(text);       
        
        var matchingTokens = _.find(tokens, (t) => {
            return t.indexOf(contents) > -1;
        });
        
        var hasContentsInQuotes = matchingTokens && matchingTokens.length > 0;
        
        return textContains && !hasContentsInQuotes;
    }
}
