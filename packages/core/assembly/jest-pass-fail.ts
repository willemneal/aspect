/**
 * This is a standard Vec3 Class that contains three float values.
 */
export class Vec3 {
  constructor(
    public x: f64,
    public y: f64,
    public z: f64) {}

  magnitude(): f64 {
    return sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  @operator(">")
  protected __greaterThan(reference: Vec3): bool {
    var magnitude = this.magnitude();
    var refmagnitude = reference.magnitude();
    return magnitude > refmagnitude;
  }

  @operator(">=")
  protected __greaterThanOrEqualTo(reference: Vec3): bool {
    var magnitude = this.magnitude();
    var refmagnitude = reference.magnitude();
    return magnitude >= refmagnitude;
  }

  @operator("<")
  protected __lessThan(reference: Vec3): bool {
    var magnitude = this.magnitude();
    var refmagnitude = reference.magnitude();
    return magnitude < refmagnitude;
  }

  @operator("<=")
  protected __lessThanOrEqualTo(reference: Vec3): bool {
    var magnitude = this.magnitude();
    var refmagnitude = reference.magnitude();
    return magnitude <= refmagnitude;
  }

  @operator("==")
  protected __equals(reference: Vec3): bool {
    return this.x == reference.x
      && this.y == reference.y
      && this.z == reference.z;
  }
}


test("A test outside of a describe block", () => {
  assert(true);
});

describe("pass-fail", () => {
  it("this test should pass", (): void => {
    expect<i32>(13 + 29).toBe(42);
  });

  it("should fail", (): void => {
    assert(false, "expected fail");
  });

  it("should expect strings", (): void => {
    expect<string>("two").toBe("one");
  });

  it("should report expected finite values", (): void => {
    expect<f64>(NaN).toBeFinite();
  });

  it("should report falsy expected values", (): void => {
    expect<i32>(1).toBeFalsy();
  });

  it("should report truthy expected values", (): void => {
    expect<i32>(0).toBeTruthy();
  });

  it("should report reference values", (): void => {
    expect<Vec3>(new Vec3(1, 2, 3)).toStrictEqual(new Vec3(4, 5, 6));
  });

  it("should report number values", (): void => {
    expect<i32>(0).toBe(42);
  });

  it("should report nulls", (): void => {
    expect<Vec3>(null).not.toBeNull();
  });

  throws("should report a negated test", (): void => {
    expect<i32>(0).not.toBe(0);
  });

  throws("should fail when test does not throw", (): void => {
    expect<i32>(0).toBe(0);
  });

  it("should report array values", () => {
    expect<i32[]>([1, 2, 3]).toStrictEqual([4, 5, 6]);
  });

  it("should report long values", () => {
    expect<i64>(-9999999999).toBe(9999999999);
  });

  it("should report u32 values", () => {
    expect<u32>(4294967294).toBe(4294967293);
  });

  it("should report bool values", () => {
    expect<bool>(false).toBe(true);
  });
});

describe("fail on group beforeAll", () => {
  beforeAll(() => {
    assert(false, "This should fail in beforeAll");
  });

  it("shouldn't run", () => {
    assert(true, "");
  });
});

describe("fail on group beforeEach", () => {
  beforeEach(() => {
    assert(false, "This should fail in beforeEach");
  });

  it("shouldn't run", () => {
    assert(true, "");
  });
});

describe("fail on group afterEach", () => {
  afterEach(() => {
    assert(false, "This should fail in afterEach");
  });

  it("should run", () => {
    assert(true, "");
  });
});

describe("fail on group afterAll", () => {
  afterAll(() => {
    assert(false, "This should fail in afterAll");
  });

  it("should run", () => {
    assert(true, "");
  });
});


/** This set of tests verify that succesful beforeAll callbacks are hit in the TestContext.ts file. */

describe("pass on group beforeAll", () => {
  beforeAll(() => {
    assert(true, "This should pass in beforeAll");
  });

  it("should run", () => {
    assert(true, "");
  });
});

describe("pass on group beforeEach", () => {
  beforeEach(() => {
    assert(true, "This should pass in beforeEach");
  });

  it("should run", () => {
    assert(true, "");
  });
});

describe("pass on group afterEach", () => {
  afterEach(() => {
    assert(true, "This should pass in afterEach");
  });

  it("should run", () => {
    assert(true, "");
  });
});

describe("pass on group afterAll", () => {
  afterAll(() => {
    assert(true, "This should pass in afterAll");
  });

  it("should run", () => {
    assert(true, "");
  });
});

describe("nested fail in beforeAll", () => {
  describe("nested", () => {
    beforeAll(() => {
      assert(false, "");
    });
  });
});
