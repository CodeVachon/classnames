export interface IConditionalClasses {
    [className: string]: boolean;
}
export type ClassNameAddValue = string | string[] | ClassNames;
export type AddInputValue = ClassNameAddValue | IConditionalClasses;
export type RemoveInputValue = string | string[] | RegExp | RegExp[];

/**
 * A Class to help Manage Classes for Components
 */
class ClassNames {
    private classes: string[] = [];

    /**
     * Returns the number of values in this instance
     */
    public get length(): number {
        return this.classes.length;
    }

    /**
     * Returns this instances values as a string
     *
     * **Alias** of `.list()`
     */
    public toString(): string {
        return this.list();
    }

    /**
     * Check if the Provided Value is an Instance of `ClassNames`
     * @param value Value to Check
     * @returns if the value is an instance of `ClassNames`
     */
    public isClassNames(value: any): value is ClassNames {
        if (value instanceof ClassNames) {
            return true;
        }
        return false;
    }

    constructor(...classes: AddInputValue[]) {
        if (classes) {
            classes.forEach((value) => this.add(value));
        }
    }

    private isArray(value: any): value is [] {
        if (value instanceof Array) {
            return true;
        }
        return false;
    }

    private makeArray<T = any>(value: T | T[]): T[] {
        const splitRegEx = new RegExp("\\s{1,}", "g");
        let output: any[] = [];

        if (this.isClassNames(value)) {
            output = output.concat(value.list().split(splitRegEx));
        } else {
            if (!this.isArray(value)) {
                if (typeof value === "string") {
                    String(value)
                        .split(splitRegEx)
                        .forEach((record) => {
                            output.push(record.trim());
                        });
                } else {
                    output.push(value);
                }
            } else {
                output = output.concat(value);
            }
        }

        return output
            .map((value) => {
                if (value instanceof String) {
                    return value.trim();
                } else {
                    return value;
                }
            })
            .filter((value) => {
                if (value instanceof String) {
                    return value.length > 0;
                }
                return value !== undefined;
            });
    }

    /**
     * Returns if this instance has a value matching the pattern
     * @param lookingFor Patter to look for in this instances values
     */
    public has(lookingFor: string | RegExp): boolean {
        if (lookingFor instanceof RegExp) {
            return this.classes.some((current) => lookingFor.test(current));
        } else {
            const thisIndex = this.classes.indexOf(lookingFor);

            return thisIndex >= 0;
        }
    }

    /**
     * Add a value to this instance.
     *
     * **CHAINABLE**
     *
     * **Notes**:
     *
     * - strings will be trimmed and split on blank.
     * - instance will not had duplicate classes names
     * - 0 length values will be ignored
     *
     * @param input value(s) to be added to this instance
     */
    public add(...inputValues: AddInputValue[]): ClassNames {
        inputValues.forEach((input) => {
            if (typeof input === "object" && !this.isArray(input) && !this.isClassNames(input)) {
                input = Object.entries(input)
                    .filter(([key, value]) => value)
                    .map(([key]) => key);
            }

            const classes = this.makeArray<string>(input as string);

            classes.forEach((value) => {
                if (!this.has(value)) {
                    this.classes.push(value);
                }
            });
        });
        return this;
    }

    /**
     * Remove a value from this instance
     * @param input value(s) or pattern(s) to remove
     */
    public remove(...inputValues: RemoveInputValue[]): ClassNames {
        inputValues.forEach((input) => {
            const classes = this.makeArray<string | RegExp>(input);

            classes.forEach((value) => {
                let thisIndex = 0;

                while (thisIndex >= 0) {
                    thisIndex = this.classes.findIndex((className) => {
                        if (value instanceof RegExp) {
                            return value.test(className);
                        } else {
                            return className === value;
                        }
                    });

                    if (thisIndex >= 0) {
                        this.classes.splice(thisIndex, 1);
                    }
                }
            });
        });

        return this;
    }

    /**
     * Returns this instances values as a string.
     *
     * `<h1 classNames={ new ClassNames("text-xl").list() }>Hello World!</h1>`
     *
     * @param classes Add additional classes before listing
     */
    public list(...inputValues: AddInputValue[]): string {
        inputValues.forEach((input) => {
            if (input) {
                this.add(input);
            }
        });
        return this.classes.join(" ");
    }

    /**
     * Returns an array of values matching the search criteria
     * @param input value to look for
     */
    public find(input: string | RegExp): string[] {
        const found: string[] = [];

        this.classes.forEach((value) => {
            if (typeof input === "string") {
                if (value === input) {
                    found.push(value);
                }
            } else {
                if (input.test(value)) {
                    found.push(value);
                }
            }
        });

        return found;
    }

