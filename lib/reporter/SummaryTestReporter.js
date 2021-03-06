var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../test/TestReporter", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestReporter_1 = require("../test/TestReporter");
    var chalk_1 = __importDefault(require("chalk"));
    var SummaryTestReporter = /** @class */ (function (_super) {
        __extends(SummaryTestReporter, _super);
        function SummaryTestReporter() {
            return _super.call(this) || this;
        }
        SummaryTestReporter.prototype.onStart = function () { };
        SummaryTestReporter.prototype.onGroupStart = function () { };
        SummaryTestReporter.prototype.onGroupFinish = function () { };
        SummaryTestReporter.prototype.onTestStart = function () { };
        SummaryTestReporter.prototype.onTestFinish = function () { };
        SummaryTestReporter.prototype.onTodo = function () { };
        SummaryTestReporter.prototype.onFinish = function (suite) {
            var _a, _b;
            var tests = (_a = []).concat.apply(_a, suite.testGroups.map(function (e) { return e.tests; }));
            var todos = (_b = []).concat.apply(_b, suite.testGroups.map(function (e) { return e.todos; })).length;
            var total = tests.length;
            var pass = tests.reduce(function (left, right) { return right.pass ? left + 1 : left; }, 0);
            if (pass === total) {
                console.log(chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{green.bold \u2714 ", "} Pass: ", " / ", " Todo: ", " Time: ", "ms"], ["{green.bold \u2714 ", "} Pass: ", " / ", " Todo: ", " Time: ", "ms"])), suite.file, pass.toString(), total.toString(), todos.toString(), suite.time.toString()));
            }
            else {
                console.log(chalk_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{red.bold \u274C ", "} Pass: ", " / ", " Todo: ", " Time: ", "ms"], ["{red.bold \u274C ", "} Pass: ", " / ", " Todo: ", " Time: ", "ms"])), suite.file, pass.toString(), total.toString(), todos.toString(), suite.time.toString()));
                for (var _i = 0, _c = suite.testGroups; _i < _c.length; _i++) {
                    var group = _c[_i];
                    if (group.pass)
                        continue;
                    console.log(chalk_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["  ", ""], ["  ", ""])), group.name));
                    inner: for (var _d = 0, _e = group.tests; _d < _e.length; _d++) {
                        var test_1 = _e[_d];
                        if (test_1.pass)
                            continue inner;
                        console.log(chalk_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["    {red.bold \u274C ", "} - ", ""], ["    {red.bold \u274C ", "} - ", ""])), test_1.name, test_1.message));
                        if (test_1.expected !== null)
                            console.log(chalk_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["      {green.bold [Expected]:} ", ""], ["      {green.bold [Expected]:} ", ""])), test_1.expected.message));
                        if (test_1.actual !== null)
                            console.log(chalk_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject(["      {red.bold [Actual]  :} ", ""], ["      {red.bold [Actual]  :} ", ""])), test_1.actual.message));
                    }
                }
            }
        };
        return SummaryTestReporter;
    }(TestReporter_1.TestReporter));
    exports.SummaryTestReporter = SummaryTestReporter;
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
});
//# sourceMappingURL=SummaryTestReporter.js.map