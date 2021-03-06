import { TestGroup } from "../test/TestGroup";
import { TestResult } from "../test/TestResult";
import { TestContext } from "../test/TestContext";
import { LogValue } from "../util/LogValue";
import { TestReporter } from "../test/TestReporter";
export declare class DefaultTestReporter extends TestReporter {
    onStart(_suite: TestContext): void;
    onGroupStart(group: TestGroup): void;
    onGroupFinish(group: TestGroup): void;
    onTestStart(_group: TestGroup, _test: TestResult): void;
    onTestFinish(_group: TestGroup, test: TestResult): void;
    onFinish(suite: TestContext): void;
    onTodo(_group: TestGroup, todo: string): void;
    /**
     * A custom logger function for the default reporter that writes the log values using `console.log()`
     *
     * @param {LogValue} logValue - A value to be logged to the console
     */
    onLog(logValue: LogValue): void;
}
//# sourceMappingURL=DefaultTestReporter.d.ts.map