    /**
     * Check if this instance is empty
     */
    public isEmpty(): boolean {
        return this.length === 0;
    }

    /**
     * Add Classes to Instance if a Pattern is not found in the Instance
     * @param pattern the Pattern or class to look for
     * @param values values to be added if pattern is not found
     * @returns this instance
     */
    public ifNotAdd(pattern: string | RegExp, values: string | ClassNames): this {
        if (!this.has(pattern)) {
            this.add(values);
        }

        return this;
    }

    /**
     * Add Classes to Instance if a Pattern is found in the Instance
     * @param pattern the Pattern or class to look for
     * @param values values to be added if pattern is found
     * @returns this instance
     */
    public ifAdd(pattern: string | RegExp, values: string | ClassNames): this {
        if (this.has(pattern)) {
            this.add(values);
        }

        return this;
    }

    /**
     * Remove Classes to Instance if a Pattern is not found in the Instance
     * @param pattern the Pattern or class to look for
     * @param values values to be Removed if pattern is not found
     * @returns this instance
     */
    public ifNotRemove(pattern: string | RegExp, values: string | RegExp): this {
        if (!this.has(pattern)) {
            this.remove(values);
        }

        return this;
    }

    /**
     * Remove Classes to Instance if a Pattern is found in the Instance
     * @param pattern the Pattern or class to look for
     * @param values values to be Removed if pattern is found
     * @returns this instance
     */
    public ifRemove(pattern: string | RegExp, values: string | RegExp): this {
        if (this.has(pattern)) {
            this.remove(values);
        }

        return this;
    }

    /**
     * Act like a Switch Case for Added Classes
     *
     * *Usage*
     *
     * ```ts
     * new ClassNames<"success" | "danger">(["rounded text-white px-4 py-2"])
     *   .switch(btnType, {
     *     "success": "bg-emerald-700",
     *     "danger": "bg-red-700"
     *   }, "bg-sky-700")
     * ```
     *
     * @typeParam T - Union of Expected Potential Values of onValue
     * @param onValue The the Value to Switch On
     * @param options Object Containing Possible Values and there Keys
     * @param defaultValue Optional Default Value
     * @returns this instance
     */
    public switch<T extends string | number | symbol = string>(
        onValue: string | number | symbol,
        options: Partial<Record<T, ClassNameAddValue>>,
        defaultValue?: ClassNameAddValue
    ): this {
        const isOption = (
            value: keyof Record<T, ClassNameAddValue> | string | number | symbol,
            options: Partial<Record<T, ClassNameAddValue>>
        ): value is keyof Record<T, ClassNameAddValue> => {
            return options.hasOwnProperty(value);
        };

        if (isOption(onValue, options)) {
            this.add(options[onValue] || "");
        } else if (defaultValue !== undefined) {
            this.add(defaultValue);
        }

        return this;
    }

    /**
     * Conditionally Added Classes
     *
     * ```ts
     * new ClassNames().if(disabled === true, "bg-gray-100", "bg-sky-700").list();
     * ```
     *
     * @param condition The If Condition
     * @param isTrue Values to add if the Condition is True
     * @param isFalse Values to add of the Condition is False
     * @returns this instance
     */
    public if(
        condition: boolean,
        isTrue: ClassNameAddValue,
        isFalse: ClassNameAddValue = ""
    ): this {
        if (condition) {
            this.add(isTrue);
        } else {
            this.add(isFalse);
        }

        return this;
    }

    /**
     * Static accessor to add ClassNames
     *
     * **Shortcut Of** `new ClassNames().add(value)`
     * @param value classes to add to new instance of ClassNames
     * @returns an Instance of ClassNames
     */
    public static add(value: AddInputValue): ClassNames {
        return new ClassNames(value);
    }

    /**
     * Static accessor to isClassNames
     *
     * **Shortcut Of** `new ClassNames().isClassNames(value)`
     * @param value value to check
     * @returns if the provided value is an instance of ClassNames
     */
    public static isClassNames(value: any): boolean {
        return new ClassNames().isClassNames(value);
    }
}

/**
 * A Short Wrapper Function to ClassNames
 * @param values the Values passed to ClassNames
 * @returns a String of Formatted Classes
 */
const cln = (values: ClassNameAddValue): string => new ClassNames(values).list();

export default ClassNames;
export { ClassNames, cln };
