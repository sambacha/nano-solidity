ace.define("ace/mode/javascript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function (acequire, exports, module) {
    "use strict";

    var oop = acequire("../lib/oop");
    var DocCommentHighlightRules = acequire("./doc_comment_highlight_rules").DocCommentHighlightRules;
    var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;

    var JavaScriptHighlightRules = function JavaScriptHighlightRules(options) {
        var intTypes = 'bytes|int|uint';
        for (var width = 8; width |=|>=|>>>=|||!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/,
                next: "start"
            }, {
                token: "punctuation.operator",
                regex: /[?:,;.]/,
                next: "start"
            }, {
                token: "paren.lparen",
                regex: /[\[({]/,
                next: "start"
            }, {
                token: "paren.rparen",
                regex: /[\])}]/
            }, {
                token: "comment",
                regex: /^#!.*$/
            }],
            "start": [DocCommentHighlightRules.getStartRule("doc-start"), {
                token: "comment", // multi line comment
                regex: "\\/\\*",
                next: "comment_regex_allowed"
            }, {
                token: "comment",
                regex: "\\/\\/",
                next: "line_comment_regex_allowed"
            }, {
                token: "string.regexp",
                regex: "\\/",
                next: "regex"
            }, {
                token: "text",
                regex: "\\s+|^$",
                next: "start"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }],
            "regex": [{
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "string.regexp",
                regex: "/[sxngimy]*",
                next: "no_regex"
            }, {
                token: "invalid",
                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
            }, {
                token: "constant.language.escape",
                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
            }, {
                token: "constant.language.delimiter",
                regex: /\|/
            }, {
                token: "constant.language.escape",
                regex: /\[\^?/,
                next: "regex_character_class"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp"
            }],
            "regex_character_class": [{
                token: "regexp.charclass.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "constant.language.escape",
                regex: "]",
                next: "regex"
            }, {
                token: "constant.language.escape",
                regex: "-"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp.charachterclass"
            }],
            "function_arguments": [{
                token: "variable.parameter",
                regex: identifierRe
            }, {
                token: "punctuation.operator",
                regex: "[, ]+"
            }, {
                token: "punctuation.operator",
                regex: "$"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }],
            "comment_regex_allowed": [DocCommentHighlightRules.getTagRule(), { token: "comment", regex: "\\*\\/", next: "start" }, { defaultToken: "comment", caseInsensitive: true }],
            "comment": [DocCommentHighlightRules.getTagRule(), { token: "comment", regex: "\\*\\/", next: "no_regex" }, { defaultToken: "comment", caseInsensitive: true }],
            "line_comment_regex_allowed": [DocCommentHighlightRules.getTagRule(), { token: "comment", regex: "$|^", next: "start" }, { defaultToken: "comment", caseInsensitive: true }],
            "line_comment": [DocCommentHighlightRules.getTagRule(), { token: "comment", regex: "$|^", next: "no_regex" }, { defaultToken: "comment", caseInsensitive: true }],
            "qqstring": [{
                token: "constant.language.escape",
                regex: escapedRe
            }, {
                token: "string",
                regex: "\\\\$",
                next: "qqstring"
            }, {
                token: "string",
                regex: '"|$',
                next: "no_regex"
            }, {
                defaultToken: "string"
            }],
            "qstring": [{
                token: "constant.language.escape",
                regex: escapedRe
            }, {
                token: "string",
                regex: "\\\\$",
                next: "qstring"
            }, {
                token: "string",
                regex: "'|$",
                next: "no_regex"
            }, {
                defaultToken: "string"
            }]
        };

        if (!options || !options.noES6) {
            this.$rules.no_regex.unshift({
                regex: "[{}]", onMatch: function onMatch(val, state, stack) {
                    this.next = val == "{" ? this.nextState : "";
                    if (val == "{" && stack.length) {
                        stack.unshift("start", state);
                        return "paren";
                    }
                    if (val == "}" && stack.length) {
                        stack.shift();
                        this.next = stack.shift();
                        if (this.next.indexOf("string") != -1) return "paren.quasi.end";
                    }
                    return val == "{" ? "paren.lparen" : "paren.rparen";
                },
                nextState: "start"
            }, {
                token: "string.quasi.start",
                regex: /`/,
                push: [{
                    token: "constant.language.escape",
                    regex: escapedRe
                }, {
                    token: "paren.quasi.start",
                    regex: /\${/,
                    push: "start"
                }, {
                    token: "string.quasi.end",
                    regex: /`/,
                    next: "pop"
                }, {
                    defaultToken: "string.quasi"
                }]
            });
        }

        this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("no_regex")]);

        this.normalizeRules();
    };

    oop.inherits(JavaScriptHighlightRules, TextHighlightRules);

    exports.JavaScriptHighlightRules = JavaScriptHighlightRules;
});