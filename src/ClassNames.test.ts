import { ClassNames, cln } from "./ClassNames";

describe("ClassNames", () => {
    describe("has", () => {
        test("returns true when expected string is found", () => {
            const classes = new ClassNames(["beer", "banana"]);

            expect(classes.has("beer")).toEqual(true);
        });

        test("returns true when expected regExp is found", () => {
            const classes = new ClassNames(["beer", "banana"]);

            expect(classes.has(new RegExp("n{1,}"))).toEqual(true);
        });

        test("returns false when expected string is found", () => {
            const classes = new ClassNames(["beer", "banana"]);

            expect(classes.has("beers")).toEqual(false);
        });

        test("returns false when expected regExp is found", () => {
            const classes = new ClassNames(["beer", "banana"]);

            expect(classes.has(new RegExp("f{1,}"))).toEqual(false);
        });
    });

    describe("add", () => {
        test("returns the instance for chaining", () => {
            const classes = new ClassNames();
            const add = "Beer";

            expect(classes.add(add)).toBeInstanceOf(ClassNames);
        });
        test("adds single value to instance", () => {
            const classes = new ClassNames();
            const add = "Beer";

            classes.add(add);

            expect(classes.has(add)).toEqual(true);
        });

        test("adds array of values to instance", () => {
            const classes = new ClassNames();
            const add = ["Beer", "Banana", "Cheese"];

            classes.add(add);

            add.forEach((value) => {
                expect(classes.has(value)).toEqual(true);
            });
        });

        test("combines passed ClassName instance into current instance", () => {
            const classes = new ClassNames();
            const add = ["Beer", "Banana", "Cheese"];
            const addClassName = new ClassNames(add);

            classes.add(addClassName);

            add.forEach((value) => {
                expect(classes.has(value)).toEqual(true);
            });
        });

        describe("multiple arguments", () => {
            test("returns the expected result", () => {
                const value = new ClassNames("a", "b", "c").list();
                expect(value).toEqual("a b c");
            });

            test("returns the expected result when passed to add", () => {
                const value = new ClassNames().add("a", "b", "c").list();
                expect(value).toEqual("a b c");
            });

            test("returns the expected result when passed with multiple types", () => {
                const value1 = new ClassNames().add("a", ["b", "c"]).list();
                expect(value1).toEqual("a b c");
                const value2 = new ClassNames().add("a", ["b"], { c: true }).list();
                expect(value2).toEqual("a b c");
            });
        });

        describe("conditional classes", () => {
            test("returns only the `true` values when passed in the constructor", () => {
                const expectedToFind = "mt-2";
                const expectedNotToFind = "pt-2";

                const conditionalClasses = {
                    [expectedToFind]: true,
                    [expectedNotToFind]: false
                };

                const classList = new ClassNames(conditionalClasses).list();

                expect(classList).toMatch(expectedToFind);
                expect(classList).not.toMatch(expectedNotToFind);
            });

            test("returns only the `true` values when passed with `.add`", () => {
                const expectedToFind = "mt-2";
                const expectedNotToFind = "pt-2";

                const conditionalClasses = {
                    [expectedToFind]: true,
                    [expectedNotToFind]: false
                };
                const classList = new ClassNames().add(conditionalClasses).list();

                expect(classList).toMatch(expectedToFind);
                expect(classList).not.toMatch(expectedNotToFind);
            });
        });
    });

    describe("remove", () => {
        test("returns the instance for chaining", () => {
            const classes = new ClassNames(["Beer", "Banana", "Cheese", "bacon"]);
            const remove = "Beer";

            expect(classes.remove(remove)).toBeInstanceOf(ClassNames);
        });

        test("removes single passed string", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            classes.remove(addedClasses[0]);

            expect(classes.has(addedClasses[0])).toEqual(false);
            expect(classes.has(addedClasses[1])).toEqual(true);
            expect(classes.has(addedClasses[2])).toEqual(true);
            expect(classes.has(addedClasses[3])).toEqual(true);
        });

        test("removes array of passed string", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            classes.remove([addedClasses[0], addedClasses[2]]);

            expect(classes.has(addedClasses[0])).toEqual(false);
            expect(classes.has(addedClasses[1])).toEqual(true);
            expect(classes.has(addedClasses[2])).toEqual(false);
            expect(classes.has(addedClasses[3])).toEqual(true);
        });

        test("removes single passed RegExp", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            classes.remove(new RegExp("e{2}"));

            expect(classes.has(addedClasses[0])).toEqual(false);
            expect(classes.has(addedClasses[1])).toEqual(true);
            expect(classes.has(addedClasses[2])).toEqual(false);
            expect(classes.has(addedClasses[3])).toEqual(true);
        });

        test("removes array passed RegExp", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            classes.remove([new RegExp("e{2}"), new RegExp("con")]);

            expect(classes.has(addedClasses[0])).toEqual(false);
            expect(classes.has(addedClasses[1])).toEqual(true);
            expect(classes.has(addedClasses[2])).toEqual(false);
            expect(classes.has(addedClasses[3])).toEqual(false);
        });
    });

    describe("list", () => {
        test("returns a space delimited of classes as a string", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            expect(classes.list()).toEqual(addedClasses.join(" "));
        });

        test("allows you to add additional classes", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses.slice(0, -1));

            expect(classes.list(addedClasses)).toEqual(addedClasses.join(" "));
        });
    });

    describe("find", () => {
        test("returns an array of found items when regex is used", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            const found = classes.find(new RegExp("e{2,}"));

            expect(found).toEqual(["Beer", "Cheese"]);
        });

        test("returns an array of found items when string is used", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            const found = classes.find("Beer");

            expect(found).toEqual(["Beer"]);
        });
    });

    describe("length", () => {
        test("returns the length of the internal array", () => {
            const classes = new ClassNames();
            expect(classes).toHaveLength(0);
            ["Beer", "Banana", "Cheese", "bacon"].forEach((value, i) => {
                classes.add(value);
                expect(classes).toHaveLength(i + 1);
            });
        });
    });

    describe("isEmpty", () => {
        test("returns true when no classes are added", () => {
            expect(new ClassNames().isEmpty()).toBeTrue();
        });
        test("returns false when classes are added", () => {
            expect(new ClassNames("class-1").isEmpty()).toBeFalse();
        });
    });

    describe("toString", () => {
        test("returns a string of classes", () => {
            const addedClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const classes = new ClassNames(addedClasses);

            expect(classes.toString()).toMatch(addedClasses.join(" "));
        });
    });

    describe("static add method", () => {
        test("returns an instance of ClassNames", () => {
            const value = ClassNames.add("me");

            expect(value).toBeInstanceOf(ClassNames);
        });
    });

    describe("isClassNames", () => {
        test("returns true if value is an instance of ClassNames", () => {
            const value = new ClassNames().add("me");

            expect(new ClassNames().isClassNames(value)).toBeBoolean();
            expect(new ClassNames().isClassNames(value)).toBeTrue();
        });
        test("returns false if value is not an instance of ClassNames", () => {
            const value = 423;

            expect(new ClassNames().isClassNames(value)).toBeBoolean();
            expect(new ClassNames().isClassNames(value)).toBeFalse();
        });
    });

    describe("ifNotAdd", () => {
        test("Adds the classes if value is not found", () => {
            const baseClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const addClass = "beef";

            expect(new ClassNames(baseClasses).ifNotAdd("pickle", addClass).list()).toContain(
                addClass
            );
        });

        test("Does Not Add the classes if value is  found", () => {
            const baseClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const addClass = "beef";

            expect(new ClassNames(baseClasses).ifNotAdd("Banana", addClass).list()).not.toContain(
                addClass
            );
        });
    });

    describe("ifAdd", () => {
        test("Adds the classes if value is not found", () => {
            const baseClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const addClass = "beef";

            expect(new ClassNames(baseClasses).ifAdd("Banana", addClass).list()).toContain(
                addClass
            );
        });

        test("Does Not Add the classes if value is  found", () => {
            const baseClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const addClass = "beef";

            expect(new ClassNames(baseClasses).ifAdd("pickle", addClass).list()).not.toContain(
                addClass
            );
        });
    });

    describe("ifNotRemove", () => {
        test("Adds the classes if value is not found", () => {
            const baseClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const removeClass = "Cheese";

            expect(
                new ClassNames(baseClasses).ifNotRemove("pickle", removeClass).list()
            ).not.toContain(removeClass);
        });

        test("Does Not Add the classes if value is  found", () => {
            const baseClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const removeClass = "Cheese";

            expect(new ClassNames(baseClasses).ifNotRemove("Banana", removeClass).list()).toContain(
                removeClass
            );
        });
    });

    describe("ifRemove", () => {
        test("Adds the classes if value is not found", () => {
            const baseClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const removeClass = "Cheese";

            expect(new ClassNames(baseClasses).ifRemove("pickle", removeClass).list()).toContain(
                removeClass
            );
        });

        test("Does Not Add the classes if value is  found", () => {
            const baseClasses = ["Beer", "Banana", "Cheese", "bacon"];
            const removeClass = "Cheese";

            expect(
                new ClassNames(baseClasses).ifRemove("Banana", removeClass).list()
            ).not.toContain(removeClass);
        });
    });

    describe("switch", () => {
        const baseClasses = ["Beer", "Banana"];
        const TestValues = { Cheese: "CheeseValue", green: "bg-emerald-700" };
        const defaultValue = "Pie";

        test("Adds the expected values", () => {
            const condition = Object.keys(TestValues)[0] as keyof typeof TestValues;
            expect(
                new ClassNames(baseClasses).switch(condition, TestValues, defaultValue).list()
            ).toContain(TestValues[condition]);
        });

        test("Adds the default value when its passed and condition is not met", () => {
            const condition = "asdf";
            expect(
                new ClassNames(baseClasses).switch(condition, TestValues, defaultValue).list()
            ).toContain(defaultValue);
        });

        test("Does not add anything is not default is passed and condition is not met", () => {
            const condition = "asdf";
            expect(
                new ClassNames(baseClasses).switch(condition, TestValues).list().split(" ")
            ).not.toContain(Object.values(TestValues));
        });
    });

    describe("static isClassNames method", () => {
        test("returns true if value is an instance of ClassNames", () => {
            const value = ClassNames.add("me");

            expect(ClassNames.isClassNames(value)).toBeBoolean();
            expect(ClassNames.isClassNames(value)).toBeTrue();
        });
        test("returns false if value is not an instance of ClassNames", () => {
            const value = 423;

            expect(ClassNames.isClassNames(value)).toBeBoolean();
            expect(ClassNames.isClassNames(value)).toBeFalse();
        });
    });
});

describe("cln", () => {
    test("returns a string", () => {
        const values = ["p1", "p2", "p3"];
        expect(cln(values)).toMatch(values.join(" "));
    });
});
