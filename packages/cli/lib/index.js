(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./util/CommandLineArg", "./util/CommandLineArg"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandLineArg_1 = require("./util/CommandLineArg");
    /**
     * @ignore
     *
     * Package version is always displayed, either for version or cli ascii art.
     */
    var pkg = require("../package.json");
    /**
     * This is the command line package version.
     */
    exports.version = pkg.version;
    var CommandLineArg_2 = require("./util/CommandLineArg");
    exports.parse = CommandLineArg_2.parse;
    exports.defaultCliArgs = CommandLineArg_2.defaultCliArgs;
    /**
     * This is the cli entry point and expects an array of arguments from the command line.
     *
     * @param {string[]} args - The arguments from the command line
     */
    function asp(args) {
        var splitIndex = args.indexOf("--");
        var hasCompilerArgs = splitIndex !== -1;
        var aspectArgs = hasCompilerArgs
            ? args.slice(0, splitIndex)
            : args;
        var compilerArgs = hasCompilerArgs
            ? args.slice(splitIndex + 1)
            : [];
        // parse the arguments
        var cliOptions = CommandLineArg_1.parse(aspectArgs);
        // Skip ascii art if asked for the version
        if (!cliOptions.version) {
            var printAsciiArt = require("./util/asciiArt").printAsciiArt;
            printAsciiArt(pkg.version);
        }
        if (cliOptions.types) {
            var types = require("./types").types;
            types();
        }
        else if (cliOptions.init) {
            var init = require("./init").init;
            // init script
            init();
        }
        else if (cliOptions.version) {
            // display the version
            console.log(pkg.version);
        }
        else if (cliOptions.help) {
            // display the help file
            var help = require("./help").help;
            help();
        }
        else if (cliOptions.portable) {
            var portable = require("./portable").portable;
            portable();
        }
        else {
            // run the compiler and test suite
            var run = require("./run").run;
            run(cliOptions, compilerArgs);
        }
    }
    exports.asp = asp;
    if (typeof require != "undefined" && require.main == module) {
        asp(process.argv.slice(2));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSx3REFBOEM7SUFFOUM7Ozs7T0FJRztJQUNILElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRXZDOztPQUVHO0lBQ1UsUUFBQSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUVuQyx3REFBdUU7SUFBOUQsaUNBQUEsS0FBSyxDQUFBO0lBQUUsMENBQUEsY0FBYyxDQUFBO0lBRTlCOzs7O09BSUc7SUFDSCxTQUFnQixHQUFHLENBQUMsSUFBYztRQUNoQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQU0sZUFBZSxHQUFHLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFNLFVBQVUsR0FBYSxlQUFlO1lBQzFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUM7WUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNULElBQU0sWUFBWSxHQUFhLGVBQWU7WUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsRUFBRSxDQUFDO1FBRVAsc0JBQXNCO1FBQ3RCLElBQU0sVUFBVSxHQUFHLHNCQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckMsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUMvRCxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdkMsS0FBSyxFQUFFLENBQUM7U0FDVDthQUFNLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtZQUMxQixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3BDLGNBQWM7WUFDZCxJQUFJLEVBQUUsQ0FBQztTQUNSO2FBQU0sSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzdCLHNCQUFzQjtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxQjthQUFNLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtZQUMxQix3QkFBd0I7WUFDeEIsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNwQyxJQUFJLEVBQUUsQ0FBQztTQUNSO2FBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzlCLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDaEQsUUFBUSxFQUFFLENBQUM7U0FDWjthQUFNO1lBQ0wsa0NBQWtDO1lBQ2xDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDakMsR0FBRyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMvQjtJQUNILENBQUM7SUF6Q0Qsa0JBeUNDO0lBRUQsSUFBSSxPQUFPLE9BQU8sSUFBSSxXQUFXLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7UUFDM0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUIifQ==