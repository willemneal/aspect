var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chalk", "../test/TestReporter", "./util/createReferenceString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chalk_1 = __importDefault(require("chalk"));
    var TestReporter_1 = require("../test/TestReporter");
    var createReferenceString_1 = require("./util/createReferenceString");
    /**
     * @ignore
     * This method stringifies an actual or expected test value.
     *
     * @param {ValueType} type - Actual or Expected.
     * @param {ActualValue | null} value - The reported value.
     */
    function stringifyActualValue(type, value) {
        if (!value)
            return "";
        var byteString = "";
        if (value.bytes.length > 0) {
            byteString =
                "\n               " +
                    createReferenceString_1.createReferenceString(value.bytes, value.pointer, value.offset)
                        .split("\n")
                        .join("\n               ");
        }
        var stackString = "\n           " + value.stack.split("\n").join("\n           ");
        return type === 1 /* Expected */
            ? chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{green ", "}{blue ", "}{yellow ", "}"], ["{green ", "}{blue ", "}{yellow ", "}"])), value.message, byteString, stackString) : chalk_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{red ", "}{blue ", "}{yellow ", "}"], ["{red ", "}{blue ", "}{yellow ", "}"])), value.message, byteString, stackString);
    }
    /**
     * @ignore
     * This weakmap is used to keep track of which logs have already been printed, and from what index.
     */
    var groupLogIndex = new WeakMap();
    /**
     * This is the default test reporter class for the `asp` command line application. It will pipe
     * all relevant details about each tests to the `stdout` WriteStream.
     */
    var VerboseReporter = /** @class */ (function (_super) {
        __extends(VerboseReporter, _super);
        function VerboseReporter(_options) {
            var _this = _super.call(this) || this;
            _this.stdout = null;
            return _this;
        }
        /**
         * This method reports a starting TestContext. This method can be called many times, but may
         * be instantiated once
         *
         * @param {TestContext} suite - The test context being started.
         */
        VerboseReporter.prototype.onStart = function (suite) {
            this.stdout = suite.stdout || process.stdout;
        };
        /**
         * This method reports a TestGroup is starting.
         *
         * @param {TestGroup} group - The started test group.
         */
        VerboseReporter.prototype.onGroupStart = function (group) {
            if (group.name)
                this.stdout.write(chalk_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n[Describe]: ", "\n\n"], ["\\n[Describe]: ", "\\n\\n"])), group.name));
            for (var _i = 0, _a = group.logs; _i < _a.length; _i++) {
                var logValue = _a[_i];
                this.onLog(logValue);
            }
            groupLogIndex.set(group, group.logs.length);
        };
        /**
         * This method reports a completed TestGroup.
         *
         * @param {TestGroup} group - The finished TestGroup.
         */
        VerboseReporter.prototype.onGroupFinish = function (_group) { };
        /** This method is a stub for onTestStart(). */
        VerboseReporter.prototype.onTestStart = function (_group, _test) { };
        /**
         * This method reports a completed test.
         *
         * @param {TestGroup} _group - The TestGroup that the TestResult belongs to.
         * @param {TestResult} test - The finished TestResult
         */
        VerboseReporter.prototype.onTestFinish = function (_group, test) {
            if (test.pass) {
                var rtraceDelta = test.rtraceDelta === 0
                    ? ""
                    : chalk_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["{yellow RTrace: ", "}"], ["{yellow RTrace: ",
                        "}"])), (test.rtraceDelta > 0 ? "+" : "-") +
                        test.rtraceDelta.toString());
                this.stdout.write(test.negated
                    ? chalk_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject([" {green  [Throws]: \u2714} ", " ", "\n"], [" {green  [Throws]: \u2714} ", " ", "\\n"])), test.name, rtraceDelta) : chalk_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject([" {green [Success]: \u2714} ", " ", "\n"], [" {green [Success]: \u2714} ", " ", "\\n"])), test.name, rtraceDelta));
            }
            else {
                this.stdout.write(chalk_1.default(templateObject_7 || (templateObject_7 = __makeTemplateObject(["    {red [Fail]: \u2716} ", "\n"], ["    {red [Fail]: \u2716} ", "\\n"])), test.name));
                if (!test.negated) {
                    this.stdout.write("  [Actual]: " + stringifyActualValue(0 /* Actual */, test.actual) + "\n[Expected]: " + stringifyActualValue(1 /* Expected */, test.expected) + "\n");
                }
                if (test.message) {
                    this.stdout.write(chalk_1.default(templateObject_8 || (templateObject_8 = __makeTemplateObject([" [Message]: {yellow ", "}\n"], [" [Message]: {yellow ", "}\\n"])), test.message));
                }
                if (test.stack) {
                    this.stdout.write("   [Stack]: " + test.stack.split("\n").join("\n           ") + "\n");
                }
            }
            /** If performance mode was enabled for this test, report the statistics. */
            if (test.performance) {
                this.stdout.write(chalk_1.default(templateObject_9 || (templateObject_9 = __makeTemplateObject([" {yellow [Samples]}: ", " runs\n"], [" {yellow [Samples]}: ", " runs\\n"])), test.times.length.toString()));
                if (test.hasAverage) {
                    this.stdout.write(chalk_1.default(templateObject_10 || (templateObject_10 = __makeTemplateObject(["    {yellow [Mean]}: ", "ms\n"], ["    {yellow [Mean]}: ", "ms\\n"])), test.average.toString()));
                }
                if (test.hasMedian) {
                    this.stdout.write(chalk_1.default(templateObject_11 || (templateObject_11 = __makeTemplateObject(["  {yellow [Median]}: ", "ms\n"], ["  {yellow [Median]}: ", "ms\\n"])), test.median.toString()));
                }
                if (test.hasVariance) {
                    this.stdout.write(chalk_1.default(templateObject_12 || (templateObject_12 = __makeTemplateObject(["{yellow [Variance]}: ", "ms\n"], ["{yellow [Variance]}: ", "ms\\n"])), test.variance.toString()));
                }
                if (test.hasStdDev) {
                    this.stdout.write(chalk_1.default(templateObject_13 || (templateObject_13 = __makeTemplateObject(["  {yellow [StdDev]}: ", "ms\n"], ["  {yellow [StdDev]}: ", "ms\\n"])), test.stdDev.toString()));
                }
                if (test.hasMax) {
                    this.stdout.write(chalk_1.default(templateObject_14 || (templateObject_14 = __makeTemplateObject(["     {yellow [Max]}: ", "ms\n"], ["     {yellow [Max]}: ", "ms\\n"])), test.max.toString()));
                }
                if (test.hasMin) {
                    this.stdout.write(chalk_1.default(templateObject_15 || (templateObject_15 = __makeTemplateObject(["     {yellow [Min]}: ", "ms\n"], ["     {yellow [Min]}: ", "ms\\n"])), test.min.toString()));
                }
            }
            else {
                /** Log the values to stdout if this was a typical test. */
                for (var _i = 0, _a = test.logs; _i < _a.length; _i++) {
                    var logValue = _a[_i];
                    this.onLog(logValue);
                }
            }
        };
        /**
         * This method reports that a TestContext has finished.
         *
         * @param {TestContext} suite - The finished test context.
         */
        VerboseReporter.prototype.onFinish = function (suite) {
            if (suite.testGroups.length === 0)
                return;
            var result = suite.pass ? chalk_1.default(templateObject_16 || (templateObject_16 = __makeTemplateObject(["{green \u2714 PASS}"], ["{green \u2714 PASS}"]))) : chalk_1.default(templateObject_17 || (templateObject_17 = __makeTemplateObject(["{red \u2716 FAIL}"], ["{red \u2716 FAIL}"])));
            var count = suite.testGroups
                .map(function (e) { return e.tests.length; })
                .reduce(function (a, b) { return a + b; }, 0);
            var successCount = suite.testGroups
                .map(function (e) { return e.tests.filter(function (f) { return f.pass; }).length; })
                .reduce(function (a, b) { return a + b; }, 0);
            var fail = count === successCount
                ? "0 fail"
                : chalk_1.default(templateObject_18 || (templateObject_18 = __makeTemplateObject(["{red ", " fail}"], ["{red ", " fail}"])), (count - successCount).toString());
            var rtcount = suite.allocationCount - suite.freeCount;
            var rtraceDelta = rtcount === 0
                ? ""
                : chalk_1.default(templateObject_19 || (templateObject_19 = __makeTemplateObject(["{yellow RTrace: ", "}"], ["{yellow RTrace: ",
                    "}"])), (rtcount > 0 ? "+" : "-") +
                    rtcount.toString());
            for (var _i = 0, _a = suite.warnings; _i < _a.length; _i++) {
                var warning = _a[_i];
                this.stdout.write(chalk_1.default(templateObject_20 || (templateObject_20 = __makeTemplateObject(["{yellow  [Warning]}: ", " ", "\n"], ["{yellow  [Warning]}: ", " ", "\\n"])), warning.type, warning.message));
                this.stdout.write(chalk_1.default(templateObject_21 || (templateObject_21 = __makeTemplateObject(["{yellow    [Stack]}: {yellow ", "}\n\n"], ["{yellow    [Stack]}: {yellow ",
                    "}\\n\\n"])), warning.stackTrace
                    .split("\n")
                    .join("\n           ")));
            }
            for (var _b = 0, _c = suite.errors; _b < _c.length; _b++) {
                var error = _c[_b];
                this.stdout.write(chalk_1.default(templateObject_22 || (templateObject_22 = __makeTemplateObject(["{red    [Error]}: ", " ", "\n"], ["{red    [Error]}: ", " ", "\\n"])), error.type, error.message));
                this.stdout.write(chalk_1.default(templateObject_23 || (templateObject_23 = __makeTemplateObject(["{red    [Stack]}: {yellow ", "}\n\n"], ["{red    [Stack]}: {yellow ",
                    "}\\n\\n"])), error.stackTrace
                    .split("\n")
                    .join("\n           ")));
            }
            this.stdout.write(chalk_1.default(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n", "\n\n    [File]: ", " ", "\n  [Groups]: {green ", " pass}, ", " total\n  [Result]: ", "\n [Summary]: {green ", " pass},  ", ", ", " total\n [Startup]: ", "ms\n    [Time]: ", "ms\n"], ["\n",
                "\n\n    [File]: ", " ", "\n  [Groups]: {green ",
                " pass}, ", " total\n  [Result]: ", "\n [Summary]: {green ", " pass},  ", ", ", " total\n [Startup]: ", "ms\n    [Time]: ", "ms\n"])), process.stdout.columns
                ? "~".repeat(process.stdout.columns - 10)
                : "~".repeat(80), suite.fileName, rtraceDelta, suite.testGroups
                .filter(function (e) { return e.pass; })
                .length.toString(), suite.testGroups.length.toString(), result, successCount.toString(), fail, count.toString(), suite.startupTime.toString(), suite.time.toString()));
        };
        /**
         * This method reports a todo to stdout.
         *
         * @param {TestGroup} _group - The test group the todo belongs to.
         * @param {string} todo - The todo.
         */
        VerboseReporter.prototype.onTodo = function (_group, todo) {
            this.stdout.write(chalk_1.default(templateObject_25 || (templateObject_25 = __makeTemplateObject(["    {yellow [Todo]:} ", "\n"], ["    {yellow [Todo]:} ", "\\n"])), todo));
        };
        /**
         * A custom logger function for the default reporter that writes the log values using `console.log()`
         *
         * @param {LogValue} logValue - A value to be logged to the console
         */
        VerboseReporter.prototype.onLog = function (logValue) {
            // create string representations of the pointer
            var pointer = logValue.pointer.toString();
            var hexPointer = logValue.pointer.toString(16);
            // log the log message
            if (logValue.pointer > 0) {
                this.stdout.write(chalk_1.default(templateObject_26 || (templateObject_26 = __makeTemplateObject(["     {yellow [Log]:} Reference at address [", "] [hex: 0x", "] ", "\n"], ["     {yellow [Log]:} Reference at address [", "] [hex: 0x", "] ", "\\n"])), pointer, hexPointer, logValue.message));
            }
            else {
                this.stdout.write(chalk_1.default(templateObject_27 || (templateObject_27 = __makeTemplateObject(["     {yellow [Log]:} ", "\n"], ["     {yellow [Log]:} ", "\\n"])), logValue.message));
            }
            // if there are bytes to show, create a logging representation of the bytes
            if (logValue.bytes.length > 0) {
                var value = createReferenceString_1.createReferenceString(logValue.bytes, logValue.pointer, logValue.offset);
                this.stdout.write(chalk_1.default(templateObject_28 || (templateObject_28 = __makeTemplateObject(["            {blueBright ", "}\n"], ["            {blueBright ",
                    "}\\n"])), value
                    .split("\n")
                    .join("\n            ")));
            }
            this.stdout.write(chalk_1.default(templateObject_29 || (templateObject_29 = __makeTemplateObject(["        {yellow ", "}\n\n"], ["        {yellow ",
                "}\\n\\n"])), logValue.stack
                .split("\n")
                .join("\n        ")));
        };
        return VerboseReporter;
    }(TestReporter_1.TestReporter));
    exports.default = VerboseReporter;
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyYm9zZVJlcG9ydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlcG9ydGVyL1ZlcmJvc2VSZXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR0EsZ0RBQTBCO0lBRzFCLHFEQUFvRDtJQUVwRCxzRUFBcUU7SUFXckU7Ozs7OztPQU1HO0lBQ0gsU0FBUyxvQkFBb0IsQ0FDM0IsSUFBZSxFQUNmLEtBQXlCO1FBRXpCLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxVQUFVLEdBQVcsRUFBRSxDQUFDO1FBRTVCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLFVBQVU7Z0JBQ1IsbUJBQW1CO29CQUNuQiw2Q0FBcUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQzt5QkFDNUQsS0FBSyxDQUFDLElBQUksQ0FBQzt5QkFDWCxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNoQztRQUVELElBQU0sV0FBVyxHQUNmLGVBQWUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFbEUsT0FBTyxJQUFJLHFCQUF1QjtZQUNoQyxDQUFDLENBQUMsZUFBSyx5R0FBQSxTQUFVLEVBQWEsU0FBVSxFQUFVLFdBQVksRUFBVyxHQUFHLEtBQTNELEtBQUssQ0FBQyxPQUFPLEVBQVUsVUFBVSxFQUFZLFdBQVcsRUFDekUsQ0FBQyxDQUFDLGVBQUssdUdBQUEsT0FBUSxFQUFhLFNBQVUsRUFBVSxXQUFZLEVBQVcsR0FBRyxLQUEzRCxLQUFLLENBQUMsT0FBTyxFQUFVLFVBQVUsRUFBWSxXQUFXLENBQUcsQ0FBQztJQUMvRSxDQUFDO0lB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